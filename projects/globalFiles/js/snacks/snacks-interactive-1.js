/* ----------------------------------------
    Snacks Interactivity
 ---------------------------------------- */

// Modals ------------------------------
var dialogArray = document.querySelectorAll('[data-open]')

dialogArray.forEach((element) => {
    var dialog = document.getElementById(element.dataset.open);
    element.addEventListener('click', (event) => {
        dialog.showModal();
    });

    var closeButton = dialog.getElementsByClassName('snacks-content-circle-X')[0];
    closeButton.addEventListener('click', (event) => {
        dialog.close();
        // automatically adds clicked class
        element.classList.add("clicked")
    });
});

// Matching ----------------------------
var matchSearch = document.querySelectorAll('[data-match-pair]'),
    matchASearch = document.querySelectorAll('.match-A div[data-match-pair]'),
    matchBSearch = document.querySelectorAll('.match-B div[data-match-pair]'),
    matches = [];

function checkForMatch() {

    //console.log(matches);

    if (matches[0].data("match-pair") == matches[1].data("match-pair")) { // match
        //console.log("matched");
        gsap.fromTo(".match-click", {scale: 1},{duration: 0.25, scale: 0.9, ease: "sine.inOut", repeat: 3, yoyo: true, onStart: function() {
            $(".match-click").addClass("match-success");
        },
        onComplete: function() {
            $(".match-click").addClass("matched");
            $(".match-click").removeClass("match-click match-success");
            $(".match-bank").css("pointer-events", "auto");
        }})
    } else { // not a match
        gsap.fromTo("#main_wrapper", {x: 0},{duration: 0.01, x: 2, repeat: 51, yoyo: true, onComplete: function() {
            $(".match-click").removeClass("match-click");
            $(".match-bank").css("pointer-events", "auto");
        }})
    }

    //reset classes
    $(".match-parent-clicked").removeClass("match-parent-clicked");

    //reset matches
    matches = [];
    matchClickSetup();

}

function matchClickSetup() {

    $.each(matchSearch, function (i,matchItem) {

         $(matchItem).on('click', function () {

             if ($(this).hasClass("matched")) {
                 $(this).off('click');
                 return;
             }

             var whichArray,
                 matchItemArray = Array.prototype.slice.call(matchASearch);

             if ( matchItemArray.includes($(this)[0]) ) {
                 whichArray = matchASearch;
                 whichParent = ".match-A";
             } else {
                 whichArray = matchBSearch;
                 whichParent = ".match-B";
             }

             //remove click event
             $.each(whichArray, function (i,item) {
                 $(item).off('click');
             });

             $(whichParent).addClass("match-parent-clicked");
             $(this).addClass("match-click");
             matches.push($(this));

             //check for match
             if (matches.length == 2) {

                // prevent user from interacting with matches until match animation is done
                $(".match-bank").css("pointer-events", "none");

                 //time dictated by transition on css (--match-anim-speed)
                 setTimeout(() => {
                    checkForMatch();
                }, 300);

             }
         });
    });
}

matchClickSetup();

// Shuffle the items in each matching bank
function shuffle(target) {
    // create array of numbers and shuffle their order
    var orderArray = [];
    for (let i = 0; i < target.length; i++) {
        orderArray.push(i+1);
    }
    gsap.utils.shuffle(orderArray)

    // assign new order number to each element in target match bank
    target.forEach(function(el, i) {
        $(el).css("order", orderArray[i])
    })
}

if (SliderTurnOn != true) {

    if ( $(".match-A").hasClass("match-shuffle")) {
        shuffle(matchASearch)
    }

    if ( $(".match-B").hasClass("match-shuffle")) {
        shuffle(matchBSearch)
    }
}

// Click to Reveal ----------------------------
// if user clicks a reveal button, add class to parent element and use logic in snack-custom.css to trigger display of divs
// can have multiple click-to-reveal sections on a page, as long as all are wrapped in their own click-to-reveal div
var clickToRevealParents = document.querySelectorAll('.click-to-reveal');

clickToRevealParents.forEach((parent) => {
    var clickToRevealButtons = parent.querySelectorAll('.reveal-buttons > *');

    clickToRevealButtons.forEach((button) => {
        button.addEventListener('click', () => {
            console.log("clicked");
            parent.classList.add("reveal-clicked");
        });
    });
});