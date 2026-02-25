import { motion } from "framer-motion"
import { useState } from "react"

const ease = [0.16, 1, 0.3, 1]

export default function ReactorTile() {
  const [hot, setHot] = useState(false)

  const ringSwing = {
    rotate: hot ? [-10, 10, -8, 8, -10] : [-8, 8, -6, 6, -8],
    transition: {
      duration: hot ? 2.2 : 3.2,
      repeat: Infinity,
      ease,
    },
  }

  const ringSwing2 = {
    rotate: hot ? [12, -12, 10, -10, 12] : [10, -10, 8, -8, 10],
    transition: {
      duration: hot ? 2.8 : 4.0,
      repeat: Infinity,
      ease,
    },
  }

  const coreBreathe = {
    scale: hot ? [0.96, 1.08, 0.98, 1.04, 0.96] : [0.96, 1.05, 0.98, 1.03, 0.96],
    opacity: hot ? [0.75, 0.95, 0.82, 0.92, 0.75] : [0.7, 0.9, 0.78, 0.86, 0.7],
    transition: {
      duration: hot ? 1.35 : 1.75,
      repeat: Infinity,
      ease,
    },
  }

  const pulseWave = {
    scale: [0.9, 1.55],
    opacity: [0, 0.35, 0],
    transition: {
      duration: hot ? 1.0 : 1.2,
      repeat: Infinity,
      repeatDelay: hot ? 0.6 : 1.1,
      ease: "easeOut",
    },
  }

  const orbit = {
    rotate: [0, 360],
    transition: {
      duration: hot ? 3.8 : 5.5,
      repeat: Infinity,
      ease: "linear",
    },
  }

  return (
    <motion.div
      className="rounded-2xl border border-white/10 bg-black/25 backdrop-blur-md p-4 aspect-square relative overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease }}
      whileHover={{ y: -3 }}
      onMouseEnter={() => setHot(true)}
      onMouseLeave={() => setHot(false)}
    >
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div
        className="absolute -top-10 -left-10 w-44 h-44 rounded-full blur-2xl opacity-40 mix-blend-screen"
        style={{ background: "rgba(255,214,10,0.12)" }}
      />
      <div
        className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full blur-2xl opacity-30 mix-blend-screen"
        style={{ background: "rgba(34,211,238,0.10)" }}
      />

      <div className="absolute top-3 left-3 right-3 flex justify-between opacity-70">
        <span className="w-6 h-px bg-white/15" />
        <span className="w-10 h-px bg-yellow-300/25" />
        <span className="w-6 h-px bg-white/15" />
      </div>

      <div className="absolute inset-0">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-[2px] h-24 bg-gradient-to-b from-transparent via-yellow-300/25 to-transparent" />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-[2px] h-16 bg-gradient-to-b from-transparent via-white/12 to-transparent" />

        <div className="absolute top-4 right-4 w-10 h-10 rounded-xl border border-yellow-300/20 bg-black/25 overflow-hidden">
          <div
            className="absolute inset-0 opacity-80"
            style={{
              background:
                "repeating-linear-gradient(135deg, rgba(255,214,10,.9) 0 8px, rgba(0,0,0,.85) 8px 16px)",
            }}
          />
          <div className="absolute inset-0 border border-white/10 rounded-xl" />
        </div>

        <div className="absolute bottom-5 left-5 flex gap-2 opacity-80">
          <span className="w-2 h-2 rounded-full bg-yellow-300/65" />
          <span className="w-2 h-2 rounded-full bg-white/15" />
          <span className="w-2 h-2 rounded-full bg-cyan-400/25" />
        </div>


        <div className="absolute inset-0 opacity-60">
          <div className="absolute left-8 top-10 w-10 h-px bg-white/10" />
          <div className="absolute left-8 top-10 w-px h-10 bg-white/10" />
          <div className="absolute right-10 bottom-10 w-12 h-px bg-yellow-300/18" />
          <div className="absolute right-10 bottom-10 w-px h-10 bg-yellow-300/14" />
        </div>

        <div className="absolute inset-0 grid place-items-center">
          <div className="relative w-[92px] h-[92px]">
            <motion.div
              className="absolute inset-0 rounded-full border border-yellow-300/28"
              animate={ringSwing}
            />

            <motion.div
              className="absolute inset-[11px] rounded-full border border-white/10"
              animate={ringSwing2}
            />

            <motion.div className="absolute inset-[3px] rounded-full" animate={orbit}>
              <div
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                style={{
                  background: "rgba(34,211,238,0.35)",
                  boxShadow: "0 0 12px rgba(34,211,238,0.20)",
                }}
              />
            </motion.div>

            <motion.div
              className="absolute inset-[25px] rounded-full"
              animate={coreBreathe}
              style={{
                background: hot ? "rgba(255,214,10,0.28)" : "rgba(255,214,10,0.20)",
                boxShadow: hot
                  ? "0 0 26px rgba(255,214,10,0.22), 0 0 60px rgba(34,211,238,0.12)"
                  : "0 0 22px rgba(255,214,10,0.16), 0 0 44px rgba(34,211,238,0.08)",
              }}
            />

            <motion.div
              className="absolute inset-[16px] rounded-full border border-yellow-300/22"
              animate={pulseWave}
            />

            <div className="absolute left-1/2 top-1/2 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-200/90" />
          </div>
        </div>
      </div>

      <div className="absolute inset-3 pointer-events-none opacity-80">
        <div className="absolute left-0 top-0 w-4 h-4 border-l border-t border-yellow-300/30" />
        <div className="absolute right-0 top-0 w-4 h-4 border-r border-t border-yellow-300/30" />
        <div className="absolute left-0 bottom-0 w-4 h-4 border-l border-b border-yellow-300/30" />
        <div className="absolute right-0 bottom-0 w-4 h-4 border-r border-b border-yellow-300/30" />

        <div className="absolute left-0 top-6 w-6 h-[2px] bg-yellow-300/18" />
        <div className="absolute right-0 top-6 w-8 h-[2px] bg-white/10" />
        <div className="absolute left-0 bottom-6 w-10 h-[2px] bg-white/10" />
        <div className="absolute right-0 bottom-6 w-6 h-[2px] bg-yellow-300/18" />
      </div>

      <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 opacity-70">
        <span className="w-2 h-2 rounded-full bg-yellow-300/70" />
        <span className="h-px flex-1 bg-white/10" />
        <span className="w-10 h-px bg-cyan-400/20" />
      </div>
    </motion.div>
  )
}