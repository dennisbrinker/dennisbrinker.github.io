// MARK: ST animation

/* ----
    ScrollTrigger notes:
    Step 1: create the ST animation
    Step 2: push the ST reference into the pageIndex object for that page

    customize start position:
    start: (st) => calcStartPosition(st, 50) //NOTE: default start position is set to 60%
--- */


//MARK: Wrapper 1-2
gsap.utils.toArray("#wrapper_1_2 .box_outer").forEach((el, i) => {
    var box = el.querySelector(" .box_style");
    var badge = el.querySelector(" .badge");
    var img = el.querySelectorAll(" .top_img img");

    var box_2_tl = gsap.timeline({scrollTrigger: {
        trigger: el
    }});
        box_2_tl
        .add(boxScaleAnimate(box))
        .fromTo(img, {scale: 1.2}, {duration: 0.8, scale: 1, ease: "sine.out"}, "0.15")
        .to(badge, {duration: 0.4, scale: 1.1, ease: "sine.out", transformOrigin: "50% 100%", repeat: 1, yoyo: true}, "<+0.5")
        .to(badge, {duration: 0.8, rotationY: 360, ease: "back.inOut(1.5)"}, "<")
        .add(glowAnimate(box), "0.35")

    pageIndex.wrapper_1_2.ST.push(box_2_tl.scrollTrigger);
});



// MARK: Comparison Carousel
gsap.utils.toArray(".comparison_container").forEach((el, i) => {
    var icon = el.querySelector(" .icon_style");

    var comparisonTL = gsap.timeline({scrollTrigger: {
        trigger: el
    }});
        comparisonTL
        .from(el, {duration: 1, opacity: 0, ease: "elastic.out(elastic.out(0.6, 0.5))", skewX: i % 2 === 0 ? 25 : -25, xPercent: i % 2 === 0 ? "-30" : "30"})
        .to(icon, {duration: 0.4, scale: 1.2, ease: "sine.out", transformOrigin: "50% 100%", repeat: 1, yoyo: true}, "<+0.5")
        .to(icon, {duration: 0.8, rotationY: 360, ease: "back.inOut(1.5)"}, "<")
        .add(glowAnimate(el), "0.35")

    // Check which comparison section this element belongs to
    if (el.closest('#comparison_1_3_1')) {
        pageIndex.wrapper_1_3.ST.push(comparisonTL.scrollTrigger);
    } else if (el.closest('#comparison_1_3_2')) {
        pageIndex.comparison_1_3_2.ST.push(comparisonTL.scrollTrigger);
    }

})



// These two functions need to be called after all Scrolltriggers have been set up.
createAllFailsafeST();
disableAllST();