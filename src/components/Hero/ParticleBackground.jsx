import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Cloud({ count, color, mouse, speed = 0.03, spread = 14 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 1] = (Math.random() - 0.5) * (spread * 0.7);
      arr[i * 3 + 2] = (Math.random() - 0.5) * spread;
    }
    return arr;
  }, [count, spread]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * speed + mouse.current.x * 0.25;
    ref.current.rotation.x = mouse.current.y * 0.12;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={color}
        transparent
        opacity={0.68}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticleBackground({ mouse }) {
  return (
    <div className="hero-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.25]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power", failIfMajorPerformanceCaveat: false }}
        frameloop="always"
        onCreated={({ gl }) => {
          const canvas = gl.domElement;
          const hide = (e) => {
            e.preventDefault();
            canvas.style.display = "none";
          };
          canvas.addEventListener("webglcontextlost", hide, { once: true });
        }}
      >
        <Cloud count={320} color="#3dd6c6" mouse={mouse} />
        <Cloud count={120} color="#e8c27a" mouse={mouse} speed={0.018} spread={16} />
      </Canvas>
    </div>
  );
}
