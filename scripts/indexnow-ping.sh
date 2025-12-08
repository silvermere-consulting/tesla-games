#!/usr/bin/env bash
curl -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "host": "gamesonthemove.com",
    "key": "ebcc9dcd9ca443009283e62054ec6316",
    "keyLocation": "https://gamesonthemove.com/ebcc9dcd9ca443009283e62054ec6316.txt",
    "urlList": [
      "https://gamesonthemove.com/",
      "https://gamesonthemove.com/guides/",
      "https://gamesonthemove.com/games/",
      "https://gamesonthemove.com/steam-deck/",
      "https://gamesonthemove.com/switch/",
      "https://gamesonthemove.com/tesla/",
      "https://gamesonthemove.com/travel-setups/"
    ]
  }'
echo "IndexNow ping sent!"
