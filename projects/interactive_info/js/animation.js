// Infographic Animations

let stArray;

let animsInitialized = false;

function animSetup() {
    if (animsInitialized) {
        ScrollTrigger.refresh(); // refresh in case translations changed height
        return;
    }
    animsInitialized = true;


    // Reusable perspective animation
    gsap.set(".perspective", {perspective: 1200})

    var perspectiveAnimate = {duration: 0.8, stagger: 0.15, transformOrigin: "50% 25% -100%", rotationX: -90, opacity: 0, scale: 0.8, ease: "elastic.out(0.6, 0.5)"};



    // MARK: #3 Animations
    let number3 = gsap.utils.toArray(".bg_3");

    number3.forEach((el, i) => {
        const parent = el.parentElement;
        let move = gsap.utils.wrap([-50, 50])(i); 
        let angle = gsap.utils.wrap([-20, 20])(i); 
        gsap.from(el, {
            scrollTrigger: {
                trigger: parent,
                start: "top 65%"
            },
            duration: 1,
            scale: 0.5,
            opacity: 0,
            xPercent: move,
            rotation: angle,
            ease: "elastic.out(0.6, 0.3)",
        });
    });



    // MARK: Box 1
    var box1_tl = gsap.timeline({scrollTrigger: {
            trigger: "#badge_wrapper_1",
            start: "top 70%"
        }});
        box1_tl
        .from("#textbox_1 .inner h3", {duration: 1, scale: 1.125, opacity: 0, y: 50, ease: "elastic.out(0.6, 0.5)"})
        .from("#badge_wrapper_1 > *", perspectiveAnimate, "-=0.4")



    // MARK: Box 2
    var wave_2 = gsap.to(".wave_bg_2", {
    scrollTrigger: {
        scrub: 1.5,
        trigger: "#box_2",
        start: "top 80%",
        end: "bottom 20%"
    },
        xPercent: -50, 
        ease: "none"
    });

    var box2_TL = gsap.timeline({scrollTrigger: {
            trigger: "#click_wrapper_2",
            start: "top 70%"
        }});
        box2_TL
        .from("#click_wrapper_2 .click_container .inner", perspectiveAnimate)
        .to("#textbox_2 .hand", {duration: 0.5, rotation: -4, rotationX: 25, transformOrigin: "60% 60%", ease: "circle.inOut", yoyo: true, repeat: 5}, "<+0.35")



    // MARK: Box 3
    var bg_3 = gsap.from("#bg_3", {
    scrollTrigger: {
        scrub: 2,
        trigger: "#box_3",
        start: "top bottom",
        end: "bottom 35%"
    },
        yPercent: 20, 
        ease: "none"
    });

    var carousel_3_tl = gsap.timeline({scrollTrigger: {
            trigger: "#textbox_3",
            start: "bottom center"
        }});
        carousel_3_tl
        .from("#slider_wrapper_3", perspectiveAnimate)



    // MARK: Box 4
    var chip_4 = gsap.from("#chip_4", {
    scrollTrigger: {
        scrub: 2,
        trigger: "#box_4 .list_wrapper",
        start: "top 80%",
        end: "top 20%"
    },
        yPercent: 20, 
        ease: "none"
    });

    let list4 = gsap.utils.toArray("#box_4 .list_wrapper .list_item");
    list4.forEach(el => {
        var tl = gsap.timeline({scrollTrigger: {
            trigger: el,
            start: "top 70%"
        }});
            tl
            .from(el, perspectiveAnimate)
    });



    // MARK: Box 5
    gsap.from("#instructions_5 .hand", {
    scrollTrigger: {
        trigger: "#interactive_wrapper_5",
        start: "top center"
    },
        duration: 0.65, 
        y: 20, 
        transformOrigin: "60% 60%", 
        ease: "circle.inOut", 
        yoyo: true, 
        repeat: 6
    });



    // MARK: Box 6
    var bg_6 = gsap.from("#bg_6", {
    scrollTrigger: {
        scrub: 2,
        trigger: "#box_6",
        start: "top bottom",
        end: "bottom 35%"
    },
        yPercent: 20, 
        ease: "none"
    });

    var carousel_6_tl = gsap.timeline({scrollTrigger: {
            trigger: "#textbox_6",
            start: "bottom 60%"
        }});
        carousel_6_tl
        .from("#slider_wrapper_6", perspectiveAnimate)
        
    var table_6_tl = gsap.timeline({scrollTrigger: {
            trigger: "#slider_wrapper_6",
            start: "bottom center"
        }});
        table_6_tl
        .from("#box_6 .bottom_wrapper", perspectiveAnimate)



    // MARK: Box 7
    var badges_7_tl = gsap.timeline({scrollTrigger: {
            trigger: "#box_7",
            start: "top 65%"
        }});
        badges_7_tl
        .from("#badge_wrapper_7 > *", perspectiveAnimate)

    gsap.set("#box_7 .list_wrapper .list_item", {rotationX: -90, opacity: 0, scale: 0.8});
    let list_7 = ScrollTrigger.batch("#box_7 .list_wrapper .list_item", {
        onEnter: batch => gsap.to(batch, {duration: 0.8, stagger: 0.15, transformOrigin: "50% 25% -100%", rotationX: 0, opacity: 1, scale: 1, ease: "elastic.out(0.6, 0.5)"}),
        start: "top 70%"
    });

    gsap.from("#quiz_box .inner", {
    scrollTrigger: {
        trigger: "#quiz_box",
        start: "bottom bottom"
    },
        duration: 0.65, 
        yPercent: 100, 
        ease: "sine.out"
    });


    
    //MARK: Failsafe
    stArray = ScrollTrigger.getAll();

    var ST_failsafe = ScrollTrigger.create({
        id: "failsafeId",
        trigger: "#box_legal",
        start: "top bottom",
        once: true,
        onEnter: () => {
            //console.log("Failsafe triggered");

            // Make sure all animations for this page have fired
            // However don't fire the failsafe again, and don't fire for repeating or scrub animations
            stArray.forEach(function(ST) {
                if (!(ST.vars.id === "failsafeId" || ST.vars.once === false || ST.vars.scrub !== undefined)) {
                    if (ST.animation) {
                        ST.animation.play();
                    }
                }
            });
        }
  });

}