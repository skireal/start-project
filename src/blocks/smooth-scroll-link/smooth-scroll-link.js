/* Плавный скролл до якоря
===========================================================*/

let smoothScrollLinks = document.querySelectorAll('.smooth-scroll-link__link');

if (smoothScrollLinks.length > 0) {
	smoothScrollLinks.forEach(smoothScrollLink => {
		smoothScrollLink.addEventListener('click', onSmoothScrollLinkClick);
	});

	function onSmoothScrollLinkClick(e) {
		let smoothScrollLink = e.target;
		if (smoothScrollLink.dataset.goto && document.querySelector(smoothScrollLink.dataset.goto)) {
			let goToBlock = document.querySelector(smoothScrollLink.dataset.goto);
			let goToBlockOffset = goToBlock.getBoundingClientRect().top + pageYOffset - smoothScrollLink.closest('.smooth-scroll-link__wrapper').offsetHeight;

			window.scrollTo({
				top: goToBlockOffset,
				behavior: 'smooth'
			})
			e.preventDefault();
		}
	}
}
