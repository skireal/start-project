 'use strict'

 const ready = function(fn) {
     if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
         fn();
     } else {
         document.addEventListener('DOMContentLoaded', fn);
     }
 }

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



 ready(function() {
   console.log('Проклятый старый DOM построен!');
   // Добавление кастомного свойства с системной шириной скролла
   document.documentElement.style.setProperty('--css-scroll-size', `${getScrollSize()}px`);


    //= ../blocks/burger/burger.js
    //= ../blocks/modal/modal.js

     //= ../blocks/slider/slider.js
     //= ../blocks/tabs/tabs.js
     //= ../blocks/accordion/accordion.js

     // $(window).on('resize', function() {

     // });
 });



 // $(window).on('load', function() {

 // });