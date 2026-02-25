import { Link } from "react-router-dom"

export default function Services() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-10 pb-24">
      <div className="panel rounded-3xl p-8 md:p-12">
        <div className="text-yellow-300 text-xs uppercase tracking-[0.22em]">services</div>
        <h1 className="mt-2 text-4xl md:text-6xl font-black text-white/90">Что мы делаем</h1>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ["Подбор конфигурации", "Под задачу + бюджет. Никаких лишних трат."],
            ["Сборка и кабель-менеджмент", "Аккуратно, безопасно, чисто."],
            ["Тесты и стресс", "Температуры, стабильность, память, накопители."],
            ["Офисные поставки", "Партии ПК: одинаковые конфиги, маркировка, документы."],
            ["Апгрейд/рефреш", "Обновим сборку без покупки всего заново."],
            ["Б/у по договорённости", "Если нужен бюджет — только после проверки/тестов."],
          ].map(([h, p]) => (
            <div key={h} className="rounded-3xl border border-white/10 bg-black/20 p-6">
              <div className="text-white/90 font-semibold">{h}</div>
              <div className="mt-2 text-white/55 text-sm leading-relaxed">{p}</div>
              <div className="mt-6 w-24 h-2 hazard rounded-sm opacity-70" />
            </div>
          ))}
        </div>

        <div className="mt-10">
        </div>
      </div>
    </div>
  )
}