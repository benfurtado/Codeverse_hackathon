import bpy
import cv2
import numpy as np
import os
import sys
from mathutils import Vector

# Get absolute script directory
script_dir = os.path.dirname(os.path.abspath(__file__))

# Image path (update this with your image)
image_filename = "images\\four.png"
image_path = os.path.join(script_dir, image_filename)

# Output paths
output_mask = os.path.join(script_dir, "leaf_mask.png")
output_model = os.path.join(script_dir, "leaf_model.glb")

# Ensure image exists
if not os.path.exists(image_path):
    print(f"❌ Error: Image '{image_path}' not found.")
    sys.exit(1)

### 🟢 Step 1: Extract Leaf Contour & Normalize ###
def extract_leaf_contour(image_path, output_mask):
    img = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)
    img_height, img_width = img.shape[:2]
    
    # Convert to grayscale and apply adaptive thresholding
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    thresh = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                   cv2.THRESH_BINARY_INV, 15, 10)
    # Morphological closing to remove noise
    kernel = np.ones((5, 5), np.uint8)
    thresh = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)
    # Find contours
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if not contours:
        print("❌ Error: No contours found in the image!")
        sys.exit(1)
    
    # Select the largest contour (assuming it's the leaf)
    leaf_contour = max(contours, key=cv2.contourArea)
    
    # Approximate contour to reduce points
    epsilon = 0.002 * cv2.arcLength(leaf_contour, True)
    simplified_contour = cv2.approxPolyDP(leaf_contour, epsilon, True)
    
    # Get bounding box for normalization
    x, y, w, h = cv2.boundingRect(simplified_contour)
    
    # Create a blank mask and draw the contour
    mask = np.zeros((img_height, img_width, 3), dtype=np.uint8)
    cv2.drawContours(mask, [simplified_contour], -1, (255, 255, 255), thickness=cv2.FILLED)
    
    # Save mask
    cv2.imwrite(output_mask, mask)
    
    return simplified_contour, (x, y, w, h), img_width, img_height

contour, bbox, img_width, img_height = extract_leaf_contour(image_path, output_mask)
x_min, y_min, width, height = bbox

### 🔵 Step 2: Convert Contour to 3D Mesh (Match Image Size) ###
# Clear all objects in Blender
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete()

# Create a new mesh
mesh = bpy.data.meshes.new("LeafMesh")
obj = bpy.data.objects.new("LeafObject", mesh)
bpy.context.collection.objects.link(obj)

# Convert contour points to Blender vertices (preserve exact image size)
vertices = []
uv_coords = []
for point in contour:
    x, y = point[0]
    # Convert to real pixel coordinates (centered in Blender)
    bx = x - img_width / 2   # Center at (0,0)
    by = -(y - img_height / 2)  # Flip Y-axis for Blender
    vertices.append((bx, by, 0))
    # UV mapping (directly from image coordinates)
    u = x / img_width
    v = y / img_height
    uv_coords.append((u, 1 - v))  # Flip V for Blender UV system

# Create face from vertices
faces = [list(range(len(vertices)))]

# Assign mesh data
mesh.from_pydata(vertices, [], faces)
mesh.update()

### 🟠 Step 3: Auto UV Mapping (Perfect Fit) ###
# Ensure UV layer exists
if not mesh.uv_layers:
    mesh.uv_layers.new(name="UVMap")

# Assign UV coordinates properly
uv_layer = mesh.uv_layers.active.data
for loop, uv in zip(mesh.loops, uv_coords):
    uv_layer[loop.index].uv = uv

### 🔴 Step 4: Apply Texture with Auto-Fit ###
# Create material
material = bpy.data.materials.new(name="LeafMaterial")
material.use_nodes = True
obj.data.materials.append(material)

# Get material nodes
nodes = material.node_tree.nodes
links = material.node_tree.links
bsdf = nodes.get("Principled BSDF")

# Add Image Texture Node
image_texture = nodes.new(type="ShaderNodeTexImage")

# Load texture into Blender
try:
    image_texture.image = bpy.data.images.load(image_path)
except:
    print(f"❌ Error: Failed to load image '{image_path}'.")
    sys.exit(1)

# Link Image Texture to Base Color
links.new(image_texture.outputs["Color"], bsdf.inputs["Base Color"])

### 🟣 Step 5: Adjust Camera to Fit the Entire Model ###
# Get the bounding box of the object
bbox = obj.bound_box
bbox_coords = [obj.matrix_world @ Vector(corner) for corner in bbox]

# Compute center
center = sum(bbox_coords, Vector()) / 8

# Compute bounding box size
size_x = max(v[0] for v in bbox_coords) - min(v[0] for v in bbox_coords)
size_y = max(v[1] for v in bbox_coords) - min(v[1] for v in bbox_coords)
size_z = max(v[2] for v in bbox_coords) - min(v[2] for v in bbox_coords)

max_size = max(size_x, size_y, size_z)


# Get or create camera
camera = bpy.data.objects.get("Camera")
if not camera:
    camera = bpy.data.objects.new("Camera", bpy.data.cameras.new("Camera"))
    bpy.context.collection.objects.link(camera)

# Position the camera further away
camera.location = center + Vector((0, -max_size * 3, max_size * 2))  # Adjusted distance
camera.rotation_euler = (1.1, 0, 0)  # Adjusted rotation

# Use orthographic mode for better framing
camera.data.type = 'ORTHO'
camera.data.ortho_scale = max_size * 2.5  # Adjusted scale

# Set the camera as the active camera
bpy.context.scene.camera = camera

### 🟡 Step 6: Export as GLB ###
bpy.ops.export_scene.gltf(filepath=output_model, export_format='GLB')
print(f"✅ Model saved to: {output_model}")
