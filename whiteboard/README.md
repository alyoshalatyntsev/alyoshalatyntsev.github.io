Whiteboard
==========

A static shared canvas backed by the existing Firebase Realtime Database. The room ID in the URL is its access link. The bare address resumes the last room opened on this browser. There are no board lists, accounts, file-open dialogs, or manual-save controls. PDF export stays in the toolbar.

Drawing changes save automatically. Each interaction renews a server timestamp; an idle tab does not keep a board alive. Boards expire after twelve hours without activity. The browser clears expired drawings and local undo history, and Firebase rejects access to expired content. Deleted objects are removed from the database; only the last fifty undo actions are retained locally, capped at 1.5 MB when saved.

`.github/workflows/whiteboard-cleanup.yml` sweeps expired board records every fifteen minutes, using `cleanup.py`. It needs no credentials or paid Firebase functions. Rules permit listing only expired room IDs using a server-validated cutoff, and recheck expiry on deletion. Active board contents and IDs cannot be listed. The existing Go rules are preserved.

GitHub may delay scheduled jobs and disables scheduled workflows in public repositories after sixty days without repository activity. Check the **Expire inactive whiteboards** workflow in Actions if background cleanup stops; the browser still expires a board when opened. Keep this limitation in mind if the repository will remain untouched for months.

Ink widths are screen pixels: zoom moves and scales stroke paths while preserving their thickness. Text box edges resize and reflow the box; the detached lower-right node scales both box and font. Hold Pen, Highlighter, or Text for options. `P/H/T/E/V` switch tools, middle-drag selects a fully enclosed region, and Escape returns to Select. Wheel pans, Ctrl-wheel zooms around the pointer, and Space-drag pans. Undo and redo survive reloads on the same browser.

For a device-only preview, serve the repository and open `/whiteboard/?local=1`. Shared mode uses the Firebase project configured in `board.js`; deploy `database.rules.json` with `firebase.json` when changing persistence rules.

Startup checks `release.json` without browser caching. A newer release refreshes the page while preserving the room ID, before loading drawing scripts. Bump the version in both `index.html` and `release.json` together when publishing changes.
