/* ----------------------------------
           ANIMATIONS
---------------------------------- */

var mat_tl = gsap.timeline({repeat: -1, repeatDelay: 2.25, scrollTrigger: {
        trigger: "#mat_1",
        start: "bottom 90%",
        toggleActions: "play pause play pause"
    }});
    mat_tl
        .fromTo("#mat_1", {rotate: 0, scale: 1}, {duration: 0.5, rotate: 90, scale: 0.55, ease: "none"})
        .to("#mat_1", {duration: 0.65, rotate: 180, scale: 1, ease: "none"})
        .fromTo("#mat_1", {rotate: 180, scale: 1}, {duration: 0.5, rotate: 270, scale: 0.55, ease: "none"}, "+=2")
        .to("#mat_1", {duration: 0.65, rotate: 360, scale: 1, ease: "none"})


/* ----------------------------------

    SLIDER/NUMBER INTERACTIVITY  

---------------------------------- */

//SLICK JS Carousel
$('#slider_wrapper_5 .slide_container').slick({
    draggable: false,
    arrows: true,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    cssEase: 'ease-in-out'
});


//COUNTER FUNTIONALITY
$.fn.countTo = function (options) {
    // merge the default plugin settings with the custom options
    options = $.extend({}, $.fn.countTo.defaults, options || {});

    // how many times to update the value, and how much to increment the value on each update
    var loops = Math.ceil(options.speed / options.refreshInterval),
        increment = (options.to - options.from) / loops;

    return $(this).each(function () {
        var _this = this,
            loopCount = 0,
            value = options.from,
            interval = setInterval(updateTimer, options.refreshInterval);

        function updateTimer() {
            value += increment;
            loopCount++;
            $(_this).html(value.toFixed(options.decimals));

            if (typeof (options.onUpdate) == 'function') {
                options.onUpdate.call(_this, value);
            }

            if (loopCount >= loops) {
                clearInterval(interval);
                value = options.to;

                if (typeof (options.onComplete) == 'function') {
                    options.onComplete.call(_this, value);
                }
            }
        }
    });
};

$.fn.countTo.defaults = {
    from: 0,  // the number the element should start at
    to: 100,  // the number the element should end at
    speed: 100,  // how long it should take to count between the target numbers
    refreshInterval: 100,  // how often the element should be updated
    decimals: 0,  // the number of decimal places to show
    onUpdate: null,  // callback method for every time the element is updated,
    onComplete: null,  // callback method for when the element finishes updating
};

function countUp(target, score, duration, decimal) {
    if (score != 0) {
        $( target ).countTo({
            from: 0,
            to: score,
            speed: duration*1000, // convert to milliseconds
            refreshInterval: 20,
            decimals: decimal
        });   
    }
}



var completedcountUp0 = false,
    completedcountUp1 = false,
    completedcountUp2 = false,
    completedcountUp3 = false,
    completedcountUp4 = false,
    completedcountUp5 = false,
    completedcountUp6 = false,
    completedcountUp7 = false,
    completedcountUp8 = false;


// ON SLIDE EDGE HIT
$('.slide_container').on('afterChange', function(event, slick, currentSlide, nextSlide){
    number_animate(currentSlide);
});

/*$('.slide_container').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    setTimeout(function(){ $(".bg_number span").html("0"); }, 200); 
    gsap.to("#hand_5", {duration: 0.35, opacity: 0, display: "none"});
});*/


// COUNTER VARIABLES
function number_animate(slideNumber) {
    if (slideNumber == 0 && completedcountUp0 == false) {
        countUp("#count_5_1", 40, 1.5, 0);
        completedcountUp0 = true;
        $('#slider_wrapper_5 .slide_container').slick('refresh');
    } else if (slideNumber == 1 && completedcountUp1 == false) {
        countUp("#count_5_2", 44, 1.5, 0);
        completedcountUp1 = true;
        $('#slider_wrapper_5 .slide_container').slick('refresh');
    } else if (slideNumber == 2 && completedcountUp2 == false) {
        countUp("#count_5_3", 53, 1.5, 0);
        completedcountUp2 = true;
        $('#slider_wrapper_5 .slide_container').slick('refresh');
    } else if (slideNumber == 3 && completedcountUp3 == false)  {
        countUp("#count_5_4", 56.8, 1.5, 1);
        completedcountUp3 = true;
        $('#slider_wrapper_5 .slide_container').slick('refresh');
    } else if (slideNumber == 4 && completedcountUp4 == false)  {
        countUp("#count_5_5", 65, 1.5, 0);
        completedcountUp4 = true;
        $('#slider_wrapper_5 .slide_container').slick('refresh');
    } else if (slideNumber == 5 && completedcountUp5 == false)  {
        countUp("#count_5_6", 66, 1.5, 0);
        completedcountUp5 = true;
        $('#slider_wrapper_5 .slide_container').slick('refresh');
    } else if (slideNumber == 6 && completedcountUp6 == false)  {
        countUp("#count_5_7", 86, 1.5, 0);
        completedcountUp6 = true;
        $('#slider_wrapper_5 .slide_container').slick('refresh');
    } else if (slideNumber == 7 && completedcountUp7 == false)  {
        countUp("#count_5_8", 4.3, 1, 1);
        completedcountUp7 = true;
        $('#slider_wrapper_5 .slide_container').slick('refresh');
    } else if (slideNumber == 8 && completedcountUp8 == false)  {
        countUp("#count_5_9", 30, 1, 0);
        completedcountUp8 = true;
        $('#slider_wrapper_5 .slide_container').slick('refresh');
    }
}


//Slide_5_1 animating in        
ScrollTrigger.create({
    trigger: "#panel_5",
    start: "top 35%",
    onEnter: function({progress, direction, isActive}) {
        number_animate(0);
    }
});




/* -------------------------------

    CODE ENTRY INTERACTIVITY  

------------------------------- */

var entry = "";

$(".keypad_number").click(function() {
    $(this).addClass("active_number");
    var numb = $(this).data("numb");
    entry += numb;
    if (entry.length == 4) {
      check_code()
    }
});


function check_code() {
    if (entry == "1587" && code1587_complete_tl.progress() == 0) {
        reveal_tip_tl.play();
        correct_code_tl.restart();
        code1587_complete_tl.play();
    } else if (entry == "7481" && code7481_complete_tl.progress() == 0) {
        reveal_tip_tl.play();
        correct_code_tl.restart();
        code7481_complete_tl.play();
    } else if (entry == "3142" && code3142_complete_tl.progress() == 0) {
        reveal_tip_tl.play();
        correct_code_tl.restart();
        code3142_complete_tl.play();
    } 
     else if (entry == "9328" && code9328_complete_tl.progress() == 0) {
        reveal_tip_tl.play();
        correct_code_tl.restart();
        code9328_complete_tl.play();
    } 
     else if (entry == "2517" && code2517_complete_tl.progress() == 0) {
        reveal_tip_tl.play();
        correct_code_tl.restart();
        code2517_complete_tl.play();
    } else {
        incorrect_code_tl.restart();
    }
  
  //resting everything back to it's start
  $(".active_number").removeClass("active_number");
  gsap.to(".keypad_number", {duration: 0.5, delay: 0.85, clearProps: "all"});
  entry = "";
}


//reveal tip copy timeline
var reveal_tip_tl = gsap.timeline({paused: true});
    reveal_tip_tl
        .from("#tip_7_1, #tip_7_2", {duration: 0.5, stagger: 0.2, y: -20, ease: "power2.out", opacity: 0, display:"none"})
        .addPause()
        .from("#tip_7_3, #tip_7_4", {duration: 0.5, stagger: 0.2, y: -20, ease: "power2.out", opacity: 0, display:"none"})
        .addPause()
        .from("#tip_7_5, #tip_7_6", {duration: 0.5, stagger: 0.2, y: -20, ease: "power2.out", opacity: 0, display:"none"})
        .addPause()
        .from("#tip_7_7, #tip_7_8", {duration: 0.5, stagger: 0.2, y: -20, ease: "power2.out", opacity: 0, display:"none"})
        .addPause()
        .from("#tip_7_9, #tip_7_10", {duration: 0.5, stagger: 0.2, y: -20, ease: "power2.out", opacity: 0, display:"none"})
        .call(function(){codes_complete_tl.play()})


//valid code timeline
var correct_code_tl = gsap.timeline({paused: true});
    correct_code_tl
        .to(".keypad_number", {duration: 0.3, stagger: 0.05, color: "#67bbac"})

//invalid code timeline
var incorrect_code_tl = gsap.timeline({paused: true});
    incorrect_code_tl
        .to(".keypad_number", {duration: 0.3, stagger: 0.05, color: "#934747"})
        .to("#keypad_container_7", {delay: 0.25, duration: 0.05, transformOrigin:"center center", x: -6, ease: "back.inOut(1.7)", yoyo: true, repeat: 7}, "<")


//cross out code on postit note animations
var code1587_complete_tl = gsap.timeline({paused: true});
    code1587_complete_tl
        .fromTo("#line_1587", {width: "0%"}, {duration: 0.35, width: "100%", transformOrigin: "0% 50%"})

var code7481_complete_tl = gsap.timeline({paused: true});
    code7481_complete_tl
        .fromTo("#line_7481", {width: "0%"}, {duration: 0.35, width: "100%", transformOrigin: "0% 50%"})

var code3142_complete_tl = gsap.timeline({paused: true});
    code3142_complete_tl
        .fromTo("#line_3142", {width: "0%"}, {duration: 0.35, width: "100%", transformOrigin: "0% 50%"})

var code9328_complete_tl = gsap.timeline({paused: true});
    code9328_complete_tl
        .fromTo("#line_9328", {width: "0%"}, {duration: 0.35, width: "100%", transformOrigin: "0% 50%"})

var code2517_complete_tl = gsap.timeline({paused: true});
    code2517_complete_tl
        .fromTo("#line_2517", {width: "0%"}, {duration: 0.35, width: "100%", transformOrigin: "0% 50%"})


//complete congrates extra timeline
var codes_complete_tl = gsap.timeline({paused: true})
    codes_complete_tl
    .from("#lock_7", {duration: 0.5, opacity: 0, scale: 0.8, display: "none", ease: "sine.out"})
    .to("#lock_top_7", {duration: 0.35, y: "-4.175%"})
    .to("#lock_top_7", {duration: 0.6, rotationY: "-180%", transformOrigin: "21.5% 50%", ease: "power4.out"})
    .to("#lock_7", {duration: 0.45, opacity: 0, display: "none", ease: "sine.in"})

