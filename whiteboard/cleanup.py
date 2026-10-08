"""Remove expired boards only; Firebase rules protect every active board."""
import json
import re
import time
from urllib.error import HTTPError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

DATABASE = 'https://project-0cbb7d36-56e5-441e-8fe-default-rtdb.europe-west1.firebasedatabase.app'
TTL_MS = 12 * 60 * 60 * 1000


def request(path, method='GET', value=None):
    data = json.dumps(value).encode() if value is not None else None
    headers = {'Content-Type': 'application/json'} if data is not None else {}
    with urlopen(Request(DATABASE + '/' + path, data=data, headers=headers, method=method), timeout=30) as response:
        return json.load(response)


def cleanup():
    removed = 0
    # Bounded, indexed reads return expired timestamps, never active board contents.
    cutoff = int(time.time() * 1000) - TTL_MS - 5000
    # Bind the query to a server-validated cutoff; query bounds only support
    # equality reliably in RTDB rules, so compare the stored numeric value there.
    request('whiteboardCleanupCutoff.json', 'PUT', cutoff)
    query = urlencode({'orderBy': '"$value"', 'endAt': cutoff, 'limitToFirst': 100})
    for _ in range(20):
        expired = request('whiteboardExpiry.json?' + query) or {}
        if not expired:
            break
        for room in expired:
            if not re.fullmatch(r'[a-f0-9]{32}', room):
                continue
            try:
                # Rules recheck lastActive at deletion time, protecting renewed boards.
                request('whiteboards/' + room + '.json', 'DELETE')
                request('whiteboardExpiry/' + room + '.json', 'DELETE')
                removed += 1
            except HTTPError as error:
                if error.code not in (401, 403):
                    raise
        if len(expired) < 100:
            break
    print('Removed', removed, 'expired whiteboards.')


if __name__ == '__main__':
    cleanup()
