/* Убираем скачок из-за того, что пропадает скролл
    ===========================================================*/

    function scrollbarWidth() {
        var documentWidth = parseInt(document.documentElement.clientWidth);
        var windowsWidth = parseInt(window.innerWidth);
        var scrollbarWidth = windowsWidth - documentWidth;
        return scrollbarWidth;
    }

    $('.burger').on('click', function() {
        let scrollbarWidth2 = scrollbarWidth();
        $('.header').toggleClass('header--openMenu');
        $('body').toggleClass('overflow');
        if ($(window).width() > (1440 + scrollbarWidth2)) {
            $('.header__wrapper').css({
                transform: `translateX(${-scrollbarWidth2/2}px)`
            });
            $('.openmenu__wrapper').css({
                transform: `translateX(${-scrollbarWidth2/2}px)`
            });
        }

    });