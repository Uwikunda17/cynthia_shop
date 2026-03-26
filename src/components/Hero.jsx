import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Hero({ images }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 4200)
    return () => clearInterval(id)
  }, [images.length])

  const current = images[index]

  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-slate-950 overflow-hidden">
      <div className="relative overflow-hidden min-h-screen">
        <img
          src={current}
          alt="Featured"
          className="absolute inset-0 w-full h-full object-cover"
          key={current}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/55" />

        <div className="relative z-10 max-w-6xl mx-auto h-full flex items-end justify-between gap-6 px-4 sm:px-8 pb-16 pt-24">
          <div className="space-y-4">
            <p className="badge bg-white/15 text-white border-white/30">
              Curated drops
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-tight">
              Live in <span className="italic font-serif">Style</span>
            </h1>
            <p className="text-lg text-slate-200 max-w-2xl">
              Premium edits across clothes, shoes, and luxury pieces — crafted for
              city days and late nights.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/category/luxury" className="btn-primary">
                Book a styling
              </Link>
              <Link
                to="/category/clothes"
                className="btn-ghost border-white/40 text-white hover:bg-white hover:text-charcoal"
              >
                Shop collection
              </Link>
            </div>
          </div>

          <div className="hidden lg:block w-[320px]">
            <div className="bg-white/85 backdrop-blur-xl rounded-3xl overflow-hidden shadow-soft border border-white/60">
              <div className="h-40 overflow-hidden">
                <img
                  src={images[(index + 1) % images.length]}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 space-y-2">
                <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
                  Last entries
                </p>
                <h3 className="text-lg font-semibold text-charcoal">
                  The Grand Edit
                </h3>
                <p className="text-sm text-slate-600">
                  Smart silhouettes, luxe textures, and curated colorways from our newest drop.
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-semibold text-accent">View lookbook</span>
                  <button
                    onClick={() => setIndex((prev) => (prev + 1) % images.length)}
                    className="w-10 h-10 rounded-full bg-black text-white grid place-items-center"
                    aria-label="Next"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
