/* ------------------------------
        ANIMATION SETUP
 ------------------------------ */

/*
   * Animations are set up in this file, and controlled by the refresh() function in interactions.js.
   * All animations must have a unique id property
*/

let mm = gsap.matchMedia();

gsap.set(".perspective", {perspective: 2000});
gsap.set("#spoke_progress_container .inner", {width: "0%", transformOrigin: "0% 50%"})
gsap.set(".slick-slider", {autoAlpha: 0})


/* ------------------------------
    MARK: Repeatable Animations
 ------------------------------ */

// Textbox Clip Path Animations
function textAnimate(target) {
    return gsap.from(target, {duration: 0.65, stagger: 0.15, yPercent: 30, clipPath: "inset(0% 0% 100% 0%)", ease: "sine.out"});
}

// Vers Text Animations
function versAnimate(target) {
    return gsap.from(target, {duration: 2, opacity: 0, scale: 1.5, ease: "elastic.out(0.8, 0.2)"});
}

// Perspective Rotation Animations
function flipAnimate(target) {
    return gsap.from(target, {duration: 1.25, stagger: 0.15, transformOrigin: "50% 50% -120%", rotationX: -135, opacity: 0, scale: 0.8, ease: "elastic.out(0.6, 0.4)"});
}

// Paw Animation
function pawAnimate(target) {
    return gsap.fromTo(target, {transformOrigin: "50% 65% 25%", rotationX: -120, opacity: 0, scaleX: 0.8 , scaleY: 0.5}, {duration: 0.8, transformOrigin: "50% 65% 25%", rotationX: 0, opacity: 1, scaleX: 1 , scaleY: 1, ease: "elastic.out(0.6, 0.4)"});
}


/* ------------------------------
        MARK: MAIN
 ------------------------------ */
 var click_spoke1_tl = gsap.timeline({repeat: -1, yoyo: true, paused: true});
    click_spoke1_tl    
    .to("#click_spoke1", {duration: 1.25, ease: "sine.inOut", yPercent: -10, yoyo: true, repeat: -1})


 var mainBG_TL = gsap.timeline({scrollTrigger: {
        trigger: "#hub",
        start: "top top",
		endTrigger: "#box_legal",
		end: "bottom bottom",
		scrub: 1.5,
        id: "main_bg" // remember to update this
    }});
    mainBG_TL
		.fromTo("#main_bg", {backgroundPosition: "50% 0%"}, {backgroundPosition: "50% 100%", ease: "sine.inout"})


mm.add("(min-width: 769px)", () => {
    var intro_tl = gsap.timeline({scrollTrigger: {
        trigger: "#main_page",
        start: "top center",
        id: "intro" // remember to update this
    }});
    intro_tl
        .fromTo("#intro_bg img", {scale: 1}, {duration: 2.5, scale: 1.8, transformOrigin: "48% 30%", ease: "elastic.out(0.6, 0.2)"}, "+=0.25")
        .add(textAnimate("#intro_section .textbox"), "<+0.65")
});
mm.add("(max-width: 768px)", () => {
    var intro_tl = gsap.timeline({scrollTrigger: {
        trigger: "#main_page",
        start: "top center",
        id: "intro" // remember to update this
    }});
    intro_tl
        .fromTo("#intro_bg img", {scale: 1}, {duration: 2.5, scale: 2.7, transformOrigin: "50% 35%", ease: "elastic.out(0.6, 0.2)"}, "+=0.25")
        .add(textAnimate("#intro_section .textbox"), "<+0.65")
});


var main_badge_tl = gsap.timeline({scrollTrigger: {
        trigger: "#main_badge_section",
        start: "top 60%",
        id: "main_badge" // remember to update this
    }});
    main_badge_tl
        .add(flipAnimate("#main_badge_section .inner img"))
		.add(textAnimate("#main_badge_section .textbox"), "<+0.2")
        

var hub_intro_tl = gsap.timeline({scrollTrigger: {
        trigger: "#hub",
        start: "top 60%",
        id: "hub_intro" // remember to update this
    }});
    hub_intro_tl
		.add(textAnimate("#hub_intro"))


var spoke_tl = gsap.timeline({scrollTrigger: {
        trigger: "#spoke_wrapper",
        start: "top center",
        id: "spoke_wrapper" // remember to update this
    }});
    spoke_tl
        .add(flipAnimate("#hub_badge_1"))
        .add(versAnimate("#spoke_wrapper .vers"), "0.5")
        .add(flipAnimate("#spoke_button_wrapper .spoke_button"), "<+0.35")
        .add(pawAnimate("#click_spoke1 .paw"), "<+0.85")
        .call (
            function(){click_spoke1_tl.play();}
		)
        .from("#spoke_progress_wrapper", {duration: 0.65, clipPath: "inset(0% 100% 0% 0%)", ease: "power4.out"}, "<")



/* ------------------------------
        MARK: SPOKE 1
 ------------------------------ */
var bg1_TL = gsap.timeline({scrollTrigger: {
        trigger: "#spoke_1",
        start: "top top",
		end: "bottom bottom",
		scrub: 1.5,
        id: "spoke1_bg" // remember to update this
    }});
    bg1_TL
		.fromTo("#spoke_1BG", {backgroundPosition: "50% 0%"}, {backgroundPosition: "50% 100%", ease: "sine.inout"})


var spoke1_intro_tl = gsap.timeline({scrollTrigger: {
        trigger: "#spoke_1",
        start: "top center",
        id: "spoke1_intro" // remember to update this
    }});
    spoke1_intro_tl
		.add(textAnimate("#spoke_1 .top_text"))


var spoke1_vers = gsap.timeline({scrollTrigger: {
        trigger: "#spoke_1 .vers_wrapper",
        start: "top center",
        id: "spoke1_vers" // remember to update this
    }});
    spoke1_vers
        .add(flipAnimate("#spoke_1 .vers_device"))
        .add(textAnimate("#spoke_1 .vers_item .text"), "0.2")
        .add(versAnimate("#spoke_1 .vers_item .vers"), "0.5")


mm.add("(min-height: 1600px)", () => {
    var slider_1_1_tl = gsap.timeline({scrollTrigger: {
        trigger: "#perform_1_1",
        start: "bottom bottom",
        id: "slider_1_1" // remember to update this
    }});
    slider_1_1_tl
        .set("#slider_1_1", {autoAlpha: 1})
        .add(textAnimate("#perform_1_1 .slider_header"), "+=1")
    	.from("#slider_1_1 .slick-active", {duration: 0.65, stagger: 0.15, xPercent: 300, ease: "power3.out"}, "-=0.2")
        .from("#slider_1_1 .slick-arrow", {duration: 0.35, stagger: 0.15, visibility: "hidden"}, "-=0.5")
        .from("#perform_1_1 .disclaimer", {duration: 0.35, opacity: 0})
});
mm.add("(max-height: 1599px)", () => {
    var slider_1_1_tl = gsap.timeline({scrollTrigger: {
        trigger: "#perform_1_1",
        start: "top 55%",
        id: "slider_1_1" // remember to update this
    }});
    slider_1_1_tl
        .set("#slider_1_1", {autoAlpha: 1})
        .add(textAnimate("#perform_1_1 .slider_header"))
    	.from("#slider_1_1 .slick-active", {duration: 0.65, stagger: 0.15, xPercent: 300, ease: "power3.out"}, "-=0.2")
        .from("#slider_1_1 .slick-arrow", {duration: 0.35, stagger: 0.15, visibility: "hidden"}, "-=0.5")
        .from("#perform_1_1 .disclaimer", {duration: 0.35, opacity: 0})
});


/* ------------------------------
        MARK: SPOKE 2
 ------------------------------ */
var bg2_TL = gsap.timeline({scrollTrigger: {
        trigger: "#spoke_2",
        start: "top top",
		end: "bottom bottom",
		scrub: 1.5,
        id: "spoke2_bg" // remember to update this
    }});
    bg2_TL
		.fromTo("#spoke_2BG", {backgroundPosition: "50% 0%"}, {backgroundPosition: "50% 100%", ease: "sine.inout"})


var spoke2_intro_tl = gsap.timeline({scrollTrigger: {
        trigger: "#spoke_2",
        start: "top center",
        id: "spoke2_intro" // remember to update this
    }});
    spoke2_intro_tl
		.add(textAnimate("#spoke_2 .top_text"))


var spoke2_vers = gsap.timeline({scrollTrigger: {
        trigger: "#spoke_2 .vers_wrapper",
        start: "top center",
        id: "spoke2_vers" // remember to update this
    }});
    spoke2_vers
        .add(flipAnimate("#spoke_2 .vers_device"))
        .add(textAnimate("#spoke_2 .vers_item .text"), "0.2")
        .add(versAnimate("#spoke_2 .vers_item .vers"), "0.5")


var slider_2_1_tl = gsap.timeline({scrollTrigger: {
        trigger: "#perform_2_1",
        start: "top 55%",
        id: "slider_2_1" // remember to update this
    }});
    slider_2_1_tl
        .set("#slider_2_1", {autoAlpha: 1})
        .add(textAnimate("#perform_2_1 .slider_header"))
    	.from("#slider_2_1 .slick-active", {duration: 0.65, stagger: 0.15, xPercent: 300, ease: "power3.out"}, "-=0.2")
        .from("#slider_2_1 .slick-arrow", {duration: 0.35, stagger: 0.15, visibility: "hidden"}, "-=0.5")
        .from("#perform_2_1 .disclaimer", {duration: 0.35, opacity: 0})
        

var slider_2_2_tl = gsap.timeline({scrollTrigger: {
        trigger: "#perform_2_2",
        start: "top 55%",
        id: "slider_2_2" // remember to update this
    }});
    slider_2_2_tl
        .set("#slider_2_2", {autoAlpha: 1})
        .add(textAnimate("#perform_2_2 .slider_header"))
    	.from("#slider_2_2 .slick-active", {duration: 0.65, stagger: 0.15, xPercent: 300, ease: "power3.out"}, "-=0.2")
        .from("#slider_2_2 .slick-arrow", {duration: 0.35, stagger: 0.15, visibility: "hidden"}, "-=0.5")
        

var game_intro_2_tl = gsap.timeline({scrollTrigger: {
        trigger: "#spoke_2 .gaming_section",
        start: "top 55%",
        id: "game_intro_2" // remember to update this
    }});
    game_intro_2_tl
		.add(textAnimate("#spoke_2 .game_intro"))


//Setting batch starting state
gsap.set("#spoke_2 .game_wrapper *", {transformOrigin: "50% 50% -30%", rotationX: -120, opacity: 0, scale: 0.8})

let game2BatchInitialized = false;

function game2_batch_animate() {
    if (game2BatchInitialized) { return; } // guard: prevents duplicate batches on return visits
    game2BatchInitialized = true;
    ScrollTrigger.batch('#spoke_2 .game_wrapper *', {
        start: "clamp(top 80%)", //NOTE: using clamp as a fallback for larger screens
        once: true,
        onEnter: (batch, triggers) => {
            gsap.to(batch, {duration: 1, stagger: 0.15, transformOrigin: "50% 50% -30%", rotationX: 0, opacity: 1, scale: 1, ease: "elastic.out(0.6, 0.4)"}) //NOTE: very similar to flipAnimate just not as intense
        }
    });
}


/* ------------------------------
        MARK: SPOKE 3
 ------------------------------ */
var bg3_TL = gsap.timeline({scrollTrigger: {
        trigger: "#spoke_3",
        start: "top top",
		end: "bottom bottom",
		scrub: 1.5,
        id: "spoke3_bg" // remember to update this
    }});
    bg3_TL
		.fromTo("#spoke_3BG", {backgroundPosition: "50% 0%"}, {backgroundPosition: "50% 100%", ease: "sine.inout"})


var spoke3_intro_tl = gsap.timeline({scrollTrigger: {
        trigger: "#spoke_3",
        start: "top center",
        id: "spoke3_intro" // remember to update this
    }});
    spoke3_intro_tl
		.add(textAnimate("#spoke_3 .top_text"))


var spoke3_vers = gsap.timeline({scrollTrigger: {
        trigger: "#spoke_3 .vers_wrapper",
        start: "top center",
        id: "spoke3_vers" // remember to update this
    }});
    spoke3_vers
        .add(flipAnimate("#spoke_3 .vers_device"))
        .add(textAnimate("#spoke_3 .vers_item .text"), "0.2")
        .add(versAnimate("#spoke_3 .vers_item .vers"), "0.5")


var slider_3_1_tl = gsap.timeline({scrollTrigger: {
        trigger: "#perform_3_1",
        start: "top 55%",
        id: "slider_3_1" // remember to update this
    }});
    slider_3_1_tl
        .set("#slider_3_1", {autoAlpha: 1})
        .add(textAnimate("#perform_3_1 .slider_header"))
    	.from("#slider_3_1 .slick-active", {duration: 0.65, stagger: 0.15, xPercent: 300, ease: "power3.out"}, "-=0.2")
        .from("#slider_3_1 .slick-arrow", {duration: 0.35, stagger: 0.15, visibility: "hidden"}, "-=0.5")
        .from("#perform_3_1 .disclaimer", {duration: 0.35, opacity: 0})
        

var slider_3_2_tl = gsap.timeline({scrollTrigger: {
        trigger: "#perform_3_2",
        start: "clamp(top 55%)",//NOTE: using clamp as a fallback for larger screens
        id: "slider_3_2" // remember to update this
    }});
    slider_3_2_tl
        .set("#slider_3_2", {autoAlpha: 1})
        .add(textAnimate("#perform_3_2 .slider_header"))
    	.from("#slider_3_2 .slick-active", {duration: 0.65, stagger: 0.15, xPercent: 300, ease: "power3.out"}, "-=0.2")
        .from("#slider_3_2 .slick-arrow", {duration: 0.35, stagger: 0.15, visibility: "hidden"}, "-=0.5")


/* ------------------------------
        MARK: SPOKE 4
 ------------------------------ */
var bg4_TL = gsap.timeline({scrollTrigger: {
        trigger: "#spoke_4",
        start: "top top",
		end: "bottom bottom",
		scrub: 1.5,
        id: "spoke4_bg" // remember to update this
    }});
    bg4_TL
		.fromTo("#spoke_4BG", {backgroundPosition: "50% 0%"}, {backgroundPosition: "50% 100%", ease: "sine.inout"})


var spoke4_intro_tl = gsap.timeline({scrollTrigger: {
        trigger: "#spoke_4",
        start: "top center",
        id: "spoke4_intro" // remember to update this
    }});
    spoke4_intro_tl
		.add(textAnimate("#spoke_4 .top_text"))


var spoke4_vers = gsap.timeline({scrollTrigger: {
        trigger: "#spoke_4 .vers_wrapper",
        start: "top center",
        id: "spoke4_vers" // remember to update this
    }});
    spoke4_vers
        .add(flipAnimate("#spoke_4 .vers_device"))
        .add(textAnimate("#spoke_4 .vers_item .text"), "0.2")
        .add(versAnimate("#spoke_4 .vers_item .vers"), "0.5")


var slider_4_1_tl = gsap.timeline({scrollTrigger: {
        trigger: "#perform_4_1",
        start: "top 55%",
        id: "slider_4_1" // remember to update this
    }});
    slider_4_1_tl
        .set("#slider_4_1", {autoAlpha: 1})
        .add(textAnimate("#perform_4_1 .slider_header"))
    	.from("#slider_4_1 .slick-active", {duration: 0.65, stagger: 0.15, xPercent: 300, ease: "power3.out"}, "-=0.2")
        .from("#slider_4_1 .slick-arrow", {duration: 0.35, stagger: 0.15, visibility: "hidden"}, "-=0.5")
        .from("#perform_4_1 .disclaimer", {duration: 0.35, opacity: 0})


var spoke4_ai_tl = gsap.timeline({scrollTrigger: {
        trigger: "#spoke_4 .ai_section",
        start: "clamp(top 65%)",//NOTE: using clamp as a fallback for larger screens
        id: "spoke4_ai" // remember to update this
    }});
    spoke4_ai_tl
		.add(textAnimate("#spoke_4 .ai_section .textbox"))
        .to(".ai_icon", {duration: 1.5, rotationY: 360, ease: "elastic.inOut(0.6, 0.4)"}, "-=0.3")
        .to(".ai_icon", {duration: 0.5, scale: 1.1, yPercent: -15, ease: "back.inOut(1.5)", repeat: 1, yoyo: true}, "<+0.25")



        
/* ------------------------------
    MARK: ST ARRAYS
    GROUP SCROLLTRIGGER ANIMATIONS BY SPOKE
 ------------------------------ */
 // DEV-UPDATE these arrays with your Scrolltrigger tweens. Remember to get by their id.

var mainSTarray = [
    ScrollTrigger.getById("intro"),
    ScrollTrigger.getById("main_badge"),
    ScrollTrigger.getById("hub_intro"),
    ScrollTrigger.getById("spoke_wrapper"),
    ScrollTrigger.getById("main_bg")
];

var spoke1STarray = [
    ScrollTrigger.getById("spoke1_bg"),
    ScrollTrigger.getById("spoke1_intro"),
    ScrollTrigger.getById("spoke1_vers"),
    ScrollTrigger.getById("slider_1_1")
];

var spoke2STarray = [
    ScrollTrigger.getById("spoke2_bg"),
    ScrollTrigger.getById("spoke2_intro"),
    ScrollTrigger.getById("spoke2_vers"),
    ScrollTrigger.getById("slider_2_1"),
    ScrollTrigger.getById("slider_2_2"),
    ScrollTrigger.getById("game_intro_2")
];

var spoke3STarray = [
    ScrollTrigger.getById("spoke3_bg"),
    ScrollTrigger.getById("spoke3_intro"),
    ScrollTrigger.getById("spoke3_vers"),
    ScrollTrigger.getById("slider_3_1"),
    ScrollTrigger.getById("slider_3_2")
];

var spoke4STarray = [
    ScrollTrigger.getById("spoke4_bg"),
    ScrollTrigger.getById("spoke4_intro"),
    ScrollTrigger.getById("spoke4_vers"),
    ScrollTrigger.getById("slider_4_1"),
    ScrollTrigger.getById("spoke4_ai")
];



var masterSTArray = ScrollTrigger.getAll()

// disable all anims immediately. The main_page animations are enabled in theFinalFunction()
masterSTArray.forEach(function(ST) {
  ST.disable()
});



/* ---------------------------------------------
        MARK: CLICK STATES
        SPOKE CLICK CONTAINER STATE CHANGES
   --------------------------------------------- */
var hub_progress_tl = gsap.timeline({paused: true});
	hub_progress_tl   
	
	.addPause("+=0.01")

	.addLabel("hub_progress_1", "+=0.2")
	.to("#spoke_progress_container .inner", {duration: 0.65, width: "25%", ease: "none"}, "hub_progress_1")
	.to("#click_spoke1", {duration: 0.65, yPercent: 0, ease: "sine.in"}, "hub_progress_1") 
	.to("#click_spoke1 .paw", {duration: 0.2, opacity: 0}, "hub_progress_1") 
    .add(pawAnimate("#click_spoke2 .paw"), "hub_progress_1+=0.15")
	.to("#click_spoke2", {duration: 0.8, yPercent: -10, ease: "power3.out"}, "hub_progress_1+=0.5") 

	.addPause("+=0.01")

	.addLabel("hub_progress_2", "+=0.2")
	.to("#spoke_progress_container .inner", {duration: 0.65, width: "50%", ease: "none"}, "hub_progress_2")
	.to("#click_spoke2", {duration: 0.65, yPercent: 0, ease: "sine.in"}, "hub_progress_2") 
	.to("#click_spoke2 .paw", {duration: 0.2, opacity: 0}, "hub_progress_2") 
    .add(pawAnimate("#click_spoke3 .paw"), "hub_progress_2+=0.15")
	.to("#click_spoke3", {duration: 0.8, yPercent: -10, ease: "power3.out"}, "hub_progress_2+=0.5") 

	.addPause("+=0.01")

	.addLabel("hub_progress_3", "+=0.2")
	.to("#spoke_progress_container .inner", {duration: 0.65, width: "75%", ease: "none"}, "hub_progress_3")
	.to("#click_spoke3", {duration: 0.65, yPercent: 0, ease: "sine.in"}, "hub_progress_3") 
	.to("#click_spoke3 .paw", {duration: 0.2, opacity: 0}, "hub_progress_3") 
    .add(pawAnimate("#click_spoke4 .paw"), "hub_progress_3+=0.15")
	.to("#click_spoke4", {duration: 0.8, yPercent: -10, ease: "power3.out"}, "hub_progress_3+=0.5") 

	.addPause("+=0.01")

	.addLabel("hub_progress_4", "+=0.05")
	.to("#spoke_progress_container .inner", {duration: 0.5, width: "100%", ease: "none"}, "hub_progress_4")
    .to("#click_spoke4", {duration: 0.5, yPercent: 0, ease: "sine.in"}, "hub_progress_4") 
	.to("#click_spoke4 .paw", {duration: 0.2, opacity: 0}, "hub_progress_4") 
	.to("#spoke_progress_wrapper", {duration: 0.25, scale: 1.05, ease: "sine.inOut", repeat: 3, yoyo: true}, "hub_progress_4+=0.75") 