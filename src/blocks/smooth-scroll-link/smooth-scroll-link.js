/* Плавный скролл до якоря
===========================================================*/

let smoothScrollLinks = document.querySelectorAll('.smooth-scroll-link');
let goToBlockOffset;

if (smoothScrollLinks.length > 0) {
  smoothScrollLinks.forEach((smoothScrollLink) => {
    smoothScrollLink.addEventListener('click', onSmoothScrollLinkClick);
  });

  function onSmoothScrollLinkClick(e) {
    let smoothScrollLink = e.target;
    if (
      smoothScrollLink.dataset.goto &&
      document.querySelector(smoothScrollLink.dataset.goto)
    ) {
      let goToBlock = document.querySelector(smoothScrollLink.dataset.goto);
      if (smoothScrollLink.closest('.smooth-scroll-link__wrapper') != null) {
        goToBlockOffset =
          goToBlock.getBoundingClientRect().top -
          smoothScrollLink.closest('.smooth-scroll-link__wrapper').offsetHeight;
      } else {
        goToBlockOffset = goToBlock.getBoundingClientRect().top - 10;
      }

      window.scrollTo({
        top: goToBlockOffset,
        behavior: 'smooth',
      });
      e.preventDefault();
    }
  }
}
