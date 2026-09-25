import imgUrl from '../assets/hellllllo.png omni.png'

export default function HybridContactCenter() {
  return (
    <>
      <style>{`
        @keyframes hccGlow { 0%,100% { opacity: 0.45; } 50% { opacity: 0.85; } }
        @keyframes hccFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      `}</style>

      <div className="relative select-none">
        <div className="relative mx-auto w-full max-w-[760px] md:max-w-[860px]">
          <img
            src={imgUrl}
            alt="Hybrid Contact Center agent surrounded by floating omnichannel platforms"
            className="w-full h-auto object-contain animate-[hccFloat_5s_ease-in-out_infinite]"
            draggable="false"
          />
        </div>

        {/* neon glow behind the card */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 w-[86%] h-[86%] rounded-[50%] blur-[38px] animate-[hccGlow_4.5s_ease-in-out_infinite]"
          style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.4) 0%, rgba(139,92,246,0.28) 45%, rgba(245,158,11,0.14) 100%)' }}
        />
      </div>
    </>
  )
}
