/* Плавный скролл до якоря
===========================================================*/

let smoothScrollLinks = document.querySelectorAll('.smooth-scroll-link');

if (smoothScrollLinks.length > 0) {
	smoothScrollLinks.forEach(smoothScrollLink => {
		smoothScrollLink.addEventListener('click', onSmoothScrollLinkClick);
	});

	function onSmoothScrollLinkClick(e) {
		let smoothScrollLink = e.target;
		if (smoothScrollLink.dataset.goto && document.querySelector(smoothScrollLink.dataset.goto)) {
			let goToBlock = document.querySelector(smoothScrollLink.dataset.goto);
			if(smoothScrollLink.closest('.smooth-scroll-link__wrapper')) {
				let goToBlockOffset = goToBlock.getBoundingClientRect().top + pageYOffset - smoothScrollLink.closest('.smooth-scroll-link__wrapper').offsetHeight;
			}

			else {
				let goToBlockOffset = goToBlock.getBoundingClientRect().top + pageYOffset - 10;
			}
			

			window.scrollTo({
				top: goToBlockOffset,
				behavior: 'smooth'
			})
			e.preventDefault();
		}
	}
}
