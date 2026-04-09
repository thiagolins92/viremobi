import { Zap, MapPin, Star } from 'lucide-react';
import { STATS } from '../../utils/constants';
import { useInView } from '../../hooks/useInView';
import { useCountUp } from '../../hooks/useCountUp';
import styles from './StatsBar.module.css';

const ICONS = [
  <Zap size={32} strokeWidth={2} />,
  <MapPin size={32} strokeWidth={2} />,
  <Star size={32} strokeWidth={2} />,
];

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  isVisible: boolean;
  index: number;
  icon: React.ReactNode;
}

function StatItem({ value, suffix, label, isVisible, index, icon }: StatItemProps) {
  const isDecimal = !Number.isInteger(value);
  const animatedValue = useCountUp(
    isDecimal ? 0 : value,
    2000,
    isDecimal ? false : isVisible
  );

  const displayValue = isDecimal ? value.toFixed(1) : animatedValue.toLocaleString('pt-BR');

  return (
    <div
      className={`${styles.stat} ${isVisible ? styles.statVisible : ''}`}
      style={{ '--delay': `${index * 200}ms` } as React.CSSProperties}
    >
      <div className={styles.statIcon} aria-hidden="true">
        {icon}
      </div>
      <div className={styles.statNumber} aria-live="polite" aria-atomic="true">
        <span className={styles.statValue}>{displayValue}</span>
        <span className={styles.statSuffix}>{suffix}</span>
      </div>
      <p className={styles.statLabel}>{label}</p>
    </div>
  );
}

export function StatsBar() {
  const [ref, isVisible] = useInView(0.2);

  return (
    <section
      ref={ref}
      className={styles.statsBar}
      aria-label="Números da ViRe Mobi"
    >
      {/* Background skyline */}
      <img
        src="/images/section-divider.webp"
        alt=""
        aria-hidden="true"
        className={styles.skyline}
        loading="lazy"
      />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.inner}>
        {STATS.map((stat, i) => (
          <StatItem
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            isVisible={isVisible}
            index={i}
            icon={ICONS[i]}
          />
        ))}
      </div>
    </section>
  );
}
