
//MARK: Final Function
/* -----------------------------------------------------
    Use this function for custom CSS or other course
    styling that doesn't fit anywhere else. It's one of
    the last functions called in.
-------------------------------------------------------- */
function theFinalFunction() {
    var deferred = $.Deferred();

    updateVideoLang();

    ScrollTrigger.refresh();

    deferred.resolve();
    return deferred.promise();
}



//MARK: Debounce
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



//MARK: Video
/* -----------------------------------------------------
    New code to check for video page tracking
-------------------------------------------------------- */
function videoPageTrackingCheck() {

    if (SliderTurnOn === false && courseOptions.scormLocation === false) {

        if (typeof(IREP_CurrentUser.currentUID) === "undefined") {
            IREP_CurrentUser.currentUID = courseOptions.paxUID;
        }

        // If enabled in config, checks if user has already watched the quiz.
        // If not, it will lock out the quiz button.
        if (videoQuizLockOut === true) {
            IREP.callApi({
                url: "/tracker",
                type: "GET",
                data: {
                    code: courseOptions.activityCode,
                    label: "videoWatched",
                    IncludeMostRecentData: true
                }
            }).done(function (data) {
                
                if (data.hits == 0) {
                    $("#quiz_box").addClass( "unclickable" );

                    //Temporary Code until quiz.js is changed
                    $("#quiz_box a").clone().appendTo( "#quiz_box .container" ).removeClass("startQuiz").addClass("fakeButton");
                    $(".startQuiz").hide();

                }
            });
        }

        // Set up some more tracking variables for the video
        var video = $('video');
        var videoEL = video[0];
        var loggedEnd = false;
        var lastPerctNumber = 0;
        var progressGate = {};
        
        // Get duration data once video has loaded that information
        // Without this, it checks too early and duration is NaN
        var i = setInterval(function() {
            if(videoEL.readyState > 0) {
                
                progressGate = {
                    p25: Math.round(videoEL.duration * .25),
                    p50: Math.round(videoEL.duration * .50),
                    p75: Math.round(videoEL.duration * .75),
                    p100: Math.round(videoEL.duration - 5),
                }
                            
                clearInterval(i);
            }
        }, 200);
        

        var capture = function() {

            if (videoEL.readyState > 0 ) {

                // If enabled, will unlock quiz button once user is done watching the video
                if (videoQuizLockOut === true) {

                    if (videoEL.currentTime > (videoEL.duration - 5) && !loggedEnd) {
                        loggedEnd = true;

                        IREP.callApi({url: "/tracker",type: "POST", data: {code: courseOptions.activityCode, label: "videoWatched", type:"Video", data:JSON.stringify({"ended": true})} }).done(function (data) {
                           //console.log(data);
                        });

                        $("#quiz_box").removeClass( "unclickable");

                        //Temporary Code until quiz.js is changed
                        $("#quiz_box .fakeButton").hide();
                        $(".startQuiz").show();

                    }
                }
                
                // Reports progress for use on the IREP site
                if (videoEL.currentTime > progressGate.p25 && videoEL.currentTime < progressGate.p50 && lastPerctNumber < 25) {
                    lastPerctNumber = 25;
                    IREP.setProgress(25); 
                } else if (videoEL.currentTime > progressGate.p50 && videoEL.currentTime < progressGate.p75 && lastPerctNumber < 50) {
                    lastPerctNumber = 50;
                    IREP.setProgress(50);  
                } else if (videoEL.currentTime > progressGate.p75 && videoEL.currentTime < progressGate.p100 && lastPerctNumber < 75) {
                    lastPerctNumber = 75;
                    IREP.setProgress(75);  
                } else if (videoEL.currentTime >= progressGate.p100 && lastPerctNumber < 94) {
                    lastPerctNumber = 94;
                    IREP.setProgress(94);  
                }

            }
        };


        // Get video progress value from database so we don't overwrite it later
        $.when(IREP.getProgress()).then(function(savedProgress) {
            if (savedProgress != null) {
                lastPerctNumber = savedProgress;
            }

            // Sets up calling the capture function
            // This prevents accidentally overwriting progress
            if (video.find('source').length > 0) {
                video.on('timeupdate', capture);
            }
        });


        /* -----------------------------------------------------
            Stops Video Scrubbing
        -------------------------------------------------------- */
        if (videoQuizLockOut === true) {
            var supposedCurrentTime = 0;

            videoEL.addEventListener('timeupdate', function() {
              if (!videoEL.seeking) {
                    supposedCurrentTime = videoEL.currentTime;
              }
            });
            // prevent user from seeking
            videoEL.addEventListener('seeking', function() {
              // guard agains infinite recursion:
              // user seeks, seeking is fired, currentTime is modified, seeking is fired, current time is modified, ....
              var delta = videoEL.currentTime - supposedCurrentTime;
              if (Math.abs(delta) > 0.01) {
                //console.log("Seeking is disabled");
                videoEL.currentTime = supposedCurrentTime;
              }
            });
            // delete the following event handler if rewind is not required
            videoEL.addEventListener('ended', function() {
              // reset state in order to allow for rewind
                supposedCurrentTime = 0;
            });
        }

    }

}



/* -----------------------------------------------------
    Pull in different videos based on culture code,
	and the mobile version based on screen size.
-------------------------------------------------------- */
//Taylor 1/29/19
var videoUrlArray = [];
$("video source").each(function(i) {
    
    var videoSrc = $(this).attr('src');
    videoSrc = videoSrc.slice(0, -9);
    videoUrlArray.push(videoSrc);

});

//Taylor 8/2/19
var textTrackArray = document.querySelectorAll("track"),
    hasTextTrack = false;

if (textTrackArray.length > 0) {
    hasTextTrack = true;
    
    for (var i = 0; i < textTrackArray.length; ++i) {
      textTrackArray[i].remove();
    }
}

function updateVideoLang(count) {
    
    var vidCC = courseOptions.cultureCode,
        trackCC = courseOptions.cultureCode;

    if (courseOptions.cultureCode == 'en-US' || courseOptions.cultureCode == 'en-GB' || courseOptions.cultureCode == "en-AU" || courseOptions.cultureCode == "da-DK" || courseOptions.cultureCode == "fi-FI" || courseOptions.cultureCode == "sv-SE") {
        vidCC = 'en-US';
        trackCC = 'en-US';
    }
	
	if (hasTextTrack && englishVideoOnly) {
        vidCC = 'en-US';
    }

    // Used when there are translated videos for some langs but NOT all.
    if (!englishVideoOnly && translatedVidCCs.length != 0) {
        // if a translated video is not available for this language, default back to en-US.
        if (!translatedVidCCs.includes(vidCC)) {
            vidCC = "en-US";
        }
    }

    if (windowWidth <= 1024) {
        var vidCC = vidCC + "_MOBILE";
    }

    $("video source").each(function(i) {
        
        var videoSrc = videoUrlArray[i] + vidCC + '.mp4';
        
        var myPlayer = videojs($(this).parent()[0]);
        myPlayer.src(videoSrc);
        
        myPlayer.ready(function(){
            
            if (hasTextTrack) {
                var trackLocation = "sub/" + courseOptions.activityCode + "_" + trackCC + ".vtt";
            
                var trackEl = myPlayer.addRemoteTextTrack({
                    kind: 'captions',
                    src: trackLocation,
                    srclang: trackCC.slice(0, 2),
                    label: courseOptions.cultureCode,
                    default: true
                }, false);

                trackEl.addEventListener('load', function() {

                    //if track loads incorrectly or there is no track, delete it
                    if (trackEl.track.cues_.length == 0) {
                        myPlayer.removeRemoteTextTrack(trackEl);
                    }

                    videoTrackingCheck();
                    videoPageTrackingCheck();

                });
            } else {
                videoTrackingCheck();
                videoPageTrackingCheck();
            }
            
        });

    });

}



//MARK: Chart Overflow
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



//MARK: Window Resize
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
	checkForOverflow();
}, 250);



//MARK: Misc
/* -----------------------------------------------------
    Misc functions
-------------------------------------------------------- */
if (courseOptions.quizButtonDisplay == false) {
    $(".startQuiz").css("visibility", "hidden");
}
