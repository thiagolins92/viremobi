import { Check, Crown, TrendingDown } from 'lucide-react';
import { PLANS } from '../../utils/constants';
import { whatsappLinks } from '../../utils/whatsapp';
import { useInView } from '../../hooks/useInView';
import styles from './Plans.module.css';

type PlanId = (typeof PLANS)[number]['id'];

export function Plans() {
  const [ref, isVisible] = useInView(0.1);

  return (
    <section id="planos" className={styles.section}>
      <div className={styles.container}>
        <div
          ref={ref}
          className={`${styles.header} ${isVisible ? styles.visible : ''}`}
        >
          <span className={styles.eyebrow}>Planos</span>
          <h2 className={styles.title}>
            Escolhe o que cabe melhor pra você
          </h2>
          <p className={styles.subtitle}>
            Nada de contrato longo. Paga, pega a bike e vai trampar.
          </p>
        </div>

        <div className={styles.grid}>
          {PLANS.map((plan, index) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              link={whatsappLinks[plan.id as PlanId]}
              animationDelay={index * 150}
              parentVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface PlanCardProps {
  plan: (typeof PLANS)[number];
  link: string;
  animationDelay: number;
  parentVisible: boolean;
}

function PlanCard({ plan, link, animationDelay, parentVisible }: PlanCardProps) {
  const isHighlighted = plan.highlighted;

  return (
    <article
      className={`${styles.card} ${isHighlighted ? styles.cardHighlighted : ''} ${parentVisible ? styles.cardVisible : ''}`}
      style={{ transitionDelay: `${animationDelay}ms` }}
      aria-label={`Plano ${plan.name}`}
    >
      {/* Badge */}
      {plan.badge && (
        <span
          className={`${styles.badge} ${isHighlighted ? styles.badgePopular : styles.badgeEconomico}`}
        >
          {isHighlighted ? <Crown size={14} /> : <TrendingDown size={14} />}
          {plan.badge}
        </span>
      )}

      {/* Glow for highlighted */}
      {isHighlighted && <div className={styles.cardGlow} aria-hidden="true" />}

      <div className={styles.cardHeader}>
        <h3 className={styles.planName}>{plan.name}</h3>
        <p className={styles.planSubtitle}>{plan.subtitle}</p>
      </div>

      <div className={styles.priceBlock}>
        <span className={styles.currency}>R$</span>
        <span className={styles.price}>{plan.price}</span>
        <span className={styles.period}>{plan.period}</span>
      </div>

      <div className={styles.divider} />

      <ul className={styles.features} role="list">
        {plan.features.map((feature) => (
          <li key={feature} className={styles.featureItem}>
            <Check
              size={18}
              className={styles.checkIcon}
              aria-hidden="true"
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.cta} ${isHighlighted ? styles.ctaHighlighted : styles.ctaOutline}`}
        aria-label={`Contratar plano ${plan.name}`}
      >
        Quero esse plano
      </a>
    </article>
  );
}
