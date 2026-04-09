import styles from './SectionDivider.module.css';

interface SectionDividerProps {
  flip?: boolean;
}

export function SectionDivider({ flip = false }: SectionDividerProps) {
  return (
    <div
      className={`${styles.divider} ${flip ? styles.flip : ''}`}
      aria-hidden="true"
    >
      <img
        src="/images/section-divider.webp"
        alt=""
        className={styles.image}
        loading="lazy"
      />
      <div className={styles.overlay} />
      {/* SVG wave cut */}
      <svg
        className={styles.wave}
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
