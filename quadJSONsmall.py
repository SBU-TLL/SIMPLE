# Refactored by Gemini
import numpy as np
import sys
import json
import os.path

# Set numpy print options for debugging if needed.
np.set_printoptions(threshold=np.inf, linewidth=np.nan)

def load_pbm(pbm_name):
    """
    Reads a custom PBM file, pads it to a square with power-of-two dimensions,
    and returns it as a NumPy array.
    """
    with open(pbm_name) as f:
        lines = f.readlines()

    # Read original dimensions.
    (width, height) = np.array(lines[1].strip().split(' ')).astype(int)

    # Calculate the next power of two for padding.
    max_dim = int(max(width, height))
    # The bit_length() method is a clean way to find the next power of two.
    padded_size = 1 << (max_dim - 1).bit_length()

    # Read the pixel data, inverting 0s and 1s.
    numberlist = []
    for a in lines[2:]:
        for b in a.strip().split(' '):
            if b: # Avoid errors from empty strings
                numberlist.append(1 - int(b))

    # Create a padded square array filled with zeros (empty).
    padded_rect = np.zeros(shape=(padded_size, padded_size), dtype=int)

    # ❗️ BUG REPLICATION: Populate the array using [col][row] indexing to match
    # the behavior of the original script, which the frontend depends on.
    for i in range(len(numberlist)):
        row = i // width
        col = i % width
        if row < height: # Ensure we don't write out of original bounds
            padded_rect[col][row] = numberlist[i]
            
    return padded_rect, width, height


def build_quadtree(image_grid, point, size):
    """
    Recursively builds a quadtree from a given image grid using only arguments.
    ✅ This function is now self-contained and has no side effects.
    """
    node = {
        'point': point,
        'size': size,
        'isFilled': False,
        'isEmpty': False,
        'children': []
    }
    
    y, x = point[0], point[1]

    # Base Case: The quadrant is a single pixel.
    if size == 1:
        # ✅ FIX: Access the grid using [x][y] to read the transposed data correctly.
        if image_grid[x][y] == 1:
            node['isFilled'] = True
        else:
            node['isEmpty'] = True
        return node

    # ✅ FIX: Use integer division ('//') to prevent floating-point errors.
    child_size = size // 2
    
    child_points = [
        [y, x],                           # Top-Left
        [y, x + child_size],              # Top-Right
        [y + child_size, x],              # Bottom-Left
        [y + child_size, x + child_size]  # Bottom-Right
    ]

    child_nodes = [build_quadtree(image_grid, p, child_size) for p in child_points]

    # If all children are uniformly filled or empty, prune them.
    if all(child['isFilled'] for child in child_nodes):
        node['isFilled'] = True
    elif all(child['isEmpty'] for child in child_nodes):
        node['isEmpty'] = True
    else:
        # Otherwise, the node is mixed and keeps its children.
        node['children'] = child_nodes
        
    return node


def extract_rects_from_tree(node, current_layer, original_width, original_height):
    """
    Traverses a completed quadtree and extracts the largest filled rectangles.
    Returns a flat list of rectangle dictionaries ready for JSON output.
    """
    rects = []
    
    # If a node is fully filled, it's a maximal rectangle for this branch.
    if node['isFilled']:
        y, x = node['point']
        size = node['size']
        
        # Corrected coordinate mapping.
        rects.append({
            'i': current_layer,
            'l': (x / original_width) * 100,  # left % (from X)
            't': (y / original_height) * 100, # top % (from Y)
            'w': (size / original_width) * 100 # width %
        })
    # If a node has children (is mixed), recurse into them.
    elif node['children']:
        for child in node['children']:
            rects.extend(extract_rects_from_tree(child, current_layer, original_width, original_height))
            
    return rects


def np_encoder(obj):
    """Helper function to convert NumPy types to native Python types for JSON."""
    if isinstance(obj, np.generic):
        return obj.item()

def main():
    """
    Main execution function.
    """
    try:
        if len(sys.argv) < 3:
            print("Usage: python your_script_name.py <pbm_base_name> <end_layer_number>")
            sys.exit(1)
            
        pbm_base_name = sys.argv[1]
        end_layer = int(sys.argv[2])
        
        all_rects = []
        
        # Assume we'll use the width/height from the first successfully loaded PBM.
        final_width, final_height = 0, 0

        for i in range(2, end_layer):
            pbm_name = f"{pbm_base_name}-{i}.pbm"
            
            if os.path.isfile(pbm_name):
                
                
                # 1. Load the PBM into a correctly padded grid.
                padded_grid, width, height = load_pbm(pbm_name)
                
                if final_width == 0: # Store dimensions from first file
                    final_width, final_height = width, height

                # 2. Build the quadtree from the grid data.
                root_node = build_quadtree(padded_grid, [0, 0], len(padded_grid))
                
                # 3. Extract the list of filled rectangles for the current layer.
                layer_rects = extract_rects_from_tree(root_node, i, width, height)
                all_rects.extend(layer_rects)

        # Prepare the final JSON output structure.
        output_data = {
            'info': {
                'width': final_width,
                'height': final_height
            },
            'rects': all_rects
        }

        # Print the final result to standard output.
        print(json.dumps(output_data, default=np_encoder))
    except Exception as e:
        import traceback
        with open("gemini_debug.log", "w") as f:
            f.write("An error occurred:\n")
            f.write(traceback.format_exc())



if __name__ == '__main__':
    main()
