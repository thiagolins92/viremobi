import styles from './Marquee.module.css';

const PHRASES = [
  '347+ entregadores rodando',
  'Mais entregas, menos canseira',
  'Começa sem pagar nada adiantado',
  'Manutenção por nossa conta',
  'Bateria que aguenta o trampo todo',
  'Suporte no Whats todo dia',
  'Morros do Rio? De boa',
  'A partir de R$249/sem',
  'Devolveu? Zero multa',
  'Em 2 semanas a bike se paga',
];

// Duplica as frases para criar loop contínuo
const items = [...PHRASES, ...PHRASES];

export function Marquee() {
  return (
    <div className={styles.marquee} aria-label="Destaques ViRe Mobi" role="marquee">
      <div className={styles.track}>
        {items.map((phrase, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.dot} aria-hidden="true" />
            {phrase}
          </span>
        ))}
      </div>
    </div>
  );
}
