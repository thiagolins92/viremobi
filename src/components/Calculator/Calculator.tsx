import { useState, useId } from 'react';
import { MessageCircle, TrendingUp, Bike } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { whatsappLinks } from '../../utils/whatsapp';
import styles from './Calculator.module.css';

const VALOR_ENTREGA = 7;
const ALUGUEL_MENSAL = 899;
const SEMANAS_MES = 4.33;

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function Calculator() {
  const [entregasPorDia, setEntregasPorDia] = useState(15);
  const [diasPorSemana, setDiasPorSemana] = useState(6);
  const [ref, isVisible] = useInView(0.1);

  const entregasIdLabel = useId();
  const diasIdLabel = useId();

  const brutoMensal = Math.round(entregasPorDia * diasPorSemana * SEMANAS_MES * VALOR_ENTREGA);
  const liquidoMensal = brutoMensal - ALUGUEL_MENSAL;

  // Simula entrega com bike normal (65% do rendimento da elétrica)
  const brutoNormal = Math.round(brutoMensal * 0.65);
  const ganhoExtra = brutoMensal - brutoNormal;

  const entregasPercent = ((entregasPorDia - 10) / (40 - 10)) * 100;
  const diasPercent = ((diasPorSemana - 5) / (7 - 5)) * 100;

  return (
    <section
      id="calculadora"
      className={styles.section}
      aria-label="Calculadora de faturamento"
    >
      <div
        ref={ref}
        className={`${styles.container} ${isVisible ? styles.visible : ''}`}
      >
        <div className={styles.header}>
          <span className={styles.eyebrow}>
            <TrendingUp size={16} />
            Simulador
          </span>
          <h2 className={styles.title}>
            Bota na ponta do lápis: quanto tu vai faturar?
          </h2>
        </div>

        <div className={styles.grid}>
          {/* Controls */}
          <div className={styles.controls}>
            <div className={styles.sliderGroup}>
              <div className={styles.sliderHeader}>
                <label htmlFor={entregasIdLabel} className={styles.sliderLabel}>
                  Entregas por dia
                </label>
                <span className={styles.sliderValue} aria-live="polite">
                  {entregasPorDia}
                </span>
              </div>
              <div className={styles.sliderTrack}>
                <input
                  id={entregasIdLabel}
                  type="range"
                  min={10}
                  max={40}
                  step={1}
                  value={entregasPorDia}
                  onChange={(e) => setEntregasPorDia(Number(e.target.value))}
                  className={styles.slider}
                  style={{ '--progress': `${entregasPercent}%` } as React.CSSProperties}
                />
              </div>
              <div className={styles.sliderMinMax}>
                <span>10</span>
                <span>40</span>
              </div>
            </div>

            <div className={styles.sliderGroup}>
              <div className={styles.sliderHeader}>
                <label htmlFor={diasIdLabel} className={styles.sliderLabel}>
                  Dias por semana
                </label>
                <span className={styles.sliderValue} aria-live="polite">
                  {diasPorSemana}
                </span>
              </div>
              <div className={styles.sliderTrack}>
                <input
                  id={diasIdLabel}
                  type="range"
                  min={5}
                  max={7}
                  step={1}
                  value={diasPorSemana}
                  onChange={(e) => setDiasPorSemana(Number(e.target.value))}
                  className={styles.slider}
                  style={{ '--progress': `${diasPercent}%` } as React.CSSProperties}
                />
              </div>
              <div className={styles.sliderMinMax}>
                <span>5</span>
                <span>7</span>
              </div>
            </div>

            {/* Comparison bar */}
            <div className={styles.comparison}>
              <div className={styles.compRow}>
                <span className={styles.compLabel}>
                  <Bike size={16} />
                  Bike normal
                </span>
                <span className={styles.compValue}>R$ {formatCurrency(brutoNormal)}/mês</span>
              </div>
              <div className={`${styles.compRow} ${styles.compRowHighlight}`}>
                <span className={styles.compLabel}>
                  <Bike size={16} />
                  Bike elétrica
                </span>
                <span className={styles.compValue}>R$ {formatCurrency(brutoMensal)}/mês</span>
              </div>
              <div className={styles.compExtra}>
                +R$ {formatCurrency(ganhoExtra)}/mês a mais com a elétrica
              </div>
            </div>
          </div>

          {/* Result */}
          <div className={styles.result} aria-live="polite" aria-atomic="true">
            <div className={styles.resultHeader}>
              <p className={styles.resultLabel}>Faturamento estimado</p>
            </div>

            <p className={styles.resultGross}>
              R$ {formatCurrency(brutoMensal)}<span className={styles.resultPeriod}>/mês</span>
            </p>

            <p className={styles.resultRent}>
              - R$ {formatCurrency(ALUGUEL_MENSAL)}/mês
              <span className={styles.resultRentNote}> (plano mensal)</span>
            </p>

            <div className={styles.divider} role="separator" />

            <p className={styles.resultNet}>
              R$ {formatCurrency(liquidoMensal)}
            </p>
            <p className={styles.resultNetLabel}>por mês no seu bolso</p>

            <p className={styles.resultNote}>
              E isso SEM contar gorjetas
            </p>
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.75rem', opacity: 0.6, marginTop: '0.5rem' }}>
          * Valores baseados na média de entregas iFood, 99Food e Rappi no Rio de Janeiro. Resultados podem variar.
        </p>

        <div className={styles.cta}>
          <a
            href={whatsappLinks.calculator}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            <MessageCircle size={20} aria-hidden="true" />
            Bora faturar assim? Chama no Whats
          </a>
        </div>
      </div>
    </section>
  );
}
