$(document).ready(function(){

    $("select").select2();

    if ( $('.testimonials-wrap').length ){
        $('.testimonials-wrap .contein-slider').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow : $('.testimonials-wrap .navigation .prev'),
            nextArrow : $('.testimonials-wrap .navigation .next')
        });
    }

    if( $('.first-wrap').length ){
        $('.first-wrap .side-slider').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            vertical: true,
            verticalSwiping : true,
            autoplay: true,
            autoplaySpeed: 2000,
            pauseOnHover : true,
            speed : 1000,
            arrows: false,
            dots: true,
        });
    }

});

$(window).on('load', function(){

});

$(window).resize(function(){

});