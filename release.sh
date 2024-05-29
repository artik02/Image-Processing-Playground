#!/bin/bash

# Replace local paths with remote URLs in index.html
sed -i 's|./yotta.js|https://artik02.github.io/Yotta.js/yotta.js|' index.html
sed -i 's|./opencv.js|https://docs.opencv.org/3.4.0/opencv.js|' index.html
