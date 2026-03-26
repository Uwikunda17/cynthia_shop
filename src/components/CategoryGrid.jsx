import { Link } from 'react-router-dom'

export default function CategoryGrid({ categories }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {categories.map((cat) => (
        <Link
          to={`/category/${cat.slug}`}
          key={cat.slug}
          className="card-hover rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 flex flex-col text-slate-100"
        >
          <div className="relative h-44">
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-3 left-3 text-white font-semibold text-lg">
              {cat.title}
            </div>
          </div>
          <div className="p-4 flex-1 flex flex-col gap-2">
            <p className="text-sm text-slate-300 flex-1">{cat.description}</p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
              Shop now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-4 h-4"
              >
                <path d="M5 12h14m0 0-6-6m6 6-6 6" />
              </svg>
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
