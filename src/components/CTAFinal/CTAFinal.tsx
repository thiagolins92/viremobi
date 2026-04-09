import { MessageCircle, Phone } from 'lucide-react';
import { whatsappLinks } from '../../utils/whatsapp';
import { WHATSAPP_PHONE } from '../../utils/constants';
import { useInView } from '../../hooks/useInView';
import styles from './CTAFinal.module.css';

function formatPhone(phone: string): string {
  // 5521999999999 -> (21) 99999-9999
  const ddd = phone.slice(2, 4);
  const first = phone.slice(4, 9);
  const last = phone.slice(9);
  return `(${ddd}) ${first}-${last}`;
}

export function CTAFinal() {
  const [ref, isVisible] = useInView(0.1);

  return (
    <section
      ref={ref}
      className={`${styles.section} ${isVisible ? styles.visible : ''}`}
      aria-label="Chamada para ação final"
    >
      {/* Background image */}
      <img
        src="/images/hero-main.webp"
        alt=""
        aria-hidden="true"
        className={styles.bgImage}
        loading="lazy"
      />
      <div className={styles.bgOverlay} aria-hidden="true" />

      <div className={styles.container}>
        <h2 className={styles.title}>
          Bora resolver isso hoje?
        </h2>

        <p className={styles.subtitle}>
          Manda um oi no WhatsApp, em 24h tu já tá na rua com a bike elétrica faturando.
        </p>

        {/* Phone number visible */}
        <div className={styles.phoneDisplay}>
          <Phone size={20} aria-hidden="true" />
          <span className={styles.phoneNumber}>{formatPhone(WHATSAPP_PHONE)}</span>
        </div>

        <a
          href={whatsappLinks.generic}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaButton}
          aria-label="Chamar no WhatsApp para saber mais"
        >
          <MessageCircle size={24} aria-hidden="true" />
          Chamar no WhatsApp agora
        </a>

        {/* Urgency */}
        <div className={styles.urgency}>
          <span className={styles.urgencyDot} aria-hidden="true" />
          <span>Só tem 12 bikes disponíveis essa semana. Corre!</span>
        </div>

        <p className={styles.disclaimer}>
          Atendimento de seg a sáb, 8h às 20h
        </p>
      </div>
    </section>
  );
}
