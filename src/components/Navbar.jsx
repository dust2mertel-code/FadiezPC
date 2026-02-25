import { Link, useLocation } from "react-router-dom"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import ReactorLogo from "./ReactorLogo"
import { useTranslation } from "react-i18next"

const NAV_ITEMS = [
  { path: "/", label: "Главная" },
  { path: "/builds", label: "Сборки" },
  { path: "/services", label: "Услуги" },
  { path: "/about", label: "Контакты" },
]

export default function Navbar() {
  const location = useLocation()

  const containerRef = useRef(null)
  const linkRefs = useRef({})
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 })

  const updateIndicator = () => {
    const active = linkRefs.current[location.pathname]
    const container = containerRef.current
    if (!active || !container) return

    const a = active.getBoundingClientRect()
    const c = container.getBoundingClientRect()

    setIndicator({
      left: a.left - c.left,
      width: a.width,
      opacity: 1,
    })
  }

  useLayoutEffect(() => {
    updateIndicator()
  }, [location.pathname])

  useEffect(() => {
    const onResize = () => updateIndicator()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const linkClass = (path) =>
    `relative px-1 py-2 uppercase tracking-[0.18em] text-xs transition ${
      location.pathname === path
        ? "text-yellow-300 pointer-events-none"
        : "text-white/60 hover:text-yellow-300"
    }`
  const { t, i18n } = useTranslation()
  const setLang = (lang) => {
  i18n.changeLanguage(lang)
  localStorage.setItem("lang", lang)
}
  return (
    <nav className="fixed top-0 left-0 w-full h-20 z-50 bg-black/70 backdrop-blur-md border-b border-white/10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">

        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, rgba(255,255,255,0.25) 0 1px, transparent 1px 6px)",
          }}
        />

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-[2px] bg-yellow-300/60 blur-md" />

        <div className="absolute left-0 top-0 w-40 h-full bg-gradient-to-r from-yellow-300/10 to-transparent blur-2xl" />
        <div className="absolute right-0 top-0 w-40 h-full bg-gradient-to-l from-cyan-400/10 to-transparent blur-2xl" />

        <div className="absolute left-4 top-4 w-5 h-5 border-l border-t border-yellow-300/30" />
        <div className="absolute right-4 top-4 w-5 h-5 border-r border-t border-yellow-300/30" />
        <div className="absolute left-4 bottom-4 w-5 h-5 border-l border-b border-yellow-300/30" />
        <div className="absolute right-4 bottom-4 w-5 h-5 border-r border-b border-yellow-300/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        
        <Link to="/" className="flex items-center h-full -translate-y-[2px]">
          <ReactorLogo />
        </Link>

        <div ref={containerRef} className="relative flex gap-8">
          
          <div
            className="absolute -bottom-1 h-[2px] bg-yellow-300/90 transition-all duration-300 ease-out"
            style={{
              transform: `translateX(${indicator.left}px)`,
              width: `${indicator.width}px`,
              opacity: indicator.opacity,
            }}
          />

          <div
            className="absolute -bottom-2 h-3 blur-md bg-yellow-300/30 transition-all duration-300 ease-out"
            style={{
              transform: `translateX(${indicator.left}px)`,
              width: `${indicator.width}px`,
              opacity: indicator.opacity,
            }}
          />

          <div
            className="absolute -bottom-[6px] w-3 h-3 border-l border-b border-yellow-300/90 transition-all duration-300 ease-out"
            style={{
              transform: `translateX(${indicator.left - 6}px)`,
              opacity: indicator.opacity,
            }}
          />

          <div
            className="absolute -bottom-[6px] w-3 h-3 border-r border-b border-yellow-300/90 transition-all duration-300 ease-out"
            style={{
              transform: `translateX(${indicator.left + indicator.width - 6}px)`,
              opacity: indicator.opacity,
            }}
          />

          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={linkClass(item.path)}
              ref={(el) => (linkRefs.current[item.path] = el)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}