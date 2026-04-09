import { MessageCircle } from 'lucide-react';
import { whatsappLinks } from '../../utils/whatsapp';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo} aria-label="ViRe Mobilidade">
          <span className={styles.logoText}>ViRe</span>
          <span className={styles.logoIcon} aria-hidden="true">⚡</span>
        </div>

        {/* Copyright */}
        <p className={styles.copyright}>
          © 2026 ViRe Mobilidade. Todos os direitos reservados.
        </p>

        {/* Link WhatsApp */}
        <a
          href={whatsappLinks.generic}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappLink}
          aria-label="Fale conosco pelo WhatsApp"
        >
          <MessageCircle size={16} aria-hidden="true" />
          Fale conosco no WhatsApp
        </a>
      </div>
    </footer>
  );
}
