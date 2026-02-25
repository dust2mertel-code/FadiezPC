import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const easeOutExpo = [0.16, 1, 0.3, 1]

export default function Builds() {
  const [buildType, setBuildType] = useState("gaming")

  const buildTypeLabel = useMemo(
    () =>
      ({
        gaming: "Gaming",
        work: "Work / Study",
        office: "Office (Bulk)",
        budget: "Budget / Used",
      }[buildType]),
    [buildType]
  )

  return (
    <div className="max-w-7xl mx-auto px-6 pt-10 pb-24">
      <div className="panel rounded-3xl p-8 md:p-12">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-4 py-2 rounded-full text-xs uppercase tracking-[0.22em] text-yellow-200/90 border border-yellow-300/30 bg-yellow-300/10">
            builds
          </span>
          <span className="text-white/45 text-xs uppercase tracking-[0.22em]">
            выбор попадёт в заявку • fadiezpc
          </span>
          <span className="ml-auto hidden md:block w-28 h-2 hazard rounded-sm opacity-80" />
        </div>

        <h1 className="mt-6 text-4xl md:text-6xl font-black leading-[0.95] text-white/90">
          Сборки под задачу.
        </h1>
        <p className="mt-4 text-white/55 max-w-2xl">
          Выбери категорию — мы подберём конфиг, согласуем детали и соберём. Можно полностью на новых
          или бюджетно — с б/у по договорённости.
        </p>

        <motion.section
          className="mt-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOutExpo }}
        >
          <div className="flex items-end justify-between gap-6 mb-6">
            <div>
              <div className="text-yellow-300 text-xs uppercase tracking-[0.22em]">
                конфиг под задачу
              </div>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-white/90">
                Выбери тип сборки
              </h2>
            </div>

            <div className="hidden md:block text-white/50 text-sm">
              выбор попадёт в заявку
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              {
                id: "gaming",
                title: "Gaming",
                sub: "FPS / 2K / 4K",
                hint: "Максимум производительности, тишина, температура.",
                tag: "дом",
                accent: "from-yellow-300/25 via-yellow-300/10 to-transparent",
              },
              {
                id: "work",
                title: "Work / Study",
                sub: "Code / Design",
                hint: "Надёжность, стабильность, быстрые SSD, тишина.",
                tag: "учёба",
                accent: "from-cyan-300/20 via-cyan-300/10 to-transparent",
              },
              {
                id: "office",
                title: "Office (Bulk)",
                sub: "Поставки партиями",
                hint: "Одинаковые конфиги, маркировка, комплектность.",
                tag: "опт",
                accent: "from-white/15 via-white/5 to-transparent",
              },
              {
                id: "budget",
                title: "Budget / Used",
                sub: "Согласуем б/у",
                hint: "Цена ниже — компоненты б/у по договорённости.",
                tag: "эконом",
                accent: "from-purple-300/20 via-purple-300/10 to-transparent",
              },
            ].map((c) => {
              const active = buildType === c.id
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setBuildType(c.id)}
                  className={[
                    "group relative text-left rounded-3xl border bg-black/25 backdrop-blur-md p-6 overflow-hidden",
                    active ? "border-yellow-300/45" : "border-white/10 hover:border-white/20",
                    "transition",
                  ].join(" ")}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${c.accent} opacity-70`} />

                  <div className="absolute inset-0 pointer-events-none opacity-80">
                    <div
                      className={`absolute left-4 top-4 w-5 h-5 border-l border-t ${
                        active ? "border-yellow-300/60" : "border-yellow-300/25"
                      }`}
                    />
                    <div
                      className={`absolute right-4 top-4 w-5 h-5 border-r border-t ${
                        active ? "border-yellow-300/60" : "border-yellow-300/25"
                      }`}
                    />
                    <div
                      className={`absolute left-4 bottom-4 w-5 h-5 border-l border-b ${
                        active ? "border-yellow-300/60" : "border-yellow-300/25"
                      }`}
                    />
                    <div
                      className={`absolute right-4 bottom-4 w-5 h-5 border-r border-b ${
                        active ? "border-yellow-300/60" : "border-yellow-300/25"
                      }`}
                    />
                  </div>

                  <div className="relative flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.22em] border border-white/15 text-white/70">
                      {c.tag}
                    </span>

                    <span
                      className={[
                        "ml-auto w-2.5 h-2.5 rounded-full transition",
                        active
                          ? "bg-yellow-300 shadow-[0_0_18px_rgba(255,214,10,0.35)]"
                          : "bg-white/15",
                      ].join(" ")}
                    />
                  </div>

                  <div className="relative mt-5">
                    <div className="text-2xl font-black text-white/90 group-hover:text-white transition">
                      {c.title}
                    </div>
                    <div className="mt-1 text-white/55 text-sm">{c.sub}</div>
                  </div>

                  <div className="relative mt-5 text-white/60 text-sm leading-relaxed">
                    {c.hint}
                  </div>

                  <div className="relative mt-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <div
                      className={`w-14 h-2 hazard rounded-sm ${
                        active ? "opacity-90" : "opacity-60"
                      }`}
                    />
                  </div>
                </button>
              )
            })}
          </div>
        </motion.section>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
  href="/#request"
  className="btn-primary rounded-2xl px-6 py-3 text-sm uppercase tracking-[0.18em] text-yellow-200"
>
  Оставить заявку
</a>

          <div className="text-white/50 text-sm">
            В заявке будет: <span className="text-yellow-200">{buildTypeLabel}</span>
          </div>
        </div>
      </div>
    </div>
  )
}