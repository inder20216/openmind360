import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const CITIES = [
  { id: 'nyc', name: 'New York', lat: 40.71, lng: -74.0 },
  { id: 'sao', name: 'São Paulo', lat: -23.55, lng: -46.6 },
  { id: 'lon', name: 'London', lat: 51.5, lng: -0.12 },
  { id: 'fra', name: 'Frankfurt', lat: 50.1, lng: 8.68 },
  { id: 'dub', name: 'Dubai', lat: 25.2, lng: 55.3 },
  { id: 'blr', name: 'India', lat: 12.97, lng: 77.6 },
  { id: 'sgp', name: 'Singapore', lat: 1.35, lng: 103.8 },
  { id: 'tyo', name: 'Tokyo', lat: 35.7, lng: 139.7 },
  { id: 'syd', name: 'Sydney', lat: -33.87, lng: 151.2 },
]

const CHANNELS = [
  { id: 'ecom', label: 'eCommerce Site', color: '#16a34a', r: 1.32, speed: 0.18, phase: 0, tiltX: 0.55, tiltZ: 0.25 },
  { id: 'brick', label: 'Brick & Mortar', color: '#ec4899', r: 1.22, speed: 0.14, phase: 2.1, tiltX: -0.45, tiltZ: 0.5 },
  { id: 'search', label: 'Search', color: '#f59e0b', r: 1.1, speed: 0.22, phase: 4.2, tiltX: 0.15, tiltZ: -0.35 },
  { id: 'wom', label: 'Word of Mouth', color: '#8b5cf6', r: 1.45, speed: 0.12, phase: 1.0, tiltX: -0.6, tiltZ: 0.15 },
  { id: 'social', label: 'Social Network', color: '#3b82f6', r: 1.38, speed: 0.16, phase: 3.0, tiltX: 0.42, tiltZ: -0.5 },
]

function latLngToVec3(lat, lng, radius = 1) {
  const phi = ((90 - lat) * Math.PI) / 180
  const theta = ((lng + 180) * Math.PI) / 180
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

const tmpWorld = new THREE.Vector3()

// Earth (globe body, rings) rendered smaller so the orbiting planets
// have clear space around it.
const GLOBE_SCALE = 0.78

function CityNode({ city, index }) {
  const position = useMemo(() => latLngToVec3(city.lat, city.lng, 0.98), [city])
  const ref = useRef(null)

  useFrame(({ clock }) => {
    const pulse = 1 + Math.sin(clock.getElapsedTime() * 2.2 + index * 1.7) * 0.35
    if (ref.current) ref.current.scale.setScalar(pulse)
  })

  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.03, 10, 10]} />
        <meshBasicMaterial color="#7dd3fc" />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.06, 10, 10]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.28} />
      </mesh>
    </group>
  )
}

function OrbitPlanet({ channel, index }) {
  const orbitRef = useRef(null)
  const labelRef = useRef(null)
  const angleRef = useRef(channel.phase)

  useFrame((_, delta) => {
    const o = orbitRef.current
    if (!o) return
    angleRef.current = (angleRef.current + delta * channel.speed) % (Math.PI * 2)
    o.position.set(
      Math.cos(angleRef.current) * channel.r,
      0,
      Math.sin(angleRef.current) * channel.r,
    )
    if (labelRef.current) {
      o.getWorldPosition(tmpWorld)
      const front = tmpWorld.z > 0.05
      labelRef.current.style.opacity = front ? '1' : '0'
    }
  })

  const size = 0.15 + (index % 3) * 0.02

  return (
    <group rotation={[channel.tiltX, 0, channel.tiltZ]}>
      <group ref={orbitRef}>
        {/* Planet sphere */}
        <mesh>
          <sphereGeometry args={[size, 24, 24]} />
          <meshStandardMaterial
            color={channel.color}
            emissive={channel.color}
            emissiveIntensity={0.5}
            roughness={0.35}
            metalness={0.2}
          />
        </mesh>
        {/* Glow halo */}
        <mesh>
          <sphereGeometry args={[size * 1.5, 16, 16]} />
          <meshBasicMaterial color={channel.color} transparent opacity={0.22} />
        </mesh>
        {/* Option name written on the planet surface (hidden when behind the earth) */}
        <Html position={[0, 0, 0]} center zIndexRange={[30, 20]}>
          <div
            ref={labelRef}
            className="text-center font-[800] uppercase leading-tight text-white transition-opacity duration-300"
            style={{
              width: 60,
              fontSize: 8.5,
              lineHeight: 1.15,
              letterSpacing: '0.02em',
              color: '#ffffff',
              textShadow: '0 1px 3px rgba(2,6,23,0.95), 0 0 6px rgba(255,255,255,0.4)',
              pointerEvents: 'none',
            }}
          >
            {channel.label}
          </div>
        </Html>
      </group>
    </group>
  )
}

function OrbitingPlanets() {
  return (
    <>
      {CHANNELS.map((c, i) => (
        <OrbitPlanet key={c.id} channel={c} index={i} />
      ))}
    </>
  )
}

function Globe() {
  const globeRef = useRef(null)

  useFrame((_, delta) => {
    if (globeRef.current) globeRef.current.rotation.y += delta * 0.3
  })

  return (
    <group scale={GLOBE_SCALE}>
      <group ref={globeRef} rotation={[0.45, 0, 0.16]}>
        {/* Solid planet body */}
        <mesh>
          <sphereGeometry args={[1, 48, 48]} />
          <meshBasicMaterial color="#1e3a5f" />
        </mesh>

        {/* Subtle latitude / longitude grid */}
        <mesh>
          <sphereGeometry args={[1.003, 28, 28]} />
          <meshBasicMaterial color="#6fa7ff" wireframe transparent opacity={0.18} depthWrite={false} />
        </mesh>

        {/* City hubs */}
        {CITIES.map((c, i) => (
          <CityNode key={c.id} city={c} index={i} />
        ))}
      </group>

      {/* Atmosphere glow shells */}
      <mesh>
        <sphereGeometry args={[1.06, 32, 32]} />
        <meshBasicMaterial
          color="#2f6fd8"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

    </group>
  )
}

function Scene() {
  return (
    <>
      <Globe />
      <OrbitingPlanets />
    </>
  )
}

function GlobeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 3.35], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ touchAction: 'pan-y' }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 3, 3]} intensity={1.4} />
      <pointLight position={[-2, -1, -2]} intensity={0.5} color="#2f6fd8" />
      <Scene />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.35}
        minDistance={2.4}
        maxDistance={4.2}
      />
    </Canvas>
  )
}

export default function GlobalNetworkGlobe() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    setReady(true)
  }, [])

  return (
    <>
      <div className="relative select-none">
        <div className="relative mx-auto w-full max-w-[680px] aspect-[1.16/1] md:aspect-[1.2/1] rounded-[28px] overflow-visible">
          {/* Fallback shown during SSR / before mount */}
          {!ready && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[62%] aspect-square rounded-full bg-[radial-gradient(circle_at_32%_28%,#1b4a94_0%,#0c1e3f_45%,#081019_100%)] shadow-[0_0_80px_rgba(59,130,246,0.35)]" />
            </div>
          )}

          {ready && (
            <div className="absolute inset-0">
              <GlobeScene />
            </div>
          )}

          {/* Omnichannel Support Hub title, dead-center inside the globe's projected area */}
          <div className="pointer-events-none absolute inset-0 z-[40] flex items-center justify-center">
            <div
              className="text-center font-black uppercase tracking-[0.14em] whitespace-nowrap"
              style={{
                fontSize: 9.5,
                lineHeight: 1.2,
                color: '#dbeafe',
                letterSpacing: '0.12em',
                textShadow: '0 0 14px rgba(103,232,249,0.75), 0 2px 5px rgba(2,6,23,0.95)',
              }}
            >
              Omnichannel Support Hub
            </div>
          </div>

        </div>

        {/* Floor shadow */}
        <div className="absolute -bottom-7 left-8 right-8 h-12 bg-[#0f172a]/[0.08] blur-[22px] rounded-[24px] -z-10" />
        <div className="mt-3 md:hidden text-center text-[10px] font-[600] text-[#94a3b8]">Drag to spin · globe revolves live</div>
      </div>
    </>
  )
}