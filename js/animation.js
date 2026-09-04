
let mm = gsap.matchMedia();

gsap.set(".perspective", {perspective: 1200});

var slideIn = {duration: 0.65, clipPath: "inset(0% 0% 100% 0%)", yPercent: 40, ease: "power3.out"};


//MARK: Intro
document.fonts.ready.then(() => {

    // setup of slit text for animation
    let nameText = SplitText.create(".name", { type: "words, chars" });
    let subtitleText = SplitText.create(".subtitle", { type: "words", mask: "words" });
    let servicesText = SplitText.create(".services-text", { type: "words" });

    //landscape layout
    mm.add("(min-width: 651px)", () => {

        var headerTL = gsap.timeline({onComplete: function() { textRevert(); textRevert2(); }, scrollTrigger: {
            trigger: "#intro",
            start: "top center"
            }
        });
        headerTL
            .from(nameText.chars, {yPercent: "random(-100, 100)", rotationX: "random(-90, 90)", opacity: 0, scale: 0.8, ease: "back.out(1.5)", stagger: {amount: 0.35, from: "random"}})
            .from(subtitleText.words, {duration: 0.35, stagger: 0.15, yPercent: 100, opacity: 0, ease: "power3.out"}, "<+0.4")
            .from(servicesText.words, {duration: 0.3, stagger: 0.1, rotationX: -90, opacity: 0, scale: 0.8, ease: "back.out(1.5)", transformOrigin: "50% 50% -30%"}, "+=0.35")
            .from(".services .cta", slideIn, "+=0.25")


        // var servicesTL = gsap.timeline({paused: true, onComplete: textRevert2});
        // servicesTL
        //     .from(servicesText.words, {duration: 0.3, stagger: 0.15, rotationX: 110, opacity: 0, scale: 0.8, ease: "back.out(1.5)", transformOrigin: "50% 50% 25%"}, "<+0.4")
        //     .from(".services .cta", slideIn, "+=0.2")

    });


    //portrait layout
    mm.add("(max-width: 650px)", () => {

        var headerTL = gsap.timeline({onComplete: textRevert, scrollTrigger: {
            trigger: "#intro",
            start: "top center"
            }
        });
        headerTL
            .from(nameText.chars, {yPercent: "random(-100, 100)", rotationY: "random(-45, 45)", opacity: 0, scale: 0.8, ease: "back.out(1.5)", stagger: {amount: 0.35, from: "random"}})
            .from(subtitleText.words, {duration: 0.35, stagger: 0.15, yPercent: 100, opacity: 0, ease: "power3.out"}, "<+0.4");


        var servicesTL = gsap.timeline({onComplete: textRevert2, scrollTrigger: {
            trigger: ".services .text",
            start: "top 65%"
        }});
        servicesTL
            .from(servicesText.words, {duration: 0.3, stagger: 0.1, rotationX: -90, opacity: 0, scale: 0.8, ease: "back.out(1.5)", transformOrigin: "50% 50% -50%"}, "<+0.4")
            .from(".services .cta", slideIn, "+=0.2")

    });


    // reverts all split items back to their original state
    function textRevert() {
        nameText.revert();
        subtitleText.revert();
    }
    function textRevert2() {
        servicesText.revert();
    }


})



//MARK: Philosophy
let philosophyText = gsap.utils.toArray("#philosophy .text p");

philosophyText.forEach(el => {
    var tl = gsap.timeline({scrollTrigger: {
        trigger: el,
        start: "top 65%"
    }});
        tl
        .from(el, slideIn)
});



//MARK: Work
gsap.utils.toArray("#work .work-item").forEach((el, i) => {
    el._timeline = gsap.timeline({paused: true})
        .from(el, slideIn)
})

ScrollTrigger.batch("#work .work-item", {
    start: "top 65%",
    onEnter: (batch) => {
        batch.forEach((el, i) => {
        const delay = i / 3; // have to manually add a delay to each timeline
                if (el._timeline) {
                    el._timeline.play().delay(delay);
                }
        });
    }
});



//MARK: Hero
gsap.fromTo("#hero-quote", {backgroundPosition: "50% 0%"}, {
    scrollTrigger: {
        scrub: 2,
        trigger: "#hero-quote",
        start: "top bottom",
        end: "bottom top"
    },
        backgroundPosition: "50% 100%"
});

gsap.from("#hero-quote ul li", {
    scrollTrigger: {
        trigger: "#hero-quote ul",
        start: "top 60%"
    },
        duration: 0.4, 
        stagger: 0.4, 
        rotationX: -90, 
        opacity: 0, 
        scale: 0.8,
        ease: "back.out(1.5)", 
        transformOrigin: "50% 50% -150%"
});



//MARK: Services
gsap.utils.toArray("#services .service").forEach((el, i) => {
    // store the timeline directly on the DOM element
    el._timeline = gsap.timeline({paused: true})
        .from(el, slideIn)
})

ScrollTrigger.batch("#services .service", {
    start: "top 65%",
    onEnter: (batch) => {
        batch.forEach((el, i) => {
        const delay = i / 3; // have to manually add a delay to each timeline
                if (el._timeline) {
                    el._timeline.play().delay(delay);
                }
        });
    }
});