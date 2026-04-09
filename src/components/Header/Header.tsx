import { useEffect, useState } from 'react';
import { Zap, Menu, X } from 'lucide-react';
import { whatsappLinks } from '../../utils/whatsapp';
import styles from './Header.module.css';

const NAV_LINKS = [
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Planos', href: '#planos' },
  { label: 'Cadastro', href: '#cadastro' },
  { label: 'Dúvidas', href: '#duvidas' },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fecha menu mobile ao clicar em link
  const handleNavClick = () => setMobileOpen(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        {/* Logo */}
        <a href="#" className={styles.logo} aria-label="ViRe Mobi — voltar ao início">
          <span className={styles.logoIcon}>
            <Zap size={18} strokeWidth={2.5} aria-hidden="true" />
          </span>
          <span className={styles.logoText}>ViRe</span>
          <span className={styles.logoSub}>mobi</span>
        </a>

        {/* Nav desktop */}
        <nav className={styles.nav} aria-label="Menu principal">
          <ul className={styles.navList} role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.navLink}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA desktop */}
        <a
          href={whatsappLinks.generic}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.cta} ${styles.ctaDesktop}`}
          aria-label="Quero minha bike elétrica — abrir WhatsApp"
        >
          Quero minha bike
        </a>

        {/* CTA mobile */}
        <div className={styles.mobileActions}>
          <a
            href={whatsappLinks.generic}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.cta} ${styles.ctaMobile}`}
            aria-label="Fale conosco pelo WhatsApp"
          >
            Fale conosco
          </a>
          <button
            className={styles.menuToggle}
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Drawer mobile */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!mobileOpen}
      >
        <nav aria-label="Menu mobile">
          <ul className={styles.mobileNavList} role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={handleNavClick}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
