/*

SCROLLTRIGGER CURTAIN ANIMATION PLUGIN

Last Updated 9/14/2023

*/

var motechScrolltrigger = function() {
    
    // if in reviewer mode, don't set up any scrolltrigger timelines
    if (ReviewerTurnOn) return
    
    var scrolltriggerArray = [];

    var scrolltrigger = document.querySelectorAll('[data-scrolltrigger]');

    $.each(scrolltrigger, function (i) {

        var animation = $(this).attr("data-scrolltrigger");

        if ($(this).attr("data-scrolltrigger-mobile") && (windowWidth <= courseOptions.mobileWidth)) {
            if ($(this).attr("data-scrolltrigger-mobile") == "none") {
                return
            } else {
                animation = $(this).attr("data-scrolltrigger-mobile");
            }            
        }
        
        var time;
        if ($(this).attr("data-scrolltrigger-time")) {
            time = parseFloat($(this).attr("data-scrolltrigger-time"));
        } else {
            time = 0.5;
        }

        var offset;
        if ($(this).attr("data-scrolltrigger-offset")) {
            offset = $(this).attr("data-scrolltrigger-offset");
            // adds a % if one isn't present			
			if (offset.indexOf("%") == -1) {
                offset = offset + "%";
            }  
        } else {
            offset = "70%";
        }

        var delay;
        if ($(this).attr("data-scrolltrigger-delay")) {
            delay = Number($(this).attr("data-scrolltrigger-delay"));
        } else {
            delay = 0;
        }

        var ease;
        if ($(this).attr("data-scrolltrigger-ease")) {
            ease = $(this).attr("data-scrolltrigger-ease");
        } else {
            ease = "Power1.easeOut";
        }
        
        var triggerElement;
        if ($(this).attr("data-scrolltrigger-trigger")) {
            var element = $(this).attr("data-scrolltrigger-trigger");
            triggerElement = $(element);
        } else {
            triggerElement = this;
        }
        
        var repeat;
        if ($(this).attr("data-scrolltrigger-repeat")) {
            repeat = true;
        } else {
            repeat = false;
        }
        
        var transform;
        if ($(this).attr("data-scrolltrigger-transform")) {
            transform = $(this).attr("data-scrolltrigger-transform") + "%";
        } else {
            var tween = $(this).attr("data-scrolltrigger");
            //sets up default percentage different for zoom and fade
            if (/zoom/i.test(tween)) {
                transform = "10%";
            } else {
                transform = "20%";
            }
        }
        
		/* Only use integers, no units */
        var flip;
        if ($(this).attr("data-scrolltrigger-flip")) {
            flip = $(this).attr("data-scrolltrigger-flip");
        } else {
            flip = "placeholder";
        }
        
		/* Must be declared as x% y% */
        var transformOrigin;
        if ($(this).attr("data-scrolltrigger-origin")) {
            transformOrigin = $(this).attr("data-scrolltrigger-origin");
        } else {
            transformOrigin = "50% 50%";
        }
		
        
        //console.log("div: ", this.id ? this.id : this.classList[0], "\ntime: ", time, "\noffset: ", offset, "\ndelay: ", delay, "\nease: ", ease, "\ntriggerElement: ", triggerElement, "\nrepeat: ", repeat, "\ntransform: ", transform,);

        // Define tl with scroller: "#course_wrapper" for courses that need it. Courses from Feb 2023 onwards do not.
        if ($("#course_wrapper").length) {
            var timeline = gsap.timeline({scrollTrigger: {
                trigger: triggerElement,
                scroller: "#course_wrapper",
                start: "top " + offset,
                end: "bottom center",
                scrub: repeat,
                toggleActions: "play none play none"
            }});
        } else {
            var timeline = gsap.timeline({scrollTrigger: {
                trigger: triggerElement,
                start: "top " + offset,
                end: "bottom center",
                scrub: repeat,
                toggleActions: "play none play none"
            }});
        }

        var perspectiveWidth = $(this).width() * 3;
        var perspectiveHeight = $(this).height() * 3;
		
		// Elements move in the direction of the name
		// ie "fade up right" moves the element up and to the right

        switch(animation) {

            case "fade":             
                    timeline
                    .fromTo(this, {autoAlpha:0}, {duration: time, autoAlpha:1, delay:delay, ease:ease});
            break;
			
            case "fade-up":             
                    timeline
                    .fromTo(this, {y:transform, autoAlpha:0}, {duration: time, y: "0%", autoAlpha:1, delay:delay, ease:ease});
            break;

            case "fade-up-left":             
                    timeline
                    .fromTo(this, {y:transform, x:transform, autoAlpha:0}, {duration: time, y: "0%", x:"0%", autoAlpha:1, delay:delay, ease:ease});
            break;

            case "fade-up-right":             
                    timeline
                    .fromTo(this, {y:transform, x:"-"+transform, autoAlpha:0}, {duration: time, y: "0%", x:"0%", autoAlpha:1, delay:delay, ease:ease});
            break;

            case "fade-down":             
                    timeline
                    .fromTo(this, {y:"-"+transform, autoAlpha:0}, {duration: time, y: "0%", autoAlpha:1, delay:delay, ease:ease});
            break;

            case "fade-down-left":             
                    timeline
                    .fromTo(this, {y:"-"+transform, x:transform, autoAlpha:0}, {duration: time, y: "0%", x:"0%", autoAlpha:1, delay:delay, ease:ease});
            break;

            case "fade-down-right":             
                    timeline
                    .fromTo(this, {y:"-"+transform, x:"-"+transform, autoAlpha:0}, {duration: time, y: "0%", x:"0%", autoAlpha:1, delay:delay, ease:ease});
            break;

            case "fade-left":             
                    timeline
                    .fromTo(this, {x:transform, autoAlpha:0}, {duration: time, x: "0%", autoAlpha:1, delay:delay, ease:ease});
            break;

            case "fade-right":             
                    timeline
                    .fromTo(this, {x:"-"+transform, autoAlpha:0}, {duration: time, x: "0%", autoAlpha:1, delay:delay, ease:ease});
            break;

            case "spin":
					if (flip == "placeholder") {flip = 180;}
			
                    timeline
                    .fromTo(this, {rotation: flip, autoAlpha:0}, {duration: time, rotation: 0, autoAlpha:1, delay:delay, ease:ease});
            break;

            case "flip-up":
					if (flip == "placeholder") {flip = 90;}
			
                    timeline
                    .set(this, {transformPerspective:perspectiveHeight, transformOrigin: transformOrigin})
                    .fromTo(this, {rotationX: flip, autoAlpha:0}, {duration: time, rotationX: 0, autoAlpha:1, delay:delay, ease:ease});
            break;

            case "flip-down":     
					if (flip == "placeholder") {flip = -90;}
					
                    timeline
                    .set(this, {transformPerspective:perspectiveHeight, transformOrigin: transformOrigin})
                    .fromTo(this, {rotationX: flip, autoAlpha:0}, {duration: time, rotationX: 0, autoAlpha:1, delay:delay, ease:ease});
            break;

            case "flip-left":   
					if (flip == "placeholder") {flip = 90;}
					
                    timeline
                    .set(this, {transformPerspective:perspectiveWidth, transformOrigin: transformOrigin})
                    .fromTo(this, {rotationY: flip, autoAlpha:0}, {duration: time, rotationY: 0, autoAlpha:1, delay:delay, ease:ease});
            break;

            case "flip-right":  
					if (flip == "placeholder") {flip = -90;}
					
                    timeline
                    .set(this, {transformPerspective:perspectiveWidth, transformOrigin: transformOrigin})
                    .fromTo(this, {rotationY: flip, autoAlpha:0}, {duration: time, rotationY: 0, autoAlpha:1, delay:delay, ease:ease});
            break;

            case "zoom-in":             
                    timeline
                    .set(this, {transformOrigin: transformOrigin})
                    .fromTo(this, {scale: 0, autoAlpha:0}, {duration: time, scale: 1, autoAlpha:1, delay:delay, ease:ease});
            break;

            case "zoom-in-up":             
                    timeline
                    .set(this, {transformOrigin: transformOrigin})
                    .fromTo(this, {scale: 0, y:transform,  autoAlpha:0}, {duration: time, scale: 1, y:"0%",  autoAlpha:1, delay:delay, ease:ease});
            break;

            case "zoom-in-down":             
                    timeline
                    .set(this, {transformOrigin: transformOrigin})
                    .fromTo(this, {scale: 0, y:"-"+transform,  autoAlpha:0}, {duration: time, scale: 1, y:"0%",  autoAlpha:1, delay:delay, ease:ease});
            break;

            case "zoom-in-left":             
                    timeline					
                    .set(this, {transformOrigin: transformOrigin})
                    .fromTo(this, {scale: 0, x:transform,  autoAlpha:0}, {duration: time, scale: 1, x:"0%",  autoAlpha:1, delay:delay, ease:ease});
            break;

            case "zoom-in-right":             
                    timeline
                    .set(this, {transformOrigin: transformOrigin})
                    .fromTo(this, {scale: 0, x:"-"+transform,  autoAlpha:0}, {duration: time, scale: 1, x:"0%",  autoAlpha:1, delay:delay, ease:ease});
            break;

            case "zoom-out":             
                    timeline
                    .set(this, {transformOrigin: transformOrigin})
                    .fromTo(this, {scale: 1.25, autoAlpha:0}, {duration: time, scale: 1, autoAlpha:1, delay:delay, ease:ease});
            break;

            case "zoom-out-up":             
                    timeline
                    .set(this, {transformOrigin: transformOrigin})
                    .fromTo(this, {scale: 1.25, y:transform,  autoAlpha:0}, {duration: time, scale: 1, y:"0%",  autoAlpha:1, delay:delay, ease:ease});
            break;

            case "zoom-out-down":             
                    timeline
                    .set(this, {transformOrigin: transformOrigin})
                    .fromTo(this, {scale: 1.25, y:"-"+transform,  autoAlpha:0}, {duration: time, scale: 1, y:"0%",  autoAlpha:1, delay:delay, ease:ease});
            break;

            case "zoom-out-left":             
                    timeline
                    .set(this, {transformOrigin: transformOrigin})
                    .fromTo(this, {scale: 1.25, x:transform,  autoAlpha:0}, {duration: time, scale: 1, x:"0%",  autoAlpha:1, delay:delay, ease:ease});
            break;

            case "zoom-out-right":             
                    timeline
                    .set(this, {transformOrigin: transformOrigin})
                    .fromTo(this, {scale: 1.25, x:"-"+transform,  autoAlpha:0}, {duration: time, scale: 1, x:"0%",  autoAlpha:1, delay:delay, ease:ease});
            break;

        }

        scrolltriggerArray.push(timeline);

    });
    
    //console.log(scrolltriggerArray);
};

