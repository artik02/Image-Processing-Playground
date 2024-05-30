#!/bin/bash

# Download the necessary scripts
curl https://artik02.github.io/Yotta.js/yotta.js -o yotta.js
curl https://docs.opencv.org/3.4.0/opencv.js -o opencv.js

# Replace remote URLs with local paths in index.html
sed -i 's|https://artik02.github.io/Yotta.js/yotta.js|./yotta.js|' index.html
sed -i 's|https://docs.opencv.org/3.4.0/opencv.js|./opencv.js|' index.html
