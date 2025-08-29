#!/usr/bin/env bash
set -euo pipefail
curl -fsS https://labs.cojoop.kro.kr/jwt/healthz
echo "frontend smoke OK"
