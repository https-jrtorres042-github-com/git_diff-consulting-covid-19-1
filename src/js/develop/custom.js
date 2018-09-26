function countUp( curr ){

    var num = curr.find('.cou').attr('data-count') * 1;
    var count = 50;
    var start = 0;
    var current = 0;

    var increment =  Math.floor( ( num - start ) / count );

    var timer = setInterval(function() {

        current += increment;        

        if (current >= num ) {            
            clearInterval(timer);
        } else {

            if (  current < 10 ){
                curr.find('.cou').html( '0' + current ) ;
            } else {
                curr.find('.cou').html( current ) ;
            }
            
        }

    }, 100);

}


$(document).ready(function(){

    if ( $('.pr-counters-wrap').length ){

        if ( $('html').attr('dir') == 'rtl'  ){
            $('.gallary-wrap .sliding-gal').slick({
                dots: false,
                infinite: true,
                speed: 600,
                fade : true,
                adaptiveHeight: false,
                prevArrow : $('.gallary-wrap .arrows .next '),
                nextArrow : $('.gallary-wrap .arrows .prev'),
            });
        } else {
            $('.gallary-wrap .sliding-gal').slick({
                dots: false,
                infinite: true,
                speed: 600,
                slidesToShow: 1,
                adaptiveHeight: false,
                prevArrow : $('.gallary-wrap .arrows .next '),
                nextArrow : $('.gallary-wrap .arrows .prev'),
            });
        }
    }

    if ( $('.pr-counters-wrap').length ){

        $(window).on('scroll', function(){
            $('.pr-counters-wrap .list-counters .item').each( function(){

                if( $(this).offset().top - $(window).scrollTop() < 2*$(window).height()/3 ){                        
                    if ( !$(this).hasClass('count') ){
                        countUp( $(this) );
                        $(this).addClass('count');
                    }
                }

            })

        })

    }


    $('.contact a').on('click', function(e){
        e.preventDefault();
        
        var dataID = $(this).attr('data-label');        
        var curr = $(this).attr('href');
        $( curr ).fadeIn(300);
        $( curr ).find('input[name=company_id]').val( dataID );
    });

    $('.contact-popup .closer').on('click', function(e){
        e.preventDefault();        
        $(this).closest('.contact-popup').fadeOut(300);
    });

    $('.contact-popup').on('click', function(e){
      //  e.preventDefault();
        if ( !$('.contact-popup .contein-form').is(event.target) && $('.contact-popup .contein-form').has(event.target).length === 0 ){
            $('.contact-popup').fadeOut(300);
        }
    });

});