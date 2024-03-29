/*global $*/

$(function () {
    
    "use strict";

/*==================================
    * Author        : Ideas_Factory
    * Template Name : Riyad - Creative vCard / Resume / CV / Portfolio
==================================== */
    
/*=========== TABLE OF CONTENTS ===========

    01. Isotope Plugin
    02. Preloader
    03. Glitch Effect
    04. Window Height
    05. MagnifPopup Plugin
    06. Form Validation
    07. Check Screen
    08. Window Resize
    09. Slick plugin
    10. Menu
    11. Google Map
    12. Hover3d Plugin
    13. Skills
    14. SlimScroll Plugin
    15. Lettering Plugin
    16. Mouse Hover
    17. fitText plugin
    18. Type Plugin

======================================*/

    var $grid = $('.grid'),
        body = "body",
        i;

    $(window).on('load', function () {

        /*--------------------------------
            01. Isotope Plugin
        ----------------------------------*/
        $grid.isotope({
          // options...
            itemSelector: '.grid .item',
            percentPosition: true,
            masonry: {
                // use element for option
                columnWidth: '.grid .item:first-of-type'
            }
        });
        //-- filter items on button click --//
        $(".portfolio ul li").on('click', function () {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({ filter: filterValue });
            $(this).addClass("active_filter").siblings().removeClass("active_filter");
        });


        /*--------------------------------
            02. Preloader
        ----------------------------------*/
        $('.startLoad').fadeOut('slow');


        /*--------------------------------
            03. Glitch Effect
        ----------------------------------*/
        var elem = $(".content-wrapper h2"),
            elem_length = elem.length,
            curent_index = 1,
            curent_elem = elem.eq( curent_index );
            elem.eq(0).addClass('active animate');
            function nextWord(){
                elem.eq( curent_index ).addClass('active animate').siblings().removeClass('active animate');
                curent_index = (curent_index === elem_length -1) ? 0 : curent_index +1;
            }

        setInterval(function(){ 
            if ( $(body).hasClass('side-menu') ) {

                if ( $("section.home").hasClass('current_sec') ) {

                    if ( $(body).hasClass('animating') ){ return; } 
                    nextWord();
                }

            }else{
                nextWord();
            }

        }, 3000);
        
    });


    /*----------------------------------------------
        04. Window Height
    -----------------------------------------------*/
    $(".full_height").height($(window).height());


    /*--------------------------------
       05. MagnifPopup Plugin
    ----------------------------------*/
    var my_img = '.my_img',
        video_popup = '.video-popup',
        magnifPopup = function () {

        $(my_img).magnificPopup({
            type: 'image',
            removalDelay: 300,
            mainClass: 'mfp-with-zoom',
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true
            }
        });

    };
    // Call the functions 
    if( $(my_img).length ){

        magnifPopup();

    }

    $(video_popup).magnificPopup({
        type: 'iframe'
    });

    //Ajax Popup
    var contentDiv = '<div></div>',
        singleAjaxContent = ".mfp-wrap.portfolioAjaxContent";
    contentDiv = $(contentDiv).addClass('mfp-wrap mfp-close-btn-in mfp-auto-cursor portfolioAjaxContent animated mfp-ready');

    $('.ajax_popup').on('click', function (event) {

        event.preventDefault();
        $(contentDiv).load( $(this).attr('href'), function() {

            $(contentDiv).imagesLoaded( function() {
                $(contentDiv).find('.ajax-popup').append('<button title="Close (Esc)" type="button" class="mfp-close close_single">×</button>');
                $(body).append(contentDiv);

                $('.close_single').on('click', function (event) {
                    $(singleAjaxContent).addClass('mfp-removing');
                    setTimeout(
                      function() 
                      {
                        $(singleAjaxContent).removeClass('mfp-removing').remove();
                      }, 1300);
                });

            });

        });

    });


    /*--------------------------------
        06. Form Validation
    ----------------------------------*/
    $('.contact form .submit').on('click', function () {
        $('.contact form .form-control').removeClass("errorForm");
        $('.msg_success,.msg_error').css("display","");
        
        var error = false,
            name = $('.contact form input[type="text"]');
        
        if (name.val() === "" || name.val() === " ") {
            error = true;
            $(name).addClass("errorForm");
        }
        
        var email_compare = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
            email = $('.contact form input[type="email"]');
        
        if (email.val() === "" || email.val() === " ") {
            $(email).addClass("errorForm");
            error = true;
        } else if (!email_compare.test(email.val())) {
            $(email).addClass("errorForm");
            error = true;
        }
        
        var msg = $('.contact form textarea');
        
        if (msg.val() === "" || msg.val() === " ") {
            error = true;
            $(msg).addClass("errorForm");
            
        }
    
        if (error === true) {
            return false;
        }
        
        var data_string = $('.contact form').serialize();
        
    
        $.ajax({
            type: "POST",
            url: $('.contact form').attr('action'),
            data: data_string,
            
            success: function (message) {
                if (message === 'SENDING') {
                    $('.msg_success').fadeIn('slow');
                } else {
                    $('.msg_error').fadeIn('slow');
                }
            }
            
        });
        
        return false;
        
    });


    /*--------------------------------
        07. Check Screen
    ----------------------------------*/
    function check_screen() {
        
        if (Modernizr.mq('(max-width: 991px)')) {

            $(body).addClass('mobileScreen');

        } else {
            
            $(body).removeClass('mobileScreen');

        }
        
    }
    check_screen();


    /*--------------------------------
        08. Window Resize
    ----------------------------------*/
    $(window).on("resize", function () {

        check_screen();
        $(".full_height").height($(window).height());
        auto_hide_menu_scrollbar();

    });


    /*--------------------------------
        09. Slick plugin
    ----------------------------------*/ 
    if ( $(body).data( 'owl_slick' ) == null){
        var owl_slick = '.owl';
        $(owl_slick).slick({
            infinite: false,
            slidesToShow: 2,
            arrows: false,
            responsive: 
                [{
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 1,
                  }
                }]
        });

        $(body).data( 'owl_slick', 'active' );

        $('.prev-testi').on("click", function () {

            $(owl_slick).slick('slickPrev');

        });

        $('.next-testi').on("click", function () {

            $(owl_slick).slick('slickNext');

        });

    }


    /*--------------------------------
        10. Menu
    ----------------------------------*/
    $(".menu a:not(.loading)").on('click', function (event) {

        var elem = $(this);
        elem.addClass('loading');
        setTimeout(
          function() 
          {
            event.preventDefault();
            mainOrSection = "main";
            current_sec = elem.attr('href');
            anim_sec(".content--intro");
          }, 300);

    });

    //menu hover
    $(".menu .item h3").each(function() {
        $(this).attr('hover-name', $(this).text() );
    });

    $(".backToHome").on('click', function () {

        mainOrSection = "section";
        var sec = $(this).parents(".content").attr('id');
        anim_sec("#"+sec);

    });

    function open_sec_on_load() {

        if ( $(body).hasClass('side-menu') ){ return; } 
        var wind_hash = window.location.hash;
        if(wind_hash !='#home' && wind_hash !=''){
            if (!$(wind_hash).length){return;}

            mainOrSection = "main";
            current_sec = $(wind_hash);
            anim_sec(".content--intro");

        }
    }
    open_sec_on_load();

    //side menu
    $('.mob-menu .navbar-toggle,.mob-menu-overlay,.mob-menu-close').on('click', function (){

        $('.mob-menu-overlay,.mob-menu-close').fadeToggle();
        $('.side-left').toggleClass('open-side-left');

    });


    /*--------------------------------
        11. Google Map
    ----------------------------------*/
    var map = null;
    
    function googleMap(selector, lat, lng) {
        var myLatlng = new google.maps.LatLng(lat, lng);
        if (!map) {
            var myOptions = {
                zoom: 14,
                center: myLatlng,
                scrollwheel:false,
                mapTypeControl:false,
                streetViewControl:false,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}],
            };
            map = new google.maps.Map(document.getElementById(selector), myOptions);
            
            var marker = new google.maps.Marker({
                position:myLatlng,
                icon: 'assets/images/map-marker.png'
            });
            marker.setMap(map);
    
        } else {
            map.setCenter(myLatlng);
        }
        
    }

    if ($(".contact #map").length !== 0){

        $(".contact #map").show();
        googleMap("map", 32.5155093, -117.0370518,3);

    }


    /*--------------------------------
        12. Hover3d Plugin
    ----------------------------------*/
    var hover3d_active = false;
    $(".about .grid__item-img").on('mouseenter', function (event) {
        
        if(hover3d_active){return;}
        $(this).hover3d({
            selector: "canvas"
        });
        hover3d_active = true;

    });


    /*--------------------------------
        13. Skills
    ----------------------------------*/
   $(".skill").each(function() {
       $(this).find('.progress_bar').css( 'width', $(this).find(".percentage").text() );
   });


    /*--------------------------------
        14. SlimScroll Plugin
    ----------------------------------*/
    var mobileAndTabletcheck = function() {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    };

    if ( !mobileAndTabletcheck() ) {

        $("section .scroll__content").each(function(index) {
            $(this).slimScroll({
                    height: '100%',
                    opacity: '0.2'
            });
        });

        $(".side-left .menu-wrapper").slimScroll({
                height: '100%',
                opacity: '0.2',
                color: '#fff'
        });

    }

    function auto_hide_menu_scrollbar() {

        if ( $(body).hasClass('side-menu') && !mobileAndTabletcheck() ) {

            var menu_scrollbar = ".side-left .slimScrollBar";
            if ( ( $(".vertical-menu").height() +72 ) < $(window).height() ) {

                $(menu_scrollbar).addClass('hide');

            }else{

                $(menu_scrollbar).removeClass('hide');
                
            }

        }

    }
    auto_hide_menu_scrollbar();


    /*--------------------------------
        15. Lettering Plugin
    ----------------------------------*/
    $(".menu li a").each(function(index) {
        $(this).lettering();
    });


    /*--------------------------------
        16. Mouse Hover
    ----------------------------------*/
    $('.menu a').on({
        mouseenter: function(){
            mouseHover(this,"enter");
        },
        mouseleave: function(){
            mouseHover(this,"leave");
        }
    });

    function mouseHover(elem,type){

        $(elem).find("span").each(function(index, el) {

            TweenMax.to($(this), 0.4, {
                ease: Quad.easeOut,
                //delay: type === 'enter' ? index*.05 : index*.03,
                startAt: {y: type === 'enter' ? 10 : 10, opacity: 0},
                y: '0%',
                opacity: 1,
                color: type === 'enter' ? $(".loader").css("color") : "#fff",
                delay:index*.02
            });

        });

    }


    /*----------------------------------------------
        17. fitText plugin
    -----------------------------------------------*/
    function fitMyText(){

        var fit__text = $(".job h2"),
            fitText = $(".fit--text");
        
        if (fit__text.length){

            fit__text.fitText(1, { maxFontSize: 70 });

        }

        if (fitText.length){

            fitText.fitText(1, { maxFontSize: 60 });

        }

    }
    fitMyText();


    /*--------------------------------
        18. Type Plugin
    ----------------------------------*/
    var type_d = "#typed";

    if ( $(type_d).length ){

        var typed = new Typed(type_d, {
            stringsElement: '#typed-strings',
            typeSpeed: 90,
            backSpeed: 0,
            backDelay: 700,
            startDelay: 200,
            fadeOut: false,
            loop: true,
            showCursor: false
        });

    }



});
