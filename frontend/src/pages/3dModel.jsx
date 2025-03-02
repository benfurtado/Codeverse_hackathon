import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import '../styles/3dModel.css';

const ThreeDModel = ({ modelPath }) => {
  const mountRef = useRef(null);
  let renderer, scene, camera, controls;

  useEffect(() => {
    if (!mountRef.current) return;

    console.log('Loading model:', modelPath); // Debugging: Check if modelPath is correct

    // **Cleanup previous instances**
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#343434');

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer();
    renderer.domElement.style.width = '800px';
    renderer.domElement.style.height = '600px';
    renderer.domElement.style.border = '2px solid #000';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.margin = 'auto';
    renderer.domElement.style.borderRadius = '50px';

    mountRef.current.appendChild(renderer.domElement);
    renderer.setSize(800, 600);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-1, -1, -1).normalize();
    scene.add(directionalLight);

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    hemisphereLight.position.set(0, 200, 0);
    scene.add(hemisphereLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight1.position.set(5, 5, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight2.position.set(-5, -5, 5);
    scene.add(directionalLight2);

    // Load the GLB model dynamically
    const loader = new GLTFLoader();
    loader.load(
      modelPath, // Use the modelPath prop
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
    controls = new OrbitControls(camera, renderer.domElement);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on component unmount
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      controls.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, [modelPath]); // Re-run effect when modelPath changes

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