$(document).ready(function () {
    $(".top-nav__item--hover").hover(function () {
          $(this).find('.top-dropdown').toggleClass("top-dropdown--active");

    });
});