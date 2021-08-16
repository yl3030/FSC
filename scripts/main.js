//wow
new WOW().init();

// 首頁loading
$(document).ready(function(){
    setTimeout(function(){
        $(".loading_wrap").fadeOut(2786);
    },2786);            
})

// header shrink
$(document).on("scroll", function(){
	if ($(document).scrollTop() > 100){
		$("header").addClass("shrink");
	} else {
		$("header").removeClass("shrink");
	}	
});

$(".newsSlider").slick({
    dots: true,
    arrows:false,
    infinite: true,
    slidesToShow: 1,  
    slidesToScroll: 1, 
    autoplay:true
});


// ●the bars of the hamburger
$(document).ready(function(){
  $(".hamburger").click(function(){
    $(this).toggleClass("is-active");
  });
});
// ●data-target & offcanvas
var $toggler = $('.js-toggle-trigger');
$toggler.each(function ($el) {
    var _this = this;
    $(this).on('click', function (e) {
        e.preventDefault();
        var target = $(_this).data('target');
        var $target = $('#' + target);
        $(_this).toggleClass('active');
        $target.toggleClass('active');
    });
});
// ●hamburger & pageCover
var $mobileMenu = $('.header_menu');
if ($mobileMenu.length > 0) {
    $mobileMenu.on('click', function (e) {
        e.preventDefault();
        $('body').toggleClass('mmenu-opened');
    });
}
// ●close the hamburger
$('.pageCover').on('click', function () {
    $('.header_menu').click();
});


// :: homeSlide Active Code (owl.carousel)
if ($.fn.owlCarousel) {
    var welcomeSlide = $('.slideShow');

    welcomeSlide.owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        //navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        //navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
        navText: [' ', ' '],
        dots: true,
        autoplay: true,
        autoplayTimeout: 10000,
        smartSpeed: 500
    });

    welcomeSlide.on('translate.owl.carousel', function () {
        var slideLayer = $("[data-animation]");
        slideLayer.each(function () {
            var anim_name = $(this).data('animation');
            $(this).removeClass('animated ' + anim_name).css('opacity', '0');
        });
    });

    welcomeSlide.on('translated.owl.carousel', function () {
        var slideLayer = welcomeSlide.find('.owl-item.active').find("[data-animation]");
        slideLayer.each(function () {
            var anim_name = $(this).data('animation');
            $(this).addClass('animated ' + anim_name).css('opacity', '1');
        });
    });

    $("[data-delay]").each(function () {
        var anim_del = $(this).data('delay');
        $(this).css('animation-delay', anim_del);
    });

    $("[data-duration]").each(function () {
        var anim_dur = $(this).data('duration');
        $(this).css('animation-duration', anim_dur);
    });
}


// pagination
$('#myPage').twbsPagination({
  totalPages: 10,
  visiblePages: 5,
  next: ' ',
  prev: ' ',
  first: " ", 
  last: " ",         
});


//實績&方案
$('.randomShow > li').hoverPath(); 


//最新消息選擇器
$(document).ready(function(){
  $(".pdBurg").click(function(){
    $(this).toggleClass("is-active");
    $(".panel").slideToggle("500");
  });
});

//最新消息手風琴 
(function($) {
    //$('.accordion > li:eq(0) .heading').addClass('active').next().slideDown(); 
    $('.accordion .heading').click(function(j) {
        var dropDown = $(this).closest('li').find('.content');
        $(this).closest('.accordion').find('.content').not(dropDown).slideUp();
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).closest('.accordion').find('.heading.active').removeClass('active');
            $(this).addClass('active');
        }
        dropDown.stop(false, true).slideToggle();
        j.preventDefault();
    });
})(jQuery);  




