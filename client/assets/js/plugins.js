$(function() {

  "use strict";

  var window_width = $(window).width();

  /*Preloader*/
  $(window).load(function() {
    var loader = document.getElementsByClassName('loader-center');
    loader[0].style.display = 'none';
    setTimeout(function() {
      $('body').addClass('loaded');      
    }, 200);
  });  

  
  // Search class for focus
  $('.header-search-input').focus(
  function(){
      $(this).parent('div').addClass('header-search-wrapper-focus');
  }).blur(
  function(){
      $(this).parent('div').removeClass('header-search-wrapper-focus');
  });  

  
  // Materialize sideNav  

  //Main Left Sidebar Menu
  $('.sidebar-collapse').sideNav({
    edge: 'left', // Choose the horizontal origin    
  });

  // FULL SCREEN MENU (Layout 02)
  $('.menu-sidebar-collapse').sideNav({
        menuWidth: 240,
        edge: 'left', // Choose the horizontal origin     
        //closeOnClick:true, // Set if default menu open is true
        menuOut:false // Set if default menu open is true
        
      });

  // HORIZONTAL MENU (Layout 03)
  $('.dropdown-menu').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true // Displays dropdown below the button
    });

  
  //Main right Sidebar Chat
  $('.chat-collapse').sideNav({
    menuWidth: 300,
    edge: 'right',
  });
  
  
  
  
  
  $('.chat-close-collapse').click(function() {
    $('.chat-collapse').sideNav('hide');
  });
  $('.chat-collapsible').collapsible({
    accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
  });

  // Perfect Scrollbar
  $('select').not('.disabled').material_select();
  var leftnav = $(".page-topbar").height();

  
  // Fullscreen
  function toggleFullScreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      }
      else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      }
      else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    }
    else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      }
      else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      }
      else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  $('.toggle-fullscreen').click(function() {
    toggleFullScreen();
  });


  

  // Detect touch screen and enable scrollbar if necessary
  function is_touch_device() {
    try {
      document.createEvent("TouchEvent");
      return true;
    }
    catch (e) {
      return false;
    }
  }
  if (is_touch_device()) {
    $('#nav-mobile').css({
      overflow: 'auto'
    })
  }
}); // end of document ready