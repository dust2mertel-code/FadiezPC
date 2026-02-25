import { motion } from "framer-motion"
import { useMemo, useState } from "react"

const ease = [0.16, 1, 0.3, 1]

export default function ReactorLogo({ className = "" }) {
  const [hot, setHot] = useState(false)

  const emblemDrift = useMemo(
    () => ({
      rotate: hot ? [-2, 2, -1.2, 1.2, -2] : [-1.4, 1.4, -0.9, 0.9, -1.4],
      transition: { duration: hot ? 6.5 : 9.0, repeat: Infinity, ease },
    }),
    [hot]
  )

  const ringSwing = useMemo(
    () => ({
      rotate: hot ? [-10, 10, -8, 8, -10] : [-8, 8, -6, 6, -8],
      transition: { duration: hot ? 2.2 : 3.2, repeat: Infinity, ease },
    }),
    [hot]
  )

  const ringSwing2 = useMemo(
    () => ({
      rotate: hot ? [12, -12, 10, -10, 12] : [10, -10, 8, -8, 10],
      transition: { duration: hot ? 2.8 : 4.0, repeat: Infinity, ease },
    }),
    [hot]
  )

  const coreBreathe = useMemo(
    () => ({
      scale: hot ? [0.96, 1.08, 0.98, 1.04, 0.96] : [0.96, 1.05, 0.98, 1.03, 0.96],
      opacity: hot ? [0.75, 0.95, 0.82, 0.92, 0.75] : [0.7, 0.9, 0.78, 0.86, 0.7],
      transition: { duration: hot ? 1.35 : 1.75, repeat: Infinity, ease },
    }),
    [hot]
  )

  const pulseWave = useMemo(
    () => ({
      scale: [0.9, 1.55],
      opacity: [0, 0.35, 0],
      transition: {
        duration: hot ? 1.0 : 1.2,
        repeat: Infinity,
        repeatDelay: hot ? 0.6 : 1.1,
        ease: "easeOut",
      },
    }),
    [hot]
  )

  const orbit = useMemo(
    () => ({
      rotate: [0, 360],
      transition: { duration: hot ? 3.8 : 5.5, repeat: Infinity, ease: "linear" },
    }),
    [hot]
  )

  const glitchX = useMemo(
    () => ({
      x: hot ? [0, -1, 1, -2, 2, 0] : 0,
      transition: { duration: 0.35, ease: "easeOut" },
    }),
    [hot]
  )

  const reactorBox = 58
  const reactorInner = 54
  const ring2Inset = 7
  const orbitInset = 2
  const coreInset = 15
  const pulseInset = 10
  const fontSize = 15

  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-black/25 backdrop-blur-md ${className}`}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease }}
      onMouseEnter={() => setHot(true)}
      onMouseLeave={() => setHot(false)}
    >
      <div
        className="absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.25) 0 1px, transparent 1px 6px)",
        }}
      />

      <div
        className="absolute -top-10 -left-10 h-40 w-40 rounded-full blur-2xl opacity-35 mix-blend-screen"
        style={{ background: "rgba(255,214,10,0.12)" }}
      />
      <div
        className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full blur-2xl opacity-30 mix-blend-screen"
        style={{ background: "rgba(34,211,238,0.12)" }}
      />

      <div className="absolute left-3 right-3 top-2 flex justify-between opacity-70">
        <span className="h-px w-6 bg-white/15" />
        <span className="h-px w-10 bg-yellow-300/25" />
        <span className="h-px w-6 bg-white/15" />
      </div>

      <div className="relative z-10 flex items-center gap-3 px-3 py-2">
        <motion.div
          className="relative grid place-items-center"
          animate={emblemDrift}
          style={{ width: reactorBox, height: reactorBox }}
        >
          <div className="absolute -left-2 top-1/2 h-12 w-[2px] -translate-y-1/2 bg-gradient-to-b from-transparent via-yellow-300/25 to-transparent" />
          <div className="absolute -right-2 top-1/2 h-8 w-[2px] -translate-y-1/2 bg-gradient-to-b from-transparent via-white/12 to-transparent" />

          <div className="relative" style={{ width: reactorInner, height: reactorInner }}>
            <motion.div className="absolute inset-0 rounded-full border border-yellow-300/28" animate={ringSwing} />
            <motion.div
              className="absolute rounded-full border border-white/10"
              style={{ inset: ring2Inset }}
              animate={ringSwing2}
            />

            <motion.div className="absolute rounded-full" style={{ inset: orbitInset }} animate={orbit}>
              <div
                className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full"
                style={{
                  background: "rgba(34,211,238,0.38)",
                  boxShadow: "0 0 12px rgba(34,211,238,0.22)",
                }}
              />
            </motion.div>

            <motion.div
              className="absolute rounded-full"
              style={{
                inset: coreInset,
                background: hot ? "rgba(255,214,10,0.28)" : "rgba(255,214,10,0.20)",
                boxShadow: hot
                  ? "0 0 22px rgba(255,214,10,0.20), 0 0 46px rgba(34,211,238,0.12)"
                  : "0 0 18px rgba(255,214,10,0.14), 0 0 34px rgba(34,211,238,0.08)",
              }}
              animate={coreBreathe}
            />

            <motion.div
              className="absolute rounded-full border border-yellow-300/22"
              style={{ inset: pulseInset }}
              animate={pulseWave}
            />

            <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-200/90" />
          </div>
        </motion.div>

        <div className="min-w-0">
          <div className="flex items-baseline gap-2">
            <motion.div animate={glitchX} className="relative">
              <div
                className="relative select-none font-semibold tracking-[0.22em] uppercase leading-none"
                style={{
                  fontSize,
                  color: "rgba(255,214,10,0.92)",
                  textShadow: "0 0 14px rgba(255,214,10,0.18), 0 0 34px rgba(34,211,238,0.10)",
                }}
              >
                FadiezPC

                <span
                  className="absolute left-0 top-0 -translate-x-[1px] translate-y-[1px] opacity-40"
                  style={{ color: "rgba(34,211,238,0.85)" }}
                  aria-hidden="true"
                >
                  FadiezPC
                </span>
                <span
                  className="absolute left-0 top-0 translate-x-[1px] -translate-y-[1px] opacity-20"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                  aria-hidden="true"
                >
                  FadiezPC
                </span>
              </div>
            </motion.div>

            <div className="relative h-5 w-8 overflow-hidden rounded-md border border-yellow-300/20 bg-black/30">
              <div
                className="absolute inset-0 opacity-80"
                style={{
                  background:
                    "repeating-linear-gradient(135deg, rgba(255,214,10,.9) 0 6px, rgba(0,0,0,.85) 6px 12px)",
                }}
              />
              <div className="absolute inset-0 rounded-md border border-white/10" />
            </div>
          </div>

          <div className="mt-1 flex items-center gap-2 opacity-80">
            <span className="h-px w-8 bg-cyan-400/25" />
            <span className="h-px flex-1 bg-white/10" />
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-300/60" />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-2.5 opacity-80">
        <div className="absolute left-0 top-0 h-3.5 w-3.5 border-l border-t border-yellow-300/30" />
        <div className="absolute right-0 top-0 h-3.5 w-3.5 border-r border-t border-yellow-300/30" />
        <div className="absolute left-0 bottom-0 h-3.5 w-3.5 border-l border-b border-yellow-300/30" />
        <div className="absolute right-0 bottom-0 h-3.5 w-3.5 border-r border-b border-yellow-300/30" />

        <div className="absolute left-0 top-5 h-[2px] w-5 bg-yellow-300/18" />
        <div className="absolute right-0 top-5 h-[2px] w-7 bg-white/10" />
        <div className="absolute left-0 bottom-5 h-[2px] w-9 bg-white/10" />
        <div className="absolute right-0 bottom-5 h-[2px] w-5 bg-yellow-300/18" />
      </div>
    </motion.div>
  )
}