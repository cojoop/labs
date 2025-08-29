 #!/usr/bin/env bash
set -euo pipefail
curl -fsS https://labs.cojoop.kro.kr/jwt/api/healthz
echo "backend smoke OK"
