import { useCallback, useRef } from 'react';

/**
 * Magnetic button effect — button subtly follows cursor on hover.
 * GPU-accelerated via transform. Resets on mouse leave.
 */
export function useMagneticEffect(strength = 0.3) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;

      // Respect reduced motion preference
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = '';
    el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    // Reset transition after animation completes
    setTimeout(() => {
      if (el) el.style.transition = '';
    }, 400);
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}
