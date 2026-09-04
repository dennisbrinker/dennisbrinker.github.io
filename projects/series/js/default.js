
/* -----------------------------------------------------
    Use this function for custom course logic that
    doesn't fit anywhere else. It's one of the last
    functions called in.
-------------------------------------------------------- */
function theFinalFunction() {

    //document.getElementById('box_1').scrollIntoView();

    $.when(motech.getUser()).then(function() {
		//getQuiz depends on getUser having returned in motech-scorm-adapter
		$.when(motech.getQuiz()).then(function(data) {
			var quiz = new Course.Quiz(data);
            
    		motechScrolltrigger();
            ScrollTrigger.refresh();
			//Hide the preloader when everything has loaded
			hidePreloader();
		})
    })    
}


/* -----------------------------------------------------
    Hides the preloader when everything is done loading
-------------------------------------------------------- */
function hidePreloader() {
    gsap.to(("#preloader"), {duration: 0.5, opacity:0, display: "none"});
    $(".loading_no_scrolling").removeClass("loading_no_scrolling");
}

if (courseOptions.usePreloader) {
    $.when(ImageLoadedDeferred).then(function() {
        theFinalFunction();
    })

} else {
    $(document).ready(function() {
        theFinalFunction();
    })
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
    New image source replace function to prevent
    preloading all images.
-------------------------------------------------------- */

function imgSrcReplace() {

    // <img alt="" data-src="images/2-Inset_1_HD.jpg" data-src-mobwidth="-1" src="images/tiny.gif">

    // data-src-mobwidth="756" to switch to mob image at different width
    // data-src-mobwidth="-1" to opt out of mobile and use hd image
    // data-src-nomob="true" to eliminate the image on mobile

    var images = document.querySelectorAll('[data-src]');
    var replace = '_HD';
    var regex = new RegExp(replace, 'g');

    $(images).each(function(i) {

        //$(this).removeClass("show_on_MOB show_on_HD show_on_4K");

        var src = $(this).attr("data-src");

        var mobwidth = 768;

        if ($(this).attr("data-src-mobwidth")) {
            mobwidth = $(this).attr("data-src-mobwidth");
        }

        if (windowWidth <= mobwidth) {

            if ($(this).attr("data-src-nomob")) {
                src = "images/tiny.gif";
            } else {
                src = src.replace(regex, "_MOB");
            }
            //$(this).addClass("show_on_MOB");

        } else if ((windowWidth < 3500) && (windowWidth > mobwidth)) {
            src = src.replace(regex, "_HD");
            //$(this).addClass("show_on_HD");
        } else if (windowWidth >= 3500) {
            src = src.replace(regex, "_4K");
            //$(this).addClass("show_on_4K");
        }


        $(this).attr("src",src);

    });

}

imgSrcReplace();


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
}, 250)


