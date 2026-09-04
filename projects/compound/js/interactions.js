/* ------------------------------
             NOTES

  * Search for "DEV-UPDATE" to find code you need to customize for your course. Check this file, animation.js and index.html. 

  * Do not change the following id/class names (or if you do, make sure you know what you're doing):

   #main_page
   #hub
   #summary
   .spoke
   .return_button
 ------------------------------ */


/* ------------------------------
        MARK: SETUP
 ------------------------------ */
// main config object for main page and all spokes
// DEV-UPDATE the number of spokes if needed, and the div ID for each spoke if you changed it
// Do not change the spoke property names (eg, spoke1, spoke2)
var pageIndex = {
    main_page: {
        num: 0,
        id: "main_page",
    },
    spoke1: {
        num: 1,
        id: "spoke_1",
        completed: false
    },
    spoke2: {
        num: 2,
        id: "spoke_2",
        completed: false
    },
    spoke3: {
        num: 3,
        id: "spoke_3",
        completed: false
    },
    spoke4: {
        num: 4,
        id: "spoke_4",
        completed: false
    }
}

var currentPage = "main_page", // current page the user is on
    lastVisitedPage = "", // last page the user viewed
    courseComplete = false, // has user completed all spokes
    numOfSpokes = Object.keys(pageIndex).length - 1, // number of spokes in the course, not counting main page.
    endingShown = false; // tracks if the ending summary has already been displayed


// Set up dom references to commonly targeted divs.
var $main_wrapper = document.getElementById('main_wrapper'),
    $hub = document.getElementById('spoke_wrapper');


/* ------------------------------
        MARK: NAVIGATING 
        BETWEEN HUB AND SPOKES
 ------------------------------ */
// Function can be called with either spoke name or number. code is based on the name.
function spokeSwitch(page) {

    if (typeof page == "number") {
        page = spokeNumToName(page)
    }

    lastVisitedPage = currentPage;
    currentPage = page;

    if (page == "main_page") {

        var tl = gsap.timeline({onComplete: function () {
            if (courseComplete == true) {
                showEnding({scrollDown: true});
            }
            refresh();
        }});
            tl
            .to(".spoke", 0.15, {opacity: 0, display: "none"})
            .to("#main_page", 0.05, {display: "block"})
            .call(function() {
                $hub.scrollIntoView();
            })
            .to("#main_page", 0.25, {opacity: 1})

    } else {

        var target = "#" + pageIndex[page].id;

        var tl = gsap.timeline({onComplete: refresh});
            tl
            .to("#main_page, .spoke", 0.15, {opacity: 0, display: "none"})
            .to(target, 0.05, {display: "flex"})
            .call(scrollToTop, null, null, "+=0.06")
            .to(target, 0.25, {opacity: 1}, "+=0.05")
    }

    // update nav menu
    $(".nav-current").removeClass("nav-current");

    $("#nav_menu").children().eq( pageIndex[currentPage].num ).addClass("nav-current")

}

// This function is called in spokeSwitch(), and makes sure the content of the active spoke is ready for user interaction.
// DEV-UPDATE with any custom updates or refreshes needed.
function refresh() {
    //console.log("refresh: ", currentPage);

    // disable all anims
    masterSTArray.forEach(function(ST) {
        ST.disable()
    });

    // spoke specific code
    if (currentPage == "main_page") {

        mainSTarray.forEach(function(ST) {
            ST.enable()
        });  

    } else if (currentPage == "spoke1") {

        spoke1STarray.forEach(function(ST) {
            ST.enable()
        });  
        $("#slider_1_1").slick('setPosition');

    } else if (currentPage == "spoke2") {

        spoke2STarray.forEach(function(ST) {
            ST.enable()
        }); 
        $("#slider_2_1").slick('setPosition');
        $("#slider_2_2").slick('setPosition'); 
        game2_batch_animate()

    } else if (currentPage == "spoke3") {

        spoke3STarray.forEach(function(ST) {
            ST.enable()
        });  
        $("#slider_3_1").slick('setPosition');
        $("#slider_3_2").slick('setPosition'); 

    } else if (currentPage == "spoke4") {

        spoke4STarray.forEach(function(ST) {
            ST.enable()
        });  
        $("#slider_4_1").slick('setPosition');

    }

    // This part is used to pause looping timelines or do other misc cleanup for the spoke the user just completed. You may not need to put anything here.
    if (lastVisitedPage == currentPage) {
        // do nothing

    } else if (lastVisitedPage == "spoke1") {
        //sample_tl.pause();
    }
    

    ScrollTrigger.refresh();
}


// Reveals the summary panel when the course is complete.
// accepts an object as a parameter, with the "scrollDown" property set to true or false.
function showEnding(param) {
    // Prevent running if already shown
    if (endingShown) {
        return;
    }
    //console.log(param);

    var tl = gsap.timeline({onComplete: function() {
            endingShown = true; // Mark as shown after animation completes
            if (param.scrollDown == true) {
                //document.getElementById("summary").scrollIntoView({ behavior: 'smooth'});
                setTimeout(() => {
                    document.getElementById("summary").scrollIntoView({ behavior: 'smooth'});
                }, 1750); //NOTE: added setTimeout to allow the final timeline animation to finish before the scroll
            }
        }})
        tl
        //Moved summary animations to markSpokeComplete() > checkSpokesCompleted()
            //.to("#summary", 0.05, {opacity: 1, display: "block"})

}




/* ------------------------------
        MARK: CLICK EVENTS
 ------------------------------ */
// Ensure the arrow animation is only set up once all sliders have initialized
var sliderTotal = $('.slider_number').length;
var sliderCount = 1;

// Init event must be declared BEFORE Slider Setup
$('.slider_number').on('init', function(slick) {
    if (sliderCount == sliderTotal) {
		// Set up arrow anims
		document.querySelectorAll(".slick-next").forEach((el) => {
            el.anim = gsap.fromTo(el, {scale: 1, x: 0}, {duration: 1.125, scale: 1.1, x: "30%", transformOrigin: "100% 50%", ease: "sine.inOut", repeat: -1, yoyo: true})
        });
    } else {
        sliderCount ++;
    }   
});


/*------ SLIDER SETUP -------*/
$('.performance_carousel').slick({
    arrows: true,
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }, {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
});


/* Checks if carousels have been completed --------------------- */
// handles cases where carousel doesn't scroll at desktop size (does at smaller sizes) and need to mark as finished for quizUnlockCheck to work.
$('.slider_number').on('setPosition', function(event) {
    var length = event.currentTarget.slick.$slides.length,
        slidesToShow = event.currentTarget.slick.options.slidesToShow;
        let sliderNum = $(this).attr('id').slice(-3);
        let sectionNum = sliderNum.slice(0, 1);

    if (length <= slidesToShow) {
        $("#slider_" + sliderNum).addClass("finished" + sectionNum);
        //console.log("added finished to #slider_" + num);
    }
	
	returnUnlockCheck();
	
})

$('.slider_number').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
	let sliderNum = $(this).attr('id').slice(-3);
    let sectionNum = sliderNum.slice(0, 1);

    if (nextSlide >= slick.$slides.length - slick.options.slidesToShow) {
        $("#slider_" + sliderNum).addClass("finished" + sectionNum);
        //console.log("added finished to #slider_" + sliderNum);
    }
	
	var arrowTL_el = $("#slider_" + sliderNum + " .slick-next")[0];
    // extra checks for arrow and animation existing
    if (arrowTL_el && typeof arrowTL_el.anim != "undefined") {
        if (arrowTL_el.anim.isActive()) {
            gsap.to(arrowTL_el, {duration: 0.5, scale: 1, x: 0, ease: "sine.inOut", onComplete: function() {
                arrowTL_el.anim.pause();
            }});
        }
    }

    returnUnlockCheck();
	
});


/* Unlock Return Section Button --------------------- */
function returnUnlockCheck() {
    if ($(".finished1").length >= 1) {
        $("#spoke_1 .return_button").removeClass("noClick");
    }    
    if ($(".finished2").length >= 2) {
        $("#spoke_2 .return_button").removeClass("noClick");
    }
    if ($(".finished3").length >= 2) {
        $("#spoke_3 .return_button").removeClass("noClick");
    }
    if ($(".finished4").length >= 1) {
        $("#spoke_4 .return_button").removeClass("noClick");
    }
}


// Set up hub buttons to show correct spoke on click.
$(".spoke_button").click(function() {
	if ( !$(this).hasClass("locked") ) {
        var num = $(this).data("spoke");
        spokeSwitch(num);
    }
    //gsap.set($(this).find(".paw"), {autoAlpha: 0});
})

$('#click_spoke1').one('click', function() {
    if (click_spoke1_tl.isActive()) {
        click_spoke1_tl.pause();
    }
})


// Set up "return to hub" button functionality
// need a .on because these buttons are always invisible at start of course.
$('#main_wrapper').on('click','.return_button', function() {
    markSpokeComplete();
    spokeSwitch("main_page");
});



/* ------------------------------
    MARK: HELPER FUNCTIONS
 ------------------------------ */
// convert spoke number to its actual name.
function spokeNumToName(num) {
    return num == 0 ? "main_page" : "spoke" + num;
}

function scrollToTop() {
    //document.getElementById('course_wrapper').scrollTop = 0;
    //$main_wrapper.scrollTop = 0;
    $main_wrapper.scrollIntoView();
}

// returns the number of spokes that have been completed.
function checkSpokesCompleted() {
    var spokesCompleted = 0;
    for (var prop in pageIndex) {
        if (pageIndex[prop].completed === true) {
            spokesCompleted++;
        }
    }
   // console.log("spokesCompleted: ", spokesCompleted);
    return spokesCompleted
}


/* ------------------------------
    MARK: PROGRESSION LOGIC
 ------------------------------ */
// By default, this function will mark current spoke as completed.
// Override parameter is optional. Can be either spoke name or number.
function markSpokeComplete(override) {

    var spokeID;

    if (override) {
        if (typeof override == "number") {
            spokeID = spokeNumToName(override)
        } else {
            spokeID = override;
        }
    } else {
        spokeID = currentPage;
    }

    //console.log(override, currentPage, spokeID);

    // Prevent running if this spoke is already completed
    if (pageIndex[spokeID].completed === true) {
        return;
    } // TODO: test if this is working as intended, to prevent double counting if user clicks "return to hub" multiple times before clicking another spoke.

    pageIndex[spokeID].completed = true;    

    // pageIndex variable stores if each spoke has been completed
    var pageData = JSON.stringify(pageIndex);
    IREP.setBookmark(pageData);

    recordUserProgress();

    var isCourseComplete = checkSpokesCompleted() == numOfSpokes;

    if (isCourseComplete) {
        courseComplete = true;
        gsap.set("#summary", {opacity: 1});
    }

    // DEV-UPDATE 
    if (spokeID == "spoke1") {
        $("#click_spoke1").addClass("finished"); 
        $("#click_spoke1").removeClass("active");
		$("#nav_menu").children().eq(2).removeClass("locked");
        $("#click_spoke2").removeClass("locked");       
        $("#click_spoke2").addClass("active"); 
        if (!courseComplete) {
		    setTimeout(() => {hub_progress_tl.play("hub_progress_1");}, 500);      
        }

    } else if (spokeID == "spoke2") {
        $("#click_spoke2").addClass("finished");
        $("#click_spoke2").removeClass("active");
		$("#nav_menu").children().eq(3).removeClass("locked");           
        $("#click_spoke3").removeClass("locked"); 
        $("#click_spoke3").addClass("active");  
        if (!courseComplete) {
		    setTimeout(() => {hub_progress_tl.play("hub_progress_2");}, 500); 
        }

    } else if (spokeID == "spoke3") {
        $("#click_spoke3").addClass("finished");
		$("#click_spoke3").removeClass("active");
		$("#nav_menu").children().eq(4).removeClass("locked");
        $("#click_spoke4").removeClass("locked");   
        $("#click_spoke4").addClass("active");
        if (!courseComplete) {
		    setTimeout(() => {hub_progress_tl.play("hub_progress_3");}, 500);
        }

    } else if (spokeID == "spoke4") {
        $("#click_spoke4").addClass("finished");
        $("#click_spoke4").removeClass("active");
        if (courseComplete) {
            hub_progress_tl.eventCallback("onComplete", function() {
                summary_tl.play();
            });
		    setTimeout(() => {hub_progress_tl.play();}, 500);
        } else {
		    setTimeout(() => {hub_progress_tl.play("hub_progress_4");}, 500);
        }
    }

}


summary_tl = gsap.timeline({paused: true})
    summary_tl
    .from("#summary .textbox", {duration: 0.65, yPercent: 30, clipPath: "inset(0% 0% 100% 0%)", ease: "sine.out"}) //NOTE: same animation as textAnimate from animation.js



/* ---------------------------------------
    MARK: BOOKMARK & PROGRESS CODE
 --------------------------------------- */
var visitedChapter = 0,
    lastPerctNumber = 0;

// At course load, check to see if user has already completed any spokes.
// called in FinalFunction
function unlockSpokes() {
    if (courseOptions.scormLocation === false && SliderTurnOn === false ) {
        $.when(IREP.getBookmark(), IREP.getProgress()).then(function(pageData, savedProgress) {

            pageData = JSON.parse(pageData)

            //console.log(pageData, savedProgress);

            if (savedProgress != null) {
                lastPerctNumber = savedProgress;
            }

            // mark previously completed spokes as completed
            for (var property in pageData) {

                var completed = pageData[property].completed;
                var num = pageData[property].num;

                if (completed===true) {
                    markSpokeComplete(num);
                }
            }

            if (checkSpokesCompleted() == numOfSpokes) {
                showEnding({scrollDown: false}); // don't force scroll down when user loads the course.
            }
        });
    }
}

// Set user progress value when user has completed a spoke. This is used on the site, not actually used anywhere in the course.
// Called in markSpokeComplete()
function recordUserProgress() {
    if (SliderTurnOn === false && courseOptions.scormLocation === false) {
        var currentPerctNumber = (checkSpokesCompleted() * 100) / numOfSpokes;
        //console.log(currentPerctNumber, lastPerctNumber);

        // make sure we don't overwrite a higher progress value with a lower one.
        if (lastPerctNumber < currentPerctNumber) {
            lastPerctNumber	= currentPerctNumber;
            IREP.setProgress(currentPerctNumber);
        }
     }
}

