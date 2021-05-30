 'use strict'

 const getScrollSize = function() {
     const outer = document.createElement('div');
     const inner = document.createElement('div');
     outer.style.overflow = 'scroll';
     outer.classList.add('scrollbar');
     document.body.appendChild(outer);
     outer.appendChild(inner);
     const scrollbarSize = outer.offsetWidth - inner.offsetWidth;
     document.body.removeChild(outer);
     return scrollbarSize;
 }



document.addEventListener("DOMContentLoaded", function(event) {
   console.log('Проклятый старый DOM построен!');
   // Добавление кастомного свойства с системной шириной скролла
   document.documentElement.style.setProperty('--css-scroll-size', `${getScrollSize()}px`);


    //= ../blocks/burger/burger.js
    //= ../blocks/modal/modal.js

     //= ../blocks/slider/slider.js
     //= ../blocks/tabs/tabs.js
     //= ../blocks/accordion/accordion.js
     //= ../blocks/smooth-scroll-link/smooth-scroll-link.js
     //= ../blocks/field-select/field-select.js

     // window.addEventListener('resize', function(event) {
     //     ...
     // }, true);
 });

 // window.onload = function() {
 //     alert('Страница со всеми стилями и другими ресурсами загружена');
 // };