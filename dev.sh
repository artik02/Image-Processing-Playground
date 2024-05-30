#!/bin/bash

# Replace remote URLs with local paths in index.html
sed -i 's|https://artik02.github.io/Yotta.js/yotta.js|./yotta.js|' index.html
sed -i 's|https://docs.opencv.org/3.4.0/opencv.js|./opencv.js|' index.html
