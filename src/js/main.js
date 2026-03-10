'use strict'

/* ==========================================================================
   Бургер / мобильное меню
   ========================================================================== */

const burgers = document.querySelectorAll('.burger')

burgers.forEach(function (burger) {
    burger.addEventListener('click', function (event) {
        const btn = event.currentTarget
        const targetId = btn.getAttribute('data-target-id')
        const targetClassToggle = btn.getAttribute('data-target-class-toggle')
        if (targetId && targetClassToggle) {
            btn.classList.toggle('burger--close')
            document.getElementById(targetId).classList.toggle(targetClassToggle)
            const isOpen = btn.classList.contains('burger--close')
            btn.setAttribute('aria-expanded', String(isOpen))
        }
    })
})

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        burgers.forEach(function (burger) {
            const targetId = burger.getAttribute('data-target-id')
            const targetClassToggle = burger.getAttribute('data-target-class-toggle')
            if (targetId && targetClassToggle) {
                const target = document.getElementById(targetId)
                if (target && target.classList.contains(targetClassToggle)) {
                    burger.classList.remove('burger--close')
                    target.classList.remove(targetClassToggle)
                    burger.setAttribute('aria-expanded', 'false')
                }
            }
        })
    }
})

/* ==========================================================================
   Аккордеон
   ========================================================================== */

function initAccordion(element) {
    const titles = Array.from(element.getElementsByClassName('accordion__title'))
    const contents = Array.from(element.getElementsByClassName('accordion__content'))

    titles.forEach(function (title) {
        title.addEventListener('click', function () {
            onAccordionTitleClick(title, titles, contents)
        })
    })
}

function onAccordionTitleClick(title, titles, contents) {
    titles.forEach(function (t) {
        if (t !== title) {
            t.classList.remove('accordion__title--active')
            t.closest('.accordion__section').classList.remove('accordion__section--active')
        }
    })

    title.classList.toggle('accordion__title--active')
    title.closest('.accordion__section').classList.toggle('accordion__section--active')

    const content = title.nextElementSibling
    const hasOpen = titles.some(function (t) {
        return t.classList.contains('accordion__title--active')
    })
    title.closest('.accordion').classList.toggle('accordion--open', hasOpen)

    contents.forEach(function (c) {
        if (c !== content && c.style.maxHeight) {
            c.style.maxHeight = null
        }
    })

    content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + 'px'
}

document.querySelectorAll('.accordion').forEach(function (el) {
    initAccordion(el)
})

/* ==========================================================================
   Табы
   ========================================================================== */

if (location.hash) {
    showTab(location.hash)
}

document.addEventListener('click', function (event) {
    if (event.target.dataset.toggle === 'tab') {
        event.preventDefault()
        const target = event.target.hash === undefined ? event.target.dataset.target : event.target.hash
        if (target !== undefined) {
            showTab(target)
            if (history && history.pushState && history.replaceState) {
                const stateObject = {url: target}
                if (window.location.hash && stateObject.url !== window.location.hash) {
                    window.history.pushState(stateObject, document.title, window.location.pathname + target)
                } else {
                    window.history.replaceState(stateObject, document.title, window.location.pathname + target)
                }
            }
        }
    }
})

function showTab(tabId) {
    const tabsEl = document.querySelector('.tabs')
    if (!tabsEl) {
        return
    }

    const element = document.querySelector(tabId)
    if (!element || !element.classList.contains('tabs__content-item')) {
        return
    }

    const tabsParent = element.closest('.tabs')
    const activeTabClassName = 'tabs__link-wrap--active'
    const activeTabContentClassName = 'tabs__content-item--active'

    tabsParent.querySelectorAll('.' + activeTabClassName).forEach(function (item) {
        item.classList.remove(activeTabClassName)
    })

    const activeTab =
        tabsParent.querySelector('[href="' + tabId + '"]') ||
        tabsParent.querySelector('[data-target="' + tabId + '"]')
    activeTab.closest('.tabs__link-wrap').classList.add(activeTabClassName)

    tabsParent.querySelectorAll('.' + activeTabContentClassName).forEach(function (item) {
        item.classList.remove(activeTabContentClassName)
    })
    tabsParent.querySelector(tabId).classList.add(activeTabContentClassName)
}

/* ==========================================================================
   Модальное окно
   ========================================================================== */

function getScrollSize() {
    const div = document.createElement('div')
    div.style.cssText = 'width:99px;height:99px;overflow:scroll;position:absolute;top:-9999px;'
    document.body.appendChild(div)
    const scrollSize = div.offsetWidth - div.clientWidth
    document.body.removeChild(div)
    return scrollSize
}

const bodyPaddingRightOriginal = parseInt(window.getComputedStyle(document.body, null).getPropertyValue('padding-right'), 10)
const backdrop = document.createElement('div')

document.addEventListener('click', function (event) {
    const target = event.target.closest('a[data-modal], button[data-modal]')

    if (target && target.dataset.modal === 'open') {
        showModal(document.getElementById((target.hash || target.dataset.modalTarget).slice(1)))
    }

    if ((target && target.dataset.modal === 'close') || event.target.matches('[aria-modal]')) {
        closeAllModals()
    }
})

function showModal(targetModalNode) {
    if ((document.body.clientHeight - document.documentElement.clientHeight) > 0) {
        document.body.style.paddingRight = bodyPaddingRightOriginal + getScrollSize() + 'px'
    }
    document.body.classList.add('modal-open')
    targetModalNode.classList.add('modal--show')
    targetModalNode.style.display = 'block'
    targetModalNode.ariaModal = true
    targetModalNode.ariaHidden = null
    targetModalNode.setAttribute('role', 'dialog')
    backdrop.className = 'modal-backdrop'
    document.body.append(backdrop)
}

function closeAllModals() {
    document.body.classList.remove('modal-open')
    document.body.style.paddingRight = ''

    document.querySelectorAll('.modal').forEach(function (modal) {
        modal.classList.remove('modal--show')
        modal.style.display = 'none'
        modal.ariaModal = null
        modal.ariaHidden = true
        modal.removeAttribute('role')
    })

    backdrop.remove()
}

/* ==========================================================================
   Инпут количества
   ========================================================================== */

document.querySelectorAll('.field-num').forEach(function (field) {
    const input = field.querySelector('.field-num__input')
    const valueMin = input.getAttribute('min') ? +input.getAttribute('min') : -Infinity
    const valueMax = input.getAttribute('max') ? +input.getAttribute('max') : Infinity
    const valueStep = input.getAttribute('step') ? +input.getAttribute('step') : 1

    field.addEventListener('click', function (event) {
        if (event.target.classList.contains('field-num__btn') && !input.getAttribute('disabled')) {
            let num = parseInt(input.value, 10)
            if (isNaN(num)) {
                num = 0
            }
            if (event.target.classList.contains('field-num__btn--plus')) {
                if (num < valueMax) {
                    input.value = num + valueStep
                }
            }
            if (event.target.classList.contains('field-num__btn--minus')) {
                if (num > valueMin) {
                    input.value = num - valueStep
                }
            }
        }
    })
})

/* ==========================================================================
   Кастомный селект (Choices.js)
   Подключить: https://joshuajohnson.co.uk/Choices/
   ========================================================================== */

// const selects = document.querySelectorAll('.field-select__select')
// selects.forEach(function (item) {
//     new Choices(item, {
//         searchEnabled: false,
//         placeholderValue: 'Выберите',
//         shouldSort: false,
//     })
// })

/* ==========================================================================
   Слайдер (Swiper)
   Подключить: https://swiperjs.com
   ========================================================================== */

// const swiper = new Swiper('.slider .swiper-container', {
//     loop: true,
//     pagination: {el: '.swiper-pagination'},
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },
// })
