import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, ContactShadows, Environment, useGLTF, Bounds } from "@react-three/drei"
import { a, useSpring } from "@react-spring/three"
import { useMemo, useRef, useState, useLayoutEffect } from "react"
import * as THREE from "three"

function CameraLight() {
  const ref = useRef(null)
  useFrame((state) => {
    if (ref.current) ref.current.position.copy(state.camera.position)
  })
  return <pointLight ref={ref} intensity={2.2} distance={25} decay={2} color="#ffffff" />
}

function CenteredPrimitive({ object, mode = "center" }) {
  const inner = useRef()

  useLayoutEffect(() => {
    if (!inner.current) return

    const box = new THREE.Box3().setFromObject(inner.current)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())

    inner.current.position.set(-center.x, -center.y, -center.z)

    if (mode === "ground") {
      inner.current.position.y += size.y / 2
    }
  }, [object, mode])

  return (
    <group ref={inner}>
      <primitive object={object} />
    </group>
  )
}

function Part({ url, assembled, exploded, scale = 1, rotation = [0,0,0], t }) {
  const gltf = useGLTF(url)

  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene])

  useMemo(() => {
    scene.traverse((o) => {
      if (!o.isMesh) return
      o.castShadow = true
      o.receiveShadow = true
      if (o.material) {
        o.material.metalness = Math.min(0.85, o.material.metalness ?? 0.6)
        o.material.roughness = Math.max(0.22, o.material.roughness ?? 0.35)
      }
    })
  }, [scene])

  return (
    <a.group
      scale={scale}
      rotation={rotation}
      position={t.to((v) => [
        assembled[0] + (exploded[0] - assembled[0]) * v,
        assembled[1] + (exploded[1] - assembled[1]) * v,
        assembled[2] + (exploded[2] - assembled[2]) * v,
      ])}
    >
      <CenteredPrimitive object={scene} mode={url.includes("case") ? "ground" : "center"} />
    </a.group>
  )
}

export default function PcScene() {
  const [exploded, setExploded] = useState(false)

  const { t } = useSpring({
    t: exploded ? 1 : 0,
    config: { mass: 1, tension: 240, friction: 26 },
  })

  const cfg = {
  case: {
    url: "/models/case.glb",
    scale: 0.90,
    assembled: [0, 0, 0],
    exploded: [0, 0, 0],
  },

  motherboard: {
    url: "/models/motherboard.glb",
    scale: 0.117,
    assembled: [-0.39, 2.4, -0.55],
    exploded: [-2.05, 3.15, 1.15],
  },

  gpu: {
    url: "/models/gpu.glb",
    scale: 0.5,
    assembled: [-0.51, 2, -0.2],
    exploded: [1.10, 2.15, 1.7],
  },

  cpu: {
    url: "/models/cpu.glb",
    scale: 0.87,
    assembled: [-0.27, 2.97, -0.68],
    exploded: [0.35, 3.05, 1.7],
  },

  ram: {
    url: "/models/ram.glb",
    scale: 0.35,
    rotation: [Math.PI / 2, 0, 0],
    assembled: [0.33, 2.95, -0.5],
    exploded: [1.65, 4.05, 1.35],
  },

  ram2: {
    url: "/models/ram2.glb",
    scale: 0.35,
    rotation: [Math.PI / 2, 0, 0],
    assembled: [0.53, 2.95, -0.5],
    exploded: [2.05, 4.05, 1.35],
  },

  psu: {
    url: "/models/psu.glb",
    scale: 9.7,
    rotation: [0, Math.PI / 2, 0],
    assembled: [-1, 0.50, -0.05],
    exploded: [-1.55, 0.50, 1.70],
  },

  fan: {
    url: "/models/fan.glb",
    scale: 11,
    rotation: [0, Math.PI / 2, 0],
    assembled: [-1.65, 3.15, 0.26],
    exploded: [-3.10, 3.55, 1.95],
  },

  fan1: {
    url: "/models/fan1.glb",
    scale: 11,
    rotation: [0, Math.PI / 2, 0],
    assembled: [1.6, 3.15, 0.18],
    exploded: [3.10, 3.55, 1.55],
  },

  fan2: {
    url: "/models/fan2.glb",
    scale: 11,
    rotation: [0, Math.PI / 2, 0],
    assembled: [1.6, 2.1, 0.18],
    exploded: [3.10, 2.25, 1.55],
  },

  fan3: {
    url: "/models/fan3.glb",
    scale: 11,
    rotation: [0, Math.PI / 2, 0],
    assembled: [1.6, 0.9, 0.18],
    exploded: [3.10, 0.95, 1.55],
  },

  cpufan: {
    url: "/models/cpufan.glb",
    scale: 0.66,
    rotation: [0, Math.PI / 2, 0],
    assembled: [0.09, 3.4, -0.2],
    exploded: [0.35, 4.8, 1.10],
  },
}
  return (
    <div className="w-full h-[520px] rounded-3xl border border-white/10 bg-black/25 overflow-hidden relative">
      <button
        type="button"
        onClick={() => setExploded((v) => !v)}
        className="absolute z-30 right-4 top-4 btn-primary rounded-2xl px-4 py-2 text-xs uppercase tracking-[0.18em] text-yellow-200"
      >
        {exploded ? "Assemble" : "Explode"}
      </button>

      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [7, 5, 7], fov: 92, near: 0.1, far: 300 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        onCreated={(state) => {
          state.gl.setClearColor("#050507", 1)
          state.gl.toneMappingExposure = 1.35
        }}
      >
        <Environment preset="city" />
        <CameraLight />

        <ambientLight intensity={5.25} />
        <directionalLight
          position={[6, 8, 4]}
          intensity={3.0}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight position={[-4, 4, -6]} intensity={5.6} color={"#22d3ee"} />
        <pointLight position={[1, 3.6, 3]} intensity={1.4} color={"#ffd60a"} />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#050507" roughness={1} metalness={0} />
        </mesh>

        <Bounds fit clip margin={.15}>
          <group>
            <Part t={t} {...cfg.case} />
            <Part t={t} {...cfg.motherboard} />
            <Part t={t} {...cfg.gpu} />
            <Part t={t} {...cfg.cpu} />
            <Part t={t} {...cfg.ram} />
            <Part t={t} {...cfg.ram2} />
            <Part t={t} {...cfg.psu} />
            <Part t={t} {...cfg.fan} />
            <Part t={t} {...cfg.fan1} />
            <Part t={t} {...cfg.fan2} />
            <Part t={t} {...cfg.fan3} />
            <Part t={t} {...cfg.cpufan} />
          </group>
        </Bounds>

        <ContactShadows position={[0, 0.01, 0]} opacity={0.35} scale={10} blur={2.8} far={10} />

        <OrbitControls enablePan={false} minDistance={2.2} maxDistance={7} target={[0, 2, 0]} />
      </Canvas>
    </div>
  )
}

useGLTF.preload("/models/case.glb")
useGLTF.preload("/models/motherboard.glb")
useGLTF.preload("/models/gpu.glb")
useGLTF.preload("/models/cpu.glb")
useGLTF.preload("/models/r.glb")
useGLTF.preload("/models/ram2.glb")
useGLTF.preload("/models/psu.glb")
useGLTF.preload("/models/fan.glb")
useGLTF.preload("/models/fan1.glb")
useGLTF.preload("/models/fan2.glb")
useGLTF.preload("/models/fan3.glb")
useGLTF.preload("/models/cpufan.glb")