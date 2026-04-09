import { useInView } from '../../hooks/useInView';
import styles from './HowItWorks.module.css';

interface Step {
  number: string;
  image: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: '01',
    image: '/images/step-contact-new.webp',
    title: 'Chama a gente no WhatsApp',
    description: 'Nada de formulário. Manda um oi, tira suas dúvidas e já resolve tudo por lá.',
  },
  {
    number: '02',
    image: '/images/step-docs-new.webp',
    title: 'Documento, selfie e pronto',
    description: 'Em 24h tua bike tá liberada. Sem burocracia, sem enrolação.',
  },
  {
    number: '03',
    image: '/images/step-ride-new.webp',
    title: 'Sai rodando e faturando',
    description: 'Bateria cheia, manutenção por nossa conta. É só ligar e começar a fazer as corridas.',
  },
];

function StepCard({ step, index }: { step: Step; index: number }) {
  const [ref, isVisible] = useInView(0.2);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`${styles.step} ${isEven ? styles.stepLeft : styles.stepRight} ${isVisible ? styles.stepVisible : ''}`}
      style={{ '--delay': `${index * 150}ms` } as React.CSSProperties}
    >
      {/* Timeline node */}
      <div className={styles.timelineNode}>
        <span className={styles.nodeNumber}>{step.number}</span>
        <div className={styles.nodePulse} aria-hidden="true" />
      </div>

      {/* Card */}
      <article className={styles.card}>
        <div className={styles.cardImage}>
          <img
            src={step.image}
            alt={step.title}
            loading="lazy"
            className={styles.image}
          />
          <div className={styles.imageOverlay} />
        </div>
        <div className={styles.cardBody}>
          <h3 className={styles.cardTitle}>{step.title}</h3>
          <p className={styles.cardDescription}>{step.description}</p>
        </div>
      </article>
    </div>
  );
}

export function HowItWorks() {
  const [headerRef, headerVisible] = useInView(0.1);

  return (
    <section id="como-funciona" className={styles.section}>
      <div className={styles.container}>
        <div
          ref={headerRef}
          className={`${styles.header} ${headerVisible ? styles.headerVisible : ''}`}
        >
          <span className={styles.eyebrow}>Simples assim</span>
          <h2 className={styles.title}>3 passos e tu já tá rodando</h2>
          <p className={styles.subtitle}>
            Do primeiro oi no Whats até a primeira entrega, pode ser menos de 24 horas.
          </p>
        </div>

        <div className={styles.timeline}>
          {/* Vertical line */}
          <div className={styles.timelineLine} aria-hidden="true">
            <div className={styles.timelineProgress} />
          </div>

          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
