'use strict'

document.addEventListener('DOMContentLoaded', function () {
    // Плавный скролл до якоря
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(anchor.getAttribute('href'))
            if (target) {
                e.preventDefault()
                target.scrollIntoView({behavior: 'smooth'})
            }
        })
    })
})
