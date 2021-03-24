 /* Слайдеры https://swiperjs.com
    ===========================================================*/

 if ($('.slider').length) {
     let swiper = new Swiper('.slider .swiper-container', {
         // Optional parameters
         loop: true,

         // If we need pagination
         pagination: {
             el: '.swiper-pagination',
         },

         // Navigation arrows
         navigation: {
             nextEl: '.swiper-button-next',
             prevEl: '.swiper-button-prev',
         },

         // And if we need scrollbar
         scrollbar: {
             el: '.swiper-scrollbar',
         },
     });
 }