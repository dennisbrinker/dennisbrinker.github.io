/* -----------------------------------------------------

    SNACK API CALLS & INITALIZATION

-------------------------------------------------------- */

/* Used for 2024 Snacks and newer */

// check if inside an iframe and if so assume we're on prod
var pageInIframe = ( function() {return (window.location !== window.parent.location);} ) ();

let messenger;
if (pageInIframe) {
    messenger = await import("./messenger.js");
} else {
    messenger = await import("./messenger.test.js");
}

// Setup snack messenger
const snackMessenger = new messenger.SnackMessenger();

// make global scope
window.snackMessenger = snackMessenger;

// Auto cache buster code based on date
var d = new Date();
var cacheBuster = String(d.getFullYear()) + String(d.getMonth()).padStart(2, '0') + String(d.getDate()).padStart(2, '0');

// Call 'loaded' to get the snackData
if(!pageInIframe) {
    snackMessenger.onCommand('loaded', {
        "css": `https://retailedge.intel.com/50/content/dist/v7/ww/ltr/snacks.css?v=${cacheBuster}`,
        "js": `https://retailedge.intel.com/50/content/dist/v7/snacks.js?v=${cacheBuster}`,
        "components": [{
            /* type: "question",
            questions: [{
                id: "123",
                text: "Dummy Question",
                answers: [{
                    id: "321",
                    text: "A",
                },
                {
                    id: "322",
                    text: "B",
                },
                {
                    id: "323",
                    text: "C",
                }]
            }] */
        }],
        snackType: courseOptions.activityCode == "202403-SnackTutorial" ? "Tutorial" : "Training"
    });
}

const snackData = await snackMessenger.sendCommand('loaded');

//console.log(snackData);

// Import the 'main' snack css and js bundles
messenger.addCss(snackData.css);
const snacks = await import(snackData.js);


// Pull in video animation code for tutorial snack
if (snackData.snackType.toLowerCase() == "tutorial") {
    const SnackAnimation = snacks.SnackAnimation;

    // make global scope
    window.SnackAnimation = SnackAnimation;
}

// check for ar-SA
if (courseOptions.cultureCode.toLowerCase() == "ar-sa") {
    document.body.setAttribute('dir', 'rtl')
}

// Handle when snack is displayed
function showSnack() {

    $.when(textLoaded).then(function() {
        //console.log("text loaded");
        // recalculates triggers, needed because document height changes when text gets loaded in.
        ScrollTrigger.refresh();

        // enable animations if they exist, after a short delay
        setTimeout(function() {            
            if (stArray) {
                stArray.forEach(function(ST) {
                    ST.enable()
                });
            }

            // failsafe "fire all st's" code
            var failsafe = ScrollTrigger.create({
                id: "failsafe",
                trigger: "#main_wrapper",
                start: "bottom 100%+=10px",
                //markers: true,
                once: true,
                onEnter: () => {
                    //console.log("failsafe fired");
                    stArray.forEach(function(ST) {
                        // don't fire failsafe again
                        if (ST.vars.id != "failsafe") {
                            ST.animation.play();
                        }
                    });
                }
            });



        }, 200);

        theFinalFunction();

        // check if ST animation has fired
        window.animCheck = setTimeout(() => {
            if (!stArray || !stArray[0]) {
                return;
            }
            
            if (stArray[0].progress == 0) {
                console.log("Snack Client Error - anim failed to start");
                //console.log(JSON.stringify({ activityCode: courseOptions.activityCode, enabled: stArray[0].enabled, start: stArray[0].start, trigger: stArray[0].trigger.tagName, windowWidth: windowWidth, windowHeight: windowHeight}));
                //window.snackMessenger.sendCommand('error', { message: "Snack Client Error - anim failed to start", data: JSON.stringify({ activityCode: courseOptions.activityCode, enabled: stArray[0].enabled, start: stArray[0].start, trigger: stArray[0].trigger.tagName, windowWidth: windowWidth, windowHeight: windowHeight })});
                
                ScrollTrigger.refresh();

                window.animRecheck = setTimeout(() => {
                    animRecheck();
                }, 1000);
            }
        }, 1000);

        function animRecheck() {
            //console.log("recheck!");
            if (stArray[0].progress == 0) {
                ScrollTrigger.refresh();
                //window.snackMessenger.sendCommand('error', { message: "Snack Client Error - anim failed to start after ST refresh", data: JSON.stringify({ activityCode: courseOptions.activityCode, enabled: stArray[0].enabled, start: stArray[0].start, trigger: stArray[0].trigger.tagName, windowWidth: windowWidth, windowHeight: windowHeight })});
            }
        }

    }).catch(function() {
        console.log("Snack Client Error in showSnack(), textLoaded promise did not resolve");
        //window.snackMessenger.sendCommand('error', { message: "Snack Client Error in showSnack()", data: JSON.stringify({ activityCode: courseOptions.activityCode })});
    });
}

// special case for when snack is shown immediately
if (snackData.shown === true ) {
    //console.log("snackData.shown, show snack");
    showSnack();
}

snackMessenger.addMessageListener('show', () => {
    //console.log("snackMessenger, show snack");
    showSnack();
});

// Handle when snack is swiped away
snackMessenger.addMessageListener('hide', () => {
    // clear testing timeouts, trying to prevent error log spam from superusers
    clearTimeout(window.animCheck);
    clearTimeout(window.animRecheck);  
});

// See if there is a question component, and if so setup the Quiz component
const questionComponent = snackData.components.filter(c => c.type === "question");
if (questionComponent.length > 0) {
    const quiz = new snacks.QuizContentSnack($('#quiz-wrapper'), snackMessenger);
    $("#quiz-wrapper").addClass("full-height scroll-snap")
}

if (!pageInIframe) {
    snackMessenger.sendMessage('show', {});
}

//console.info(snackData, snackMessenger);

// Start text replace
localize();