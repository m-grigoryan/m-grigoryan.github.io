// Decorative motion never controls content availability or navigation.
export function installMotion({ reduced, finePointer, root = document, observe = callback => new IntersectionObserver(callback, { threshold: .08, rootMargin: '0px 0px -24px 0px' }) }) {
  if (reduced) return () => {};
  const animations = new Set();
  const cards = [...root.querySelectorAll('#portfolio button.pointer-react, .certificate-card, .desktop-tool-card, .mobile-tool-card, #contacts .pointer-react')];
  const headings = [...root.querySelectorAll('.section-shell h2, .section-shell .section-lede')];
  const targets = [...headings, ...cards];
  const revealed = new WeakSet();
  const observer = observe(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting || revealed.has(entry.target)) continue;
      revealed.add(entry.target);
      observer.unobserve(entry.target);
      const element = entry.target;
      const index = [...(element.parentElement?.children || [])].indexOf(element);
      const animation = element.animate([
        { opacity: 0, translate: '0 44px', scale: '.97' },
        { opacity: 1, translate: '0 0', scale: '1' }
      ], { duration: 780, fill: 'backwards', delay: Math.min(Math.max(index, 0) * 65, 260), easing: 'cubic-bezier(.16,1,.3,1)' });
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    }
  });
  targets.forEach(element => observer.observe(element));

  const cleanups = [];
  if (finePointer) {
    for (const card of cards) {
      card.classList.add('motion-card');
      let frame = 0;
      function move(event) {
        const rect = card.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          card.style.setProperty('--tilt-x', `${(0.5 - y) * 5}deg`);
          card.style.setProperty('--tilt-y', `${(x - 0.5) * 5}deg`);
          card.style.setProperty('--mx', `${x * 100}%`);
          card.style.setProperty('--my', `${y * 100}%`);
          card.classList.add('pointer-lit');
        });
      }
      function leave() {
        cancelAnimationFrame(frame);
        card.style.removeProperty('--tilt-x');
        card.style.removeProperty('--tilt-y');
        card.classList.remove('pointer-lit');
      }
      card.addEventListener('pointermove', move, { passive: true });
      card.addEventListener('pointerleave', leave);
      cleanups.push(() => {
        leave(); card.classList.remove('motion-card');
        card.removeEventListener('pointermove', move);
        card.removeEventListener('pointerleave', leave);
      });
    }
  }
  return () => {
    observer.disconnect();
    animations.forEach(animation => animation.cancel());
    cleanups.forEach(cleanup => cleanup());
  };
}
