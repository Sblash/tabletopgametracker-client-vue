#!/bin/bash

# npm install -g http-server

npm install
npm run build

# http-server dist --port 80
tail -f /dev/null