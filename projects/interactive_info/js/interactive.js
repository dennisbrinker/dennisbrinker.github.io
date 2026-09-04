// Infographic Interactivity

/* ---------------------------
        MARK: Quiz Unlock
------------------------------ */

// Tracks whether interactive secton has been completed or not
var completedClickPopUpSection1 = false;
var completedClickPopUpSection2 = false;
var completedClickPopUpSection3 = false;
var completedClickPopUpSection4 = false;

/* Unlock Quiz Button --------------------- */
function checkClickPopUpSection2() {
    if ($('.clicked2').length == 4) {
        completedClickPopUpSection1 = true;
        quizUnlockCheck()
    }
}
function checkClickPopUpSection5() {
    if ($('.clicked5').length == 3) {
        completedClickPopUpSection2 = true;
        quizUnlockCheck()
    }
}

function quizUnlockCheck() { 
    if (completedClickPopUpSection1 == true && completedClickPopUpSection2 == true && completedClickPopUpSection3 == true && completedClickPopUpSection4 == true) {
        unlockQuizButton(); // in default.js
    } 
}



/* ---------------------------
        MARK: Popup
------------------------------ */
function createPopupTL(num) {
    var popupTarget = "#popup_2_" + num;
    var popupWrapper = popupTarget + " .popup_wrapper";
    var popupIcon = popupTarget + " .popup_icon";
    var popupClose = popupTarget + " .popup_close";

    var popup_2_tl = gsap.timeline();
        popup_2_tl     
        .from(popupTarget, {duration: 0.25, autoAlpha: 0})  
        .from(popupWrapper, {duration: 1, transformOrigin: "50% 25% -100%", rotationX: -90, opacity: 0, scale: 0.8, ease: "elastic.out(0.6, 0.5)"}) 
        .to(popupIcon, {duration: 0.8, rotationY: -360, ease: "back.inOut(1.5)"}, "-=0.65") 
        .from(popupClose, {duration: 0.35, opacity: 0}, "<+0.3") 
    return popup_2_tl
}


var popup_tl_2_1 = gsap.timeline({paused: true});
popup_tl_2_1
.add(createPopupTL(1))

var popup_tl_2_2 = gsap.timeline({paused: true});
popup_tl_2_2
.add(createPopupTL(2))

var popup_tl_2_3 = gsap.timeline({paused: true});
popup_tl_2_3
.add(createPopupTL(3))

var popup_tl_2_4 = gsap.timeline({paused: true});
popup_tl_2_4
.add(createPopupTL(4))

	
$("#click_wrapper_2 .click_container").click(function() {
	$('body').addClass('overlay-is-open');
    var clickID = $(this).attr('id');
	var clickNum = clickID.slice(-1);
    var target_tl = "popup_tl_2_" + clickNum;
    window[target_tl].restart();
})

$(".popup_close").click(function() {
	$('body').removeClass('overlay-is-open');
    var closeID = $(this).parents(".popup").attr('id');
    var closeNum = closeID.slice(-1);
    gsap.to("#" + closeID, {duration: 0.35, autoAlpha: 0});
    $("#click_2_" + closeNum).addClass("clicked2");
    checkClickPopUpSection2();
})



/* ---------------------------
        MARK: Carousels
------------------------------ */
function initSwiper(selector, completionCallback) {
    const swiperInstance = new Swiper(selector, {
        loop: false,
        spaceBetween: 0,
        slidesPerView: 1,
        // Pagination
        pagination: {
            el: `${selector} .swiper-pagination`,
            clickable: true
        }, 
        // Navigation arrows
        navigation: {
            addIcons: false,
            nextEl: `${selector} .swiper-button-next`,
            prevEl: `${selector} .swiper-button-prev`,
        }
    });

    // Track completion
    swiperInstance.on('slideChange', function () {
        if (swiperInstance.isEnd) {
            //console.log(`END OF SWIPER: ${selector}`);
            if (completionCallback && typeof completionCallback === 'function') {
                completionCallback();
            }
        }
    });

    return swiperInstance;
}

// Initialize both carousels with completion tracking
const swiper3 = initSwiper('#slider_wrapper_3', function() {
    completedClickPopUpSection3 = true;
    quizUnlockCheck();
});

const swiper6 = initSwiper('#slider_wrapper_6', function() {
    completedClickPopUpSection4 = true;
    quizUnlockCheck();
});



/* ---------------------------
        MARK: Dial
------------------------------ */

//Scroll to top interactive section on mobile only
$(".scroll_top").click(function() {
	document.getElementById('interactive_wrapper_5').scrollIntoView({behavior: "smooth"});
})


//Timeline
function revealTL(num) {
    var revealTarget = "#reveal_" + num;
    var toptext = revealTarget + " .top_text";
    var listitems = revealTarget + " .list_item";

    var reveal_5_tl = gsap.timeline();
        reveal_5_tl   
        .fromTo(revealTarget, {pointerEvents: "none"}, {duration: 0.05, pointerEvents: "auto"}) 
        .to("#instructions_5", {duration: 0.25, opacity: 0, display: "none"}, "<") 
        .to(".reveal_textbox_5", {duration: 0.25, autoAlpha: 0}, "<") 
        .from(revealTarget, {duration: 0.01, autoAlpha: 0}) 
        .from(toptext, {duration: 0.65, opacity: 0, yPercent: 30, ease: "sine.out"}) 
        .from(listitems, {duration: 0.8, stagger: 0.15, transformOrigin: "50% 25% -100%", rotationX: -90, opacity: 0, scale: 0.8, ease: "elastic.out(0.6, 0.5)"}, "<+0.35") 
    return reveal_5_tl
}

var dial_reveal_5_1 = gsap.timeline({paused: true});
    dial_reveal_5_1
    .add(revealTL("5_1"))

var dial_reveal_5_2 = gsap.timeline({paused: true});
    dial_reveal_5_2
    .add(revealTL("5_2"))

var dial_reveal_5_3 = gsap.timeline({paused: true});
    dial_reveal_5_3
    .add(revealTL("5_3"))


//Draggable
var dial = Draggable.create("#dial_arm", {
    type: "rotation",
    inertia: true,
    maxDuration: 0.8,
    snap: function(rotation) {
        var endValue = rotation % 360;
        while (endValue < 0) endValue += 360;
        
        var snapPoints = [135, 180, 225];
        
        var closest = snapPoints.reduce(function(prev, curr) {
            var distCurr = Math.abs(curr - endValue);
            var distPrev = Math.abs(prev - endValue);
            
            // Also check distance wrapping around 360
            var distCurrWrap = Math.min(distCurr, 360 - distCurr);
            var distPrevWrap = Math.min(distPrev, 360 - distPrev);
            
            return distCurrWrap < distPrevWrap ? curr : prev;
        });
        
        // Calculate how many full rotations have occurred
        var fullRotations = Math.floor(rotation / 360);
        
        // Return the snap point adjusted for full rotations
        var result = (fullRotations * 360) + closest;

        //console.log("Rotation:", endValue, "→ Snapping to:", closest);

        dial.result = closest; // Store the result for later use

        return result;
    },
    onDragEnd: function() { 
            if (dial.result == 135) {
            dial_reveal_5_3.restart();
            $("#hit_5_3").addClass("clicked5");
            checkClickPopUpSection5();
        }
        else if (dial.result == 180 ) {
            dial_reveal_5_2.restart();
            $("#hit_5_2").addClass("clicked5");
            checkClickPopUpSection5();
        }
        else if (dial.result == 225) {
            dial_reveal_5_1.restart();
            $("#hit_5_1").addClass("clicked5");
            checkClickPopUpSection5();
        }
        else {
            //console.log("none of these if statements worked");
        }
     }
})[0];



