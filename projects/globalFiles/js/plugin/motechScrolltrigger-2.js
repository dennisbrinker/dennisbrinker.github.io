/* -----------------------------------------------------

        SCROLLTRIGGER ANIMATION PLUGIN
        Used for curtains 2024-05 and later.
        Last Updated 11/22/2024

----------------------------------------------------- */

// Add to html: data-anim="type: fade"

let stArray;

var motechScrolltrigger2 = function() {
    // if in reviewer mode, don't set up any scrolltrigger timelines
    if (ReviewerTurnOn) return

    // helper functions

    function convertStrToBool(string) {
        if (string === "true") {
            return true
        } else {
            return false
        }
    }
    function convertStrToNum(string) {
        return Number(string)
    }


    function createST(anim) {
        //console.log(anim);

        var perspectiveWidth = gsap.utils.clamp(400, 1500, $(anim.target).width() * 3);
        var perspectiveHeight = gsap.utils.clamp(400, 1500, $(anim.target).height() * 3);

        var timeline = gsap.timeline({scrollTrigger: {
            trigger: anim.triggerElement,
            start: "top " + anim.offset,
            //markers: true,
            toggleActions: "play none play none"
        }});

        switch(anim.type) {

            case "fade":
                timeline
                .fromTo(anim.target, {autoAlpha: 0}, {duration: anim.duration, autoAlpha: 1, delay: anim.delay, ease: anim.ease});
            break;

            case "fade-up":
                timeline
                .fromTo(anim.target, {y: anim.transform, autoAlpha: 0}, {duration: anim.duration, y: "0%", autoAlpha: 1, delay: anim.delay, ease: anim.ease});
            break;

            case "fade-up-left":
                timeline
                .fromTo(anim.target, {y: anim.transform, x: anim.transform, autoAlpha: 0}, {duration: anim.duration, y: "0%", x: "0%", autoAlpha: 1, delay: anim.delay, ease: anim.ease});
            break;

            case "fade-up-right":
                timeline
                .fromTo(anim.target, {y: anim.transform, x: "-"+anim.transform, autoAlpha: 0}, {duration: anim.duration, y: "0%", x: "0%", autoAlpha: 1, delay: anim.delay, ease: anim.ease});
            break;

            case "fade-down":
                timeline
                .fromTo(anim.target, {y: "-"+anim.transform, autoAlpha: 0}, {duration: anim.duration, y: "0%", autoAlpha: 1, delay: anim.delay, ease: anim.ease});
            break;

            case "fade-down-left":
                timeline
                .fromTo(anim.target, {y: "-"+anim.transform, x: anim.transform, autoAlpha: 0}, {duration: anim.duration, y: "0%", x: "0%", autoAlpha: 1, delay: anim.delay, ease: anim.ease});
            break;

            case "fade-down-right":
                timeline
                .fromTo(anim.target, {y: "-"+anim.transform, x: "-"+anim.transform, autoAlpha: 0}, {duration: anim.duration, y: "0%", x: "0%", autoAlpha: 1, delay: anim.delay, ease: anim.ease});
            break;

            case "fade-left":
                timeline
                .fromTo(anim.target, {x: anim.transform, autoAlpha: 0}, {duration: anim.duration, x: "0%", autoAlpha: 1, delay: anim.delay, ease: anim.ease});
            break;

            case "fade-right":
                timeline
                .fromTo(anim.target, {x: "-"+ anim.transform, autoAlpha: 0}, {duration: anim.duration, x: "0%", autoAlpha: 1, delay: anim.delay, ease: anim.ease});
            break;

            case "spin":
                if (anim.flip == "placeholder") {anim.flip = 180;}
                gsap.set(anim.target, {transformOrigin: anim.transformOrigin})
                timeline
                .fromTo(anim.target, {rotation: anim.flip, autoAlpha: 0}, {duration: anim.duration, rotation: 0, autoAlpha: 1, delay: anim.delay, ease: anim.ease});
            break;

            case "flip-up":
                if (anim.flip == "placeholder") {anim.flip = 90;}
                gsap.set(anim.target, {transformPerspective: perspectiveHeight, transformOrigin: anim.transformOrigin})
                timeline
                .fromTo(anim.target, {rotationX: anim.flip, autoAlpha: 0}, {duration: anim.duration, rotationX: 0, autoAlpha: 1, delay: anim.delay, ease: anim.ease});
            break;

            case "flip-down":
                if (anim.flip == "placeholder") {anim.flip = -90;}
                gsap.set(anim.target, {transformPerspective: perspectiveHeight, transformOrigin: anim.transformOrigin})
                timeline
                .fromTo(anim.target, {rotationX: anim.flip, autoAlpha: 0}, {duration: anim.duration, rotationX: 0, autoAlpha: 1, delay: anim.delay, ease: anim.ease});
            break;

            case "flip-left":
                if (anim.flip == "placeholder") {anim.flip = 90;}
                gsap.set(anim.target, {transformPerspective: perspectiveWidth, transformOrigin: anim.transformOrigin})
                timeline
                .fromTo(anim.target, {rotationY: anim.flip, autoAlpha: 0}, {duration: anim.duration, rotationY: 0, autoAlpha: 1, delay: anim.delay, ease: anim.ease});
            break;

            case "flip-right":
                if (anim.flip == "placeholder") {anim.flip = -90;}
                gsap.set(anim.target, {transformPerspective: perspectiveWidth, transformOrigin: anim.transformOrigin})
                timeline
                .fromTo(anim.target, {rotationY: anim.flip, autoAlpha: 0}, {duration: anim.duration, rotationY: 0, autoAlpha: 1, delay: anim.delay, ease: anim.ease});
            break;

            case "zoom-in":
                gsap.set(anim.target, {transformOrigin: anim.transformOrigin})
                timeline
                .fromTo(anim.target, {scale: 0, autoAlpha: 0}, {duration: anim.duration, scale: 1, autoAlpha: 1, delay: anim.delay, ease: anim.ease});
            break;

            case "zoom-in-up":
                gsap.set(anim.target, {transformOrigin: anim.transformOrigin})
                timeline
                .fromTo(anim.target, {scale: 0, y: anim.transform, autoAlpha: 0}, {duration: anim.duration, scale: 1, y: "0%", autoAlpha: 1, delay: anim.delay, ease: anim.ease});
            break;

            case "zoom-in-down":
                gsap.set(anim.target, {transformOrigin: anim.transformOrigin})
                timeline
                .fromTo(anim.target, {scale: 0, y: "-"+anim.transform, autoAlpha: 0}, {duration: anim.duration, scale: 1, y: "0%",  autoAlpha: 1, delay: anim.delay, ease: anim.ease});
            break;

            case "zoom-in-left":
                gsap.set(anim.target, {transformOrigin: anim.transformOrigin})
                timeline
                .fromTo(anim.target, {scale: 0, x: anim.transform, autoAlpha: 0}, {duration: anim.duration, scale: 1, x: "0%",  autoAlpha: 1, delay: anim.delay, ease: anim.ease});
            break;

            case "zoom-in-right":
                gsap.set(anim.target, {transformOrigin: anim.transformOrigin})
                timeline
                .fromTo(anim.target, {scale: 0, x: "-"+anim.transform, autoAlpha: 0}, {duration: anim.duration, scale: 1, x: "0%", autoAlpha: 1, delay: anim.delay, ease: anim.ease});
            break;

            case "zoom-out":
                gsap.set(anim.target, {transformOrigin: anim.transformOrigin})
                timeline
                .fromTo(anim.target, {scale: 1.25, autoAlpha: 0}, {duration: anim.duration, scale: 1, autoAlpha: 1, delay: anim.delay, ease: anim.ease});
            break;

            case "zoom-out-up":
                gsap.set(anim.target, {transformOrigin: anim.transformOrigin})
                timeline
                .fromTo(anim.target, {scale: 1.25, y: anim.transform, autoAlpha: 0}, {duration: anim.duration, scale: 1, y: "0%", autoAlpha: 1, delay: anim.delay, ease: anim.ease});
            break;

            case "zoom-out-down":
                gsap.set(anim.target, {transformOrigin: anim.transformOrigin})
                timeline
                .fromTo(anim.target, {scale: 1.25, y: "-"+anim.transform, autoAlpha: 0}, {duration: anim.duration, scale: 1, y: "0%", autoAlpha: 1, delay: anim.delay, ease: anim.ease});
            break;

            case "zoom-out-left":
                gsap.set(anim.target, {transformOrigin: anim.transformOrigin})
                timeline
                .fromTo(anim.target, {scale: 1.25, x: anim.transform, autoAlpha: 0}, {duration: anim.duration, scale: 1, x: "0%", autoAlpha: 1, delay: anim.delay, ease: anim.ease});
            break;

            case "zoom-out-right":
                gsap.set(anim.target, {transformOrigin: anim.transformOrigin})
                timeline
                .fromTo(anim.target, {scale: 1.25, x: "-"+anim.transform, autoAlpha: 0}, {duration: anim.duration, scale: 1, x: "0%", autoAlpha: 1, delay: anim.delay, ease: anim.ease});
            break;

            case "twist-up":
                if (anim.flip == "placeholder") {anim.flip = 180;}
                if (anim.scale == "placeholder") {anim.scale = 0.5;}
                gsap.set(anim.target, {transformPerspective: perspectiveHeight, transformOrigin: anim.transformOrigin})
                timeline
                .fromTo(anim.target, {rotationY: anim.flip, y: anim.transform, scale: anim.scale, autoAlpha: 0}, {duration: anim.duration, rotationY: 0, y: "0%", scale: 1, autoAlpha: 1, delay: anim.delay, ease: anim.ease});
            break;

            case "twist-down":
                if (anim.flip == "placeholder") {anim.flip = 180;}
                if (anim.scale == "placeholder") {anim.scale = 0.5;}
                gsap.set(anim.target, {transformPerspective: perspectiveHeight, transformOrigin: anim.transformOrigin})
                timeline
                .fromTo(anim.target, {rotationY: anim.flip, y: "-"+anim.transform, scale: anim.scale, autoAlpha: 0}, {duration: anim.duration, rotationY: 0, y: "0%", scale: 1, autoAlpha: 1, delay: anim.delay, ease: anim.ease});
            break;
        }
    }

    // find scrolltrigger data in the DOM
    var scrolltrigger = document.querySelectorAll('[data-anim]');

    scrolltrigger.forEach((el) => {

        //console.log(el);

        var data = el.dataset.anim.replace(/ /g, '');
        var properties = data.split(',');

        // set up defaults
        var anim = {
            triggerElement: el,
            target: el,
            type: "fade",
            duration: 0.5,
            offset: "80%",
            delay: 0,
            ease: "power1.out",
            transform: "20%",
            transformOrigin: "50% 50%", /* Must be declared as x% y% */
            flip: "placeholder", /* Only use integers, no units */
            scale: "placeholder", /* Doesn't work with all anims, check code */
            useOnChildren: false /* Will not animate parent div, instead sets up ScrollTriggers for all direct children */
        };


        // overwrite defaults
        properties.forEach(function(property) {
            var tup = property.split(':');
            //console.log(property, tup);
            anim[tup[0]] = tup[1];
        });

        // do some data type conversion/clean up
        anim.duration = convertStrToNum(anim.duration);
        anim.delay = convertStrToNum(anim.delay);
        anim.useOnChildren = convertStrToBool(anim.useOnChildren);

        // make sure offset has a %age
        if (anim.offset.indexOf("%") == -1) {
            anim.offset = anim.offset + "%";
        }

        // adds a space back into transform origin if needed
        anim.transformOrigin = anim.transformOrigin.replace(/(%)(\d)/g, '$1 $2');

        // TODO / WISHLIST support for useOnChildren and multiple anim types
        // TODO / WISHLIST support for useOnChildren and setting custom triggerElement

        // set up scrolltriggers
        if (anim.useOnChildren == true) {
            Array.from(el.children).forEach(function (element, i) {
                let animChild = {...anim}; // necessary syntax to prevent modifying the original anim object
                animChild.triggerElement = element; 
                animChild.target = element;
                if (anim.delay > 0) {
                    animChild.delay = anim.delay * i;
                }
                createST(animChild)
            });
        } else {
            createST(anim)
        }

    });

    stArray = ScrollTrigger.getAll();
    //console.log(stArray);

    // failsafe "fire all st's" code
    var failsafe = ScrollTrigger.create({
        id: "failsafe",
        trigger: "#panel_legal",
        start: "top bottom",
        once: true,
        onEnter: () => {
            stArray.forEach(function(ST) {
                // don't fire failsafe again
                if (ST.vars.id != "failsafe") {
                    ST.animation.play();
                }
            });
        }
    });

    // Disable ST's for now so they won't run before course is shown.
    stArray.forEach(function(ST) {
        ST.disable()
    });

};