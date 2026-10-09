Whiteboard
==========

A static shared canvas backed by the existing Firebase Realtime Database. The room ID in the URL is its access link. The bare address resumes the last room opened on this browser. There are no board lists, accounts, file-open dialogs, or manual-save controls. PDF export and a + button for a new board stay in the toolbar. Old boards remain available at their own links until expiry. Chrome asks where to save each PDF; browsers without the file picker use their download settings.

Drawing changes save automatically. Each interaction renews a server timestamp; an idle tab does not keep a board alive. Boards expire after twenty-four hours without activity. The browser clears expired drawings and local undo history, and Firebase rejects access to expired content. Deleted objects are removed from the database; only the last fifty undo actions are retained locally, capped at 1.5 MB when saved.

`.github/workflows/whiteboard-cleanup.yml` sweeps expired board records every fifteen minutes, using `cleanup.py`. It needs no credentials or paid Firebase functions. Rules permit listing only expired room IDs using a server-validated cutoff, and recheck expiry on deletion. Active board contents and IDs cannot be listed. The existing Go rules are preserved.

GitHub may delay scheduled jobs and disables scheduled workflows in public repositories after sixty days without repository activity. Check the **Expire inactive whiteboards** workflow in Actions if background cleanup stops; the browser still expires a board when opened. Keep this limitation in mind if the repository will remain untouched for months.

Ink widths are screen pixels: zoom moves and scales stroke paths while preserving their thickness. Text box edges resize and reflow the box; the detached lower-right node scales both box and font. Hold Pen, Highlighter, or Text for 150 ms, or click the active tool, for options. Tools and options sit on the left. Sliders use stepped widths and 10% opacity increments; click their numbers to enter exact values. `P/H/T/E/V/G` switch tools, with G for Hand. Middle-drag draws a fully enclosed freehand selection in Select; in every other tool it pans without changing tools. Hand also pans with left-drag. Escape returns to Select. Wheel zooms smoothly around the pointer without a modifier; Space-drag also pans. Undo and redo survive reloads on the same browser. Text starts bullet lists with `- ` or `* `, and numbered lists with `1. `; Enter continues them, empty-item Enter or double Space exits.

For a device-only preview, serve the repository and open `/whiteboard/?local=1`. Shared mode uses the Firebase project configured in `board.js`; deploy `database.rules.json` with `firebase.json` when changing persistence rules.

Startup checks `release.json` without browser caching. A newer release refreshes the page while preserving the room ID, before loading drawing scripts. Assets use content fingerprints so a cached page can load updated drawing code. After editing assets, run `python3 whiteboard/release.py` before publishing. When the HTML structure changes, also bump `data-version` in `index.html` first.
