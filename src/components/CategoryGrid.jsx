import { Link } from 'react-router-dom'

export default function CategoryGrid({ categories = [] }) {
  const defaultCategories = [
    {
      slug: 'men',
      title: 'Men',
      description: 'Premium menswear collection with modern cuts and timeless styles.',
      image: 'https://images.unsplash.com/photo-1552062407-291826ab63fd?auto=format&fit=crop&w=800&q=80',
    },
    {
      slug: 'women',
      title: 'Women',
      description: 'Curated selection of elegant dresses, tops, and accessories.',
      image: 'https://images.unsplash.com/photo-1595777707802-52ba64d3ec3f?auto=format&fit=crop&w=800&q=80',
    },
    {
      slug: 'accessories',
      title: 'Accessories',
      description: 'Complete your look with our handpicked accessories collection.',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    },
  ]

  const displayCategories = categories.length > 0 ? categories : defaultCategories

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;700&family=Poppins:wght@300;400;500;600;700&display=swap');

        .category-grid {
          display: grid;
          gap: 24px;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        }

        @media (max-width: 768px) {
          .category-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        .category-card {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          border: 1px solid #202020;
          background: #0a0a0a;
          transition: all 0.4s cubic-bezier(0.33, 1, 0.68, 1);
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          height: 100%;
          animation: cardIn 0.6s ease-out;
        }

        @keyframes cardIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .category-card:nth-child(1) {
          animation-delay: 0.1s;
        }

        .category-card:nth-child(2) {
          animation-delay: 0.2s;
        }

        .category-card:nth-child(3) {
          animation-delay: 0.3s;
        }

        .category-card:hover {
          border-color: #404040;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          transform: translateY(-4px);
        }

        .category-image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: #1a1a1a;
        }

        .category-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.33, 1, 0.68, 1);
        }

        .category-card:hover .category-image {
          transform: scale(1.08);
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.3) 50%,
            rgba(0, 0, 0, 0.6) 100%
          );
          transition: opacity 0.4s ease;
        }

        .category-card:hover .image-overlay {
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.4) 50%,
            rgba(0, 0, 0, 0.7) 100%
          );
        }

        .category-title {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px 16px 16px;
          font-family: 'EB Garamond', serif;
          font-size: 28px;
          font-weight: 700;
          color: #ffffff;
          z-index: 2;
          transition: all 0.4s ease;
        }

        .category-card:hover .category-title {
          transform: translateY(-4px);
        }

        .category-content {
          padding: 20px 16px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
          justify-content: space-between;
        }

        .category-description {
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          line-height: 1.6;
          color: #b0b0b0;
          flex: 1;
        }

        .category-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid #202020;
        }

        .shop-link {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Poppins', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #ffffff;
          transition: all 0.3s ease;
        }

        .category-card:hover .shop-link {
          gap: 12px;
          color: #f0f0f0;
        }

        .arrow-icon {
          width: 16px;
          height: 16px;
          transition: transform 0.3s cubic-bezier(0.33, 1, 0.68, 1);
          flex-shrink: 0;
        }

        .category-card:hover .arrow-icon {
          transform: translateX(4px);
        }

        .item-count {
          font-family: 'Poppins', sans-serif;
          font-size: 11px;
          color: #808080;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .badge-overlay {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(0, 0, 0, 0.7);
          border: 1px solid #303030;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          color: #b0b0b0;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          z-index: 3;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .category-card:hover .badge-overlay {
          opacity: 1;
        }

        @media (max-width: 640px) {
          .category-title {
            font-size: 20px;
          }

          .category-content {
            padding: 16px 12px;
            gap: 12px;
          }

          .category-description {
            font-size: 12px;
          }
        }
      `}</style>

      <div className="category-grid">
        {displayCategories.map((cat, index) => (
          <Link
            to={`/category/${cat.slug}`}
            key={cat.slug}
            className="category-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Image Section */}
            <div className="category-image-wrapper">
              <img
                src={cat.image}
                alt={cat.title}
                className="category-image"
              />
              <div className="image-overlay"></div>

              {/* Badge */}
              {cat.badge && (
                <div className="badge-overlay">
                  {cat.badge}
                </div>
              )}

              {/* Title */}
              <h3 className="category-title">{cat.title}</h3>
            </div>

            {/* Content Section */}
            <div className="category-content">
              <p className="category-description">{cat.description}</p>

              {/* Footer */}
              <div className="category-footer">
                <div>
                  <a href={`/category/${cat.slug}`} className="shop-link">
                    <span>Shop now</span>
                    <svg
                      className="arrow-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                    </svg>
                  </a>
                </div>
                {cat.itemCount && (
                  <span className="item-count">{cat.itemCount} items</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}