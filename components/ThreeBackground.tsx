'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Particle system
    const particleCount = 1200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const colorA = new THREE.Color('#7c3aed'); // violet
    const colorB = new THREE.Color('#06b6d4'); // cyan

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 14;
      positions[i3 + 1] = (Math.random() - 0.5) * 14;
      positions[i3 + 2] = (Math.random() - 0.5) * 8;

      const t = Math.random();
      const color = colorA.clone().lerp(colorB, t);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 3 + 1;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Wireframe sphere
    const sphereGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: '#7c3aed',
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphere.position.set(2.5, -0.5, -1);
    scene.add(sphere);

    // Second smaller sphere
    const sphere2Geo = new THREE.OctahedronGeometry(0.7, 1);
    const sphere2Mat = new THREE.MeshBasicMaterial({
      color: '#06b6d4',
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const sphere2 = new THREE.Mesh(sphere2Geo, sphere2Mat);
    sphere2.position.set(-3, 1.5, -2);
    scene.add(sphere2);

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    let frame = 0;
    const animate = () => {
      const animId = requestAnimationFrame(animate);
      frame += 0.005;

      particles.rotation.y = frame * 0.03 + mouseX * 0.05;
      particles.rotation.x = mouseY * 0.03;

      sphere.rotation.x += 0.003;
      sphere.rotation.y += 0.005;

      sphere2.rotation.x -= 0.004;
      sphere2.rotation.z += 0.003;

      renderer.render(scene, camera);
      return animId;
    };
    const animId = animate() as unknown as number;

    return () => {
      cancelAnimationFrame(animId as unknown as number);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
