/*валидация формы*/
function validate(form, options){
    var setings = {
        errorFunction:null,
        submitFunction:null,
        highlightFunction:null,
        unhighlightFunction:null
    }
    $.extend(setings, options);

    var $form = $(form);

    if ($form.length && $form.attr('novalidate') === undefined) {
        $form.on('submit', function(e) {
            e.preventDefault();
        });

        $form.validate({
            errorClass : 'errorText',
            focusCleanup : true,
            focusInvalid : false,
            invalidHandler: function(event, validator) {
                if(typeof(setings.errorFunction) === 'function'){
                    setings.errorFunction(form);
                }
            },
            errorPlacement: function(error, element) {
                error.appendTo( element.closest('.form_input'));
            },
            highlight: function(element, errorClass, validClass) {
                $(element).addClass('error');
                $(element).closest('.form_row').addClass('error').removeClass('valid');
                if( typeof(setings.highlightFunction) === 'function' ) {
                    setings.highlightFunction(form);
                }
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).removeClass('error');
                if($(element).closest('.form_row').is('.error')){
                    $(element).closest('.form_row').removeClass('error').addClass('valid');
                }
                if( typeof(setings.unhighlightFunction) === 'function' ) {
                    setings.unhighlightFunction(form);
                }
            },
            submitHandler: function(form) {
                if( typeof(setings.submitFunction) === 'function' ) {
                    setings.submitFunction(form);
                } else {
                    $form[0].submit();
                }
            }
        });

        $('[required]',$form).each(function(){
            $(this).rules( "add", {
                required: true,
                messages: {
                    required: "Вы пропустили"
                }
            });
        });

        if($('[type="email"]',$form).length) {
            $('[type="email"]',$form).rules( "add",
            {
                messages: {
                    email: "Невалидный email"
                 }
            });
        }

        if($('.tel-mask[required]',$form).length){
            $('.tel-mask[required]',$form).rules("add",
            {
                messages:{
                    required:"Введите номер мобильного телефона."
                }
            });
        }

        $('[type="password"]',$form).each(function(){
            if($(this).is("#re_password") == true){
                $(this).rules("add", {
                    minlength:3,
                    equalTo:"#password",
                    messages:{
                        equalTo:"Неверный пароль.",
                        minlength:"Недостаточно символов."
                    }
                });
            }
        })
    }
}

/*Отправка формы с вызовом попапа*/
function validationCall(form){

  var thisForm = $(form);
  var formSur = thisForm.serialize();

    $.ajax({
        url : thisForm.attr('action'),
        data: formSur,
        method:'POST',
        success : function(data){
            if ( data.trim() == 'true') {
                thisForm.trigger("reset");
                popNext("#call_success");
            }
            else {
               thisForm.trigger('reset');
            }

        }
    });
}

function popNext(popupId){

    $.fancybox.open({
        src  : popupId,
        type : 'inline',
        opts : {
            afterClose: function(){
                $('form').trigger("reset");
            }
        }
    });

}

function storagePopup(){

    var date = Date.now() + 24 * 60 * 60 * 60;
    var nodate = Date.now();

    if ( localStorage.getItem('prolog_hash_timestamp') == '' || localStorage.getItem('prolog_hash_timestamp') == null ){

        localStorage.setItem('prolog_hash_timestamp', nodate );        
        setTimeout(function(){
            $.fancybox.open({
                src  : '#jumped-pop',
                type : 'inline',
            });
        }, 60000);

    } else {

        if (  localStorage.getItem('prolog_hash_timestamp') > date ){

            setTimeout(function(){
                $.fancybox.open({
                    src  : '#jumped-pop',
                    type : 'inline',
                });
            }, 60000)

        }
    }
}

function setCookie(name, value, options) {
    options = options || {};
  
    var expires = options.expires;
  
    if (typeof expires == "number" && expires) {
      var d = new Date();
      d.setTime(d.getTime() + expires * 1000);
      expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
      options.expires = expires.toUTCString();
    }
  
    value = encodeURIComponent(value);
  
    var updatedCookie = name + "=" + value;
  
    for (var propName in options) {
      updatedCookie += "; " + propName;
      var propValue = options[propName];
      if (propValue !== true) {
        updatedCookie += "=" + propValue;
      }
    }
  
    document.cookie = updatedCookie;
}

/*маска на инпуте*/
function Maskedinput(){
    if($('.tel-mask')){
        $('.tel-mask').mask('+9 (999) 999-99-99');
    }
}

$(document).ready(function(){

    storagePopup();

    $('.coockies-pop .butt').on('click', function(e){
        e.preventDefault();
        $('.coockies-pop').fadeOut(300);

        setCookie('prolog_coockie_sajest', 'true' , { expires: 3600 } );

    });

    $('.article-list-wrap .butt-load').on('click', function(e){
        e.preventDefault();
        console.log( 'click' );
    })

   validate('.contact-form-wrap form', {submitFunction:validationCall});
   Maskedinput();

});