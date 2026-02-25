import { Link } from "react-router-dom"

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-10 pb-24">
      <div className="panel rounded-3xl p-8 md:p-12">
        <div className="text-yellow-300 text-xs uppercase tracking-[0.22em]">Связь</div>
        <h1 className="mt-2 text-4xl md:text-6xl font-black text-white/90">FadiezPC</h1>

        <p className="mt-5 text-white/55 max-w-2xl leading-relaxed">
          Never Fade Away
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            ["Telegram", "@FadiezPC"],
            ["Номер телефона", "+373 0 (68) 150954"],
            ["Почта", "dust2mertel@gmail.com"],
          ].map(([a, b]) => (
            <div key={a} className="rounded-3xl border border-white/10 bg-black/20 p-6">
              <div className="text-yellow-200/90 text-xs uppercase tracking-[0.22em]">{a}</div>
              <div className="mt-2 text-white/55 text-sm">{b}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex gap-3">
          <Link to="/" className="rounded-2xl px-6 py-3 text-sm uppercase tracking-[0.18em] text-white/70 border border-white/15 hover:border-white/25">
            Главная
          </Link>
        </div>
      </div>
    </div>
  )
}