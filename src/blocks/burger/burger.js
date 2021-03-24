let burgers = document.querySelectorAll('.burger');

for (var i = 0; i < burgers.length; i++) {
    let burger = burgers[i];
    burger.addEventListener('click', showBurgerTarget);
}

function showBurgerTarget() {
    let targetId = this.getAttribute('data-target-id');
    let targetClassToggle = this.getAttribute('data-target-class-toggle');
    if (targetId && targetClassToggle) {
        this.classList.toggle('burger--close');
        document.getElementById(targetId).classList.toggle(targetClassToggle);
    }
}