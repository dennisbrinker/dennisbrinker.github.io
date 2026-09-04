// Article Animations


// Intro Panel
var intro_tl = gsap.timeline({
	scrollTrigger: {
		trigger: "#article_intro",
		start: "top top",
		end: "bottom 65%",        
		scrub: 1
    }
});
    intro_tl
    .fromTo("#article_intro .inner", {background: "rgba(255,255,255,0"}, {background: "rgba(255,255,255,1", ease: "none"})
    .to("#article_intro h1", {color: "#000000"}, 0.1)



// Wrapper Animation
let wrapperArray = gsap.utils.toArray(".wrapper:not(.animateChildren), .wrapper.animateChildren > *, #content_wrapper > .inline_image");

wrapperArray.forEach(el => {    
    gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "clamp(top 65%)"
        }, 
        duration: 0.65,
        y: 40, 
        opacity: 0,
        ease: "sine.out"
    });
});



// Parallax Scrolling Image Effect
let scrollImg = gsap.utils.toArray(".image_scroll img");

scrollImg.forEach(el => {   
    gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          scrub: 2,
          start: "top bottom",
          end: "bottom top"
        }, 
        objectPosition: "50% 100%",
        ease: "sine.inOut"
    });
});