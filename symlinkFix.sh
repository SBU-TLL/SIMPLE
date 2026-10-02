# 1. Define the target directory your symlinks SHOULD point to:
TARGET_DIR="$(pwd)/www/resourcesSource"

# 2. Re-link everything dynamically based on its depth in uploads:
find www/uploads -type l -exec bash -c '
  target_dir="$1"
  for link; do
    # Get the file name of the source (e.g., index.html, .htaccess, resourcesLinked)
    base_name=$(basename "$(readlink "$link")")
    
    # Target absolute destination file
    target_file="$target_dir/$base_name"
    
    # Get relative path from the link directory to the target file
    link_dir=$(dirname "$link")
    rel_path=$(realpath --relative-to="$link_dir" "$target_file")
    
    # Update the symlink
    ln -sfn "$rel_path" "$link"
    echo "Updated: $link -> $rel_path"
  done
' _ "$TARGET_DIR" {} +