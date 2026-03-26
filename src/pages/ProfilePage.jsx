export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 text-slate-100">
      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-soft">
        <div className="flex items-center gap-4">
          <img
            src="https://i.pravatar.cc/120?img=32"
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <p className="text-sm text-slate-400 uppercase tracking-[0.15em]">
              Logged in
            </p>
            <h1 className="text-2xl font-semibold text-white">Mia Santos</h1>
            <p className="text-slate-300">mia.santos@example.com</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Measurements</h2>
          <ul className="text-slate-300 space-y-1">
            <li>Height: 168 cm</li>
            <li>Bust: 86 cm</li>
            <li>Waist: 66 cm</li>
            <li>Hips: 92 cm</li>
          </ul>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Preferences</h2>
          <ul className="text-slate-300 space-y-1">
            <li>Palette: Cool neutrals + blush</li>
            <li>Fit: Relaxed top, tailored bottom</li>
            <li>Footwear: Arch support + 70mm max heel</li>
          </ul>
        </div>
      </section>

      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Recent orders</h2>
          <button className="btn-ghost text-sm">View all</button>
        </div>
        <div className="divide-y divide-slate-800">
          {['Aurora Silk Dress', 'Orbit Knit Sneaker'].map((item) => (
            <div key={item} className="py-3 flex items-center justify-between">
              <span className="text-slate-100">{item}</span>
              <span className="text-sm text-slate-400">Delivered</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
