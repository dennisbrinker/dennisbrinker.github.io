/* -----------------------------------------------------

    REPLACE TEXT IDS WITH LANGUAGE SPECIFIC TEXT

-------------------------------------------------------- */

/* Used for 2018-04 IREP courses and newer
   All courses fully responsive
   courseOptions added */

/* -----------------------------------------------------
    Override culture code if language should be English.
-------------------------------------------------------- */

function overrideCheck(ccCheck) {
    var cultureCode2 = ccCheck;
    $( courseOptions.cultureCodeUntrans ).each(function(i) {
        if (ccCheck == courseOptions.cultureCodeUntrans[i]) {cultureCode2 = "en-GB";}
    });
    return cultureCode2;
}

/* -----------------------------------------------------
    Update locale text IDs with translated text.
-------------------------------------------------------- */

function replaceLocaleText(data) {

    if (courseOptions.scormLocation) {

        $('*[data-localeid]').each(function() {
            var returnText = translations.text[$(this).data("localeid")];
            if (returnText === undefined) {
                $(this).html(translations.text[$(this).data("localeid")]);
            } else {
                var a = returnText.replace(/\[/gi, "<sup>");
                returnText = a.replace(/\]/gi, "</sup>");
                $(this).html(returnText);
            }
        });
        
        $('*[data-svglocaleid]').each(function() {
            var returnText = translations.text[$(this).data("svglocaleid")];
            if (returnText === undefined) {
                $(this).prop('textContent', translations.text[$(this).data("svglocaleid")]);
            } else {
                $(this).prop('textContent', returnText);
            }
        });

    } else {
        
        $('*[data-localeid]').each(function() {
            var returnText = data.text[$(this).data("localeid")];
            if (returnText === undefined) {
                $(this).html(data.text[$(this).data("localeid")]);
            } else {
                $(this).html(returnText);
            }
        });

         $('*[data-linkid]').each(function() {
            var returnLinkURL = data.text[$(this).data("linkid")];
            if (returnLinkURL === undefined) {
                $(this).attr('href', data.text[$(this).data("linkid")]);
            } else {

                $(this).attr('href', returnLinkURL);
            }
        });
        
        $('*[data-svglocaleid]').each(function() {
            var returnText = data.text[$(this).data("svglocaleid")];
            if (returnText === undefined) {
                $(this).prop('textContent', data.text[$(this).data("svglocaleid")]);
            } else {
                $(this).prop('textContent', returnText);
            }
        });
    }
}


/* -----------------------------------------------------
    Update universal text IDs with translated text.
-------------------------------------------------------- */

// List of text IDs for universal IDs
// Remember that if we add an ID to this list, update portal/locales/universal_locale_IDs.json. This is used to generate additional files for Scorm, mobile offline, and WeChat PRC versions.
var universalIdList = [119904, 119905, 119906, 119907, 119908, 119909, 119910, 119911, 119912, 119913, 119914, 119915, 119916, 119917, 119918, 119919, 119920, 119921, 119922, 119923, 119924, 119925, 119926, 119927, 119928, 119929, 145069, 153582, 132276, 134096, 173945, 173946, 199407, 199408, 62707, 208489, 208490, 208491, 208492, 208493, 208494, 208495, 205930, 221490, 203409, 222045, 223306, 223307, 216918, 227932, 232057, 232058, 232059, 234370, 234371, 237111, 239033, 244523, 265057, 285345, 284137, 295444, 295445];

function replaceUniversalText(data, cultureCode2) {

    if (courseOptions.scormLocation) {

        $('*[data-universalid]').each(function() {
            
            var uid = $(this).data("universalid");
            var returnText = $(this).text(updateUniversalIds[cultureCode2][uid]);            
            
        });

    } else {

        $('*[data-universalid]').each(function() {
            var returnText = data.text[$(this).data("universalid")];
            if (returnText === undefined) {
                $(this).html(data.text[$(this).data("universalid")]);
            } else {
                var a = returnText.replace(/\[/gi, "<sup>");
                returnText = a.replace(/\]/gi, "</sup>");
                $(this).html(returnText);
            }
        });

    }
}

/* -----------------------------------------------------
    Update custom language CSS files
-------------------------------------------------------- */
var forceIntelClear = false;
var forceIntelOne = false;

function updateLangCSS() {
    
    //Taylor 5/8/19 check for fonts loading async
    // Intel Clear Pro and Intel One will never be loaded at the same time, so we can setup just one promise here.
    var updateLangReturn = $.Deferred();
    
    var refreshCSSFile = (Math.random() * 100).toFixed(2);

    // Append language specific styling
    var style = document.createElement("link");
    style.setAttribute("type", "text/css");
    style.setAttribute("rel", "stylesheet");
    style.setAttribute("id", "Updated-CSS-In-Lang");
    style.setAttribute("href", "css/module_" + courseOptions.cultureCode + ".css?v=" + refreshCSSFile);

    $("head")[0].appendChild(style);
    
    
    // INTEL CLEAR PRO FONT -------------------------
    
    function addIntelClearPro() {
        
        var style3 = document.createElement("link");
        style3.setAttribute("type", "text/css");
        style3.setAttribute("rel", "stylesheet");
        style3.setAttribute("id", "Intel-Clear-Pro");

        if (courseOptions.scormLocation || courseOptions.mobileOfflineVersion || courseOptions.PRCVersion) {
            style3.setAttribute("href", "../globalFiles/css/fonts-clearPro.css");
        } else {
            style3.setAttribute("href", "../globalFiles/css/fonts-clearPro.css");
        }

        $("head")[0].appendChild(style3);
        
        //Taylor 9/17/18
        $("html").removeClass("notClearPro");
        $("html").addClass("clearPro");
        
        //Taylor 5/8/19 check for fonts loading async
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (courseOptions.scormLocation || courseOptions.mobileOfflineVersion || courseOptions.PRCVersion) {
            script.src = "../globalFiles/js/plugin/fontfaceobserver.js";
        } else {
            script.src = "../globalFiles/js/plugin/fontfaceobserver.js";
        }
        script.onload = function() {            
            var font = new FontFaceObserver('IntelClearPro', {});

            font.load().then(function () {
                updateLangReturn.resolve();
            }, function () {
                updateLangReturn.resolve();
            });
            
        };
        document.body.appendChild(script);  
        
    }

    // Check if language supports Intel Clear Pro font
    // Gwen Update 9/27/19 Intel Clear Pro support added for hu-HU, nl-NL, cs-CZ, de-DE, pl-PL, id-ID for 201910 courses and newer.
    // Gwen Update 5/5/2021 Intel Clear Pro is being retired. Last month of use is 202105
    var courseAge = Number(courseOptions.activityCode.slice(0,6));   
    
    if (courseAge >= 201910 && courseAge <= 202105 && !forceIntelClear && $.inArray(courseOptions.cultureCode, ["en-US", "en-GB", "en-AU", "ru-RU", "vi-VN", "es-MX", "pt-BR", "es-ES", "fr-FR", "it-IT", "ro-RO", "tr-TR", "hu-HU", "nl-NL", "cs-CZ", "de-DE", "pl-PL", "id-ID"]) != -1) {
       
        addIntelClearPro();        
        
    } else if (courseAge <= 202105 && !forceIntelClear && $.inArray(courseOptions.cultureCode, ["en-US", "en-GB", "en-AU", "ru-RU", "vi-VN", "es-MX", "pt-BR", "es-ES", "fr-FR", "it-IT", "ro-RO", "tr-TR"]) != -1) {

        addIntelClearPro();

    } else if (courseAge <= 202105) {
        $("#Intel-Clear-Pro").remove();
        
        //Taylor 9/17/18
        $("html").removeClass("clearPro");
        $("html").addClass("notClearPro");
        
        updateLangReturn.resolve();
    }
    
    
    // INTEL ONE FONT -------------------------
    
    function addIntelOne() {
        $("#Intel-One").remove();
        
        var style4 = document.createElement("link");
        style4.setAttribute("type", "text/css");
        style4.setAttribute("rel", "stylesheet");
        style4.setAttribute("id", "Intel-One");

        if (courseOptions.scormLocation || courseOptions.mobileOfflineVersion || courseOptions.PRCVersion) {
            style4.setAttribute("href", "../globalFiles/css/fonts-intelOne.css");
        } else {
            style4.setAttribute("href", "../globalFiles/css/fonts-intelOne.css");
        }

        $("head")[0].appendChild(style4);
        

        $("html").removeClass("notIntelOne");
        $("html").addClass("hasIntelOne");
        
        //Taylor 5/8/19 check for fonts loading async
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (courseOptions.scormLocation || courseOptions.mobileOfflineVersion || courseOptions.PRCVersion) {
            script.src = "../globalFiles/js/plugin/fontfaceobserver.js";
        } else {
            script.src = "../globalFiles/js/plugin/fontfaceobserver.js";
        }
        script.onload = function() {            
            var font = new FontFaceObserver('IntelOne', {});

            font.load().then(function () {
                updateLangReturn.resolve();
            }, function () {
                updateLangReturn.resolve();
            });
            
        };
        document.body.appendChild(script); 
        
    }

    // Check if language supports Intel One font
    // Only used for courses 202106 and newer
    if (courseAge >= 202106 && !forceIntelOne && $.inArray(courseOptions.cultureCode, ["en-US", "en-GB", "en-AU", "ro-RO", "cs-CZ", "de-DE", "es-ES", "fr-FR", "hu-HU", "it-IT", "nl-NL", "pl-PL", "tr-TR", "id-ID", "vi-VN", "es-MX", "pt-BR", "ar-SA", "th-TH", "ru-RU", "uk-UA"]) != -1) {

        addIntelOne();

    } else if (courseAge >= 202106) {
        $("#Intel-One").remove();
        
        //Taylor 9/17/18
        $("html").removeClass("hasIntelOne");
        $("html").addClass("notIntelOne");
        
        updateLangReturn.resolve();
    }
    
    
    // Append language specific fonts if they exist
    if (courseOptions.cultureCode == "vi-VN" || courseOptions.cultureCode == "el-GR" || courseOptions.cultureCode == "ru-RU" || courseOptions.cultureCode == "uk-UA" || courseOptions.cultureCode == "zh-CHS" || courseOptions.cultureCode == "ja-JP" || courseOptions.cultureCode == "tr-TR" || courseOptions.cultureCode == "ar-SA" || courseOptions.cultureCode == "ko-KR" || courseOptions.cultureCode == "th-TH" || courseOptions.cultureCode == "zh-TW" ) {
        var style2 = document.createElement("link");
        style2.setAttribute("type", "text/css");
        style2.setAttribute("rel", "stylesheet");
        style2.setAttribute("id", "Updated-Font-In-Lang");

        if (courseOptions.scormLocation || courseOptions.mobileOfflineVersion || courseOptions.PRCVersion) {
            style2.setAttribute("href", "../globalFiles/css/fonts_" + courseOptions.cultureCode + ".css");
        } else {
            style2.setAttribute("href", "../globalFiles/css/fonts_" + courseOptions.cultureCode + ".css");
        }

        $("head")[0].appendChild(style2);

    } else {
        $("#Updated-Font-In-Lang").remove();
    }
    
    if (courseOptions.cultureCode == "ar-SA") {
        $("html").addClass("rtl");
    } else {
        $("html").removeClass("rtl");
    }
    
    return $.when(updateLangReturn);

}

/* -----------------------------------------------------
    Replace normal dashes with non-breaking dashes
-------------------------------------------------------- */

function unbreakTheDashes() {

    $('#course_wrapper p, #course_wrapper li, #course_wrapper h1, #course_wrapper h2, #course_wrapper h3, #course_wrapper h4, #course_wrapper_2 p, #course_wrapper_2 li, #course_wrapper_2 h1, #course_wrapper_2 h2, #course_wrapper_2 h3, #course_wrapper_2 h4, #course_wrapper_2 h5, #course_wrapper_2 h6').html(function(i, html) {
        if ( $(this).hasClass("non-breaking-dash") ) {
            return html.replace(/-/g, "&#8209;")
        }
    });   

}

/* -----------------------------------------------------
    Additional functions to be called depending on
    course type.
-------------------------------------------------------- */

function postTextReplace() {

    if (typeof helpTheOrphans === 'function') {
        helpTheOrphans();
    }
    
    unbreakTheDashes();    

    if (courseOptions.coursetype == "curtain") {
        callTheCurtain();
    }

}



/* -----------------------------------------------------
    Hide preloader elements (if they exist)
-------------------------------------------------------- */
function hidePreloader() {

    // text is replaced throughout the course at this point, so hide the initial gif loader
    TweenMax.to(("#preloader"), 0.5, {opacity:0, display: "none"});

    // this class is declared in fonts-1.css in global files and exists on curtains, articles and infographics
    $(".loading_no_scrolling").removeClass("loading_no_scrolling");
}


/* -----------------------------------------------------
    Master function that replaces text in the course.
-------------------------------------------------------- */

function localize(cc) {

    // If localize function was called with a specific culture code, update to that code.
    if (cc != null) {courseOptions.cultureCode = cc;}

    // Set a default code if one is missing.
    if (courseOptions.cultureCode == "" || !courseOptions.cultureCode) {courseOptions.cultureCode = "en-GB";}
    
    // Set the lang value on the html div
    var lang = courseOptions.cultureCode.toLowerCase();
    $("html").attr("lang", lang); 


    /* ---------------------------
        Pull text from database
    ------------------------------ */

    if (courseOptions.databaseLocation == true) {

        if (!window.location.origin) {
            window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        }

        var challengeTextUrl,
            localizationUrl,
            quizUrl,
            apiRootUrl,
            apiRootUrlSecure;
        
        var parentHasAPIURL = false;
        try {
            parentHasAPIURL = (window.parent.apiURL);
        } catch(e){

        }

        if (parentHasAPIURL) {
            apiRootUrl = window.parent.apiURL;
            apiRootUrlSecure =  window.parent.apiURLSecure;
            challengeTextUrl =  apiRootUrl + "quiz/challengeText";
            localizationUrl = apiRootUrl + "localization/texts";
            quizUrl = apiRootUrl + "quiz";
        } else {
            // always get text from prod API
            challengeTextUrl = "https://retailedge.intel.com/api/quiz/challengeText";
            localizationUrl = 'https://retailedge.intel.com/api/localization/texts';

            quizUrl = courseOptions.apiBaseUrl + "/quiz";
            apiRootUrl = courseOptions.apiBaseUrl + "/";

        }


        function getLocaleText() {
           return $.get(challengeTextUrl, {
                        cultureCode: courseOptions.cultureCode,
                        activityCode: courseOptions.activityCodeText != '' ? courseOptions.activityCodeText : courseOptions.activityCode,
                        format: 'json'
                    })
        }

        function getUniversalText(cultureCode2) {
          return $.ajax({
                  dataType: 'json',
                  url: localizationUrl,
                  contentType: 'application/json',
                  type: 'POST',
                  data: JSON.stringify({
                    cultureCode: cultureCode2,
                    ids: universalIdList
                  })
                })
        }

		
		function getQuizText() {

            //Local development check for when quiz isn't needed: Adam 1/29/2026
            if (typeof window.TurnOffQuiz !== 'undefined' && window.TurnOffQuiz === true)
            {
                if (courseOptions.devAPI === true) {
                    console.log("skip getting quiz from nonexistent dev database and immediately return false");
                    return $.Deferred().resolve(false);
                }
            }

            return $.get(quizUrl, {                
                ts:  Date.now(), // added by Gwen 7/2/2019 at dev request to help with cache busting
                cultureCode: courseOptions.cultureCode,
                activityCode: courseOptions.activityCode,
                "paxUID": courseOptions.paxUID,
                format: 'json'
              }).then(
                    function(data) {
                        return data;
                    },
                    function(err) {
                        // extra error catching for the content catalog
                        if (parent.window.contentCatalog === true) {
                            return $.Deferred().resolve({displayLimit: 5});
                        } else {
                            //return err;
                            // Gwen Update 5/12/2025 Added to track quiz API failure and skip quiz setup
                            return $.Deferred().resolve(false);
                        }
                    }
                );
        }

        var cultureCode2 = overrideCheck(courseOptions.cultureCode);

        $.when(getLocaleText(), getUniversalText(cultureCode2)).then(function(data1, data2) {

            var dataLocale = data1[0];
            var dataUniversal = data2[0];

            replaceLocaleText(dataLocale);
            replaceUniversalText(dataUniversal, cultureCode2);

            return $.when(dataLocale, dataUniversal, getQuizText(), updateLangCSS());

        }).then(function(dataLocale, dataUniversal, quizParams) {
            
            //Taylor fix 3/6/16
            function getQueryStrings() {
                var assoc = {};
                var decode = function(s) {
                    return decodeURIComponent(s.replace(/\+/g, " "));
                };
                var queryString = location.search.substring(1);
                var keyValues = queryString.split('&');

                for (var i in keyValues) {
                    var key = keyValues[i].split('=');
                    if (key.length > 1) {
                        assoc[decode(key[0])] = decode(key[1]);
                    }
                }
                return assoc;
            }

            var qs = getQueryStrings();
            var redirectId;

            if (courseOptions.redirectId) {
                redirectId = courseOptions.redirectId;
            }
            
            if (typeof qs["redirectid"] !== 'undefined' && !isNaN(parseInt(qs["redirectid"]))) {
                redirectId = qs["redirectid"];
            }
            //End - Also includes redirectid in quiz call below.
			
			//IREP 7.0 7/14/21
            var inframe;
            var refreshtype;
            if (typeof qs["inframe"] !== 'undefined') {
                inframe = qs["inframe"];
            }
            if (typeof qs["refreshtype"] !== 'undefined') {
                refreshtype = qs["refreshtype"];
            }
            //END

            if (quizParams === false) {
                console.warn("Quiz API failed to load. Skipping quiz setup.");
            } else {          
                //console.log("Quiz API loaded successfully.", quizParams);
                var quiz = new IREP.Quiz({
                    "isMobile": courseOptions.isMobile,
                    "isMobileApp": courseOptions.isMobileApp,
                    "isIOS": courseOptions.isIOS,
                    "activityUID": courseOptions.courseUID,
                    "site": courseOptions.sitecollection,
                    "activityCode": courseOptions.activityCode,
                    "displayLimit": quizParams.displayLimit,
                    "apiRoot": apiRootUrl,
                    "cultureCode": courseOptions.cultureCode,
                    "paxUID": courseOptions.paxUID,
                    "redirectId": redirectId,
                    returnUrl: 'learning', //Taylor 1/17/19 backButton() deleted returnURL set to 'learning'
                    edgeProMessage: courseOptions.showedgeProMessage,
                    questions: quizParams.questions,
                    randomized: quizParams.randomized,
                    text: {
                        'correct': dataUniversal.text[119909],
                        'incorrect': dataUniversal.text[119910],
                        'return': dataUniversal.text[119912],
                        'review': dataUniversal.text[119911],
                        'continue': dataUniversal.text[119905],
                        'proPass' : dataUniversal.text[173946],
                        'proFail' : dataUniversal.text[173945],
                        'submitCaps' : dataUniversal.text[208489],
                        'passedTitle' : dataUniversal.text[295444],
                        'passedMessage' : dataUniversal.text[208494],
                        'failedTitle' : dataUniversal.text[295445],
                        'failedMessage' : dataUniversal.text[208495],
                        'retakeCaps' : dataUniversal.text[208490],
                        'closeCaps' : dataUniversal.text[208491]
                    },
                    localeText: courseOptions.sendTextToQuiz ? dataLocale.text : null,
                    auditUID: quizParams.auditUID,
                    timeDivisor: courseOptions.timeDivisor,
                    inframe: inframe,
                    refreshtype: refreshtype
                });
            }


            if (courseOptions.coursetype == "module" || courseOptions.usePreloader) {
                // Returns when all images have finished loading.
                return $.when(ImageLoadedDeferred)
            }

        }).then(function() {
            // update preloader bar
            $('#loading_bar_full-progress').text('100%'); 
            TweenLite.set('#loading_bar_full_inner',{width:"100%"});

            postTextReplace();

            //seperate in case finalFunction ever gets API stuff tossed in it.
            theFinalFunction();
        }).then(function() {
            hidePreloader();
        }).catch(function(err) {
            // catches any error that happened along the way
            // similar code is located in quiz.js in the "nextAnswer" function

            // Append error message; added this way so all courses have access to the same message, rather than hardcoding it into each index.html file.
            var htmlSnippet = '<div id="preloader_error" class="motech_error_text" style="display: none;opacity:0;width: 100%; height: 100%; text-align: center;padding:3%;box-sizing:border-box;font-size:16px;"><div style="display: table-cell;vertical-align: middle;"><p id="error_server" class="p30 white"></p><p id="error_tryagain" class="p30 white"></p><div class="error_reload"><img class="error_reload_icon" alt="" width="50" height="50" src="../globalFiles/images/quiz_images/refresh-arrow.svg"></div></div></div>';
            $("#preloader").append(htmlSnippet);

            // Get translated error text
            var errorText1 = courseErrorText.part1[courseOptions.cultureCode];
            var errorText2 = courseErrorText.part2[courseOptions.cultureCode];
            $("#error_server").text(errorText1);
            $("#error_tryagain").text(errorText2);

            // Reload parent window on click.
            $("#preloader_error .error_reload").on('click', function() {
                parent.location.reload();
            });

            // Hide preloader wrapper. Target gif and bar seperately for courses w/ no preloader wrapper div.
            TweenMax.to(("#preloader_wrapper, #loading_gif, #loading_bar_full_wrapper"), 0.25, {opacity:0, display: "none"});
            TweenMax.to(("#preloader_error"), 0.5, {opacity:1, display: "table", delay: 0.25});

        });

    }


    /* ---------------------------
        Set up text for SCORM
    ------------------------------ */

    if (courseOptions.scormLocation) {

        var cultureCode2,
            countryCode = '',
            scriptReturn2 = $.Deferred(),
            scriptReturn3 = $.Deferred(),
            scriptReturn4 = $.Deferred();

        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "scorm/scorm_cc.js";

        script.onload = function() {

            courseOptions.cultureCode = CHANGEccSCORM;
            
            var lang = courseOptions.cultureCode.toLowerCase();
            $("html").attr("lang", lang); 

            cultureCode2 = overrideCheck(CHANGEccSCORM);
            
            if(typeof(CHANGEcoSCORM) !== 'undefined') {
                countryCode = CHANGEcoSCORM;
            }

            var script2 = document.createElement("script");
            script2.type = "text/javascript";
            script2.src = "scorm/xml/challengeText-" + courseOptions.cultureCode + ".js";
            script2.onload = function() {
                replaceLocaleText();
                scriptReturn2.resolve();
            };

            var script3 = document.createElement("script");
            script3.type = "text/javascript";
            script3.src = "scorm/xml/challengeText-ALL-2.js";
            script3.onload = function() {              
                replaceUniversalText('', cultureCode2);
                scriptReturn3.resolve();
            };
            
            var script4 = document.createElement("script");
            script4.type = "text/javascript";
            script4.src = "scorm/xml/challengeQuiz-" + courseOptions.cultureCode + ".js";
            script4.onload = function() {
                scriptReturn4.resolve();
            };

            document.body.appendChild(script2);
            document.body.appendChild(script3);
            document.body.appendChild(script4);

            $.when( scriptReturn2, scriptReturn3, scriptReturn4 ).then(function() {scriptCallOut();});
        };

        document.body.appendChild(script);

    }

    function scriptCallOut() {
        
        var quizData = $.extend({}, quiztranslations, {
            countryCode: countryCode,
            isIOS: courseOptions.isIOS,
            text: {
                'correct': updateUniversalIds[cultureCode2][119909],
                'incorrect': updateUniversalIds[cultureCode2][119910],
                'return': updateUniversalIds[cultureCode2][119912],
                'review': updateUniversalIds[cultureCode2][119911],
                'continue': updateUniversalIds[cultureCode2][119905],
                'proPass' : updateUniversalIds[cultureCode2][173946],
                'proFail' : updateUniversalIds[cultureCode2][173945],
                'submitCaps' : updateUniversalIds[cultureCode2][208489],
                'passedTitle' : updateUniversalIds[cultureCode2][295444],
                'passedMessage' : updateUniversalIds[cultureCode2][208494],
                'failedTitle' : updateUniversalIds[cultureCode2][295445],
                'failedMessage' : updateUniversalIds[cultureCode2][208495],
                'retakeCaps' : updateUniversalIds[cultureCode2][208490],
                'closeCaps' : updateUniversalIds[cultureCode2][208491]
            },
            localeText: courseOptions.sendTextToQuiz ? translations.text : null
        });

        var quiz = new IREP.Quiz(quizData);

        if(typeof(ScormTracker) !== 'undefined') {
            if(typeof(CHANGEsSCORM) !== 'undefined') {
                $.extend(quiz.options, CHANGEsSCORM);
            }
            var scormTracker = new ScormTracker(quiz);
        }
    
        $.when( updateLangCSS() ).then(function() {
            postTextReplace();
            theFinalFunction();
            hidePreloader();                
        });
    }

    /* --------------------------------------------
        Set up text for mobile offline trainings
    ----------------------------------------------- */

    if (courseOptions.mobileOfflineVersion) {

        var cultureCode2 = overrideCheck(courseOptions.cultureCode);
        
        var dataLocale,
            dataUniversal,
            scriptReturn1 = $.Deferred(),
            scriptReturn2 = $.Deferred();

        var scriptOfflineClick = document.createElement("script");
        scriptOfflineClick.type = "text/javascript";
        scriptOfflineClick.src = "offline/offline.js";

        var offline = document.getElementById("offline-version");

        document.body.insertBefore(scriptOfflineClick, offline);

        $.getJSON("offline/translation/" + courseOptions.cultureCode + ".js").done(function(data) {
            replaceLocaleText(data);
            dataLocale = data;
            scriptReturn1.resolve();
        });
                                                                                   
        $.getJSON('offline/localization/' + cultureCode2 + ".js").done(function(data) {
            replaceUniversalText(data);
            dataUniversal = data;
            scriptReturn2.resolve();
        });
        
        $.when( scriptReturn1, scriptReturn2 ).then(function() {
            
            $.getJSON('offline/quiz/' + courseOptions.cultureCode + '.js').done(function(data) {

                var quizData = $.extend({}, data, {
                    isMobile: true,
                    isMobileApp: true,
                    randomized: true,
                    isIOS: courseOptions.isIOS,
                    paxUID: courseOptions.paxUID,
                    text: {
                        'correct': dataUniversal.text[119909],
                        'incorrect': dataUniversal.text[119910],
                        'return': dataUniversal.text[119912],
                        'review': dataUniversal.text[119911],
                        'continue': dataUniversal.text[119905],
                        'proPass' : dataUniversal.text[173946],
                        'proFail' : dataUniversal.text[173945],
                        'submitCaps' : dataUniversal.text[208489],
                        'passedTitle' : dataUniversal.text[295444],
                        'passedMessage' : dataUniversal.text[208494],
                        'failedTitle' : dataUniversal.text[295445],
                        'failedMessage' : dataUniversal.text[208495],
                        'retakeCaps' : dataUniversal.text[208490],
                        'closeCaps' : dataUniversal.text[208491]
                    },
                    localeText: courseOptions.sendTextToQuiz ? dataLocale.text : null
                });
                quiz = new IREP.Quiz(quizData);
                
                $.when( updateLangCSS() ).then(function() {
                    postTextReplace();
                    theFinalFunction();
                    hidePreloader();                
                });

            });
            
        });

    }

    /* --------------------------------------
        Set up text for mobile offline PRC
    ----------------------------------------- */

    if (courseOptions.PRCVersion == true) {

        var dataLocale,
            dataUniversal,
            scriptReturn1 = $.Deferred(),
            scriptReturn2 = $.Deferred();
        
        courseOptions.cultureCode = "zh-CHS";
        
        var lang = courseOptions.cultureCode.toLowerCase();
        $("html").attr("lang", lang);

        var scriptPRCClick = document.createElement("script");
        scriptPRCClick.type = "text/javascript";
        scriptPRCClick.src = "offline/prc-clicks-exit-quiz.js";

        document.body.appendChild(scriptPRCClick);
        
        $.getJSON("offline/translation/" + courseOptions.cultureCode + ".js").done(function(data) {
            replaceLocaleText(data);
            dataLocale = data;
            scriptReturn1.resolve();
        });
                                                                                   
        $.getJSON('offline/localization/' + courseOptions.cultureCode + ".js").done(function(data) {
            replaceUniversalText(data);
            dataUniversal = data;
            scriptReturn2.resolve();
        });
        
        $.when( scriptReturn1, scriptReturn2 ).then(function() {
            
            $.getJSON('offline/quiz/' + courseOptions.cultureCode + '.js').done(function(data) {

                var quizData = $.extend({}, data, {
                    isMobile: true,
                    isMobileApp: true,
                    randomized: true,
                    isIOS: courseOptions.isIOS,
                    paxUID: courseOptions.paxUID,
                    text: {
                        'correct': dataUniversal.text[119909],
                        'incorrect': dataUniversal.text[119910],
                        'return': dataUniversal.text[119912],
                        'review': dataUniversal.text[119911],
                        'continue': dataUniversal.text[119905],
                        'proPass' : dataUniversal.text[173946],
                        'proFail' : dataUniversal.text[173945],
                        'submitCaps' : dataUniversal.text[208489],
                        'passedTitle' : dataUniversal.text[295444],
                        'passedMessage' : dataUniversal.text[208494],
                        'failedTitle' : dataUniversal.text[295445],
                        'failedMessage' : dataUniversal.text[208495],
                        'retakeCaps' : dataUniversal.text[208490],
                        'closeCaps' : dataUniversal.text[208491]
                    },
                    localeText: courseOptions.sendTextToQuiz ? dataLocale.text : null
                });
                quiz = new IREP.Quiz(quizData);
                
                $.when( updateLangCSS() ).then(function() {
                    postTextReplace();
                    theFinalFunction();
                    hidePreloader();                
                });

            });
            
        });
        
    }


}

// End localize function


/* --------------------------------------
        Preloader error text
    ----------------------------------------- */
var courseErrorText = {
    "part1": {
        "ar-SA": "واجه الخادم خطأ أثناء معالجة هذا الطلب.",
        "cs-CZ": "Při zpracování požadavku došlo k chybě serveru.",
        "da-DK": "Serveren stødte på en fejl under behandling af anmodningen.",
        "de-DE": "Bei der Verarbeitung der Anfrage ist ein Serverfehler aufgetreten.",
        "el-GR": "Ο διακομιστής αντιμετώπισε ένα σφάλμα κατά την επεξεργασία του αιτήματος.",
        "en-AU": "The server encountered an error processing the request.",
        "en-GB": "The server encountered an error processing the request.",
        "en-US": "The server encountered an error processing the request.",
        "es-ES": "El servidor ha encontrado un error al procesar la solicitud.",
        "es-MX": "El servidor halló un error al procesar la solicitud.",
        "fi-FI": "Palvelin havaitsi virheen käsiteltäessä pyyntöä.",
        "fr-FR": "Une erreur s'est produite lors du traitement de la requête par le serveur.",
        "hu-HU": "A kérés feldolgozásakor a szerver hibába ütközött.",
        "id-ID": "Server mengalami masalah saat memproses permintaan.",
        "it-IT": "Il server ha rilevato un errore durante l’elaborazione della richiesta.",
        "ja-JP": "要求の処理中にサーバーでエラーが発生しました。",
        "ko-KR": "요청을 처리하는 중 서버에서 오류가 발생했습니다.",
        "nb-NO": "Det oppstod en feil på serveren under behandling av forespørselen.",
        "nl-NL": "Op de server is een fout opgetreden bij het verwerken van de aanvraag.",
        "pl-PL": "Serwer napotkał błąd podczas przetwarzania żądania.",
        "pt-BR": "O servidor detectou um erro ao processar a solicitação.",
        "ro-RO": "Serverul a întâmpinat o problemă la procesarea cererii.",
        "ru-RU": "На сервере при обработке запроса произошла ошибка.",
        "sv-SE": "Servern påträffade ett fel vid bearbetning av begäran.",
        "th-TH": "เซิร์ฟเวอร์พบข้อผิดพลาดในการประมวลผลคำร้องขอ",
        "tr-TR": "Sunucu bu talebi işlerken bir hata ile karşılaştı.",
        "uk-UA": "Під час обробки запиту на сервері сталася помилка.",
        "vi-VN": "Máy chủ gặp lỗi khi xử lý yêu cầu.",
        "zh-CHS": "服务器处理请求时出错。",
        "zh-TW": "伺服器處理要求時發生錯誤。"
    },
    "part2": {
        "ar-SA": "يرجى المحاولة مرة أخرى. نأسف على الإزعاج.",
        "cs-CZ": "Omlouváme se, zkuste to prosím znovu.",
        "da-DK": "Prøv igen, undskyld ulejligheden.",
        "de-DE": "Wir entschuldigen uns für eventuelle Unannehmlichkeiten. Versuchen Sie bitte erneut.",
        "el-GR": "Δοκιμάστε ξανά. Συγγνώμη για την ταλαιπωρία.",
        "en-AU": "Please try again. Sorry for the trouble.",
        "en-GB": "Please try again. Sorry for the trouble.",
        "en-US": "Please try again. Sorry for the trouble.",
        "es-ES": "Vuelve a intentarlo y disculpa las molestias.",
        "es-MX": "Vuelve a intentarlo. Lamentamos el inconveniente.",
        "fi-FI": "Yritä uudelleen. Pahoittelemme tästä aiheutunutta haittaa.",
        "fr-FR": "Merci de faire une nouvelle tentative. Veuillez nous excuser pour la gêne occasionnée.",
        "hu-HU": "Próbálkozzon újra. A probléma miatt elnézést kérünk.",
        "id-ID": "Coba lagi. Maaf atas masalah ini.",
        "it-IT": "Prova di nuovo.",
        "ja-JP": "もう一度やり直してください。ご迷惑をお掛けして申し訳ありません。",
        "ko-KR": "다시 시도하십시오. 불편을 끼쳐 죄송합니다.",
        "nb-NO": "Beklager problemet. Prøv på nytt.",
        "nl-NL": "Probeer het opnieuw. Onze excuses voor het ongemak.",
        "pl-PL": "Przepraszamy za kłopot – spróbuj ponownie.",
        "pt-BR": "Tente novamente. Pedimos desculpas pelo transtorno.",
        "ro-RO": "Te rugăm mai încearcă o dată, ne pare rău.",
        "ru-RU": "Пожалуйста, попробуйте еще раз. Извините за неудобство.",
        "sv-SE": "Försök igen, vi ber om ursäkt för besväret.",
        "th-TH": "โปรดลองอีกครั้ง ขออภัยในความผิดพลาด",
        "tr-TR": "Lütfen tekrar deneyin. Bu sorundan dolayı özür dileriz.",
        "uk-UA": "Спробуйте ще раз. Вибачте за незручності.",
        "vi-VN": "Vui lòng thử lại. Chúng tôi rất tiếc vì sự cố này.",
        "zh-CHS": "请重试，抱歉给您带来不便。",
        "zh-TW": "請再試一次，抱歉造成您的困擾。"
    }
}



/* --------------------------------------
        Clear out default text
    ----------------------------------------- */

function clearText() {
    $('*[data-localeid]').each(function() {
        $(this).empty();
    });
    $('*[data-universalid]').each(function() {
        $(this).empty();
    });

}

/* --------------------------------------
        Misc setup
    ----------------------------------------- */

if (courseOptions.coursetype == "module" || courseOptions.usePreloader) {
    // Set up this promise early. Originally was declared in loader-images but
    // occasionally that file loaded too late, causing the course to break.
    var ImageLoadedDeferred = $.Deferred();
}


/* -----------------------------------------------------
    Loader height fix on mobile - Taylor 4/18/2018
-------------------------------------------------------- */
if ((courseOptions.coursetype !== "module") && (courseOptions.isIOS)) {
    //Set preloader to correct height mobile device
    //7/19/18 Taylor Removed no longer needed on ios but test on new mobile app
    //$('#preloader').height(screenHeight);

    //Actually disable scrolling on the preloader element
    $("#preloader").on("touchmove", function(e) {
        e.preventDefault();
    });
}


/* -----------------------------------------------------
    Launch actual text replacement
-------------------------------------------------------- */

clearText();
APICompletePromise.then(function() { localize(); });

