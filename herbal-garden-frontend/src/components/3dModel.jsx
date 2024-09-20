// src/components/ThreeDModel.js
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './3dModel.css';

const ThreeDModel = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();

    // Set the background color of the scene
    scene.background = new THREE.Color('#343434'); // Set the scene background to white

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    
    // Directly set CSS styles on the canvas
    renderer.domElement.style.width = '800px'; // Set the desired width
    renderer.domElement.style.height = '600px'; // Set the desired height
    renderer.domElement.style.border = '2px solid #000'; // Optional: Add a border
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.margin = 'auto'; // Center the canvas
    renderer.domElement.style.borderRadius = '50px'; // Add some padding

    mountRef.current.appendChild(renderer.domElement);

    renderer.setSize(800, 600); // Adjust renderer size to match the CSS

    // Add more balanced lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // Soft white light, half intensity
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-1, -1, -1).normalize(); // Position behind the model
    scene.add(directionalLight);

    // Add Hemisphere light for soft sky-like illumination
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6); // Sky color, ground color, intensity
    hemisphereLight.position.set(0, 200, 0);
    scene.add(hemisphereLight);

    // Add a key directional light for sharp shadows
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight1.position.set(5, 5, 5);
    scene.add(directionalLight1);

    // Add a secondary directional light to fill shadows
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight2.position.set(-5, -5, 5);
    scene.add(directionalLight2);

    // Load the GLB model
    const loader = new GLTFLoader();
    loader.load(
      '/neem_leaf_hyperrealistic.glb',
      (gltf) => {
        console.log('GLB file loaded successfully:', gltf);
        scene.add(gltf.scene);
      },
      undefined,
      (error) => {
        console.error('Error loading GLB file:', error);
      }
    );

    // Set up controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on component unmount
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="threeDContainer">
      <header className="threeDHeader">
        <h1>3D Model Viewer</h1>
      </header>
      <div ref={mountRef} className="threeDScene" />
    </div>
  );
};

export default ThreeDModel;
