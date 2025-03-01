import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import '../styles/3dModel.css';

const ThreeDModel = () => {
  const mountRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  let renderer, scene, camera, controls, animationFrameId, model;

  useEffect(() => {
    if (!mountRef.current) return;

    // **Cleanup previous instances**
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    // **Scene Setup**
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#343434');

    // **Camera Setup**
    camera = new THREE.PerspectiveCamera(50, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    camera.position.set(0, 10, 0); // Default position

    // **Renderer Setup**
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight); // Use parent container size
    mountRef.current.appendChild(renderer.domElement);

    // **Lighting Setup**
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0); // Balanced brightness
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // **Orbit Controls**
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 0.5;

    // **Raycaster and Mouse Setup**
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // **Load the GLB Model**
    const loader = new GLTFLoader();
    loader.load('/images/leaf_model.glb', (gltf) => {
      model = gltf.scene;

      // 🔹 **Scale the Model for Consistency**
      let bbox = new THREE.Box3().setFromObject(model);
      let modelSize = bbox.getSize(new THREE.Vector3()).length();
      const targetSize = 5.0; // Desired size for all models
      let scale = targetSize / modelSize;
      model.scale.set(scale, scale, scale);

      // 🔹 **Center the Model Correctly**
      bbox.setFromObject(model);
      const center = bbox.getCenter(new THREE.Vector3());
      model.position.sub(center); // Move model to center of the scene

      // 🔹 **Ensure Model is at Ground Level**
      bbox.setFromObject(model);
      model.position.y -= bbox.min.y;

      scene.add(model);

      // 🔹 **Set Camera Target to Model**
      controls.target.copy(center);
      controls.update();
    }, undefined, (error) => {
      console.error('Error loading GLB file:', error);
    });

    // **Animation Loop**
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // **Click Event Handler**
    const onClick = (event) => {
      if (!model) return; // Ensure the model is loaded before checking clicks

      // Calculate mouse position in normalized device coordinates (-1 to +1)
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Update the raycaster with the mouse position and camera
      raycaster.setFromCamera(mouse, camera);

      // Check for intersections with the model
      const intersects = raycaster.intersectObject(model, true);

      if (intersects.length > 0) {
        setShowPopup(true); // Show the popup
      }
    };

    // Add click event listener
    renderer.domElement.addEventListener('click', onClick);

    // **Cleanup on Component Unmount**
    return () => {
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      scene.clear();
      if (mountRef.current && mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
      renderer.domElement.removeEventListener('click', onClick); // Remove event listener
    };
  }, []);

  return (
    <div className="threeDContainer">
      <header className="threeDHeader">
        <h1>Neem Leaf</h1>
      </header>
      <div className="contentWrapper">
        <div ref={mountRef} className="threeDScene" />
        {showPopup && (
          <div className="rightSidePopup">
            <div className="popupContent">
              <h3>Microscopic View</h3>
              <img
                src="/images/microscopic/microscopic_potato_leaf.png"
                alt="Microscopic View"
                onError={(e) => {
                  console.error('Error loading image:', e.target.src); // Debugging
                  e.target.style.display = 'none'; // Hide the image if it fails to load
                }}
              />
              <p>
                The underside of a potato leaf (Solanum tuberosum) is covered with fine hairs (bluish) and glandular cells (yellow), in between the stomata are visible.
              </p>
              <button onClick={() => setShowPopup(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreeDModel;