/* -----------------------------------------------------
    MARK: navReset
    Clean up function called when the user
    changes sections
-------------------------------------------------------- */
function navReset() {

    $(".nav_arrow_style").removeClass("timeline_locked scroll_locked interaction_locked");
    cancelNextArrowWiggle();

    // Uncomment to stop any extra timelines from running. Function defined in default.js.
    //stopExtraTimelines();

    // Reset all popups stored in popupIndex
    if (typeof popupIndex !== 'undefined') {
        for (const key in popupIndex) {
            popupIndex[key].pause(0);
        }
    }

}

/* -----------------------------------------------------
    MARK: Nav Setup
    Nav Menu Chapter Setup
-------------------------------------------------------- */
var currentSection = 1; // tracks the current section the user is on
var visitedChapter = 1; // tracks the highest section user has visited
var tlLabelArray = [];

function navSetup() {
    //Taylor 2/20/19 fix for quick loading content
    $(tl).ready(function() {

        // Gwen updated 1/3/20 after GSAP 3 update
        // get all labels, then use Object.keys to convert keys to strings so we can run regex match on them
        var tlLabelArrayTemp = Object.keys(tl.labels);

        for (i=0; i < tlLabelArrayTemp.length; i++) {
            var match = tlLabelArrayTemp[i].match( /nav-section-\d/ );

            if (match != null || tlLabelArrayTemp[i] == "nav-quiz") {
                tlLabelArray.push(tlLabelArrayTemp[i])
            }
        }

        $("#nav_content .nav_item").each(function(i) {

            if (!$(this).hasClass("nav_no_lock")) {

                // lock out chapters
                if (i > 0 && courseOptions.scormLocation === false && SliderTurnOn === false ) {
                    $(this).addClass("youMayNotPass");
                }

                // set up click function for each chapter nav menu
                $( this ).on("click", function() {
                    if (!($(this).hasClass("youMayNotPass")))	{
                        currentSection = i + 1;

                        // scroll up viewport
                        const { viewport } = scrollInstance.elements();
                        gsap.to(viewport, {duration: 0.15, scrollTo: 0});

                        tl.play(tlLabelArray[i]);
                        $(".active_nav_item").removeClass("active_nav_item");
                        $(this).addClass("active_nav_item");
                        navReset();
                    }
                });
            }
        });

        unlockChapters();
    });
}

// Records if a user has completed a chapter.
function postChapterTracking(currentSection) {
    if ( visitedChapter < currentSection && SliderTurnOn === false && courseOptions.scormLocation === false ) {
        visitedChapter = currentSection;
        //console.log("set bookmark", currentSection);
        IREP.setBookmark(currentSection);
    }
}

// Called via timeline when user changes sections/chapters, either going forward or in reverse.
// Remember that the label array and the nav menu list both start at 0, while the section numbers start at 1!
function sectionCounter(section_num) {

    if (section_num == "quiz") {
        currentSection = tlLabelArray.length;
    } else {
        currentSection = section_num;
    }

    if (tl.reversed()) {
        currentSection = currentSection - 1;
    }

    $(".active_nav_item").removeClass("active_nav_item");

    $("#nav_content .nav_item").eq(currentSection - 1).addClass("active_nav_item").removeClass("youMayNotPass");
    postChapterTracking(currentSection);

    //console.log("currentSection: ", currentSection);
}


/* -----------------------------------------------------
    MARK: Unlock Chapter
    Unlocks previously visited chapters
-------------------------------------------------------- */
function unlockChapters() {

    if (courseOptions.scormLocation === false && SliderTurnOn === false ) {

        $.when(IREP.getBookmark()).then(function(visitedChapterData) {
            //console.log("get bookmark data", visitedChapterData);

            if ( visitedChapterData != 0) {
                visitedChapter = visitedChapterData;

                // Remove blocker class from all chapters the user has already completed.
                for (i = 0; i < visitedChapter; i++) {
                    $("#nav_content .nav_item").eq(i).removeClass("youMayNotPass");
                }
            }
        });
    }
}


/* -----------------------------------------------------
    MARK: Nav Anim
    Nav menu & arrows animation
-------------------------------------------------------- */

gsap.set("#nav_icon_wrapper svg rect", {transformOrigin: "50% 50%"})

var $nav_wrapper = $("#nav_wrapper");
var $nav_item = $(".nav_item");
var $nav_content = $("#nav_content")[0];

var nav_box_tl = gsap.timeline({ paused: true,
    onStart: function() {
        $nav_wrapper.addClass("nav_open");
        allowScroll(false, "override", false);
    },
    onReverseComplete: function() {
        $nav_wrapper.removeClass("nav_open");
        allowScroll(true, "override", false);
    }});
    nav_box_tl
    .fromTo("#nav_container", {scaleY: 0.25, opacity: 0, display: "none", transformOrigin: "50% 100%"}, {duration: 0.375, scaleY:1, opacity: 1, ease: "sine.out", display: "flex", transformOrigin: "50% 100%"})
    .fromTo("#nav_icon_wrapper svg rect:nth-child(1)", {rotation: 0, x: 0, y: 0}, {duration: 0.25, rotation: 45, x: 0, y: 7, ease: "sine.inOut"}, 0)
    .fromTo("#nav_icon_wrapper svg rect:nth-child(2)", {opacity: 1, scaleY: 1}, {duration: 0.25, opacity: 0, scaleY: 0}, 0)
    .fromTo("#nav_icon_wrapper svg rect:nth-child(3)", {rotation: 0, x: 0, y: 0}, {duration: 0.25, rotation: -45, x: 0, y: -6.5, ease: "sine.inOut"}, 0)


$("#nav_icon_wrapper").click(function() {
    toggleNav();
});


// close nav menu if user clicks in a blank/empty area (not one of the chapter links)
$("#nav_wrapper").click(function(e) {
    if (!$nav_content.contains(e.target)) {
        toggleNav(true);
    }
});


function toggleNav(override) {
    if (override) { // no matter what, make sure nav menu is closed
        nav_box_tl.reverse();
        return
    }
    if (!nav_box_tl.isActive()) {
        if (nav_box_tl.progress() == 0) {
            nav_box_tl.restart();
        } else {
            nav_box_tl.reverse();
        }
    }
}



/* -----------------------------------------------------
    MARK: Arrow anim
    Wiggle animation for the next arrow
-------------------------------------------------------- */
gsap.set("#next_arrow polygon", {transformOrigin: "50% 50%"});

let nextArrowAttentionTl = gsap.timeline({paused: true, repeat: -1, repeatDelay: 0.25, yoyo: true})
    nextArrowAttentionTl
    .fromTo("#next_arrow svg", {x: -11}, {duration: 1, x: 0, ease: "power2"})
    .from(["#next_arrow_2", "#next_arrow_1"], {duration: 0.25, autoAlpha:0, scale: 0.8, x: -2, stagger: 0.15}, 0)

let nextArrowTimeout = null;

function scheduleNextArrowWiggle() {
    if ($nextArrow.is(".scroll_locked, .timeline_locked, .interaction_locked")) {
        //console.log("wanted to schedule wiggle but next arrow locked");
        return;
    }

    //console.log("nextArrowTimeout =", nextArrowTimeout);

    if (nextArrowTimeout === null) {
        //console.log("scheduled nextArrowTimeout");
        nextArrowTimeout = setTimeout(() => {
            startNextArrowTl();
        }, 5000);
    } else {
        //console.log("nextArrowTimeout already scheduled");
    }
}

function cancelNextArrowWiggle() {
    clearTimeout(nextArrowTimeout); // cancel any other timers that might've been scheduled
    nextArrowTimeout = null; // extra clean up
}

function startNextArrowTl() {
    cancelNextArrowWiggle();

    if ($nextArrow.is(".scroll_locked, .timeline_locked, .interaction_locked")) {
        //console.log("wanted to start wiggle but next arrow locked");
        return;
    }
    nextArrowAttentionTl.pause(0);
    nextArrowAttentionTl.timeScale(1).play();
}

function stopNextArrowTl() {
    cancelNextArrowWiggle();
    nextArrowAttentionTl.timeScale(3).tweenTo(0);
   // nextArrowAttentionTl.pause(0);
}

/* -----------------------------------------------------
    MARK: Legal animation
    Show and hide the legal screen
-------------------------------------------------------- */

gsap.set("#scene_legal", {opacity:0, visibility: "hidden"})

function showLegal() {

    const { viewport } = legalScrollbar.elements();

    // make sure legal is scrolled to the top every time
    viewport.scrollTop = 0;

    allowScroll(false, "override", false);

    var legal_show_tl = gsap.timeline();
        legal_show_tl
        .to("#scene_legal", {duration: 0.35, autoAlpha: 1})
        .from("#scene_legal .wrapper", {duration: 0.5, y: 50}, "-=0.3")
}

function hideLegal() {
    var legal_hide_tl = gsap.timeline({onComplete: function() {
        // only enable main scroll if nav isn't open
        if (!$nav_wrapper.hasClass("nav_open")) {
            allowScroll(true, "override", false);
        }
    }});
        legal_hide_tl
        .to("#scene_legal", {duration: 0.35, autoAlpha: 0})
}

$("#nav_legal, #legalButton").click(function() {
    showLegal();
});

$("#legal_close").click(function() {
    hideLegal();
});