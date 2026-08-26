#!/bin/bash
# resize.sh — resize an image so its longest edge matches the given size
# Usage: ./resize.sh <image-path> [max-size]

image="$1"
size="${2:-400}"   # defaults to 800 if no second argument given
sips --resampleWidth "$size" "$image" 
