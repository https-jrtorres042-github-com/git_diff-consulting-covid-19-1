function initMap() {
    var myLatLng = {lat: -25.363, lng: 131.044};

    // Create a map object and specify the DOM element
    // for display.
    var map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 14
    });

    // Create a marker and set its position.
    var marker = new google.maps.Marker({
      map: map,
      position: myLatLng,
      title: 'Hello World!'
    });
}

$(document).ready(function(){

    $("select").select2({
        minimumResultsForSearch: Infinity
    });

    if ( $('.testimonials-wrap').length ){
        $('.testimonials-wrap .contein-slider').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow : $('.testimonials-wrap .navigation .prev'),
            nextArrow : $('.testimonials-wrap .navigation .next'), 
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        dots: true
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        dots: true,
                        slidesToShow: 1,
                    }
                }
            ]
        });
    }

    if( $('.first-wrap').length ){
        $('.first-wrap .side-slider').slick({
            infinite: true,
            fade : true,
            //slidesToShow: 1,
            //slidesToScroll: 1,
            //autoplay: true,
            autoplaySpeed: 2000,
            pauseOnHover : true,
            speed : 1000,
            arrows: false,
            dots: true,
        });
    }

    if ( $('.articles-first').length ){

        if ( $('html').attr('dir') == 'rtl' ){

            $('.articles-first .topper-slider').slick({
                infinite: true,
                fade: true,
                prevArrow : $('.articles-first .contein-slider .next '),
                nextArrow : $('.articles-first .contein-slider .prev'),
                responsive: [
                    {
                        breakpoint: 767,
                        settings: {
                            dots: true
                        }
                    }
                ]
            });

        } else  {
            $('.articles-first .topper-slider').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                prevArrow : $('.articles-first .contein-slider .next '),
                nextArrow : $('.articles-first .contein-slider .prev'),
                responsive: [
                    {
                        breakpoint: 767,
                        settings: {
                            dots: true
                        }
                    }
                ]
            });
        }
    }

    $('.search-pop').on('click', function(e){
        e.preventDefault();
        $('#search-popup').addClass('open');
    });

    $('.close-some').on('click', function(e){
        e.preventDefault();
        $('#search-popup').removeClass('open');
    });

    $(window).on('scroll', function(){

        if ( $(window).scrollTop() > 10 ){
            $('header').addClass('scrolled');
        } else {
            $('header').removeClass('scrolled');
        }
        
    });
    
    if ( $('.list-accordion').length ){

        $('.list-accordion ').on('click', '.title-part', function(e){
            e.preventDefault();
            var curr = $(this);

            if ( $(this).hasClass('open') ){
                $(this).closest('.item').find('.hidden-part').slideUp(300, function(){
                    curr.removeClass('open');
                });
            } else {
                $('.list-accordion .title-part.open').closest('.item').find('.hidden-part').slideUp(300, function(){
                    $('.list-accordion .title-part.open').removeClass('open');
                });

                $(this).closest('.item').find('.hidden-part').slideDown(300, function(){
                    curr.addClass('open');
                });

            }
        });

    }

    if ( $('#hidden-menu').length ){

        var counter = 0;
        $('#hidden-menu nav>ul>li').each( function(){
            console.log( $(this).find('ul').length ); 
            if ( $(this).find('ul').length > 0 ){

                var clone = $(this).find('ul').html();
                var style = $(this).find('ul').css('background-image');
                $(this).find('ul').remove();
                $(this).append('<div class="plus" data-counter=layer'+ counter +'><span></span></div>');                    
                $('#hidden-menu').find('nav').append('<div class="layer2" data-visible=layer'+ counter +' style= background-image:'+ style +'><ul>'+ clone + '</ul></div>');                    
                counter++;
            }
        });

        $('#hidden-menu nav').on('click', function(){
            if ( !$('#hidden-menu nav>ul').is(event.target) && 
                $('#hidden-menu nav>ul').has(event.target).length === 0
                && !$('.layer2').is(event.target) && 
                $('.layer2').has(event.target).length === 0
            ){
                $('#hidden-menu').removeClass('activateMenu');
                $('#hidden-menu').fadeOut(300);
                $('.zoidberg').removeClass('active');
            }
        });

        $('.closer-fake').on('click', function(){            
            $('#hidden-menu').removeClass('activateMenu');
            $('#hidden-menu').fadeOut(300);
            $('.zoidberg').removeClass('active');
        });

    

        $('nav>ul>li').on('click', '.plus', function(){
            var blocker = $(this).attr('data-counter');

            if ( $(this).hasClass('active') ){

                $(this).removeClass('active');                    
                $('.layer2').removeClass('activate');
                
            } else {

                $('nav>ul>li .plus').removeClass('active');
                $(this).addClass('active');                    
                $('.layer2.activate').removeClass('activate');

                $('.layer2').each(function(){
                    if ( $(this).attr('data-visible') == blocker ){
                        $(this).addClass('activate');
                    }
                });
            }
        });


        $('.zoidberg').on('click', function(){
            if ( !$(this).hasClass('active') ){

                $(this).addClass('active')
                $('#hidden-menu').fadeIn(300, function(){
                    $(this).addClass('activateMenu');
                });

            } else {
                $(this).removeClass('active')
                $('#hidden-menu').removeClass('activateMenu');
                $('#hidden-menu').fadeOut(300);
            }

        });

    }

});

$(window).on('load', function(){

});

$(window).resize(function(){

});