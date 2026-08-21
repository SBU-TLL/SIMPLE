TARGET_FOLDER="www/resourcesForCopy"

find "$TARGET_FOLDER" -type l -lname '/home/tltsecure/apache2/htdocs/SIMPLE/*' | while read -r link; do
  old_target=$(readlink "$link")
  # Strip the legacy path prefix
  rel_path="${old_target#/home/tltsecure/apache2/htdocs/SIMPLE/}"
  # Compute relative path from the link's directory back to www/
  link_dir=$(dirname "$link")
  rel_to_root=$(realpath --relative-to="$link_dir" ".")
  new_target="$rel_to_root/www/$rel_path"

  echo "Rewriting: $link"
  echo "  Old: $old_target"
  echo "  New: $new_target"
  ln -snf "$new_target" "$link"
done