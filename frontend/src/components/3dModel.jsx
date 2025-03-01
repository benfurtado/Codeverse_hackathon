import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import '../styles/3dModel.css';

const ThreeDModel = () => {
  const mountRef = useRef(null);
  let renderer, scene, camera, controls, animationFrameId;

  useEffect(() => {
    if (!mountRef.current) return;
    // Clear previous renderer if it exists
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#343434');

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 5); // Adjusted position for better view

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(800, 500);
    renderer.shadowMap.enabled = true; // Enable shadows
    mountRef.current.appendChild(renderer.domElement);

    // **Lighting setup**
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Increased brightness
    scene.add(ambientLight);

    const lights = [
      { pos: [5, 5, 5] },   // Front-Top-Right
      { pos: [-5, -5, -5] }, // Back-Bottom-Left
      { pos: [-5, 5, 5] },  // Front-Top-Left
      { pos: [5, -5, 5] },  // Front-Bottom-Right
      { pos: [0, 10, 0] },  // Top
      { pos: [0, -10, 0] }  // Bottom
    ];

    lights.forEach(({ pos }) => {
      const light = new THREE.DirectionalLight(0xffffff, 1.2);
      light.position.set(...pos);
      light.castShadow = true;
      scene.add(light);
    });

    // Load the GLB model
    const loader = new GLTFLoader();
    loader.load(
      '/images/neem_leaf_hyperrealistic.glb',
      (gltf) => {
        // Center the model
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());

        // Calculate the offset needed to move the center to (50, 50, 50)
        const offset = new THREE.Vector3(5, 5, 5).sub(center);

        // Apply the offset to the model's position
        model.position.add(offset);

        scene.add(model);

        // Set the center of rotation for OrbitControls
        controls.target.copy(new THREE.Vector3(5, 5, 5));
        controls.update();
      },
      undefined,
      (error) => {
        console.error('Error loading GLB file:', error);
      }
    );

    // Set up controls
    controls = new OrbitControls(camera, renderer.domElement);

    // Animation loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on component unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      scene.clear();
      if (mountRef.current && mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
    };
  }, []);

  return (
    <div className="threeDContainer">
      <header className="threeDHeader">
        <h1>Neem Leaf</h1>
      </header>
      <div>
        <div ref={mountRef} className="threeDScene" />
      </div>
    </div>
  );
};

export default ThreeDModel;