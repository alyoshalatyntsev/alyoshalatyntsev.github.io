(() => {
  'use strict';
  const TTL = 12 * 60 * 60 * 1000;
  function watch({ room, db, onExpire, onError }) {
    const key = 'whiteboard-activity-' + room, root = db?.ref(), boardPath = 'whiteboards/' + room, indexPath = 'whiteboardExpiry/' + room;
    let last = 0, offset = 0, timer, debounce, lastSent = 0, clearing = false;
    const now = () => Date.now() + offset;
    const expired = () => last > 0 && now() >= last + TTL;
    function schedule() { clearTimeout(timer); if (last) timer = setTimeout(() => clear().catch(onError), Math.max(1000, last + TTL - now() + 100)); }
    function receive(value) {
      if (typeof value === 'number') { last = value; try { localStorage.setItem(key, String(value)); } catch {} schedule(); }
      else if (last && !clearing) { last = 0; clearTimeout(timer); onExpire(); }
    }
    async function send() {
      clearTimeout(debounce); if (clearing) return;
      if (expired()) { await clear(); return; }
      lastSent = Date.now();
      if (db) {
        const stamp = firebase.database.ServerValue.TIMESTAMP;
        await root.update({ [boardPath + '/lastActive']: stamp, [indexPath]: stamp });
        // The server listener supplies the authoritative timestamp.
      } else receive(Date.now());
    }
    function touch() {
      if (clearing) return;
      clearTimeout(debounce);
      if (!last || Date.now() - lastSent > 30000) send().catch(onError);
      else debounce = setTimeout(() => send().catch(onError), 500);
    }
    async function clear() {
      if (clearing || !expired()) return;
      clearing = true; clearTimeout(debounce); clearTimeout(timer);
      try {
        if (db) await root.update({ [boardPath]: null, [indexPath]: null });
        last = 0; try { localStorage.removeItem(key); } catch {} onExpire();
      } catch (error) {
        // A peer may have renewed the board while a cleanup request was in flight.
        if (db) { const s = await db.ref(boardPath + '/lastActive').once('value'); receive(s.val()); }
        schedule(); if (!/permission/i.test(error.message || '')) throw error;
      } finally { clearing = false; }
    }
    async function start() {
      if (db) {
        const time = await db.ref('.info/serverTimeOffset').once('value'); offset = typeof time.val() === 'number' ? time.val() : 0;
        const snapshot = await db.ref(indexPath).once('value'); last = typeof snapshot.val() === 'number' ? snapshot.val() : 0;
        if (expired()) await clear();
        db.ref(boardPath + '/lastActive').on('value', snapshot => receive(snapshot.val()));
        await send();
      } else {
        try { last = Number(localStorage.getItem(key)) || 0; } catch {}
        if (expired()) await clear(); receive(Date.now());
      }
    }
    return { start, touch, expired, clear };
  }
  window.BoardExpiry = { watch, TTL };
})();
