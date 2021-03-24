// Аккордеон

let accordionTitle = document.getElementsByClassName('accordion__title');
let accordionContentList = document.getElementsByClassName('accordion__content');

for (var i = 0; i < accordionTitle.length; i++) {
    accordionTitle[i].addEventListener("click", function() {

        for (var i = 0; i < accordionTitle.length; i++) {
            if (accordionTitle[i] != this) {
                accordionTitle[i].classList.remove('accordion__title--active');
            }
            this.classList.toggle('accordion__title--active');
        }

        let accordionContent = this.nextElementSibling;
        for (var i = 0; i < accordionContentList.length; i++) {
            if (accordionContentList[i].style.maxHeight && accordionContentList[i] != this.nextElementSibling) {
                accordionContentList[i].style.maxHeight = null;
            }
        }
        if (accordionContent.style.maxHeight) {
            accordionContent.style.maxHeight = null;
        } else {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
        }
    });
}