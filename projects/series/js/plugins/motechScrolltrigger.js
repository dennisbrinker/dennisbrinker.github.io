/*

SCROLLTRIGGER CURTAIN ANIMATION PLUGIN

Last Updated 9/1/2020

*/

var motechScrolltrigger = function() {

    // if in reviewer mode, don't set up any scrolltrigger timelines
    //if (ReviewerTurnOn) return
    
    var scrolltriggerArray = [];

    var scrolltrigger = document.querySelectorAll('[data-scrolltrigger]');
    
    $.each(scrolltrigger, function (i) {

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
            delay = $(this).attr("data-scrolltrigger-delay");
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
        
        //console.log("div: ", this.id ? this.id : this.classList[0], "\ntime: ", time, "\noffset: ", offset, "\ndelay: ", delay, "\nease: ", ease, "\ntriggerElement: ", triggerElement, "\nrepeat: ", repeat, "\ntransform: ", transform,);
        
        var timeline = gsap.timeline({scrollTrigger: {
            trigger: triggerElement,
            start: "top " + offset,
            end: "bottom center",
            scrub: repeat
        }});
        
        
        var perspectiveWidth = $(this).width() * 3;
        var perspectiveHeight = $(this).height() * 8;
		
		// Elements move in the direction of the name
		// ie "fade up right" moves the element up and to the right

        switch($(this).attr("data-scrolltrigger")) {

            case "fade":             
                    timeline
                    .fromTo(this, time, {autoAlpha:0}, {autoAlpha:1, delay:delay, ease:ease});
            break;
			
            case "fade-up":             
                    timeline
                    .fromTo(this, time, {y:transform, autoAlpha:0}, {y: "0%", autoAlpha:1, delay:delay, ease:ease});
            break;

            case "fade-up-left":             
                    timeline
                    .fromTo(this, time, {y:transform, x:transform, autoAlpha:0}, {y: "0%", x:"0%", autoAlpha:1, delay:delay, ease:ease});
            break;

            case "fade-up-right":             
                    timeline
                    .fromTo(this, time, {y:transform, x:"-"+transform, autoAlpha:0}, {y: "0%", x:"0%", autoAlpha:1, delay:delay, ease:ease});
            break;

            case "fade-down":             
                    timeline
                    .fromTo(this, time, {y:"-"+transform, autoAlpha:0}, {y: "0%", autoAlpha:1, delay:delay, ease:ease});
            break;

            case "fade-down-left":             
                    timeline
                    .fromTo(this, time, {y:"-"+transform, x:transform, autoAlpha:0}, {y: "0%", x:"0%", autoAlpha:1, delay:delay, ease:ease});
            break;

            case "fade-down-right":             
                    timeline
                    .fromTo(this, time, {y:"-"+transform, x:"-"+transform, autoAlpha:0}, {y: "0%", x:"0%", autoAlpha:1, delay:delay, ease:ease});
            break;

            case "fade-left":             
                    timeline
                    .fromTo(this, time, {x:transform, autoAlpha:0}, {x: "0%", autoAlpha:1, delay:delay, ease:ease});
            break;

            case "fade-right":             
                    timeline
                    .fromTo(this, time, {x:"-"+transform, autoAlpha:0}, {x: "0%", autoAlpha:1, delay:delay, ease:ease});
            break;

            case "flip-up":             
                    timeline
                    .set(this, {transformPerspective:perspectiveHeight})
                    .fromTo(this, time, {rotationX: 90, autoAlpha:0}, {rotationX: 0, autoAlpha:1, delay:delay, ease:ease});
            break;

            case "flip-down":             
                    timeline
                    .set(this, {transformPerspective:perspectiveHeight})
                    .fromTo(this, time, {rotationX: -90, autoAlpha:0}, {rotationX: 0, autoAlpha:1, delay:delay, ease:ease});
            break;

            case "flip-left":            
                    timeline
                    .set(this, {transformPerspective:perspectiveWidth})
                    .fromTo(this, time, {rotationY: 90, autoAlpha:0}, {rotationY: 0, autoAlpha:1, delay:delay, ease:ease});
            break;

            case "flip-right":             
                    timeline
                    .set(this, {transformPerspective:perspectiveWidth})
                    .fromTo(this, time, {rotationY: -90, autoAlpha:0}, {rotationY: 0, autoAlpha:1, delay:delay, ease:ease});
            break;

            case "zoom-in":             
                    timeline
                    .fromTo(this, time, {scale: 0, autoAlpha:0}, {scale: 1, autoAlpha:1, delay:delay, ease:ease});
            break;

            case "zoom-in-up":             
                    timeline
                    .fromTo(this, time, {scale: 0, y:transform,  autoAlpha:0}, {scale: 1, y:"0%",  autoAlpha:1, delay:delay, ease:ease});
            break;

            case "zoom-in-down":             
                    timeline
                    .fromTo(this, time, {scale: 0, y:"-"+transform,  autoAlpha:0}, {scale: 1, y:"0%",  autoAlpha:1, delay:delay, ease:ease});
            break;

            case "zoom-in-left":             
                    timeline
                    .fromTo(this, time, {scale: 0, x:transform,  autoAlpha:0}, {scale: 1, x:"0%",  autoAlpha:1, delay:delay, ease:ease});
            break;

            case "zoom-in-right":             
                    timeline
                    .fromTo(this, time, {scale: 0, x:"-"+transform,  autoAlpha:0}, {scale: 1, x:"0%",  autoAlpha:1, delay:delay, ease:ease});
            break;

            case "zoom-out":             
                    timeline
                    .fromTo(this, time, {scale: 1.25, autoAlpha:0}, {scale: 1, autoAlpha:1, delay:delay, ease:ease});
            break;

            case "zoom-out-up":             
                    timeline
                    .fromTo(this, time, {scale: 1.25, y:transform,  autoAlpha:0}, {scale: 1, y:"0%",  autoAlpha:1, delay:delay, ease:ease});
            break;

            case "zoom-out-down":             
                    timeline
                    .fromTo(this, time, {scale: 1.25, y:"-"+transform,  autoAlpha:0}, {scale: 1, y:"0%",  autoAlpha:1, delay:delay, ease:ease});
            break;

            case "zoom-out-left":             
                    timeline
                    .fromTo(this, time, {scale: 1.25, x:transform,  autoAlpha:0}, {scale: 1, x:"0%",  autoAlpha:1, delay:delay, ease:ease});
            break;

            case "zoom-out-right":             
                    timeline
                    .fromTo(this, time, {scale: 1.25, x:"-"+transform,  autoAlpha:0}, {scale: 1, x:"0%",  autoAlpha:1, delay:delay, ease:ease});
            break;

        }

        scrolltriggerArray.push(timeline);

    });
    
    //console.log(scrolltriggerArray);
    ScrollTrigger.refresh();
};

