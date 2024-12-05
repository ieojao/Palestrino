// Preloader - Animação de carregamento
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 2000);
  });
  
  // Animação do CTA
  const ctaButton = document.querySelector('.cta-button');
  ctaButton.addEventListener('mouseenter', () => {
    ctaButton.style.transform = 'scale(1.05)';
  });
  
  ctaButton.addEventListener('mouseleave', () => {
    ctaButton.style.transform = 'scale(1)';
  });
  