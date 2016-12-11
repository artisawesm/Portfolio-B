$(document).ready(function (){
    //=========== LOGO
    $('#a_1_').addClass('animated fadeInUp');
    $('#s_1_').addClass('animated fadeInUp');
    $('#d-bottom').addClass('animated fadeInDown');
    $('#d-top').addClass('animated fadeInLeft');

    //=========== FULLPAGE NAV
    $('#toggle').click(function() {
        $(this).toggleClass('active');
        $('#overlay').toggleClass('open');
    });

    //=========== FULLPAGE JS
    var awesmHeader = function($element){
        $($element).find('.awesm-header').addClass('animated fadeInLeftBig');
        setTimeout(function() {
            $($element).find('.awesm-header').removeClass('fadeInLeftBig');
            $($element).find('.awesm-header').addClass('fadeOutLeftBig');
        }, 3000);
    };

    $('.fullpage').fullpage({
        anchors: ['intro', 'projects', 'skills'],
        fitToSection: false,
        loopBottom: true,
        scrollBar: true,
        normalScrollElements: '.normalSroll',
        afterLoad: function(anchorLink){
            if (anchorLink == 'projects') {
                awesmHeader($('#project-section'));
            }else if (anchorLink == 'skills') {
                awesmHeader($('#skills-section'));
                $('.skill-level-val').animate({
                    width: '100px'
                }, 1000);
            }
        },
    });

    //=========== TYPED JS
    wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 10,
        mobile: true,
        live: true,
    });
    wow.init();

    //=========== TYPED JS
    $('.typed').typed({
        stringsElement: $('.toType'),
        typeSpeed: 15,
        backDelay: 1000,
        showCursor: true,
        startDelay: 500,
        callback: function(){
            $('#scroll-indicator').animate({
                opacity: 1
            }, 1000);
        }
    });

    //=========== MOVING BACKGROUND
    var movementStrength = 35;
    var height = movementStrength / $(window).height();
    var width = movementStrength / $(window).width();
    $('.top-image').mousemove(function(e) {
        var pageX = e.pageX - ($(window).width() / 2);
        var pageY = e.pageY - ($(window).height() / 2);
        var newvalueX = width * pageX * -1 - 25;
        var newvalueY = height * pageY * -1 - 50;
        $('.top-image').css('background-position', newvalueX + 'px     ' + newvalueY + 'px');
    });
});
