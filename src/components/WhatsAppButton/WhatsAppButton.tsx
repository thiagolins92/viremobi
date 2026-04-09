import { useEffect, useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { whatsappLinks } from '../../utils/whatsapp';
import styles from './WhatsAppButton.module.css';

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  // Ref apontando para o CTA do hero — passado via data-attribute ou buscado via querySelector
  const heroCTARef = useRef<Element | null>(null);

  useEffect(() => {
    // Busca o CTA principal do hero pelo data-attribute
    heroCTARef.current = document.querySelector('[data-hero-cta]');

    if (!heroCTARef.current) {
      // Hero CTA não encontrado: exibe o botão flutuante imediatamente
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Esconde o botão flutuante quando o hero CTA estiver visível
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(heroCTARef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`${styles.wrapper} ${isVisible ? styles.visible : ''}`}
      aria-hidden={!isVisible}
    >
      {/* Mobile: barra full-width no bottom */}
      <a
        href={whatsappLinks.generic}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.mobileBar}
        aria-label="Falar com a ViRe pelo WhatsApp"
        tabIndex={isVisible ? 0 : -1}
      >
        <MessageCircle size={20} aria-hidden="true" />
        Falar com a ViRe
      </a>

      {/* Desktop: botão circular */}
      <a
        href={whatsappLinks.generic}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.desktopFab}
        aria-label="Chamar no WhatsApp"
        tabIndex={isVisible ? 0 : -1}
      >
        <MessageCircle size={28} aria-hidden="true" />
      </a>
    </div>
  );
}
