
/* -----------------------------------------------------
    Use this function for custom CSS or other course
    styling that doesn't fit anywhere else. It's one of
    the last functions called in.
-------------------------------------------------------- */
function  theFinalFunction() {

    unlockSpokes(); // checks to see if user has already completed any spokes.

    ScrollTrigger.refresh();

    // Enable timelines for main page after preloader vanishes
    setTimeout(function() {
        mainSTarray.forEach(function(ST) {
            ST.enable()
        });        
    }, 500);

}

/* -----------------------------------------------------
   https://davidwalsh.name/javascript-debounce-function
   Returns a function, that, as long as it continues to be invoked, will not
   be triggered. The function will be called after it stops being called for
   N milliseconds. If `immediate` is passed, trigger the function on the
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
}, 250)


/* -----------------------------------------------------
    Nav dropdown menu / arrows
-------------------------------------------------------- */
var nav_box_tl = gsap.timeline({paused: true});
    nav_box_tl
        .fromTo("#nav_menu", {display:"none"}, {display:"inline-block", duration: 0.1}, 0)
        .fromTo("#nav_menu li", {opacity: 0, scaleX: 0.2, transformOrigin: "0% 0%"}, {opacity: 1, scaleX: 1, transformOrigin: "0% 0%", duration: 0.2, stagger: 0.1})
        .to("#navBurger", {x: 45, duration: 0.2}, 0)
        .fromTo("#navX", {x:-45}, {x:0, duration: 0.2}, 0.1)

$("#nav_square").click(function() {
    if (nav_box_tl.progress() == 0) {
       nav_box_tl.restart();
    } else if (nav_box_tl.progress() == 1) {
        nav_box_tl.reverse();
    }
});

$("#nav_square").hover(function() {
    gsap.to("#navBurger rect, #navX polygon", {duration: 0.15, fill: "#999"})
}, function() {
    gsap.to("#navBurger rect, #navX polygon", {duration: 0.15, fill: "#fff"})
});


$("#nav_menu li").each(function(i) {

    $( this ).on("click", function() {
        if ( !$( this ).hasClass("locked") && this.id != "nav_bottom_quit" ) {
            spokeSwitch(i);
        }
    });

});

/* -----------------------------------------------------
    Misc functions
-------------------------------------------------------- */

if (courseOptions.quizButtonDisplay == false) {
    $(".startQuiz").css("visibility", "hidden");
}
