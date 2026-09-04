/* -----------------------------------------------------
    MARK: Final Func
-------------------------------------------------------- */
function theFinalFunction() {
    var deferred = $.Deferred();

    navSetup();
    getProgressFromSite();

    if (SliderTurnOn == true && seekTime != false) {
        devStartTimeline();
    } else if (tl.progress() == 0) { // only play if at start of timeline
        disableBothArrows();
        // 0.5 sec delay for preloader to vanish
        tl.play().delay(0.5);
    }

    deferred.resolve();
    return deferred.promise();
}


/* -----------------------------------------------------
    MARK: Scrollbar
    Code to initialize Overlay Scrollbar
	https://github.com/KingSora/OverlayScrollbars
-------------------------------------------------------- */
var {
    OverlayScrollbars,
    SizeObserverPlugin
  } = OverlayScrollbarsGlobal;

var scrollInstance;

function overlayScrollbarsInit() {
    scrollInstance = OverlayScrollbars({
        target: document.querySelector("#main_wrapper")
    },{
        overflow: {x: "hidden", y:"hidden"},
        scrollbars: {theme: courseOptions.scrollbarTheme}
    });

    // declare a unique scrollbar for legal
    legalScrollbar = OverlayScrollbars({
        target: document.querySelector("#scene_legal .wrapper")
    },{
        overflow: {x: "hidden", y: "scroll"},
        scrollbars: {theme: "os-theme-light"}
    })
}

overlayScrollbarsInit();


/* -----------------------------------------------------
    MARK: Debounce
   https://davidwalsh.name/javascript-debounce-function
   Returns a function, that, as long as it continues to
   be invoked, will not be triggered. The function will
   be called after it stops being called for N milliseconds.
   If `immediate` is passed, trigger the function on the
   leading edge, instead of the trailing.
-------------------------------------------------------- */
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};


/* -----------------------------------------------------
    MARK: Img Replace
    New image source replace function that supports
    multiple breakpoints. Use with image preloader v2.
-------------------------------------------------------- */

const dataSrcImages = document.querySelectorAll('[data-src]');

function imgSrcReplace() {

    // Reference HTML: <img alt="" data-src="images/1-BG_HD.jpg, mob" src="images/tiny.gif">

    dataSrcImages.forEach(image => {
        let dataSrc = image.getAttribute("data-src");
        let parts = dataSrc.split(',').map(p => p.trim()); // Split on ',' and remove spaces
        let imageUrl = parts[0]; // First part is the image URL
        let breakpoint = parts.length > 1 ? parts[1].toLowerCase() : null; // Second part is the breakpoint

        //console.log(imageUrl, breakpoint);

        if (!breakpoint) {
            console.warn("Breakpoint missing in data-src for ", imageUrl);
            return; // Skip if breakpoint is missing
        }

        if (breakpoint != "tab" && breakpoint != "mob" && breakpoint != "trio") {
            console.warn("Invalid breakpoint in data-src for ", imageUrl);
            return; // Skip if breakpoint is invalid
        }

        let replace = "_HD"; // Default replacement

        if ((breakpoint == "mob" || breakpoint == "trio") && windowWidth <= courseOptions.mobileWidth) {
            replace = "_MOB"; // Use mobile version
        } else if ((breakpoint == "tab" || breakpoint == "trio") && windowWidth <= courseOptions.tabletWidth) {
            replace = "_TAB"; // Use tablet version
        }

        let newSrc = imageUrl.replace(/_HD/, replace);
        let currentSrc = image.getAttribute("src");

        //console.log(currentSrc, newSrc);

        if (currentSrc !== newSrc) {
            image.setAttribute("src", newSrc);
            //console.log("updated");
        }
    });

}

imgSrcReplace();


/* -----------------------------------------------------
    MARK: Overflow
    Check All Charts for Overflow
-------------------------------------------------------- */	

function checkForOverflow() {
	
	$(".chart").each(function() {

		var width = $(this)[0].clientWidth,
			scrollWidth = $(this)[0].scrollWidth;
		
		if (scrollWidth > width) {
			//overflow detected
			$(this).parent().find('.touchandswipe').removeClass('hide');
		} else {
			$(this).parent().find('.touchandswipe').addClass('hide');
		}

	});
	
}

checkForOverflow();


/* -----------------------------------------------------
    MARK: Resize
    Window resize functions
-------------------------------------------------------- */
$(window).resize(function() {
    windowHeight = $(window).height(),
    windowWidth = $(window).width();
    resizeThrottled();
});


var resizeThrottled = debounce(function() {
    //console.log("resize");
    imgSrcReplace();
    checkForOverflow();
}, 250);



/* ------------------------------------------------------
    MARK: Bookmark
------------------------------------------------------ */
var lastPerctNumber = 0;

function getProgressFromSite() {

    if (SliderTurnOn === false && courseOptions.scormLocation == false) {
         $.when(IREP.getProgress()).then(function(savedProgress) {
            if (savedProgress != null) {
                lastPerctNumber = savedProgress;
                //console.log("get prog lastPerctNumber", lastPerctNumber);
            }
        });
     }
}


function recordUserTimeLocation() {

    if (SliderTurnOn === false && courseOptions.scormLocation === false) {
        var currentPerctNumber = Math.round(tl.progress() * 100);
        if (!(tl.reversed()) && lastPerctNumber < currentPerctNumber) {
            lastPerctNumber	= currentPerctNumber;
            IREP.setProgress(currentPerctNumber);
            //console.log("set prog currentPerctNumber", currentPerctNumber);
        }
     }
}



/* ------------------------------------------------------
    MARK: TL Controls
    Code for moving timeline forward/backward and
    locking out the arrows
------------------------------------------------------ */

let masterTimescale = 1;
let $pageArray = $(".page");
let previousPageId = null;
let currentPageId = null;

const $nextArrow = $("#next_arrow");
const $backArrow = $("#back_arrow");

$nextArrow.click(function () {
    // Abort if the arrow has any "locked" class
    if ($nextArrow.is(".scroll_locked, .timeline_locked, .interaction_locked")) {
        return;
    }

    toggleNav(true);
    tl.timeScale(masterTimescale).play();
});

// Make course reverse when user clicks the back arrow
$backArrow.click(function() {
    if ($backArrow.is(".scroll_locked, .timeline_locked, .interaction_locked")) {
        return
    }

    toggleNav(true);
    if (SliderTurnOn == true) {
        tl.timeScale(masterTimescale).reverse();
    } else {
        tl.timeScale(2).reverse();
    }
});



/* ------------------------------------------------------
    MARK: pauseFunc
    Tracks current and previous pages, disables and
    enables ScrollTriggers, locks/unlocks the next arrow,
    and allows scrolling.
------------------------------------------------------ */

function pauseFunc() {

    if (tl.isActive() === true) {
        //console.log("pauseFunc called but timeline is still active.");
        return
    }

    //console.log("-------PAUSE----------");

    //console.log(`previousPageId: ${previousPageId}, currentPageId: ${currentPageId}`);

    if (currentPageId === tl.currentLabel()) {
        console.log("Page is the same, no change.");
        return;
    }

    previousPageId = currentPageId;
    currentPageId = tl.currentLabel();
    //console.log(`Page Change - Previous: ${previousPageId}, Current: ${currentPageId}`);

    $nextArrow.removeClass("interaction_locked");

    if (isValidPageId(previousPageId)) {
        disableScrollTriggers(previousPageId);
    }

    if (isValidPageId(currentPageId)) {
        enableScrollTriggers(currentPageId);

        // Interaction code to determine if there is an interaction on this page, and whether or not the user has completed it. If not, the next arrow is locked.
        if ('interactionFinished' in pageIndex[currentPageId]) {
            if (pageIndex[currentPageId].interactionFinished === false) {
                $nextArrow.addClass("interaction_locked");
            }
        }

        if (SliderTurnOn === true) {
            $("#slider_page_name p").text(currentPageId)
        }
    }

    allowScroll(true);

    ScrollTrigger.refresh(); // don't remove

    recordUserTimeLocation();
}


function isValidPageId(id) {
    if (id === null) {
        //console.log(`Page ${id} is null`);
        return false;
    } else if (id.includes("nav-section") || id.includes("placeholder") ) {
        console.warn(`Course should not be checking for a page called "${id}".`);
        console.warn(`⚠️ Check that:
        - You're not missing a page in the pageIndex in animation.js.
        - You're not missing a page label in the timeline.
        - The label order is correct in the timeline.`);
        return false;
    } else if (!pageIndex[id]) {
        console.warn(`Page "${id}" doesn't exist in pageIndex`);
        console.warn(`⚠️ Make sure to:
        - Add "${id}" to pageIndex in animation.js, if it's a valid page.
        - Check that the page name in pageIndex matches the timeline label.
        - Check that the page label is not overridden by another label, such as one immediately after .addPause. 
You can ignore this error if you are scrubbing the timeline. `);
        return false;
    }

    return true;
}


// Use this function to disable the back arrow at the start of a course
function disableBackArrow() {
    if (tl.reversed()) {
        $backArrow.removeClass("timeline_locked");
    } else {
        $backArrow.addClass("timeline_locked");
    }
}

// Use this function to enable the back arrow at the start of a course
function enableBackArrow() {
    if (tl.reversed()) {
        $backArrow.addClass("timeline_locked");
    } else {
        $backArrow.removeClass("timeline_locked");
    }
}

// Use this function to disable the next arrow at the end of a course
function disableNextArrow() {
    if (tl.reversed()) {
        $nextArrow.removeClass("timeline_locked");
    } else {
        $nextArrow.addClass("timeline_locked");
    }
}

// Use these functions to disable or enable both arrows
function disableBothArrows() {
    $(".nav_arrow_style").addClass("timeline_locked");
}

function enableBothArrows() {
    $(".nav_arrow_style").removeClass("timeline_locked");
}




/* ------------------------------------------------------
    MARK: allowScroll
    Controls when to enable or disable the main
    Overlay Scrollbar instance
------------------------------------------------------ */

var main_wrapper_el = document.getElementById("main_wrapper");
const { viewport } = scrollInstance.elements();

/* Can call allowScroll with the following (optional) parameters:
|   -- allow: a true/false boolean for whether to allow or disable scroll
|   -- timeline: any gsap timeline variable as a reference to what timeline you want to check for direction
|       -- will default to main tl
|       -- you can pass "override" as a string to timeline argument to
           not check any timeline and instead force enable/disable scroll
    -- scrollUp: a true/false boolean for whether to scroll the page back to the top.
        -- defaults to true so doesn't have to be declared in every timeline call.
*/
function allowScroll(allow, override, scrollUp = true) {

    //console.log("allowScroll:", allow);

    stopNextArrowTl();

    const { scrollTop } = viewport; // get scroll offset

    if (override == "override") {
        //console.log("Allow scroll:", allow, "override mode", "Scrollup:", scrollUp);
        if (allow) {
            scrollInstance.options({overflow:{y:"scroll"}});
            if (scrollUp && scrollTop != 0) {
                gsap.to(viewport, {duration: 0.25, scrollTo: 0});
            }
        } else {
            scrollInstance.options({overflow:{y:"hidden"}});
        }
        return
    }

    //console.log("Allow scroll:", (tlReference.reversed() ? !allow : allow), "Timeline or override?", tlReference, "Scrollup:", scrollUp);

    if (allow) { // allow scroll
        enableBothArrows();
        scheduleNextArrowWiggle();
        scrollInstance.options({overflow:{y:"scroll"}});
    } else { // disable scroll
        if (tl.reversed()) {
            $backArrow.addClass("timeline_locked");
        } else {
            $nextArrow.addClass("timeline_locked");
        }

        scrollInstance.options({overflow:{y:"hidden"}});
        if (scrollUp && scrollTop != 0) {
            gsap.to(viewport, {duration: 0.25, scrollTo: 0});
        }
    }
}



/* ------------------------------------------------------
    MARK: ST Setup
    SCROLLTRIGGER SETUP CODE
------------------------------------------------------ */
ScrollTrigger.defaults({
    scroller: "[data-overlayscrollbars-viewport]",
    start: (st) => calcStartPosition(st),
    //markers: true,
    //once: true,
    //end: (st) => {return st.start + 1},
    //onUpdate: self => console.log(self.trigger)
});



function checkPageCompletion(page) {
    return pageIndex[page].scrollFinished;
}


/**
 * MARK: enable ST
 * Enables ScrollTriggers for a given page
 */
function enableScrollTriggers(pageId) {
    $nextArrow.removeClass("scroll_locked");

    // Error Handling
    if (!pageIndex[pageId].ST) {
        console.warn(`No Scrolltriggers to enable for page: ${pageId}`);
        return;
    }
    //console.log(`Enabling STs for ${pageId}`);

    pageIndex[pageId].ST.forEach(ST => {
        ST.enable();
    })

    // Handle scroll lock logic (only add if page incomplete)
    if (!checkPageCompletion(pageId)) {
        //console.log(`${pageId} is incomplete, adding scroll lock.`);
        $nextArrow.addClass("scroll_locked");
    }
}

/**
 * MARK: disable ST
 * Disables ScrollTriggers for a given page
 */
function disableScrollTriggers(pageId) {
    // Always remove the scroll lock when leaving a section.
    // The next section's enable function will add it back if needed.
    $nextArrow.removeClass("scroll_locked");

    // Error Handling
    if (!pageIndex[pageId].ST) {
        console.warn(`No Scrolltriggers to disable for page: ${pageId}`);
        return;
    }

    //console.log(`Disabling STs for ${pageId}`);
    pageIndex[pageId].ST.forEach(ST => {
        ST.disable();
    })
}


// disable all ScrollTriggers
function disableAllST() {
    for (const property in pageIndex) {
        pageIndex[property].ST.forEach(ST => {
            ST.disable();
        })
    }
}

/**
 * MARK: calcStartPosition
 * Calculates  start position for ScrollTriggers, and provides a custom start value if needed.
 */
/* Use this func to calculate start position for anything
    near the bottom of the screen. It defaults to firing at
    60% of the screen height. You can change the default to any percentage.

    DON'T use it like this:
    start: calcStartPosition(el, 60) <--- NOTE: this does not work on resize

    Instead use this line of code:
    start: (st) => calcStartPosition(st, 60)
*/
function calcStartPosition(st, startPercent = "60", failsafe = false) {
    let el = st.trigger;
    let parentPage = el.closest(".page");

    const elTop = el.getBoundingClientRect().top;
    const maxScroll = ScrollTrigger.maxScroll(document.querySelector("[data-overlayscrollbars-viewport]"));
    const threshold = window.innerHeight * (startPercent / 100);
    
    //console.log(`window.innerHeight: ${window.innerHeight}, threshold: ${threshold}, maxScroll: ${maxScroll}, elTop: ${elTop}, failsafe?: ${failsafe}`);

    if (window.getComputedStyle(parentPage).display === 'none') {
        //console.log(`${parentPage.id} is not visible; give ST a fake start value so it never fires`);
        return 999999
    } else if (maxScroll == 0) {
        //console.log("page has no scroll so launch everything immediately");
        // For pages without scroll, don't use failsafe trigger (it fires too early)
        return failsafe ? 999999 : -1
    } else if (failsafe === true) {
        return "bottom bottom+=5%"
    } else if (elTop < threshold ) {
        //console.log("above the start point");
        return `top ${startPercent}%`
    } else {
        //console.log("below the start point");
        return `clamp(top ${startPercent}%)`
    }
}
// WISHLIST: ability to customize start position more


// MARK: ST failsafe
// Set up failsafe scrolltriggers for all pages
function createFailsafeScrollTrigger(target) {
    var failsafeId = `failsafe_${target}`;

    if (pageIndex[target]?.triggerSelector) {
        var triggerSelector = pageIndex[target].triggerSelector;
    } else {
        var triggerSelector = `#${target}`;
    }

    var ST_failsafe = ScrollTrigger.create({
        id: failsafeId,
        trigger: triggerSelector,
        once: true,
        start: (st) => calcStartPosition(st, null, true),
        onEnter: () => {
            //console.log(`${target} scroll is complete`);
            pageIndex[target].scrollFinished = true;
            $nextArrow.removeClass("scroll_locked");
            scheduleNextArrowWiggle();

            // Make sure all animations for this page have fired
            // However don't fire the failsafe again, and don't fire for repeating animations
            pageIndex[target].ST.forEach(function(ST) {
                if (!(ST.vars.id === failsafeId || ST.vars.once === false)) {
                    // BUG: won't fire batch animations
                    // https://gsap.com/community/forums/topic/44306-enablingdisabling-groups-of-scrolltriggers/#comment-216833
                    if (ST.animation) {
                        ST.animation.play();
                    }
                }
            });
        }
    });

    pageIndex[target].ST.push(ST_failsafe);
}

function createAllFailsafeST() {
    for (const page in pageIndex) {
        //console.log("create failsafe ST for", page);
        createFailsafeScrollTrigger(page);
    }
}


/* ------------------------------------------------------
    MARK: See Notices
    HIDE/SHOW THE "SEE NOTICES & DISCLAIMER" BAR
------------------------------------------------------ */
function toggleNoticesBar(val) {
    if (val == "show") {
        return gsap.to("#disclaimer_bar", {duration: 0.25, yPercent: 0, autoAlpha: 1, ease: "power3.inOut"})
    } else if (val == "hide") {
        return gsap.to("#disclaimer_bar", {duration: 0.25, yPercent: 100, autoAlpha: 0, ease: "power3.inOut"})
    }
}

// set once at start of course
gsap.set("#disclaimer_bar", {yPercent: 100, autoAlpha: 0})




/* -----------------------------------------------------
    MARK: Misc
-------------------------------------------------------- */

if (courseOptions.quizButtonDisplay == false) {
    $(".startQuiz").css("visibility", "hidden");
}

function stopExtraTimelines() {
    // Function can also be called in nav reset.
    // Example: circleSpin_1_1.pause();
}


// Note: This template does not contain any code that supports videos. It would have to be copied over from another template.