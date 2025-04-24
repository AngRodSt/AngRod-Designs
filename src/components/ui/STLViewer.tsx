'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface STLViewerProps {
  file: File | null;
}
// Component for displaying a 3D preview of an STL file that the client uploads
export default function STLViewer({ file }: STLViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Open the viewer when a file is selected
  useEffect(() => {
    setIsOpen(!!file);
  }, [file]);

  // Setup Three.js scene when the component mounts or file changes
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1f2937);

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    camera.position.z = 5;

    let mesh: THREE.Mesh | null = null;

    // Add directional light to the scene
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    // Load and render STL file if provided
    if (file) {
      const loader = new STLLoader();
      const reader = new FileReader();
      reader.onload = (e) => {
        if (!e.target?.result) return;
        const geometry = loader.parse(e.target.result as ArrayBuffer);
        geometry.center();
        const material = new THREE.MeshNormalMaterial();
        mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -0.5 * Math.PI;
        scene.add(mesh);
      };
      reader.readAsArrayBuffer(file);
    }

    // Animation loop for continuous rendering
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize canvas responsively with container
    const container = containerRef.current!;
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
    resizeObserver.observe(container);
    // Cleanup resources on unmount or re-render
    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();
      scene.clear();
      if (mesh) {
        scene.remove(mesh);
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => mat.dispose());
        } else {
          mesh.material.dispose();
        }
        mesh = null;
      }
    };
  }, [file]);

  return (
    <div className="mb-4">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-4 py-2 bg-red-950 w-full text-white rounded"
      >
        {isOpen ? 'Hide 3D Preview' : 'Show 3D Preview'}
      </button>

      <div
        ref={containerRef}
        className={
          `transform origin-top transition-transform duration-300 ease-in-out overflow-hidden rounded bg-gray-800 mt-2 ` +
          (isOpen ? 'scale-y-100' : 'scale-y-0')
        }
        style={{
          width: '100%',
          height: isOpen ? '400px' : '0',
        }}
      >
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
}
