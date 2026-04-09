import { ChevronDown } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { FAQ_ITEMS } from '../../utils/constants';
import styles from './FAQ.module.css';

export function FAQ() {
  const [ref, isVisible] = useInView(0.1);

  return (
    <section
      id="duvidas"
      className={styles.section}
      aria-label="Perguntas frequentes"
    >
      <div
        ref={ref}
        className={`${styles.container} ${isVisible ? styles.visible : ''}`}
      >
        <h2 className={styles.title}>Tira-dúvidas rápido</h2>

        <div className={styles.list} role="list">
          {FAQ_ITEMS.map((item, index) => (
            <details
              key={index}
              className={styles.item}
              role="listitem"
            >
              <summary className={styles.summary}>
                <span className={styles.question}>{item.question}</span>
                <ChevronDown
                  className={styles.chevron}
                  size={20}
                  aria-hidden="true"
                />
              </summary>
              <div className={styles.answerWrapper}>
                <p className={styles.answer}>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
