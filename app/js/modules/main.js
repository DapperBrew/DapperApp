// Mobile Menu 


// Checks browser size. Returns either small, medium or large. 
  var checkMQ = function() {
    return window.getComputedStyle(document.querySelector('.main'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
  }

jQuery(document).ready(function(){

  // Cache DOM elements
  var header = $('.top'),
    sidebar = $('.side-nav'),
    sidebarTrigger = $('.nav-trigger'),
    topNavigation = $('.top-nav__menu'),
    addRecipe = $('.addrecipe__button');

  // Mobile only - open sidebar when user clicks the hamburger menu
  sidebarTrigger.on('click', function(event){
    event.preventDefault();
    $(sidebar).toggleClass('side-nav--visible');
    $(sidebarTrigger).toggleClass('nav-trigger--visible');
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
      //searchForm.removeClass('is-hidden').prependTo(sidebar);
    } else if ( ( mq == 'medium' || mq == 'large') &&  topNavigation.parents('.side-nav').length > 0 ) {
      detachElements();
      //searchForm.insertAfter(header.find('.cd-logo'));
      topNavigation.appendTo(header.find('.top-nav'));
      addRecipe.prependTo(header);
    }
    //checkSelected(mq);
    resizing = false;
  }

  function detachElements() {
    topNavigation.detach();
    addRecipe.detach();
    //searchForm.detach();
  }

})
