jQuery.browser = {};
jQuery.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
jQuery.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
jQuery.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
jQuery.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());

var scroller=jQuery.browser.webkit ? "body": "html";

$.scrollbarWidth=function(){var a,b,c;if(c===undefined){a=$('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');b=a.children();c=b.innerWidth()-b.height(99).innerWidth();a.remove()}return c};


/*GO TO href*/
function goTo(){
    $('nav a').click(function(e){
        e.preventDefault();
        var href = $(this).attr('href');
        var target = $(href).offset().top- $('header').height();
        $(scroller).animate({scrollTop:target},500);
    });
}


/*header buter*/
function headeButer(menuMobile,toggleMenu){
    if(menuMobile){
        menuMobile.click(function(event) {
            if($(window).width()<1024-$.scrollbarWidth()){
                $(this).toggleClass('active');
                toggleMenu.stop().slideToggle();
            }
        });

        $(document).on('click touchstart',function (event){
            if($(window).width()<1024-$.scrollbarWidth()){
                var div = toggleMenu;
                if (!div.is(event.target) && div.has(event.target).length === 0 && !menuMobile.is(event.target) && menuMobile.has(event.target).length === 0)
                    {
                        toggleMenu.slideUp();
                        menuMobile.removeClass('active');
                    }
            }
        });
    }
}


/* DOCUMENT READY  */
$(document).ready(function() {

    //oneHeightItems();
   // goTo();
});

jQuery(function($) {

    // MAD-RIPPLE // (jQ+CSS)
    $(document).on("mousedown", "[data-ripple]", function(e) {
  
      var $self = $(this);
  
      if($self.is(".btn-disabled")) {
        return;
      }
      if($self.closest("[data-ripple]")) {
        e.stopPropagation();
      }
  
      var initPos = $self.css("position"),
          offs = $self.offset(),
          x = e.pageX - offs.left,
          y = e.pageY - offs.top,
          dia = Math.min(this.offsetHeight, this.offsetWidth, 100), // start diameter
          $ripple = $('<div/>', {class : "ripple",appendTo : $self });
  
      if(!initPos || initPos==="static") {
        $self.css({position:"relative"});
      }
  
      $('<div/>', {
        class : "rippleWave",
        css : {
          background: $self.data("ripple"),
          width: dia,
          height: dia,
          left: x - (dia/2),
          top: y - (dia/2),
        },
        appendTo : $ripple,
        one : {
          animationend : function(){
            $ripple.remove();
          }
        }
      });
    });
  
});