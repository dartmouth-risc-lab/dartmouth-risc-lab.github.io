#!/bin/bash

# Bash script to convert all PNG and JPG images to WebP using ffmpeg

echo "Starting WebP conversion..."

# Find all matching image files, case-insensitive, safely handling spaces
find . -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) -print0 | while IFS= read -r -d '' file; do
  # Construct output path with .webp extension
  output="${file%.*}.webp"

  # Convert with ffmpeg, then delete the original only if conversion succeeded
  echo "Converting: $file -> $output"
  if ffmpeg -nostdin -y -hide_banner -loglevel error -i "$file" -q:v 80 "$output"; then
    rm -f "$file"
  else
    echo "Failed to convert: $file"
  fi
done

# Update @assets references in source files to point to the new .webp files
echo "Updating image references to .webp..."
grep -rlIE "@assets/[^\"')]*\.(png|jpe?g)" .. 2>/dev/null | while IFS= read -r src_file; do
  perl -i -pe "s{(\@assets/[^\"')]*)\.(png|jpe?g)}{\$1.webp}gi" "$src_file"
  echo "Updated references in: $src_file"
done

echo "Conversion complete."