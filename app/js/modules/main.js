// Mobile Menu 


// Checks browser size. Returns either small, medium or large. 
  var checkMQ = function() {
    return window.getComputedStyle(document.querySelector('.main'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
  }

jQuery(document).ready(function(){

  $(".side-nav").mCustomScrollbar({
    axis:"y",
    theme: "minimal"
  });

  // Cache DOM elements
  var header = $('.top'),
    sidebar = $('.side-nav'),
    sidebarTrigger = $('.nav-trigger'),
    topNavigation = $('.top-nav__menu'),
    addRecipe = $('.addrecipe__button');
    mainContent = $('.main');
    body = $('body');

  // Mobile only - open sidebar when user clicks the hamburger menu
  sidebarTrigger.on('click', function(event){
    event.preventDefault();
    $(sidebar).toggleClass('side-nav--visible');
    $(sidebarTrigger).toggleClass('nav-trigger--visible');
    $(body).toggleClass('no-scroll');
  });

  // On mobile, move certain elements form header into nav
  var resizing = false;
  moveNavigation();
  $(window).on('resize', function(){
    if( !resizing ) {
      (!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
      resizing = true;
    }
  });

  function moveNavigation(){
    var mq = checkMQ();
        
    if ( mq == 'small' && topNavigation.parents('.side-nav').length == 0 ) {
      detachElements();
      topNavigation.appendTo(sidebar);
      //addRecipe.appendTo(sidebar);
      addRecipe.prependTo(sidebar);
    } else if ( ( mq == 'medium' || mq == 'large') &&  topNavigation.parents('.side-nav').length > 0 ) {
      detachElements();
      topNavigation.appendTo(header.find('.top-nav'));
      addRecipe.prependTo(header);
    }
    //checkSelected(mq);
    resizing = false;
  }

  function detachElements() {
    topNavigation.detach();
    addRecipe.detach();
  }

})
