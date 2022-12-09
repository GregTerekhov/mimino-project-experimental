function swiperSlider() {
  const swiperSliders = document.querySelectorAll('[data-slider="slider"]');
  const heroSliders = document.querySelectorAll('[data-slider="hero"]');
  const detailsSliders = document.querySelectorAll('[data-slider="details"]');
  if (swiperSliders) {
      swiperSliders.forEach(slider => {
          let arrowLeft = slider.querySelector('.swiper-button-prev');
          let arrowRight = slider.querySelector('.swiper-button-next');
          swiper = new Swiper(slider.querySelector('.swiper'), {
              slidesPerView: 2,
              //initialSlide: 4,
              spaceBetween: 25,
              // centeredSlides: true,
              //freeMode: true,
              loop: true,
              navigation: {
                  nextEl: arrowRight,
                  prevEl: arrowLeft,
              },
              breakpoints: {
                  // when window width is >= 320px
                  320: {
                      slidesPerView: 1.25,
                      spaceBetween: 25,
                  },
                  // when window width is >= 480px
                  1024: {
                      slidesPerView: 2,
                      spaceBetween: 40,
                  },
              },
          });
      });
  }
  //
  if (heroSliders) {
      heroSliders.forEach(slider => {
          let arrowLeft = slider.querySelector('.swiper-button-prev');
          let arrowRight = slider.querySelector('.swiper-button-next');
          swiper = new Swiper(slider.querySelector('.swiper'), {
              slidesPerView: auto,
              //initialSlide: 4,
            //   spaceBetween: 16,
              // centeredSlides: true,
              //freeMode: true,
              loop: true,
              navigation: {
                  nextEl: arrowRight,
                  prevEl: arrowLeft,
              },
            //   breakpoints: {
            //       // when window width is >= 320px
            //       320: {
            //           slidesPerView: 2,
            //           spaceBetween: 16,
            //       },
            //       // when window width is >= 480px
            //       1024: {
            //           slidesPerView: 2,
            //           spaceBetween: 40,
            //       },
            //   },
          });
      });
  }
  //
  if (detailsSliders) {
    detailsSliders.forEach(slider => {
        let arrowLeft = slider.querySelector('.swiper-button-prev');
        let arrowRight = slider.querySelector('.swiper-button-next');
        swiper = new Swiper(slider.querySelector('.swiper'), {
            slidesPerView: 2,
            //initialSlide: 4,
            spaceBetween: 20,
            // centeredSlides: true,
            //freeMode: true,
            loop: true,
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
            navigation: {
                nextEl: arrowRight,
                prevEl: arrowLeft,
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 1.292,
                    spaceBetween: 20,
                },
                // when window width is >= 480px
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 34,
                },
            },
        });
    });
}
}
window.addEventListener('load', swiperSlider);