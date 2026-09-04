/* Master list of course pages/content
    Do not include # in the page name.
    For now, don't include popups in this list.
    Page options: interactionFinished: false, scrollUp: false, triggerSelector: [target element for failsafe ST, eg. "#wrapper_2_1"]
*/
let pageIndex = {
    "wrapper_1_1": {},
    "wrapper_1_2": {},
    "wrapper_1_3": {interactionFinished: false},
    "comparison_1_3_2": {interactionFinished: false},
    "wrapper_quiz": {}
}

// This will dynamically add properties to each page for:
// scrollFinished: false
// ST: [] empty array for ST
for (let page in pageIndex) {
    if (pageIndex.hasOwnProperty(page)) {
        pageIndex[page].scrollFinished = false;
        pageIndex[page].ST = [];
    }
}

// WISHLIST ideas for properties to add here: show the Notices and Disclaimer bar, section change, looping timelines


/* ------------------------------------------------------
    MARK: Extra TL
    EXTRA TIMELINE STUFF
------------------------------------------------------ */

// Box Scale Animation
function boxScaleAnimate(target) {
    return gsap.from(target, {duration: 1, opacity: 0, scale: 0,  ease: "elastic.out(0.8, 0.5)", transformOrigin: "50% 0%"});
}

// Textbox Animation
function textAnimate(target) {
    return gsap.from(target, {duration: 0.5, stagger: 0.15, opacity: 0, scale: 1.1, ease: "back.out(1.5)"});
}

// Glow Animation
function glowAnimate(target) {
    return gsap.fromTo(target, {"--glow-opacity": 0}, {"--glow-opacity": 1, duration: 1, ease: "bounce.out"});
}


/* ------------------------------------------------------
    MARK: Main TL
    Main timeline used for all sections of the course
------------------------------------------------------ */
var tl = gsap.timeline({onUpdate: tlUpdate, paused: true});
    tl

    .to("#scene_quiz", {duration: 0.01, display: "none"})

        .addLabel("start", "+=0.01")
        .call(disableBothArrows, null, "+=.01")

/* ---------------------
      MARK: Scene 1
------------------------ */
    .add(boxScaleAnimate("#wrapper_1_1 .box_style"))
    .from("#wrapper_1_1 .badge_container img", {duration: 1, stagger: {each: 0.2, from: "end"}, opacity: 0, ease: "elastic.out(elastic.out(0.6, 0.5))", skewX: 25, xPercent: -150}, "<+0.35")
    .add(glowAnimate("#wrapper_1_1 .box_style"), "<+0.35")

        .addLabel("nav-section-1", "+=0.01")
        .call(sectionCounter, [1], "+=0.01")
        .addLabel("wrapper_1_1", "+=0.01") // addLabel for a page always needs to go directly before its addPause
        .addPause("+=.01", pauseFunc)
        .from("#back_arrow", {duration: 0.25, autoAlpha: 0})

    .from("#wrapper_1_2", {duration: 0.01, display: "none"})
    .to("#wrapper_1_1", {duration: 0.5, clipPath: "inset(0% 0% 0% 100%)", ease: "power3.in", display: "none"})
    .to("#intro_bg", {duration: 0.5, clipPath: "inset(0% 0% 0% 100%)", ease: "power3.in"}, "<")
    .add(textAnimate("#textbox_1_2 *"), "+=0.2")
    .from("#wrapper_1_2 .box_outer", {duration: 0.5, opacity: 0, y: 15, ease: "sine.out"}, "<")
    
        .addLabel("wrapper_1_2", "+=.01")
        .addPause("+=.01", pauseFunc)

    .from("#wrapper_1_3", {duration: 0.01, display: "none"})
    .to("#wrapper_1_2", {duration: 0.35, opacity: 0, display: "none"})
    .add(textAnimate("#textbox_1_3_1 *"))
    .from("#wrapper_1_3 .vers_wrapper", {duration: 0.5, scaleX: 0, ease: "power3.out"}, "-=0.25")
    .add(textAnimate("#label_1_3_1A, #wrapper_1_3 .vers_wrapper .vers, #label_1_3_1B"), "-=0.25")
    .add(textAnimate("#wrapper_1_3 .vers_wrapper .device"), "<+0.5")
    .from("#comparison_1_3_1", {duration: 0.5, opacity: 0, y: 15, ease: "sine.out"}, "<")
    .add(toggleNoticesBar("show"))
    
        .addLabel("wrapper_1_3", "+=.01")
        .addPause("+=.01", pauseFunc)

    .to("#label_1_3_1A, #label_1_3_1B, #comparison_1_3_1", {duration: 0.35, opacity: 0, display: "none"})
    .add(textAnimate("#label_1_3_2A, #label_1_3_2B"), "+=0.1")
    .from("#comparison_1_3_2", {duration: 0.5, opacity: 0, y: 15, ease: "sine.out", display: "none"}, "<")

        .addLabel("comparison_1_3_2", "+=.01")
        .addPause("+=.01", pauseFunc)

/* ---------------------
    MARK: Summary/Quiz
------------------------ */
    .add(toggleNoticesBar("hide"), "+=.01")
    .to("#scene_quiz", {duration: 0.01, display: "block"}, "+=0.01")
    .to("#wrapper_1_3", {duration: 0.35, opacity: 0, display: "none"})
    .to("#intro_bg", {duration: 0.65, clipPath: "inset(0% 0% 0% 0%)", ease: "power3.out"})
    .add(boxScaleAnimate("#wrapper_quiz .box_style"))
    .from("#wrapper_quiz .badge_container img", {duration: 1, stagger: {each: 0.2, from: "end"}, opacity: 0, ease: "elastic.out(elastic.out(0.6, 0.5))", skewX: 25, xPercent: -150}, "<+0.5")
    .add(glowAnimate("#wrapper_quiz .box_style"), "<+0.35")

        // Special code for the very end of the course. Don't delete any of this.
        .to("#next_arrow", {duration: 0.25, autoAlpha: 0})
        .addLabel("nav-quiz", "+=0.01")
        .call(sectionCounter, ["quiz"], "+=0.01")
        .call(disableNextArrow, null, "+=.01")
        .addLabel("wrapper_quiz", "+=.01")
        .addPause("+=.01", pauseFunc) // don't delete



/* ------------------------------------------------------
    TIMELINE UPDATE FUNCTIONS
------------------------------------------------------ */
var $nav_tracker_inner = $("#nav_tracker_inner");

function tlUpdate() {
    //console.log("tlUpdate | is tl active?", tl.isActive());

    if (tl.isActive() && scrollInstance.options().overflow.y == "scroll") {
        // Check if page should scroll to top or not
        if (!tl.reversed() && pageIndex[currentPageId]?.scrollUp === false) {
            allowScroll(false, null, false);
        } else if (tl.reversed() && pageIndex[previousPageId]?.scrollUp === false) {
            allowScroll(false, null, false);
            // BUG: page will incorrectly scroll up if you go two pages past the scrollUp=false page and then reverse back to it. To fix, would need to check order for the page you are travelling to, not where you came from. Out of scope at this time.
        } else {
            allowScroll(false);
        }
    }

    // update course progress bar
    $nav_tracker_inner.css("width",  (tl.progress() * 100) + "%");

    if (SliderTurnOn == true) {
        updateSlider();
    }

}

/* ------------------------------------------------------
    MISC FUNCTIONS
------------------------------------------------------ */
function devStartTimeline() {
    tl.seek(seekTime);
    updateSlider();

    setTimeout(() => {
        pauseFunc(); // short delay for preloader
    }, 500);
}