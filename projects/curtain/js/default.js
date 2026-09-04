/* -----------------------------------------------------
    Use this function for custom CSS or other course
    styling that doesn't fit anywhere else. It's one of
    the last functions called in.
-------------------------------------------------------- */

function theFinalFunction() {
    var deferred = $.Deferred();

    /*if (courseOptions.cultureCode == "tr-TR") {
        // example do something custom
    }*/
    
    //updateVideoLang();
    
    // recalculates triggers, needed because document height changes when text gets loaded in.
    ScrollTrigger.refresh();

    // check for negative start positions in animations
    let negativeStartArray = [];
    stArray.forEach(function(ST) {
        if (ST.start < 0 && !ST.vars.scrub && ST.animation) {
            // pause animations at 0 seconds, store reference to anim to play later
            negativeStartArray.push(ST.animation.pause(0));            
        }
    });

    // Enable timelines after preloader vanishes
    setTimeout(function() {
        stArray.forEach(function(ST) {
            ST.enable()
        });
        if (negativeStartArray.length) {
            negativeStartArray.forEach((t) => t.play());
        }
    }, 500);
    
    //document.getElementById('panel_3').scrollIntoView();
   

    deferred.resolve();
    return deferred.promise();
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
    Pull in different videos based on culture code
-------------------------------------------------------- */

//Taylor 1/29/19
var videoUrlArray = [];
$("video source").each(function(i) {
    
    var videoSrc = $(this).attr('src');
    videoSrc = videoSrc.slice(0, -9);
    videoUrlArray.push(videoSrc);

});

function updateVideoLang(count) {
    var vidCC = courseOptions.cultureCode;

    if (courseOptions.cultureCode == 'en-US' || courseOptions.cultureCode == 'en-GB' || courseOptions.cultureCode == "en-AU" || courseOptions.cultureCode == "da-DK" || courseOptions.cultureCode == "fi-FI" || courseOptions.cultureCode == "sv-SE") {
        vidCC = 'en-US'
    }

    if (windowWidth <= 1024) {
        var vidCC = vidCC + "_MOBILE";
    }

    $("video source").each(function(i) {

        var videoSrc = videoUrlArray[i] + vidCC + '.mp4';

        $(this).attr('src', videoSrc);
        $(this).parent()[0].load();
        

    }).promise()
    .done( function() {
        videoTrackingCheck();
    });

}

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
    Sets up Scrolltrigger animations. Called in
    text-replace after text has been translated
-------------------------------------------------------- */

function callTheCurtain() {
    motechScrolltrigger2();
}

/* -----------------------------------------------------
    Window resize functions
-------------------------------------------------------- */
$(window).resize(function() {
    windowHeight = $(window).height();
    windowWidth = $(window).width();
    resizeThrottled();
});

var resizeThrottled = debounce(function() {
    //console.log("resize");
    imgSrcReplace();
    checkForOverflow();
}, 250);


/* -----------------------------------------------------
    Misc functions
-------------------------------------------------------- */

if (courseOptions.quizButtonDisplay == false) {
    $(".startQuiz").css("visibility", "hidden");
}
