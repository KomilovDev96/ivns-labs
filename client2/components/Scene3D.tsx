'use client';
import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// ─────────────────────────────────────────────────────────────────
// DARK MODE
// ─────────────────────────────────────────────────────────────────

const BG = { r: 5 / 255, g: 8 / 255, b: 22 / 255 };

function Meteor({ initX, initY, z, speed, tailLength }: {
  initX: number; initY: number; z: number; speed: number; tailLength: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const lineObj = useMemo(() => {
    const N = 28;
    const pos = new Float32Array((N + 1) * 3);
    const col = new Float32Array((N + 1) * 3);
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      pos[i * 3]     = t * tailLength;
      pos[i * 3 + 1] = t * tailLength * 0.28;
      const b = Math.pow(1 - t, 1.6);
      col[i * 3]     = BG.r + b * (1.0 - BG.r);
      col[i * 3 + 1] = BG.g + b * (0.93 - BG.g);
      col[i * 3 + 2] = BG.b + b * (1.0 - BG.b);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
    return new THREE.Line(geo, new THREE.LineBasicMaterial({ vertexColors: true }));
  }, [tailLength]);

  useEffect(() => () => {
    lineObj.geometry.dispose();
    (lineObj.material as THREE.Material).dispose();
  }, [lineObj]);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.x -= speed;
    groupRef.current.position.y -= speed * 0.28;
    if (groupRef.current.position.x < -24) {
      groupRef.current.position.x = 24 + Math.random() * 6;
      groupRef.current.position.y = (Math.random() - 0.2) * 14;
    }
  });

  return (
    <group ref={groupRef} position={[initX, initY, z]}>
      <primitive object={lineObj} />
      <mesh>
        <sphereGeometry args={[0.022, 6, 6]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.065, 8, 8]} />
        <meshBasicMaterial color="#7dd3fc" transparent opacity={0.45}
          blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

function MeteorShower() {
  const list = useMemo(() =>
    Array.from({ length: 14 }, () => ({
      initX: (Math.random() - 0.3) * 44 + 8,
      initY: (Math.random() - 0.3) * 14,
      z: -1.5 - Math.random() * 3,
      speed: 0.028 + Math.random() * 0.055,
      tailLength: 1.2 + Math.random() * 3.8,
    })), []);
  return <>{list.map((m, i) => <Meteor key={i} {...m} />)}</>;
}

function DarkOrb({ pos, color, size }: { pos: [number,number,number]; color: string; size: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock: c }) => {
    if (!ref.current) return;
    ref.current.position.y = pos[1] + Math.sin(c.elapsedTime * 0.45) * 0.5;
    ref.current.position.x = pos[0] + Math.cos(c.elapsedTime * 0.3) * 0.3;
  });
  return (
    <mesh ref={ref} position={pos}>
      <sphereGeometry args={[size, 12, 12]} />
      <meshBasicMaterial color={color} transparent opacity={0.1} />
    </mesh>
  );
}

// ─────────────────────────────────────────────────────────────────
// LIGHT MODE — realistic sun
// ─────────────────────────────────────────────────────────────────

function SunRays() {
  const obj = useMemo(() => {
    const count = 18;
    const pos: number[] = [];
    const col: number[] = [];
    for (let i = 0; i < count; i++) {
      const angle  = (i / count) * Math.PI * 2;
      const inner  = 0.52;
      const outer  = inner + (i % 3 === 0 ? 0.90 : i % 3 === 1 ? 0.55 : 0.35);
      pos.push(
        Math.cos(angle) * inner, Math.sin(angle) * inner, 0,
        Math.cos(angle) * outer, Math.sin(angle) * outer, 0,
      );
      // bright golden at root → near-white at tip
      col.push(0.99, 0.80, 0.10,  0.99, 0.96, 0.74);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pos), 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(new Float32Array(col), 3));
    return new THREE.LineSegments(
      geo,
      new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.75 }),
    );
  }, []);

  useEffect(() => () => {
    obj.geometry.dispose();
    (obj.material as THREE.Material).dispose();
  }, [obj]);

  useFrame(({ clock: c }) => { obj.rotation.z = c.elapsedTime * 0.014; });
  return <primitive object={obj} />;
}

function Sun() {
  const groupRef   = useRef<THREE.Group>(null);
  const innerRef   = useRef<THREE.MeshBasicMaterial>(null);
  const coronaRef  = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock: c }) => {
    if (groupRef.current)
      groupRef.current.position.y = 3.2 + Math.sin(c.elapsedTime * 0.22) * 0.06;
    if (innerRef.current)
      innerRef.current.opacity = 0.50 + Math.sin(c.elapsedTime * 0.75) * 0.06;
    if (coronaRef.current)
      coronaRef.current.opacity = 0.22 + Math.sin(c.elapsedTime * 0.5 + 1) * 0.04;
  });

  return (
    <group ref={groupRef} position={[6.2, 3.2, -1.2]}>
      <SunRays />

      {/* Pure white disc core */}
      <mesh>
        <sphereGeometry args={[0.28, 20, 20]} />
        <meshBasicMaterial color="#fffef0" />
      </mesh>

      {/* Bright warm yellow ring tight around core */}
      <mesh>
        <sphereGeometry args={[0.42, 16, 16]} />
        <meshBasicMaterial color="#ffd54f" transparent opacity={0.70}
          blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* Amber inner corona — pulsing */}
      <mesh>
        <sphereGeometry args={[0.75, 14, 14]} />
        <meshBasicMaterial ref={innerRef} color="#f59e0b" transparent opacity={0.50}
          blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* Golden mid corona — pulsing */}
      <mesh>
        <sphereGeometry args={[1.4, 12, 12]} />
        <meshBasicMaterial ref={coronaRef} color="#fbbf24" transparent opacity={0.22}
          blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* Outer warm haze */}
      <mesh>
        <sphereGeometry args={[2.8, 10, 10]} />
        <meshBasicMaterial color="#fde68a" transparent opacity={0.09}
          blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* Very wide atmospheric glow */}
      <mesh>
        <sphereGeometry args={[5.5, 8, 8]} />
        <meshBasicMaterial color="#fef9c3" transparent opacity={0.04}
          blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────
// LIGHT MODE — fluffy clouds
// ─────────────────────────────────────────────────────────────────

// Cumulus cloud shape: solid bright white, fluffy layered puffs
// [x, y, z, radius, opacity]
const PUFFS: [number, number, number, number, number][] = [
  [ 0.00,  0.00,  0.00, 0.78, 0.97 ],  // center core
  [ 0.82,  0.18,  0.04, 0.62, 0.96 ],  // right upper
  [-0.78,  0.15, -0.04, 0.60, 0.96 ],  // left upper
  [ 0.32,  0.58,  0.02, 0.46, 0.95 ],  // top right peak
  [-0.28,  0.55, -0.02, 0.44, 0.95 ],  // top left peak
  [ 0.00,  0.72,  0.00, 0.40, 0.94 ],  // top center peak
  [ 1.45,  0.02,  0.12, 0.48, 0.93 ],  // far right
  [-1.40,  0.00,  0.06, 0.50, 0.93 ],  // far left
  [ 1.15,  0.24,  0.08, 0.38, 0.94 ],  // right mid upper
  [-1.10,  0.20, -0.04, 0.36, 0.94 ],  // left mid upper
  [ 0.70, -0.16, -0.04, 0.40, 0.92 ],  // bottom right
  [-0.68, -0.14,  0.08, 0.38, 0.92 ],  // bottom left
  [ 0.00, -0.22,  0.10, 0.46, 0.92 ],  // bottom center
];

// Shared unit sphere geometry (re-used by all puffs / all clouds)
function useSphereGeo() {
  const geo = useMemo(() => new THREE.SphereGeometry(1, 8, 6), []);
  useEffect(() => () => geo.dispose(), [geo]);
  return geo;
}

function Cloud({ initX, y, z, scale, speed }: {
  initX: number; y: number; z: number; scale: number; speed: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const sphereGeo = useSphereGeo();

  const floatOffset = useMemo(() => initX * 1.37, [initX]);

  useFrame(({ clock: c }) => {
    if (!ref.current) return;
    ref.current.position.x -= speed;
    ref.current.position.y = y + Math.sin(c.elapsedTime * 0.18 + floatOffset) * 0.06;
    if (ref.current.position.x < -18) ref.current.position.x = 18;
  });

  return (
    <group ref={ref} position={[initX, y, z]} scale={scale}>
      {PUFFS.map(([px, py, pz, r, opacity], i) => (
        <mesh key={i} geometry={sphereGeo} position={[px, py, pz]} scale={r}>
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={opacity}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function Clouds() {
  const clouds = useMemo(() => [
    { initX: -6.0, y:  3.2, z: -2.5, scale: 1.05, speed: 0.0035 },
    { initX:  4.5, y:  3.8, z: -3.5, scale: 0.80, speed: 0.0020 },
    { initX:  1.0, y:  2.4, z: -1.2, scale: 0.70, speed: 0.0055 },
    { initX: -2.0, y:  4.2, z: -4.0, scale: 0.65, speed: 0.0015 },
    { initX:  9.0, y:  2.8, z: -2.0, scale: 0.95, speed: 0.0030 },
    { initX: -10.0,y:  2.2, z: -1.5, scale: 0.85, speed: 0.0045 },
    { initX:  7.0, y:  3.5, z: -3.0, scale: 0.72, speed: 0.0025 },
    { initX: -8.0, y:  2.0, z: -2.2, scale: 0.60, speed: 0.0040 },
  ], []);

  return <>{clouds.map((c, i) => <Cloud key={i} {...c} />)}</>;
}

// ─────────────────────────────────────────────────────────────────
// SHARED
// ─────────────────────────────────────────────────────────────────

function CamDrift() {
  useFrame(({ camera, clock: c }) => {
    camera.position.x = Math.sin(c.elapsedTime * 0.055) * 0.5;
    camera.position.y = Math.cos(c.elapsedTime * 0.08) * 0.3;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene3D({ theme }: { theme: 'dark' | 'light' }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 1.5]}
    >
      {theme === 'dark' ? (
        <>
          <Stars radius={90} depth={50} count={3000} factor={3} saturation={0} fade speed={0.35} />
          <MeteorShower />
          <DarkOrb pos={[-5,  2, -3]} color="#3b82f6" size={1.8} />
          <DarkOrb pos={[ 5, -1, -4]} color="#8b5cf6" size={2.4} />
          <DarkOrb pos={[ 0, -3, -5]} color="#0ea5e9" size={1.3} />
        </>
      ) : (
        <Clouds />
      )}
      <CamDrift />
    </Canvas>
  );
}
