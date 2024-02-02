/**
*
* --------------------------------------------------------------------
*
* Template : pivotal - Machine Learning AI Startup WordPress Theme
*
* --------------------------------------------------------------------
*
**/

(function($) {
    "use strict";
    // sticky menu
    var header = $('.menu-sticky');
    var win = $(window);
    var headerinnerHeight = $(".header-inner").innerHeight();

    win.on('scroll', function() {
       var scroll = win.scrollTop();
       if (scroll < headerinnerHeight) {
           header.removeClass("sticky");
           
       } else {
           header.addClass("sticky");
       }
    });

    $('.header-inner').waypoint('sticky', {
      offset: -10
    });

    $(".widget_nav_menu li a").filter(function(){
        return $.trim($(this).html()) == '';
    }).hide();



    // collapse hidden
    $(function(){ 
        var navMain = $(".navbar-collapse"); // avoid dependency on #id
         // "a:not([data-toggle])" - to avoid issues caused
         // when you have dropdown inside navbar
         navMain.on("click", "a:not([data-toggle])", null, function () {
             navMain.collapse('hide');
        });
     });

    // Trimming white space
    var rs_services2 = $('.rs-services2 p');
    if(rs_services2.length){
        $('.rs-services2 p').filter(function () { return $.trim(this.innerHTML) == "" }).remove();   
        $('.rs-services2 p').filter(function () { return this.innerHTML == "" }).remove();
    }
    
    // video 
    if ($('.player').length) {
        $(".player").YTPlayer();
    }


    //Flicker

    if ($('ul#rsflicker').length) { 
        $('ul#rsflicker').jflickrfeed({        
            limit: flicker_data.limit_f,
            qstrings: {
                id: flicker_data.flicker_id
            },
            itemTemplate: '<li><a href=\"http://www.flickr.com/photos/'+flicker_data.flicker_id+'"\"><img src=\"{{image_s}}\" alt=\"{{title}}\" /></a></li>'
        });
    }
   
    if ($('.rs-space').length) { 
        $('.rs-space').each(function( index ) {    
            var space_data     = jQuery.parseJSON( jQuery(this).find('.rs-space-data').attr('data-conf'));
            var uqid = space_data.uqid;
            var cl   = "rs-space-";
            var ml   = cl.concat(uqid);            
            var lg   = space_data.space_lg;
            var md  = space_data.space_md;
            var sm   = space_data.space_sm;
            var  xs  =space_data.space_xs;           
            if (window.matchMedia("(min-width: 992px)").matches){
               $('#' + ml).css('height', lg);   
            }
            if (window.matchMedia("(min-width: 768px) and (max-width: 991px)").matches){
               $('#' + ml).css('height', md);   
            }
            if (window.matchMedia("(min-width: 576px) and (max-width: 767px)").matches){
               $('#' + ml).css('height', sm);   
            }
            if (window.matchMedia("(max-width: 575px)").matches){
               $('#' + ml).css('height', xs);   
            }
            var mq = window.matchMedia( "(min-width: 992px)" );
            mq.addListener(function(){
              if (mq.matches) {
                $('#' + ml).css('height', lg);
              }
            });
            
            var mq1 = window.matchMedia( "(min-width: 768px) and (max-width: 991px)" );
            mq1.addListener(function(){
              if (mq1.matches) {
                $('#' + ml).css('height', md);
              }
            });

            var mq2 = window.matchMedia( "(min-width: 576px) and (max-width: 767px)" );
            mq2.addListener(function(){
              if (mq2.matches) {
                $('#' + ml).css('height', sm);
              }
            });

            var mq3 = window.matchMedia( "(max-width: 575px)" );
            mq3.addListener(function(){
              if (mq3.matches) {
                $('#' + ml).css('height', xs);
              }
            });
        });       
    }


 
    //Feature Left
    $('.image-carousel').owlCarousel({
        loop: true,
        items: 1,
        mouseDrag: true,
        dotsContainer: '#item-thumb',  
    });


    
    /*----------------------------
    Testimonial js active
    ------------------------------ */

    var sliderfor = $('.slider-for');
    if(sliderfor.length){
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: false,
            asNavFor: '.slider-nav',
        });
    }
    var slidernav = $('.slider-nav');
    if(slidernav.length){
        $('.slider-nav').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            dots: false,
            arrows: false,
            loop:true,
            vertical: true,
            centerMode: true,
            centerPadding: '0',
            focusOnSelect: true,
            directionNav: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        vertical: false,
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
              ]
        });
    }


    //Phone Number 

    $('.phone_call').on('click', function(event) {        
        $('.phone_num_call').slideToggle('show');
    });

    //search 

    $('.sticky_search').on('click', function(event) {        
        $('.sticky_form').slideToggle('show');
        $( '.sticky_form input' ).focus();
    });



    $('.sticky_search').on('click', function() {
        $('body').removeClass('search-active').removeClass('search-close');
          if ($(this).hasClass('close-full')) {
            $('body').addClass('search-close');
        }
        else {
            $('body').addClass('search-active');
        }
        return false;
    });



    $('.sticky_form_search').on('click', function() {      
        $('body, html').removeClass('rs-search-active').removeClass('rs-search-close');
          if ($(this).hasClass('close-search')) {
          $('body, html').addClass('rs-search-close');

        }
        else {
          $('body, html').addClass('rs-search-active');
        }
        return false;
    });

   

    //One page menu js
    if ($('.page-template-page-single-php .nav').length) {
        $('#single-menu li:first-child').addClass('active');
        $('#single-menu a').on('click', function(){
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
              var target = $(this.hash);
              target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
              $('#single-menu li').removeClass('active');
              $(this).parent('li').addClass('active');
              if (target.length) {
                $('html, body').animate({
                  scrollTop: (target.offset().top - 70)
                }, 1000, "easeInOutExpo");
                return false;
              }
            }
        });

        var navChildren = $("#single-menu li.menu-item").children("a");
        var aArray = [];
        for (var i = 0; i < navChildren.length; i++) {
            var aChild = navChildren[i];
            var ahref = $(aChild).attr('href');
            aArray.push(ahref);
        }

        $(window).on("scroll", function(){
            var windowPos = $(window).scrollTop();
            var windowHeight = $(window).height();
            var docHeight = $(document).height();
            for (var i = 0; i < aArray.length; i++) {
                var theID = aArray[i];
                var secPosition = $(theID).offset().top;
                secPosition = secPosition - 135;
                var divHeight = $(theID).height();
                divHeight = divHeight + 90;
                if (windowPos >= secPosition && windowPos < (secPosition + divHeight)) {
                    $("#single-menu a[href='" + theID + "']").parent().addClass("active");
                } else {
                    $("#single-menu a[href='" + theID + "']").parent().removeClass("active");
                }
            }
        });
    }

    // Get a quote popup

    $('.popup-quote').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#qname',
        removalDelay: 500, //delay removal by X to allow out-animation
        // When elemened is focused, some mobile browsers in some cases zoom in
        // It looks not nice, so we disable it:
        callbacks: {
            beforeOpen: function() {
                this.st.mainClass = this.st.el.attr('data-effect');
                if($(window).width() < 700) {
                    this.st.focus = false;
                } else {
                    this.st.focus = '#qname';
                }
            }
        }
    });


    // Canvas Menu Js
    $( ".nav-link-container > a" ).off("click").on("click", function(event){
        event.preventDefault();
        $(".nav-link-container").toggleClass("nav-inactive-menu-link-container");
        $(".mobile-menus").toggleClass("nav-active-menu-container");
    });
    
    $(".nav-close-menu-li > a").on('click', function(event){
        $(".mobile-menus").toggleClass("nav-active-menu-container");
        $(".content").toggleClass("inactive-body");
    });


      // Elements Animation
    if ($('.wow').length) {
        var wow = new WOW(
            {
                boxClass: 'wow', // animated element css class (default is wow)
                animateClass: 'animated', // animation css class (default is animated)
                offset: 0, // distance to the element when triggering the animation (default is 0)
                mobile: false, // trigger animations on mobile devices (default is true)
                live: true       // act on asynchronously loaded content (default is true)
            }
        );
        wow.init();
    }


    $(".rs-heading h3").each(function() {
  
      // Some Vars
      var elText,
          openSpan = '<span class="first-word">',
          closeSpan = '</span>';
      
      // Make the text into array
      elText = $(this).text().split(" ");
      
      // Adding the open span to the beginning of the array
      elText.unshift(openSpan);
      
      // Adding span closing after the first word in each sentence
      elText.splice(2, 0, closeSpan);
      
      // Make the array into string 
      elText = elText.join(" ");
      
      // Change the html of each element to style it
      $(this).html(elText);
    });
    

     // team init
    $(".team-carousel").each(function() {
        var options = $(this).data('carousel-options');
        $(this).owlCarousel(options); 
    });

    

        // partner init

    $(".partner-carousel").each(function() {
        var options = $(this).data('carousel-options');
        $(this).owlCarousel(options); 
    });
    
     // partner init

       $('.gallery-slider').slick({
       slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        focusOnSelect: true,
        dots: false,
        centerPadding: '228px',
        arrows: true,
        responsive: [{
            breakpoint: 1200,
            settings: {
                centerPadding: '188px',
            }
        }, {
            breakpoint: 970,
            settings: {
                arrows: true,
                centerPadding: '144px',
            }
        }, {
            breakpoint: 767,
            settings: {
                arrows: true,
                centerPadding: '0px',
            }
        }, {
            breakpoint: 350,
            settings: {
                arrows: false,
                centerPadding: '0px',
                dots: true,
                slidesToShow: 1,
            }
        }, ]
    });
    
    
    // testimonial init   
    $('.testi-carousel').slick({
          centerMode: true,
          centerPadding: '0px',
          slidesToShow: 3,
          focusOnSelect: true,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '0px',
                slidesToShow: 3
              }
            },
            {
              breakpoint: 480,
              settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '0px',
                slidesToShow: 1
              }
            }
          ]
        });
        
    
    $(".testi-item  a.tab").on('click', function(e){
          e.preventDefault();
          slideIndex = $(this).index();
          $( '.testi-carousel' ).slickGoTo( parseInt(slideIndex) );
    });

    // Portfolio Single Carousel
    if ($('.cdev').length) {
         $(".cdev").circlos();
    }

    // Portfolio Single Carousel
    if ($('.portfolio-carousel').length) {
        $('.portfolio-carousel').owlCarousel({
            loop: true,
            nav:true,
            autoHeight:true,
            items:1
        })
    }

    //for potfolio slider
   
    if ($('.portfolio-slider-data').length) {
      var sliderDots = "";
      if(portfolio_data.slider_dots==1){
        sliderDots = true;
      }
      var sliderNav = "";
      if(portfolio_data.nav==1){
        sliderNav = true;
      }

      $(".portfolio-slider-data").each(function() {
        $(".portfolio-slider-data").slick({
            slidesToShow: portfolio_data.col_lg,
            centerMode: false,
            dots: sliderDots,
            arrows: sliderNav,
            autoplay: portfolio_data.autoplay,
            slidesToScroll: 2,
            centerPadding: '15px',
            autoplaySpeed: portfolio_data.autoplaySpeed,
            pauseOnHover: portfolio_data.pauseOnHover,
            prevArrow:"<button type='button' class='slick-prev pull-left'><i class='glyph-icon flaticon-left-arrow' aria-hidden='true'></i></button>",
          nextArrow:"<button type='button' class='slick-next pull-right'><i class='glyph-icon flaticon-right-arrow' aria-hidden='true'></i></button>",
            responsive: [{
                breakpoint: 1400,
                settings: {
                    centerPadding: '15px',
                    slidesToShow: portfolio_data.col_lg,
                    slidesToScroll: 1,
                }
            }, 
            {
                breakpoint: 1200,
                settings: {
                    centerPadding: '15px',
                    slidesToShow: portfolio_data.col_md,
                    slidesToScroll: 1,
                }
            }, 
            {
                breakpoint: 767,
                settings: {
                    centerPadding: '10px',
                    slidesToShow: portfolio_data.col_sm,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    centerPadding: '5px',
                    slidesToShow: portfolio_data.col_xs,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 350,
                settings: {
                    centerPadding: '0px',
                    slidesToShow: portfolio_data.col_mobile,
                    slidesToScroll: 1,
                }
            }, ]
        });
      });
    }


    
    // blog init
    $(".blog-carousel").each(function() {
        var options = $(this).data('carousel-options');
        $(this).owlCarousel(options); 
    });


    $(function(){ 
        $( "ul.children" ).addClass( "sub-menu" );
    });

    $(".rs-products-grid .product-btn .button").addClass("glyph-icon flaticon-shopping-bag");
    
     //Videos popup jQuery activation code
    $('.popup-videos').magnificPopup({
        disableOn: 10,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    }); 
    //type writer
        $(".rs-banner .cd-words-wrapper p:first-child").addClass("is-visible");


    // collapse hidden
    $(function(){ 
         var navMain = $(".navbar-collapse"); // avoid dependency on #id
         // "a:not([data-toggle])" - to avoid issues caused
         // when you have dropdown inside navbar
         navMain.on("click", "a:not([data-toggle])", null, function () {
             navMain.collapse('hide');
         });

     });


    //CountDown Timer
    var CountTimer = $('.CountDownTimer');
    if(CountTimer.length){       
        $(".CountDownTimer").TimeCircles({
            fg_width: 0.030,
            bg_width: 0.8,
            circle_bg_color: "#ffffff",
           
            time: {
                Days:{
                  text: countdown_data.day_text,                  
                },
                Hours:{
                  text: countdown_data.hour_text,                  
                },
                Minutes:{
                  text: countdown_data.min_text,                 
                },
                Seconds:{
                  text: countdown_data.sec_text,                  
                }
            }
        }); 
    }


    if ($('div').hasClass('openingfoot')) {
        $('body').addClass('openingfootwrap');
    }

    //CountDown Timer
    var CountTimer = $('.CountDownTimer4');
    if(CountTimer.length){ 
        $(".CountDownTimer4").TimeCircles({}); 
    }

  //preloader
    $(window).on( 'load', function() {
        $("#pivotal-load").delay(1000).fadeOut(500);
        $(".pivotal-loader").delay(1000).fadeOut(500);

	    if($(window).width() < 992) {
	      	$('.rs-menu').css('height', '0');
	      	$('.rs-menu').css('opacity', '0');
	      	$('.rs-menu').css('z-index', '-1');
	      	$('.rs-menu-toggle').on( 'click', function(){
	         	$('.rs-menu').css('opacity', '1');
	         	$('.rs-menu').css('z-index', '1');
	     	});
	    }
    })

    // image loaded portfolio init
    $('.grid').imagesLoaded(function() {
        $('.portfolio-filter').on('click', 'button', function() {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({
                filter: filterValue
            });
        });
        var $grid = $('.grid').isotope({
            itemSelector: '.grid-item',
            percentPosition: true,
            masonry: {
                columnWidth: '.grid-item',
            }
        });
    });
            
    // portfolio Filter
    $('.portfolio-filter button').on('click', function(event) {
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        event.preventDefault();
    });    

     // magnificPopup init
    $('.image-popup').magnificPopup({
        type: 'image',
        callbacks: {
            beforeOpen: function() {
               this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure animated zoomInDown');
            }
        },
        gallery: {
            enabled: true
        }
    });

        
    // Counter Up  
    $('.rs-counter').counterUp({
        delay: 20,
        time: 1500
    });
    
    // scrollTop init
    var win=$(window);
    var totop = $('#scrollUp');    
    win.on('scroll', function() {
        if (win.scrollTop() > 150) {
            totop.fadeIn();
        } else {
            totop.fadeOut();
        }
    });
    totop.on('click', function() {
        $("html,body").animate({
            scrollTop: 0
        }, 500)
    });


    $(function(){ 
        $( "ul.children" ).addClass( "sub-menu" );
    });

    $(".sidenav .menu li").on('click', function() {
        $(this).children("ul.sub-menu").slideToggle();
    }); 
    $( ".comment-body, .comment-respond" ).wrap( "<div class='comment-full'></div>" ); 
    $('.rs-heading .description p:empty').remove();

    //services style js
    $(".rs-services-default a").on({
        mouseenter: function(){
          var title_hover = $(this).data('onhovercolor');           
          $(this).css('color', title_hover);            
      },
      mouseleave: function(){
          var title_color = $(this).data('onleavecolor'); 
          $(this).css('color', title_color);    
      }      
    }, this);

    //services style 11

    $(".process-inner").on({
       mouseenter: function(){

            var title_hover_color  = $(this).data('title-hover');
            var number_hover_color = $(this).data('number-hover');
            $(this).find(".number").css('color', number_hover_color);
            $(this).find("h4 a").css('color', title_hover_color);
        },
        mouseleave: function(){
            var icon_color = $(this).data('icon-color');
            var icon_bg    = $(this).data('icon-bg');  
            var title_color = $(this).data('title-color');          
            $(this).find(".services-icon i").css('color', icon_color); 
            $(this).find(".services-icon i").css('background-color', icon_bg);  
            $(this).find(".services-icon h2 a").css('color', title_color);    
        }      
    }, this);

  //services 2 style
  $(".services-style-2").on({
     mouseenter: function(){
        var title_hover = $(this).data('icon-hover');           
        $(this).find(".services-title a").css('color', title_hover);            
      },
      mouseleave: function(){
        var title_color = $(this).data('icon-color'); 
        $(this).find(".services-title a").css('color', title_color);    
      }      
  }, this);



   $(".rs-services1").on({
     mouseenter: function(){

          //border hover background
          var border_hover_bg = $(this).data('border-hover-bg');  
          $(this).find(".services-item .border_bottom").css('background', border_hover_bg);  

          var title_hover = $(this).data('title-onhovercolor');                 
          $(this).find(".services-title a").css('color', title_hover); 

          var text_color = $(this).data('data-data-onhovercolor');  
          $(this).find(".services-desc p").css('color', text_color);   

      },
      mouseleave: function(){

        var title_color = $(this).data('title-onleavecolor'); 
        $(this).find(".services-title a").css('color', title_color);
        var text_color = $(this).data('data-onleavecolor');   
        $(this).find(".services-desc p").css('color', text_color); 

        var leave_bg = $(this).data('leave-bg');
         $(this).find(".services-item").css('background', leave_bg);  

        //border background
        var border_primary_bg = $(this).data('border-primay-bg');          
        var border_secondary_bg = $(this).data('border-secondary-bg');
        var deg = '-150deg';
        $(this).find(".services-item .border_bottom").css({
          background: "linear-gradient("+deg+", "+border_primary_bg+", "+border_secondary_bg+")" 
        });     

      }      
  }, this);


  $('.rs-services1').each(function( index ){
      var primary_icon_color = $(this).data('icon-color');         
      var secondary_icon_color = $(this).data('icon-sec');      
      var deg = '0deg';
      var linear = 'linear-';
      $( "<style>.rs-services1 .services-wrap .services-item .services-icon .glyph-icon:before {background-image: "+linear+"gradient("+deg+", "+primary_icon_color+", "+secondary_icon_color+")  }</style>" ).appendTo( "head" );

      //service background
      var primary_bg = $(this).data('primay-bg');          
      var secondary_bg = $(this).data('secondary-bg');
      var deg = '-41deg';

      $( "<style>.rs-services1 .services-wrap .services-item:before {background: "+linear+"gradient("+deg+", "+primary_bg+", "+secondary_bg+")  }</style>" ).appendTo( "head" );




      //Border Style
      var border_primary_bg = $(this).data('border-primay-bg');          
      var border_secondary_bg = $(this).data('border-secondary-bg');
      var border_deg = '-150deg';
      var linear = 'linear-';
        $(this).find(".services-item .border_bottom").css({
            background: "linear-gradient("+border_deg+", "+border_primary_bg+", "+border_secondary_bg+")" 
        });
  });


  //Servies Two Style
  $(".rs-services2").on({
     mouseenter: function(){

          //border hover background
          var border_hover_bg = $(this).data('border-hover-bg');  
          $(this).find(".services-item .border_top, .services-item .border_bottom").css('background', border_hover_bg); 

          var title_hover = $(this).data('title-onhovercolor');                 
          $(this).find(".about-title a").css('color', title_hover); 
          var text_color = $(this).data('desc-onhovercolor');  
          $(this).find(".services-desc").css('color', text_color); 

          var icon_hover2 = $(this).data('icon-onhovercolor');  
          $(this).find(".services-item .services-icon i").css('color', icon_hover2); 

      },
      mouseleave: function(){

        var primary_bg = $(this).data('primay-bg');          
        var secondary_bg = $(this).data('secondary-bg');
        var deg = '-41deg';

        //border background
        var border_primary_bg = $(this).data('border-primay-bg');          
        var border_secondary_bg = $(this).data('border-secondary-bg');
        var deg = '-150deg';
        $(this).find(".services-item .border_top, .services-item .border_bottom").css({
          background: "linear-gradient("+deg+", "+border_primary_bg+", "+border_secondary_bg+")" 
        });


        var title_color = $(this).data('title-onleavecolor'); 
        $(this).find(".about-title a").css('color', title_color);
        var text_color = $(this).data('desc-onleavecolor');   
        $(this).find(".services-desc").css('color', text_color); 

        var leave_bg = $(this).data('leave-bg');
         $(this).find(".services-item").css('background', leave_bg); 

         var icon_color2 = $(this).data('icon-onleavecolor');  
         $(this).find(".services-item .services-icon i").css('color', icon_color2);       

      }      
  }, this);




  $('.rs-services2').each(function( index ){

      var title_color = $(this).data('title-onleavecolor'); 
      var primary_bg = $(this).data('primay-bg');          
      var secondary_bg = $(this).data('secondary-bg');
      var deg = '90deg';

      //Border Style
      var border_primary_bg = $(this).data('border-primay-bg');          
      var border_secondary_bg = $(this).data('border-secondary-bg');
      var border_deg = '-150deg';
      var linear = 'linear-';
        $(this).find(".services-item .border_top, .services-item .border_bottom").css({
            background: "linear-gradient("+border_deg+", "+border_primary_bg+", "+border_secondary_bg+")" 
        });  

      //service background
      var primary_bg = $(this).data('primay-bg');          
      var secondary_bg = $(this).data('secondary-bg');
      var deg = '-41deg';
      
      $( "<style>.services-main.rs-services2 .services-item:hover {background: "+primary_bg+" !important} </style>" ).appendTo( "head" );


  });




  //services 9 style
  $(".services-style-9 a, .rs-services-style4 a, .rs-services-style6 a, .rs-services .services-style-7 a, .services-style-8 a, .services-style-10 .number, .services-style-10 h4 a").on({
     mouseenter: function(){
          var title_hover = $(this).data('onhovercolor');           
          $(this).css('color', title_hover);            
      },
      mouseleave: function(){
          var title_color = $(this).data('onleavecolor'); 
          $(this).css('color', title_color);    
      }      
  }, this);


  // Heading 6
  $('.rs-heading.style6 ').each(function( index ){
      var borderColor     = $(this).find(".sub-text").data('border-color');
      $( "<style>.rs-heading.style6 .title-inner .sub-text::after { background: " + borderColor + " }</style>" ).appendTo( "head" );
  });

  // Heading 4
  $('.rs-heading.style4 ').each(function( index ){
      var borderColor     = $(this).find(".sub-text").data('border-color');
      $( "<style>.rs-heading.style4 .title-inner .sub-text:before, .rs-heading.style4 .title-inner .sub-text:after { background: " + borderColor + " }</style>" ).appendTo( "head" );
  });

   // Heading 11
  $('.rs-heading.style11').each(function( index ){
      var borderColor     = $(this).find(".title-inner").data('border-color');
      $( "<style>.rs-heading.style11 .title-inner:before { background: " + borderColor + " }</style>" ).appendTo( "head" );
  });

  // Heading 11 Center
  $('.rs-heading.style11.text-center').each(function( index ){
      var borderColor     = $(this).find(".title-inner").data('border-color');
      $( "<style>.rs-heading.style11.text-center .title-inner:before { background: " + borderColor + " }</style>" ).appendTo( "head" );
  });  

  // Heading 2
  $('.rs-heading.style2').each(function( index ){
      var borderColor     = $(this).find(".title-inner").data('border-color');
      $( "<style>.rs-heading.style2.text-center .title-inner .title:after { background: " + borderColor + " }</style>" ).appendTo( "head" );
  });



  $(".rs-btn a").on({
       mouseenter: function(){
            var btnBg = $(this).data('onhoverbg');                        
            var btnColor = $(this).data('onhovercolor');            
            $(this).css('background-color', btnBg);           
            $(this).css('color', btnColor);
        },
        mouseleave: function(){
            var btnHoverBg = $(this).data('onleavebg');
            var btnHoverColor = $(this).data('onleavecolor');
            $(this).css('background-color', btnHoverBg);
            $(this).css('color', btnHoverColor);   
        }      
  }, this);




  $(".rs-btn2 a").on({
       mouseenter: function(){
            var btnBg = $(this).data('onhoverbg');            
            var btnBorder = $(this).data('onhoverbg');    
                   
            $(this).css('background-color', btnBg);
          
            $(this).css('color', btnColor);
        },
        mouseleave: function(){
            var btnHoverBg = $(this).data('onleavebg');
            
            var btnHoverColor = $(this).data('onleavecolor');

            $(this).css('background-color', btnHoverBg);
            $(this).css('color', btnHoverColor);   
        }      
  }, this);

  $(".rs-cta .button-wrap a").on({
       mouseenter: function(){
            var btnBg = $(this).data('hoverbg');            
            var btnBorder = $(this).data('hoverborder');            
            var btnColor = $(this).data('hovertext');            

            $(this).css('background-color', btnBg);
            $(this).css('border-color', btnBorder);
            $(this).css('color', btnColor);
        },
        mouseleave: function(){
            var btnHoverBg = $(this).data('leavebg');
            var btnBorder = $(this).data('leaveborder');
            var btnHoverColor = $(this).data('leavecolor');

            $(this).css('background-color', btnHoverBg);
            $(this).css('border-color', btnBorder); 
            $(this).css('color', btnHoverColor);   
        }      
  }, this);

  /******************** Dots Particle **************************/
    if ($('.rs-particle-banner').length) {
      // Some random colors
      const colors = ["#3CC157", "#2AA7FF", "#f2d119", "#FCBC0F", "#F85F36"];

      const numBalls = 25;
      const balls = [];

      for (let i = 0; i < numBalls; i++) {
        let ball = document.createElement("div");
        ball.classList.add("ball");
        ball.style.background = colors[Math.floor(Math.random() * colors.length)];
        ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
        ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
        ball.style.transform = `scale(${Math.random()})`;
        ball.style.width = `${Math.random()}em`;
        ball.style.height = ball.style.width; 
        balls.push(ball);

        $('.rs-particle-banner').append(ball);
      }

      // Keyframes
      balls.forEach((el, i, ra) => {
        let to = {
          x: Math.random() * (i % 2 === 0 ? -11 : 11),
          y: Math.random() * 12
        };

        let anim = el.animate(
          [
            { transform: "translate(0, 0)" },
            { transform: `translate(${to.x}rem, ${to.y}rem)` }
          ],
          {
            duration: (Math.random() + 1) * 2000, // random duration
            direction: "alternate",
            fill: "both",
            iterations: Infinity,
            easing: "ease-in-out"
          }
        );
      });
    }    


    if ($('.personal-reviews').length) {
      // Some random colors
      const colors = ["#f14652", "#07bec4", "#ffc801", "#FCBC0F", "#f14652"];

      const numBalls = 50;
      const balls = [];

      for (let i = 0; i < numBalls; i++) {
        let ball = document.createElement("div");
        ball.classList.add("ball");
        ball.style.background = colors[Math.floor(Math.random() * colors.length)];
        ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
        ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
        ball.style.transform = `scale(${Math.random()})`;
        ball.style.width = `${Math.random()}em`;
        ball.style.height = ball.style.width; 
        balls.push(ball);

        $('.personal-reviews').append(ball);
      }

      // Keyframes
      balls.forEach((el, i, ra) => {
        let to = {
          x: Math.random() * (i % 2 === 0 ? -11 : 11),
          y: Math.random() * 12
        };

        let anim = el.animate(
          [
            { transform: "translate(0, 0)" },
            { transform: `translate(${to.x}rem, ${to.y}rem)` }
          ],
          {
            duration: (Math.random() + 1) * 2000, // random duration
            direction: "alternate",
            fill: "both",
            iterations: Infinity,
            easing: "ease-in-out"
          }
        );
      });
    }
 //woocommerce quantity style
    if ( ! String.prototype.getDecimals ) {
          String.prototype.getDecimals = function() {
              var num = this,
                  match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
              if ( ! match ) {
                  return 0;
              }
              return Math.max( 0, ( match[1] ? match[1].length : 0 ) - ( match[2] ? +match[2] : 0 ) );
          }
      }
    // Quantity "plus" and "minus" buttons
    $( document.body ).on( 'click', '.plus, .minus', function() {
        var $qty        = $( this ).closest( '.quantity' ).find( '.qty'),
            currentVal  = parseFloat( $qty.val() ),
            max         = parseFloat( $qty.attr( 'max' ) ),
            min         = parseFloat( $qty.attr( 'min' ) ),
            step        = $qty.attr( 'step' );

        // Format values
        if ( ! currentVal || currentVal === '' || currentVal === 'NaN' ) currentVal = 0;
        if ( max === '' || max === 'NaN' ) max = '';
        if ( min === '' || min === 'NaN' ) min = 0;
        if ( step === 'any' || step === '' || step === undefined || parseFloat( step ) === 'NaN' ) step = 1;

        // Change the value
        if ( $( this ).is( '.plus' ) ) {
            if ( max && ( currentVal >= max ) ) {
                $qty.val( max );
            } else {
                $qty.val( ( currentVal + parseFloat( step )).toFixed( step.getDecimals() ) );
            }
        } else {
            if ( min && ( currentVal <= min ) ) {
                $qty.val( min );
            } else if ( currentVal > 0 ) {
                $qty.val( ( currentVal - parseFloat( step )).toFixed( step.getDecimals() ) );
            }
        }

        // Trigger change event
        $qty.trigger( 'change' );
    });

})(jQuery);  