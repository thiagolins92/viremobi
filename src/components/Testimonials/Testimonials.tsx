import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../../utils/constants';
import { useInView } from '../../hooks/useInView';
import styles from './Testimonials.module.css';

const BLUE_CHECK = '\u2713\u2713';

// Real avatar photos mapped by index
const AVATAR_PHOTOS = [
  '/images/avatar-rafael.avif',
  '/images/avatar-anderson.avif',
  '/images/avatar-diego.avif',
  '/images/avatar-juliana.avif',
];

export function Testimonials() {
  const [ref, isVisible] = useInView(0.1);

  return (
    <section className={styles.section} aria-labelledby="testimonials-heading">
      <div className={styles.container}>
        <div
          ref={ref}
          className={`${styles.header} ${isVisible ? styles.visible : ''}`}
        >
          <div className={styles.whatsappBadge} aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Direto do Whats dos entregadores
          </div>

          <h2 id="testimonials-heading" className={styles.title}>
            Quem roda com a ViRe, recomenda
          </h2>

          {/* Stars rating */}
          <div className={styles.overallRating}>
            <div className={styles.stars} aria-label="4.8 de 5 estrelas">
              {[1, 2, 3, 4, 5].map(i => (
                <Star
                  key={i}
                  size={20}
                  fill={i <= 4 ? '#FFB800' : 'none'}
                  stroke={i <= 4 ? '#FFB800' : '#FFB800'}
                  strokeWidth={i === 5 ? 2 : 0}
                  className={i === 5 ? styles.starHalf : ''}
                />
              ))}
            </div>
            <span className={styles.ratingText}>4.8 de 5, com 347 avaliações de entregadores</span>
          </div>
        </div>

        {/* Testimonial cards */}
        <div className={styles.cardGrid} role="list" aria-label="Depoimentos">
          {TESTIMONIALS.map((testimonial, index) => (
            <article
              key={testimonial.name}
              className={`${styles.card} ${isVisible ? styles.cardVisible : ''}`}
              style={{ transitionDelay: `${index * 150}ms` }}
              role="listitem"
            >
              {/* Avatar + info */}
              <div className={styles.cardHeader}>
                <div className={styles.avatar}>
                  <img
                    src={AVATAR_PHOTOS[index]}
                    alt={testimonial.name}
                    className={styles.avatarPhoto}
                    loading="lazy"
                  />
                </div>
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>{testimonial.name}</span>
                  <span className={styles.authorRole}>{testimonial.role}</span>
                </div>
                <div className={styles.timestamp} aria-hidden="true">
                  <span className={styles.time}>{testimonial.time}</span>
                  <span className={styles.checks}>{BLUE_CHECK}</span>
                </div>
              </div>

              {/* Stars */}
              <div className={styles.cardStars}>
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} size={16} fill="#FFB800" stroke="none" />
                ))}
              </div>

              {/* Quote */}
              <p className={styles.quote}>"{testimonial.text}"</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
