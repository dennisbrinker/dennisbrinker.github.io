/* Used for 2018-04 IREP courses and newer */


// Dev API Mode Check -----------------
// Added by Gwen May 2025
var configReadyPromise = new Promise((resolveConfigPromise, rejectConfigPromise) => {


    // skip check for production sites
    let parentUrl = window.parent.location.href;

    if (parentUrl.toLowerCase().includes("retailedge.intel.com") || courseOptions.mobileOfflineVersion == true || courseOptions.PRCVersion == true || courseOptions.scormLocation == true || courseOptions.isMobileApp == true) {
        //console.log("Skipping dev-api-config.js check.");
        resolveConfigPromise();
        return;
    }

    const localConfigPath = '../globalFiles/dev-api-config.js';
    const script = document.createElement('script');
    script.src = localConfigPath;

    script.onload = function() {
        if (typeof window.DEV_API_CONFIG !== 'undefined') {
            console.log("%c--- DEV API MODE ACTIVE ---\nNote: course text is still pulling from production", "color: cyan; background-color: black; font-weight: bold; padding: 2px 5px; border-radius: 3px;");
            courseOptions.devAPI = true;
            courseOptions.apiBaseUrl = window.DEV_API_CONFIG.apiBaseUrlForDev;
        }

        resolveConfigPromise();
    };

    script.onerror = function() {
        //console.log("dev-api-config.js not found or failed to load.");
        // Still resolve the promise because this is an expected "failure" for an optional file.
        resolveConfigPromise();
    };

    // TODO Add a fallback setTimeout for resolveConfigPromise?

    document.head.appendChild(script);
});


var parentHasAPIURLSecure = false;
try {
    parentHasAPIURLSecure = (window.parent.apiURLSecure);
} catch(e){

}

function APIsetup() {
    if (parentHasAPIURLSecure) {
        httpApiVar = window.parent.apiURL;
        httpsApiVar =  window.parent.apiURLSecure;
    } else {
        //console.log("default location");
        httpApiVar = courseOptions.apiBaseUrl;
        httpsApiVar =  courseOptions.apiBaseUrl;
    }

    window.IREP.options = {
        httpApi: httpApiVar,
        httpsApi: httpsApiVar
    };
    window.IREP.user = function() {
        return {
            currentUID: courseOptions.paxUID 
        };
    };
    window.IREP.callApi = function (options) {
        options = $.extend({}, { type: 'GET', secure: false, anonymous: false, data: {}, headers: {} }, options);
        var headers = $.extend({}, { "PaxUID": options.anonymous ? '' : IREP.user().currentUID }, options.headers);

        var xhr = $.ajax({
            dataType: "json",
            url: options.secure ? this.options.httpsApi + options.url : this.options.httpApi + options.url,
            contentType: 'application/json',
            type: options.type,
            headers: headers,
            data: options.type === "GET" ? options.data : JSON.stringify(options.data)
        });

        return xhr.promise();
    };
    window.IREP.getBookmark = function() {
        var deferred = $.Deferred();            
        IREP.callApi({
            url: '/education/status',
            type: 'GET',
            data: {
                activityCode: courseOptions.activityCode
            }
        }).done(function(data) {
            
            if (typeof data.activityStatus != 'undefined') {
                deferred.resolve(data.activityStatus.bookmark);
            } else {
                deferred.resolve(0);
            }               
            
        });
        return deferred.promise();
    };
    window.IREP.setBookmark = function(bookmark) {             
        IREP.callApi({
            url: '/education/bookmark',
            type: 'POST',
            data: {
                activityStatus: {
                    bookmark: bookmark,
                    activityCode: courseOptions.activityCode
                }
            }
        }).done(function(data) {
            
        });  
    };
    window.IREP.getProgress = function() {
        var deferred = $.Deferred();
        
        IREP.callApi({
            url: '/education/status',
            type: 'GET',
            data: {
                activityCode: courseOptions.activityCode
            }
        }).done(function(data) {
            //console.log(data);
            
            if (typeof data.activityStatus != 'undefined') {
                deferred.resolve(data.activityStatus.progress);
            } else {
                deferred.resolve(0);
            }   
            
        });
        return deferred.promise();
    };
    window.IREP.setProgress = function(progress) {      
        IREP.callApi({
            url: '/education/progress',
            type: 'POST',
            data: {
                activityStatus: {
                    progress: progress,
                    activityCode: courseOptions.activityCode
                }
            }
        }).done(function(data) {
            
        }); 
    };
    window.IREP.getAvatar = function() {
                            
        // check for offline versions of course
        if (courseOptions.scormLocation || courseOptions.mobileOfflineVersion || courseOptions.PRCVersion) {
            var data = {
                fullbodyImageUrl: "globalFiles/images/avatar/Default_Full.png",
                headshotImageUrl: "globalFiles/images/avatar/Default_Crop.png"
            }
            return data
        }
        
        // otherwise, call the database to get user's avatar image
        // updated 11/10/2021
        var deferred = $.Deferred();            
        IREP.callApi({
            url: '/participant/quizprofilepic'
        }).done(function(data) {
            deferred.resolve(data);                
        });
        return deferred.promise();
    }

    function videoTrackingCheck() {
        if (SliderTurnOn === false) {

            if (typeof(IREP_CurrentUser.currentUID) === "undefined") {
                IREP_CurrentUser.currentUID = courseOptions.paxUID;
            }

            $('video').each(function() {
                var video = $(this);
                var videoEl = video[0];
                var loggedBegin = false;
                var loggedEnd = false;
                var loggedMiddle = false;
                
                var log = function(viewType) {
                    var url = videoEl.currentSrc;
                    var isaNumber = video.attr('data-isa-number') || video.attr('isa-number');
                    var data = {
                        ViewType: viewType,
                        Source: null,
                        URL: url,
                        ActivityCode: courseOptions.activityCode,
                        ISANumber: isaNumber,
                        IsMobile: courseOptions.isMobile 
                    };
                    
                    IREP.callApi({
                        url: '/videotracker',
                        type: 'POST',
                        data: data
                    });
                }

                var capture = function() {
                    // Gwen 2/13/2017: added the readyState check because capture fires when the video's URL is
                    // switched out by the updateVideoLang function, and will report wrong URL.
                    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState
                    if (videoEl.readyState > 0 ) {
                        if (videoEl.currentTime < 5 && !loggedBegin) {
                            log(1);
                            loggedBegin = true;					
                        } else if (videoEl.currentTime > (videoEl.duration - 5) && !loggedEnd) {
                            log(2);
                            loggedEnd = true;
                        } else if (videoEl.currentTime > (videoEl.duration / 2) && !loggedMiddle) {
                            log(3);
                            loggedMiddle = true;
                        }
                        
                    }
                }

                if (video.find('source').length > 0) {
                    video.on('timeupdate', capture);
                }
            });
        }
    }

    window.videoTrackingCheck = videoTrackingCheck;
}


var APICompletePromise = configReadyPromise.then(function() {
    APIsetup();
    return;
});