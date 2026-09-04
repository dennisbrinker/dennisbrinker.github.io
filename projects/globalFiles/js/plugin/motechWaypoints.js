/*

WAYPOINT CURTAIN ANIMATION PLUGIN

Last Updated 1/15/2020

*/

var motechWaypoints = function() {
    
    var waypointsArray = [];
    var waypointTimelines = [];

    var waypoints = document.querySelectorAll('[data-waypoints]');

    $.each(waypoints, function (i) {

        var time;
        if ($(this).attr("data-waypoints-time")) {
            time = parseFloat($(this).attr("data-waypoints-time"));
        } else {
            time = 0.5;
        }

        var offset;
        if ($(this).attr("data-waypoints-offset")) {
            offset = $(this).attr("data-waypoints-offset") + "%";
        } else {
            offset = "70%";
        }

        var delay;
        if ($(this).attr("data-waypoints-delay")) {
            delay = $(this).attr("data-waypoints-delay");
        } else {
            delay = 0;
        }
		
		var ease;
        if ($(this).attr("data-waypoints-ease")) {
            ease = $(this).attr("data-waypoints-ease");
        } else {
            ease = "Power1.easeOut";
        }
        
        var triggerElement;
        if ($(this).attr("data-waypoints-trigger")) {
            var element = $(this).attr("data-waypoints-trigger");
            triggerElement = $(element);
        } else {
            triggerElement = $(this);
        }
        
        var repeat;
        if ($(this).attr("data-waypoints-repeat")) {
            repeat = $(this).attr("data-waypoints-repeat");
        } else {
            repeat = "false";
        }
        
        var transform;
        if ($(this).attr("data-waypoints-transform")) {
            transform = $(this).attr("data-waypoints-transform") + "%";
        } else {
            var tween = $(this).attr("data-waypoints");
            //sets up default percentage different for zoom and fade
            if (/zoom/i.test(tween)) {
                transform = "10%";
            } else {
                transform = "20%";
            }
        }

        var timeline = new TimelineMax({paused:true});
        var waypoint;

        var perspectiveWidth = $(this).width() * 3;
        var perspectiveHeight = $(this).height() * 3;

        switch($(this).attr("data-waypoints")) {

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

        waypoint = triggerElement.waypoint(function(direction) {
            
            if (courseOptions.isMobile === true || ReviewerTurnOn === true) {
                //Do nothing
            } else {
                
                if (direction === "down") {
                    timeline.play();
                } else {
                    if (repeat === "true") {
                      timeline.reverse();
                    }
                }
                
            }
        }, {offset:offset});
        
        if (courseOptions.isMobile === true || ReviewerTurnOn === true) {
            timeline.progress(1);
        }

        waypointsArray.push(waypoint);
        waypointTimelines.push(timeline);

    });
    
};

Waypoint.refreshAll();

    
//console.log(waypointTimelines);
//console.log(waypointsArray);
