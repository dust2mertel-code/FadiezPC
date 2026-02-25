export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-white/10 bg-black/80 backdrop-blur-md relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-yellow-300/40 blur-sm" />

      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-center">
        <p
          className="text-xs uppercase tracking-[0.25em]"
          style={{
            color: "rgba(255,214,10,0.7)",
            textShadow: "0 0 10px rgba(255,214,10,0.15)",
          }}
        >
          © {year} FadiezPC.
        </p>
      </div>
    </footer>
  )
}