/* ----------------------------------

         INTERACTIVE CODE

------------------------------------- */


/* ---------------------------
        MARK: Carousels
------------------------------ */

// Initialize all carousels at once
const swiperInstances = [];
document.querySelectorAll('.swiper').forEach(function(element) {
    const swiper = new Swiper(element, {
        loop: false,
        slidesPerView: 1,
        navigation: {
            nextEl: element.querySelector('.swiper-button-next'),
            prevEl: element.querySelector('.swiper-button-prev'),
        }
    });
    
    swiperInstances[element.id] = swiper;
    
    // Add slideChange listener during initialization
    swiper.on('slideChange', function() {
        if (swiper.isEnd) {
            handleCarouselCompletion(element.id);
        }
    });
});

// Track completion state
const carouselCompletionState = {
    carousel_1_3_1: false,
    carousel_1_3_2: false,
    carousel_1_3_3: false,
    carousel_1_3_4: false,
    carousel_1_3_5: false
};

// Map carousels to their comparison groups based on screen size
const getCarouselGroups = () => window.matchMedia('(min-width: 769px)').matches 
    ? { comparison_1_3_1: ['carousel_1_3_2'], comparison_1_3_2: ['carousel_1_3_5'] }
    : { comparison_1_3_1: ['carousel_1_3_1', 'carousel_1_3_2'], comparison_1_3_2: ['carousel_1_3_3', 'carousel_1_3_4', 'carousel_1_3_5'] };

// Check if carousel requires interaction
const carouselRequiresInteraction = (swiper) => swiper.el.offsetParent !== null && swiper.slides.length > swiper.params.slidesPerView;

// Handle carousel completion
function handleCarouselCompletion(carouselId) {
    carouselCompletionState[carouselId] = true;
    const carouselGroups = getCarouselGroups();
    for (const groupId in carouselGroups) {
        if (carouselGroups[groupId].includes(carouselId)) {
            checkGroupCompletion(groupId);
            break;
        }
    }
}

// Check if all carousels in a group are completed
function checkGroupCompletion(groupId) {
    const carouselGroups = getCarouselGroups();
    if (carouselGroups[groupId].every(id => carouselCompletionState[id] || !carouselRequiresInteraction(swiperInstances[id]))) {
        $backArrow.removeClass("interaction_locked");
        $nextArrow.removeClass("interaction_locked");
        pageIndex[groupId === 'comparison_1_3_1' ? 'wrapper_1_3' : 'comparison_1_3_2'].interactionFinished = true;
    }
}

// Call when entering comparison sections
function initializeCarouselChecks() {
    ['comparison_1_3_1', 'comparison_1_3_2'].forEach(id => {
        if ($(`#${id}`).is(':visible')) checkGroupCompletion(id);
    });
}

// Re-check completion on window resize (for media query changes at 768px)
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        Object.keys(getCarouselGroups()).forEach(groupId => {
            const el = document.getElementById(groupId);
            if (el?.offsetParent) checkGroupCompletion(groupId);
        });
    }, 250);
});