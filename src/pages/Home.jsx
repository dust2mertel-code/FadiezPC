import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import PcScene from "../components/PcScene"
import ReactorTile from "../components/ReactorTile"

const easeOutExpo = [0.16, 1, 0.3, 1]

export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const rafRef = useRef(null)
  const nextRef = useRef(null)
  const [buildType, setBuildType] = useState("gaming")
  const [form, setForm] = useState({
  name: "",
  contact: "",
  budget: "",
  note: "",
})

const [status, setStatus] = useState({ type: "idle", msg: "" })

const buildTypeLabel = {
  gaming: "Gaming",
  work: "Work / Study",
  office: "Office (Bulk)",
  budget: "Budget / Used",
}[buildType]
const WEB3FORMS_KEY = "9137bee5-820e-4aec-a424-f45900bf53e5"

async function onSubmit(e) {
  e.preventDefault()

  setStatus({ type: "loading", msg: "Отправляем..." })

  try {
    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: `FadiezPC — заявка (${buildTypeLabel})`,
      from_name: "FadiezPC Site",
      name: form.name,
      contact: form.contact,
      budget: form.budget,
      buildType: buildTypeLabel,
      note: form.note,
    }

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    const data = await res.json()

    if (!data.success) {
      throw new Error(data.message || "Ошибка отправки")
    }

    setStatus({ type: "ok", msg: "Заявка отправлена. Скоро напишем." })
    setForm({ name: "", contact: "", budget: "", note: "" })
  } catch (err) {
    setStatus({ type: "err", msg: "Не удалось отправить. Проверь ключ/интернет." })
  }
}

const scrollToNext = () => {
  nextRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
}

  useEffect(() => {
    const handleMove = (e) => {
      if (rafRef.current) return

      rafRef.current = requestAnimationFrame(() => {
        const w = window.innerWidth || 1
        const h = window.innerHeight || 1
        const x = (e.clientX / w - 0.5) * 2
        const y = (e.clientY / h - 0.5) * 2
        setMouse({ x, y })
        rafRef.current = null
      })
    }

    window.addEventListener("mousemove", handleMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", handleMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="min-h-screen relative overflow-x-hidden cyber-bg">
      <div className="absolute inset-0 soft-noise pointer-events-none" aria-hidden="true" />

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-72 -left-72 w-[900px] h-[900px] rounded-full blur-[180px] opacity-60 mix-blend-screen"
          style={{
            background: "rgba(255,214,10,0.18)",
            transform: `translate3d(${mouse.x * 18}px, ${mouse.y * 18}px, 0)`,
          }}
        />
        <div
          className="absolute -bottom-80 -right-80 w-[900px] h-[900px] rounded-full blur-[220px] opacity-55 mix-blend-screen"
          style={{
            background: "rgba(34,211,238,0.14)",
            transform: `translate3d(${mouse.x * -14}px, ${mouse.y * -14}px, 0)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-10 pb-24">
        <motion.div
          className="mt-10 md:mt-16 panel rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 18, scale: 0.995 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: easeOutExpo }}
        >
          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.7, ease: easeOutExpo }}
          >
            <span className="px-4 py-2 rounded-full text-xs uppercase tracking-[0.22em] text-yellow-200/90 border border-yellow-300/30 bg-yellow-300/10">
              FadiezPC
            </span>
            <span className="text-white/45 text-xs uppercase tracking-[0.22em]">
              custom pc builds • тесты • аккуратная сборка
            </span>
            <span className="ml-auto hidden md:block w-28 h-2 hazard rounded-sm opacity-80" />
          </motion.div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <motion.h1
                className="text-5xl md:text-7xl font-black leading-[0.95]"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.85, ease: easeOutExpo }}
              >
                <span className="text-white/95">Соберём</span>{" "}
                <span className="text-yellow-300">твой ПК</span>
              </motion.h1>

              <motion.p
                className="mt-5 max-w-xl text-white/70 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: easeOutExpo }}
              >
                Подбираем конфиг под задачу и бюджет. По умолчанию — новые комплектующие.
                Нужно дешевле — сделаем на б/у.
              </motion.p>

              <motion.div
                className="mt-8 flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.75, ease: easeOutExpo }}
              >
                <a
  href="#request"
  className="btn-primary rounded-2xl px-6 py-3 text-sm uppercase tracking-[0.18em] text-yellow-200"
>
  Оставить заявку
</a>

                <Link
                  to="/builds"
                  className="btn-ghost rounded-2xl px-7 py-4 uppercase tracking-[0.18em] text-sm text-white/80 transition"
                >
                  Примеры сборок
                </Link>
              </motion.div>

              <motion.div
                className="mt-6 text-white/45 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.38, duration: 0.7, ease: easeOutExpo }}
              >
                Быстрый расчёт по заявке. Сборка и стресс-тесты перед выдачей.
              </motion.div>
              <motion.section
  className="mt-24"
  initial={{ opacity: 0, y: 28 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.25 }}
  transition={{ duration: 0.9 }}
>
  <div className="flex items-end justify-between gap-6 mb-6">
    <div>
      <div className="text-yellow-300 text-xs uppercase tracking-[0.22em]">
        interactive lab
      </div>
      <h2 className="mt-2 text-3xl md:text-4xl font-bold text-white/90">
        Разбор сборки на компоненты
      </h2>
    </div>

    <div className="hidden md:block text-white/50 text-sm">
      вращай мышкой
    </div>
  </div>

  <PcScene />
</motion.section>
            </div>
            

            <motion.div
              className="lg:col-span-5 grid grid-cols-1 gap-4"
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.18 } },
              }}
            >
              {[
  {
    tag: "Для дома",
    tagClass: "text-yellow-200/90",
    title: "Gaming / Work / Study",
    text: "Тишина, температура, апгрейд — всё учитываем.",
  },
  {
    tag: "Для бизнеса",
    tagClass: "text-cyan-200/90",
    title: "Офисные партии (опт)",
    text: "Одинаковые конфиги, комплектность, маркировка, документы.",
  },
  {
    tag: "Гарантии",
    tagClass: "text-purple-200/90",
    title: "Новое / б/у",
    text: "Новое — как стандарт. Б/у — только по согласованию.",
  },

  {
    tag: "Сроки",
    tagClass: "text-yellow-200/90",
    title: "24–72 часа",
    text: "Сборка + тестирование. Оптовые партии — по согласованию.",
  },
].map((c) => (
                <motion.div
                  key={c.title}
                  className="rounded-2xl border border-white/10 bg-black/25 p-6"
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOutExpo } },
                  }}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25, ease: easeOutExpo }}
                >
                  <div className={`${c.tagClass} text-xs uppercase tracking-[0.22em]`}>
                    {c.tag}
                  </div>
                  <div className="mt-2 text-xl font-semibold text-white/90">{c.title}</div>
                  <p className="mt-3 text-white/60">{c.text}</p>
                </motion.div>
              ))}
              <div className="pointer-events-none opacity-60">
  <ReactorTile />
</div>
            </motion.div>
          </div>
        </motion.div>

        <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-yellow-300/40 to-transparent" />
        <motion.section
  className="mt-20"
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.25 }}
  transition={{ duration: 0.9, ease: easeOutExpo }}
>
  <section id="request" className="scroll-mt-24"></section>
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
            <div className={`absolute left-4 top-4 w-5 h-5 border-l border-t ${active ? "border-yellow-300/60" : "border-yellow-300/25"}`} />
            <div className={`absolute right-4 top-4 w-5 h-5 border-r border-t ${active ? "border-yellow-300/60" : "border-yellow-300/25"}`} />
            <div className={`absolute left-4 bottom-4 w-5 h-5 border-l border-b ${active ? "border-yellow-300/60" : "border-yellow-300/25"}`} />
            <div className={`absolute right-4 bottom-4 w-5 h-5 border-r border-b ${active ? "border-yellow-300/60" : "border-yellow-300/25"}`} />
          </div>

          <div className="relative flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.22em] border border-white/15 text-white/70">
              {c.tag}
            </span>

            <span
              className={[
                "ml-auto w-2.5 h-2.5 rounded-full transition",
                active ? "bg-yellow-300 shadow-[0_0_18px_rgba(255,214,10,0.35)]" : "bg-white/15",
              ].join(" ")}
            />
          </div>

          <div className="relative mt-5">
            <div className="text-2xl font-black text-white/90 group-hover:text-white transition">
              {c.title}
            </div>
            <div className="mt-1 text-white/55 text-sm">
              {c.sub}
            </div>
          </div>

          <div className="relative mt-5 text-white/60 text-sm leading-relaxed">
            {c.hint}
          </div>

          <div className="relative mt-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className={`w-14 h-2 hazard rounded-sm ${active ? "opacity-90" : "opacity-60"}`} />
          </div>
        </button>
      )
    })}
  </div>
  <motion.section
  className="mt-16"
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.25 }}
  transition={{ duration: 0.9, ease: easeOutExpo }}
>
  <section id="request" className="scroll-mt-28">
</section>
  <div className="panel rounded-3xl p-8 md:p-10">
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <div className="text-yellow-300 text-xs uppercase tracking-[0.22em]">
          заявка
        </div>
        <h3 className="mt-2 text-3xl md:text-4xl font-black text-white/90">
          Оставь контакт — соберём конфиг
        </h3>
        <div className="mt-3 text-white/55 text-sm">
          Выбранный тип:{" "}
          <span className="text-yellow-200">{buildTypeLabel}</span>
        </div>
      </div>

      <div className="text-white/45 text-sm">
        Telegram / Phone / Email — как удобнее
      </div>
    </div>

    <form onSubmit={onSubmit} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <label className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="text-white/50 text-xs uppercase tracking-[0.18em]">Имя</div>
        <input
          value={form.name}
          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
          required
          className="mt-2 w-full bg-transparent outline-none text-white/90 placeholder:text-white/25"
          placeholder="Как к тебе обращаться"
        />
      </label>

      <label className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="text-white/50 text-xs uppercase tracking-[0.18em]">Контакт</div>
        <input
          value={form.contact}
          onChange={(e) => setForm((s) => ({ ...s, contact: e.target.value }))}
          required
          className="mt-2 w-full bg-transparent outline-none text-white/90 placeholder:text-white/25"
          placeholder="@telegram, номер телефона или email"
        />
      </label>

      <label className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="text-white/50 text-xs uppercase tracking-[0.18em]">Бюджет</div>
        <input
          value={form.budget}
          onChange={(e) => setForm((s) => ({ ...s, budget: e.target.value }))}
          className="mt-2 w-full bg-transparent outline-none text-white/90 placeholder:text-white/25"
          placeholder="MDL"
        />
      </label>

      <label className="rounded-2xl border border-white/10 bg-black/20 p-4 md:col-span-2">
        <div className="text-white/50 text-xs uppercase tracking-[0.18em]">Комментарий</div>
        <textarea
          value={form.note}
          onChange={(e) => setForm((s) => ({ ...s, note: e.target.value }))}
          rows={4}
          className="mt-2 w-full bg-transparent outline-none text-white/90 placeholder:text-white/25 resize-none"
          placeholder="игры/задачи, монитор, шум, цвет, пожелания..."
        />
      </label>

      <input type="hidden" name="buildType" value={buildTypeLabel} />

      <div className="md:col-span-2 flex flex-wrap items-center gap-4 mt-2">
        <button
          type="submit"
          disabled={status.type === "loading"}
          className="btn-primary rounded-2xl px-6 py-3 text-sm uppercase tracking-[0.18em] text-yellow-200 disabled:opacity-60"
        >
          {status.type === "loading" ? "Sending..." : "Send request"}
        </button>

        {status.type !== "idle" && (
          <div
            className={[
              "text-sm",
              status.type === "ok" ? "text-green-300/80" : "",
              status.type === "err" ? "text-red-300/80" : "",
              status.type === "loading" ? "text-white/55" : "",
            ].join(" ")}
          >
            {status.msg}
          </div>
        )}
      </div>
    </form>
  </div>
</motion.section>
</motion.section>
<motion.section
  className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 1, ease: easeOutExpo }}
>
  <div>
    <h2 className="text-4xl md:text-5xl font-bold text-white">
      Тестирование перед выдачей
    </h2>
    <p className="mt-6 text-white/70 text-lg leading-relaxed">
      Каждый ПК проходит стресс-тест, проверку температур,
      стабильности и кабель-менеджмента.
      Ты получаешь систему, готовую к работе с первого запуска.
    </p>
  </div>

  <div className="panel p-8">
    <div className="text-yellow-300 uppercase text-xs tracking-[0.2em]">
      Проверка
    </div>
    <ul className="mt-6 space-y-4 text-white/70">
      <li>• CPU / GPU stress test</li>
      <li>• Термопрофиль под нагрузкой</li>
      <li>• Тест блока питания</li>
      <li>• Проверка накопителей</li>
    </ul>
  </div>
</motion.section>
      </div>
    </div>
  )
}