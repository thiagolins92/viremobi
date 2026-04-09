import React from 'react';
import {
  DollarSign,
  Wrench,
  Zap,
  MessageSquare,
  Battery,
  ShieldCheck,
} from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { whatsappLinks } from '../../utils/whatsapp';
import styles from './Benefits.module.css';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
  image?: string;
  featured?: boolean;
}

const benefits: Benefit[] = [
  {
    icon: <Zap size={32} strokeWidth={2} />,
    title: 'Pega mais pedido, sobe mais morro',
    description:
      'Com a elétrica tu voa nas subidas e encaixa mais corridas por hora. No fim do dia, a diferença aparece no Pix.',
    image: '/images/benefit-speed.webp',
    featured: true,
  },
  {
    icon: <DollarSign size={28} strokeWidth={1.75} />,
    title: 'Começa sem pagar nada adiantado',
    description:
      'Nada de entrada ou fiador. Tu paga por semana e já sai rodando hoje.',
  },
  {
    icon: <Wrench size={28} strokeWidth={1.75} />,
    title: 'Deu ruim na bike? A gente troca',
    description:
      'Manutenção e reparo já tão no plano. Você não tira mais nada do bolso.',
  },
  {
    icon: <MessageSquare size={28} strokeWidth={1.75} />,
    title: 'Suporte no Whats, todo dia',
    description:
      'Qualquer pepino, manda mensagem que a gente resolve rápido. Nada de ficar esperando.',
    image: '/images/benefit-support.webp',
  },
  {
    icon: <Battery size={28} strokeWidth={1.75} />,
    title: 'Bateria que aguenta o trampo inteiro',
    description:
      'Até 60km com uma carga. Dá pra rodar o dia todo de boa sem precisar recarregar.',
  },
  {
    icon: <ShieldCheck size={28} strokeWidth={1.75} />,
    title: 'Não curtiu? Devolve sem multa',
    description:
      'Não tem contrato amarrando você. Se não rolar, devolve e pronto.',
  },
];

export function Benefits() {
  const [headerRef, headerVisible] = useInView(0.1);
  const [gridRef, gridVisible] = useInView(0.05);
  const [ctaRef, ctaVisible] = useInView(0.2);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div
          ref={headerRef}
          className={`${styles.header} ${headerVisible ? styles.headerVisible : ''}`}
        >
          <span className={styles.eyebrow}>Vantagens</span>
          <h2 className={styles.title}>
            Por que{' '}
            <span className={styles.titleHighlight}>347 entregadores</span>{' '}
            já tão com a ViRe?
          </h2>
          <p className={styles.subtitle}>
            Tudo aqui foi feito pensando em quem roda de bike todo dia no Rio.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className={`${styles.grid} ${gridVisible ? styles.gridVisible : ''}`}
        >
          {benefits.map((benefit, index) => (
            <article
              key={benefit.title}
              className={`${styles.card} ${benefit.featured ? styles.cardFeatured : ''} ${benefit.image && !benefit.featured ? styles.cardWithImage : ''}`}
              style={{ '--delay': `${index * 80}ms` } as React.CSSProperties}
            >
              {/* Image for featured/image cards */}
              {benefit.image && (
                <div className={styles.cardImageWrapper}>
                  <img
                    src={benefit.image}
                    alt=""
                    className={styles.cardImage}
                    loading="lazy"
                  />
                  <div className={styles.cardImageOverlay} />
                </div>
              )}

              <div className={styles.cardContent}>
                <div className={styles.iconWrapper} aria-hidden="true">
                  {benefit.icon}
                </div>
                <h3 className={styles.cardTitle}>{benefit.title}</h3>
                <p className={styles.cardDescription}>{benefit.description}</p>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          className={`${styles.ctaWrapper} ${ctaVisible ? styles.ctaVisible : ''}`}
        >
          <a
            href={whatsappLinks.generic}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
            aria-label="Quero minha bike elétrica, abrir WhatsApp"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Quero minha bike elétrica
          </a>
          <span className={styles.ctaNote}>
            A gente responde em menos de 5 minutos no horário comercial
          </span>
        </div>
      </div>
    </section>
  );
}
