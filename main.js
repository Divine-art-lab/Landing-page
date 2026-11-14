document.addEventListener('DOMContentLoaded', () => {
  // Six-hour countdown persists across refreshes in this browser.
  const hoursNode = document.getElementById('countdown-hours');
  const minutesNode = document.getElementById('countdown-minutes');
  const secondsNode = document.getElementById('countdown-seconds');

  if (hoursNode && minutesNode && secondsNode) {
    const key = 'bacfSixHourOfferDeadline';
    let deadline = Number(localStorage.getItem(key));
    if (!deadline || !Number.isFinite(deadline) || deadline <= Date.now()) {
      deadline = Date.now() + 6 * 60 * 60 * 1000;
      localStorage.setItem(key, String(deadline));
    }

    const updateCountdown = () => {
      const remaining = Math.max(0, deadline - Date.now());
      const total = Math.floor(remaining / 1000);
      hoursNode.textContent = String(Math.floor(total / 3600)).padStart(2, '0');
      minutesNode.textContent = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
      secondsNode.textContent = String(total % 60).padStart(2, '0');
      if (remaining <= 0) clearInterval(countdownInterval);
    };
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
  }

  // Tap any testimonial proof to view its full image.
  const images = document.querySelectorAll('.testimonials-swiper .testimonial-image img');
  if (images.length) {
    const overlay = document.createElement('div');
    overlay.className = 'testimonial-lightbox';
    overlay.hidden = true;
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Full testimonial image preview');

    const close = document.createElement('button');
    close.className = 'testimonial-lightbox-close';
    close.type = 'button';
    close.setAttribute('aria-label', 'Close image preview');
    close.innerHTML = '&times;';

    const fullImage = document.createElement('img');
    fullImage.alt = 'Full-size testimonial proof';
    overlay.append(close, fullImage);
    document.body.appendChild(overlay);

    const closeOverlay = () => {
      overlay.hidden = true;
      fullImage.removeAttribute('src');
    };

    images.forEach((img) => img.addEventListener('click', () => {
      fullImage.src = img.currentSrc || img.src;
      fullImage.alt = img.alt || 'Full-size testimonial proof';
      overlay.hidden = false;
    }));
    close.addEventListener('click', closeOverlay);
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) closeOverlay();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !overlay.hidden) closeOverlay();
    });
  }

  // Existing Swiper configuration; CDN loads before this file.
  const slider = document.querySelector('.testimonials-swiper');
  if (slider && typeof Swiper !== 'undefined') {
    new Swiper(slider, {
      slidesPerView: 1,
      spaceBetween: 16,
      loop: true,
      grabCursor: true,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: slider.querySelector('.swiper-pagination'),
        clickable: true,
      },
      navigation: {
        nextEl: slider.querySelector('.swiper-button-next'),
        prevEl: slider.querySelector('.swiper-button-prev'),
      },
      breakpoints: {
        600: { slidesPerView: 2, spaceBetween: 18 },
        900: { slidesPerView: 3, spaceBetween: 22 },
      },
    });
  }
});
