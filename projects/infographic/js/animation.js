// Infographic Animations


let mm = gsap.matchMedia();

// NOTE: Needed to prevent animations from firing before the preloader vanishes. If using be sure to uncomment the closing bracket after failsafe code and switch out the calls in the finalFunction.

var stArray;

let animationInitialized = false;

function animationSetup() {
    if (animationInitialized) {
        ScrollTrigger.refresh(); // refresh in case translations changed height
        return;
    }
    animationInitialized = true;



    // Custom Wiggle Ease
    CustomWiggle.create("sway", {wiggles: 6, type:"easeOut"});

    // MARK: Resuable Animations
    // Reusable text animation
    var textAnimation = {duration: 0.65, clipPath: "inset(0% 0% 100% 0%)", yPercent: 30, ease: "sine.out"};

    // Reusable sticker animation
    var stickerAnimation_A = {duration: 0.8, opacity: 0, scale: 1.25, yPercent: 10, rotation: -12, ease: "elastic.out(1,0.5)"};
    var stickerAnimation_B = {duration: 0.8, opacity: 0, scale: 1.25, yPercent: 10, rotation: 12, ease: "elastic.out(1,0.5)"};



    // MARK: Box #1
    mm.add("(min-width: 769px)", () => {
        var box1_TL = gsap.timeline({scrollTrigger: {
            trigger: "#box_1",
            start: "top center"
        }});
        box1_TL
            .addLabel("imgs1")
            .from("#picture_1_1", {duration: 1.25, opacity: 0, scale: 1.15, ease: "elastic.out(0.8,0.3)"}, "imgs1")
            .from("#picture_1_2, #book_1", {duration: 1.25, stagger: 0.2, opacity: 0, scale: 1.15, rotation: gsap.utils.wrap([-15, 15]), ease: "elastic.out(0.8,0.3)", transformOrigin: "50% 100%"}, "imgs1+=0.25")
            .from("#backpack_1", {duration: 1.25, opacity: 0, scale: 1.15, rotation: -15, ease: "elastic.out(0.8,0.3)", transformOrigin: "100% 100%"}, "imgs1+=0.5")
            .from("#paper_1", {duration: 1.25, opacity: 0, scale: 1.15, ease: "elastic.out(0.8,0.3)"}, "imgs1+=0.75")
            .from("#laptop_1", {duration: 1.5, opacity: 0, scale: 1.15, yPercent: 50, ease: "elastic.out(0.5,0.3)"}, "imgs1+=0.85")
            .from("#box_1 .wrapper", {duration: 0.65, yPercent: 100, ease: "power3.out"}, "-=0.75")
            .from("#textbox_1", textAnimation, "-=0.25")
    });
    mm.add("(max-width: 768px)", () => {
        var box1_TL = gsap.timeline({scrollTrigger: {
            trigger: "#box_1",
            start: "top center"
        }});
        box1_TL
            .from("#picture_1_2, #book_1", {duration: 1.25, stagger: 0.2, opacity: 0, scale: 1.15, rotation: gsap.utils.wrap([-15, 15]), ease: "elastic.out(0.8,0.3)", transformOrigin: "50% 100%"})
            .from("#laptop_1", {duration: 1.5, opacity: 0, scale: 1.15, yPercent: 50, ease: "elastic.out(0.5,0.3)"}, "<+0.25")
            .from("#box_1 .wrapper", {duration: 0.65, yPercent: 100, ease: "power3.out"}, "-=0.6")
            .from("#textbox_1", textAnimation, "-=0.25")
    });



    // MARK: Box #2
    var box2_TL = gsap.timeline({scrollTrigger: {
            trigger: "#box_2",
            start: "top center"
        }});
        box2_TL
        .from("#badge_2", stickerAnimation_A)
        .from("#textbox_2", textAnimation, "<+0.15")



    // MARK: Box #3
    var box3_TL = gsap.timeline({scrollTrigger: {
            trigger: "#intro_3",
            start: "top 55%"
        }});
        box3_TL
        .from("#intro_3 .textbox", textAnimation)
    


    // MARK: Canvid
    var canvid_logo_TL = gsap.timeline({scrollTrigger: {
            trigger: "#canvid_wrapper",
            start: "top center"
        }});
        canvid_logo_TL
        .from("#canvid_logo", stickerAnimation_A)


    var text_3_1_1_TL = gsap.timeline({scrollTrigger: {
            trigger: "#canvid_wrapper .paper_container",
            start: "top 60%"
        }});
        text_3_1_1_TL
        .from("#textbox_3_1_1", textAnimation)
        

    var text_3_1_2_TL = gsap.timeline({scrollTrigger: {
            trigger: "#textbox_3_1_2",
            start: "top 75%"
        }});
        text_3_1_2_TL
        .from("#textbox_3_1_2", textAnimation)


    var gradientImgs_Canvid_TL = gsap.timeline({scrollTrigger: {
            trigger: "#canvid_wrapper .gradient_box .img_container",
            start: "top 40%",
        }})
        gradientImgs_Canvid_TL
        .from("#picture_3_1_2", stickerAnimation_B)
        .from("#picture_3_1_1", stickerAnimation_A, "<+0.3")
        .from("#name_tag_3_1", {duration: 0.3, clipPath: "inset(0% 100% 0% 0%)", ease: "sine.out"}, "-=0.3")


    var canvid_webcam_TL = gsap.timeline({scrollTrigger: {
            trigger: "#webcam_3",
            start: "top center"
        }});
        canvid_webcam_TL
        .from("#webcam_3", stickerAnimation_A)


    gsap.from("#canva_screen", {
    scrollTrigger: {
        trigger: "#canvid_wrapper .bottom_container",
        start: "top 45%"
    },
        duration: 0.75, 
        scale: 0, 
        yPercent: 20,
        ease: "back.out(1.7)",
        transformOrigin: "50% 100%"
    });


    var canvid_sticker_TL = gsap.timeline({scrollTrigger: {
            trigger: "#sticker_3_2_1",
            start: "top 55%"
        }});
        canvid_sticker_TL
        .from("#sticker_3_2_1", stickerAnimation_A)


    gsap.fromTo("#textbox_3_1_3", {clipPath: "inset(-10% -10% 110% -10%)"}, {
    scrollTrigger: {
        trigger: "#textbox_3_1_3",
        start: "top 60%"
    },
        duration: 0.75, 
        clipPath: "inset(-10% -10% -10% -10%)", 
        ease: "sine.out"
    });


    gsap.to("#sticker_3_1_1", {
        scrollTrigger: {
            trigger: "#sticker_3_1_1",
            start: "top 55%",
            toggleActions: "play none reverse none" //onEnter, onLeave, onEnterBack, onLeaveBack
        },
        duration: 2, 
        rotation: -4, 
        transformOrigin: "55% 85%", 
        ease: "sway"
    });

    gsap.to("#sticker_3_2_2", {
        scrollTrigger: {
            trigger: "#sticker_3_2_2",
            start: "top 55%",
            toggleActions: "play none reverse none" //onEnter, onLeave, onEnterBack, onLeaveBack
        },
        duration: 2, 
        rotation: 4, 
        transformOrigin: "50% 80%", 
        ease: "sway"
    });
    


    // MARK: Render
    var render_logo_TL = gsap.timeline({scrollTrigger: {
            trigger: "#render_wrapper",
            start: "top center"
        }});
        render_logo_TL
        .from("#render_logo", stickerAnimation_A)


    var text_3_2_1_TL = gsap.timeline({scrollTrigger: {
            trigger: "#render_wrapper .paper_container",
            start: "top 60%"
        }});
        text_3_2_1_TL
        .from("#textbox_3_2_1", textAnimation)
        

    var text_3_2_2_TL = gsap.timeline({scrollTrigger: {
            trigger: "#textbox_3_2_2",
            start: "top 75%"
        }});
        text_3_2_2_TL
        .from("#textbox_3_2_2", textAnimation)


    var gradientImgs_Render_TL = gsap.timeline({scrollTrigger: {
            trigger: "#render_wrapper .gradient_box .img_container",
            start: "top 40%",
        }})
        gradientImgs_Render_TL
        .from("#picture_3_2_2", stickerAnimation_B)
        .from("#picture_3_2_1", stickerAnimation_A, "<+0.3")
        .from("#name_tag_3_2", {duration: 0.3, clipPath: "inset(0% 100% 0% 0%)", ease: "sine.out"}, "-=0.3")
        .from("#pine_3_2", {duration: 0.5, opacity: 0, scale: 1.1, xPercent: 20, ease: "sine.out", transformOrigin: "0% 0%"}, "<")
    

    var renderBottom_TL = gsap.timeline({scrollTrigger: {
            trigger: "#render_wrapper .bottom_container",
            start: "top 45%",
        }})
        renderBottom_TL
        .from("#render_screen", {duration: 0.75, scale: 0, yPercent: 20, ease: "back.out(1.7)", transformOrigin: "50% 100%"})
        .from("#prompt_3_2", {duration: 0.75, scale: 0, ease: "back.out(1.7)", transformOrigin: "100% 100%"})


    gsap.fromTo("#textbox_3_2_3 .textbox", {clipPath: "inset(-10% -10% 110% -10%)"}, {
    scrollTrigger: {
        trigger: "#textbox_3_2_3",
        start: "top 60%"
    },
        duration: 0.75, 
        clipPath: "inset(-10% -10% -10% -10%)", 
        ease: "sine.out"
    });


    gsap.from("#picture_3_2_3", {
    scrollTrigger: {
        trigger: "#picture_3_2_3",
        start: "top 50%"
    },
        duration: 0.5, 
        opacity: 0,
        scale: 1.05, 
        rotation: -15,
        ease: "back.out(1.7)", 
        transformOrigin: "85% 15%"
    });


    gsap.to("#sticker_3_2", {
        scrollTrigger: {
            trigger: "#sticker_3_2",
            start: "top 55%",
            toggleActions: "play none reverse none" //onEnter, onLeave, onEnterBack, onLeaveBack
        },
        duration: 2, 
        rotation: -4, 
        transformOrigin: "50% 80%", 
        ease: "sway"
    });
        


    // MARK: Norton
    var norton_logo_TL = gsap.timeline({scrollTrigger: {
            trigger: "#norton_wrapper",
            start: "top center"
        }});
        norton_logo_TL
        .from("#norton_logo", stickerAnimation_A)


    var text_3_3_1_TL = gsap.timeline({scrollTrigger: {
            trigger: "#norton_wrapper .paper_container",
            start: "top 60%"
        }});
        text_3_3_1_TL
        .from("#textbox_3_3_1", textAnimation)
        

    var text_3_3_2_TL = gsap.timeline({scrollTrigger: {
            trigger: "#textbox_3_3_2",
            start: "top 75%"
        }});
        text_3_3_2_TL
        .from("#textbox_3_3_2", textAnimation)


    var gradientImgs_Norton_TL = gsap.timeline({scrollTrigger: {
            trigger: "#norton_wrapper .gradient_box .img_container",
            start: "top 40%",
        }})
        gradientImgs_Norton_TL
        .from("#picture_3_3_2", stickerAnimation_B)
        .from("#picture_3_3_1", stickerAnimation_A, "<+0.3")
        .from("#name_tag_3_3", {duration: 0.3, clipPath: "inset(0% 100% 0% 0%)", ease: "sine.out"}, "-=0.3")
        

    var nortonBottom_TL = gsap.timeline({scrollTrigger: {
            trigger: "#norton_wrapper .bottom_container",
            start: "top 45%",
        }})
        nortonBottom_TL
        .from("#norton_screen", {duration: 0.75, scale: 0, yPercent: 20, ease: "back.out(1.7)", transformOrigin: "50% 100%"})
        .from("#popup_3_3", {duration: 0.5, scale: 0, ease: "back.out(1.7)", transformOrigin: "100% 45%"})
        .from("#arrow_3_3", {duration: 0.35, opacity: 0, scale: 0.8, rotation: -20, ease: "back.out(1.7)", transformOrigin: "100% 55%"})
    

    var norton_sticker_TL = gsap.timeline({scrollTrigger: {
            trigger: "#sticker_3_3_1",
            start: "top center"
        }});
        norton_sticker_TL
        .from("#sticker_3_3_1", stickerAnimation_B)
            

    var text_3_3_3_TL = gsap.timeline({scrollTrigger: {
            trigger: "#textbox_3_3_3",
            start: "top 75%"
        }});
        text_3_3_3_TL
        .from("#textbox_3_3_3", textAnimation)


    gsap.to("#sticker_3_3_2", {
        scrollTrigger: {
            trigger: "#sticker_3_3_2",
            start: "top 55%",
            toggleActions: "play none reverse none" //onEnter, onLeave, onEnterBack, onLeaveBack
        },
        duration: 2, 
        rotation: 4, 
        transformOrigin: "50% 80%", 
        ease: "sway"
    });

    gsap.to("#lock_3_3", {
        scrollTrigger: {
            trigger: "#lock_3_3",
            start: "top 55%",
            toggleActions: "play none reverse none" //onEnter, onLeave, onEnterBack, onLeaveBack
        },
        duration: 2, 
        rotation: -3, 
        transformOrigin: "75% 15%", 
        ease: "sway"
    });



    // MARK: Box #4
    gsap.from("#picture_4", {
    scrollTrigger: {
        trigger: "#box_4 .wrapper",
        start: "top 50%"
    },
        duration: 0.5, 
        opacity: 0,
        scale: 1.05, 
        rotation: 15,
        ease: "back.out(1.7)", 
        transformOrigin: "30% 5%"
    });
            

    var text_summary_TL = gsap.timeline({scrollTrigger: {
            trigger: "#summary_textbox",
            start: "top 75%"
        }});
        text_summary_TL
        .from("#summary_textbox", textAnimation)



    // Failsafe -----------------
    stArray = ScrollTrigger.getAll();

    var ST_failsafe = ScrollTrigger.create({
        id: "failsafeId",
        trigger: "#legal_wrapper",
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