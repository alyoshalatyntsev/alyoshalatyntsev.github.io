"""Refresh cache fingerprints after editing whiteboard assets, before publishing."""
import hashlib
import json
import re
from pathlib import Path

root = Path(__file__).resolve().parent
index = root / 'index.html'
html = index.read_text()
version = re.search(r'data-version="(\d{8}-\d+)"', html).group(1)
assets = {name: hashlib.sha256((root / name).read_bytes()).hexdigest()[:16]
          for name in ('board.css', 'ink.js', 'text.js', 'files.js', 'expiry.js', 'board.js')}
html = re.sub(r'board\.css\?v=[^"\s]+', 'board.css?v=' + assets['board.css'], html, count=1)
html = re.sub(r'let assets = /\* ASSET_FINGERPRINTS \*/ \{[^;]*\};',
              'let assets = /* ASSET_FINGERPRINTS */ ' + json.dumps(assets, separators=(',', ':')) + ';', html, count=1)
index.write_text(html)
(root / 'release.json').write_text(json.dumps({'version': version, 'assets': assets}, separators=(',', ':')) + '\n')
print('Whiteboard', version, 'asset fingerprints refreshed.')
