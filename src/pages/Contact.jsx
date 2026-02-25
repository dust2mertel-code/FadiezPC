export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-10 pb-24">
      <div className="panel rounded-3xl p-8 md:p-12">
        <div className="text-yellow-300 text-xs uppercase tracking-[0.22em]">request</div>
        <h1 className="mt-2 text-4xl md:text-6xl font-black text-white/90">Заявка</h1>
        <p className="mt-4 text-white/55 max-w-2xl">
          Оставь контакт и что нужно: игры/задачи, бюджет, монитор, предпочтения по шуму/цвету.
        </p>

        <form className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-white/50 text-xs uppercase tracking-[0.18em]">Имя</div>
            <input className="mt-2 w-full bg-transparent outline-none text-white/90 placeholder:text-white/25" placeholder="Имя" />
          </label>

          <label className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-white/50 text-xs uppercase tracking-[0.18em]">Контакт</div>
            <input className="mt-2 w-full bg-transparent outline-none text-white/90 placeholder:text-white/25" placeholder="@telegram / телефон" />
          </label>

          <label className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-white/50 text-xs uppercase tracking-[0.18em]">Бюджет</div>
            <input className="mt-2 w-full bg-transparent outline-none text-white/90 placeholder:text-white/25" placeholder="€ / MDL" />
          </label>

          <label className="rounded-2xl border border-white/10 bg-black/20 p-4 md:col-span-2">
            <div className="text-white/50 text-xs uppercase tracking-[0.18em]">Комментарий</div>
            <textarea rows={5} className="mt-2 w-full bg-transparent outline-none text-white/90 placeholder:text-white/25 resize-none" placeholder="Что собрать, под какие задачи, пожелания..." />
          </label>

          <button type="button" className="btn-primary rounded-2xl px-6 py-3 text-sm uppercase tracking-[0.18em] text-yellow-200">
            Send (потом)
          </button>
        </form>
      </div>
    </div>
  )
}