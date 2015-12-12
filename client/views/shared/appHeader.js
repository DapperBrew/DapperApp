$(document).ready(function () {
  var topNotification = $('.top-notification'),
      topDropdown = $('.top-dropdown');

  topNotification.on('click', function(event){
    var mq = checkMQ();
    if ( mq == 'large' || mq == 'medium') {
      topDropdown.toggleClass('top-dropdown--active');
      event.stopPropagation();
    }
  })
});


$(document).on('click', function (e){
  var topDropdown = $(".top-dropdown");

  if (!topDropdown.is(e.target) && topDropdown.has(e.target).length === 0 ) {
    topDropdown.removeClass('top-dropdown--active');
  }
});