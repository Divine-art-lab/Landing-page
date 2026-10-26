document.addEventListener('DOMContentLoaded', () => {
  const testimonialSlider = document.querySelector('.testimonials-swiper');

  if (!testimonialSlider || typeof Swiper === 'undefined') return;

  new Swiper(testimonialSlider, {
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
      el: testimonialSlider.querySelector('.swiper-pagination'),
      clickable: true,
    },
    navigation: {
      nextEl: testimonialSlider.querySelector('.swiper-button-next'),
      prevEl: testimonialSlider.querySelector('.swiper-button-prev'),
    },
    breakpoints: {
      600: { slidesPerView: 2, spaceBetween: 18 },
      900: { slidesPerView: 3, spaceBetween: 22 },
    },
  });
});
