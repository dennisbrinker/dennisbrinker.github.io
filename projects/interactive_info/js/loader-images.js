// Image Preloader v2 - Feb 2025

function startPreloader() {

    if (courseOptions.usePreloader || courseOptions.coursetype == "module") {

        // Append html for the preloader
        var loadingBarHtml = '<div id="loading_bar_full_wrapper"> <div id="loading_bar_full_bar"> <div id="loading_bar_full_inner"></div></div><div id="loading_bar_full-progress" class="white p20">0%</div></div>';

        $("#preloader_wrapper").append(loadingBarHtml);
        gsap.to("#loading_bar_full_wrapper", {duration: 0.15, opacity:1})

        // Variable setup
        var $progress = $('#loading_bar_full-progress').text('0%'),
            loader = new PxLoader(),
            $box = $('#loading_bar_full_inner');

        // Image data - placed here by Powershell script
        const loaderImageData = [
    {
        "name":  "1-3",
        "variations":  {
                           "all":  "1-3.png"
                       }
    },
    {
        "name":  "2-1-Pink",
        "variations":  {
                           "all":  "2-1-Pink.png"
                       }
    },
    {
        "name":  "2-1-Purple",
        "variations":  {
                           "all":  "2-1-Purple.png"
                       }
    },
    {
        "name":  "2-2-Pink",
        "variations":  {
                           "all":  "2-2-Pink.png"
                       }
    },
    {
        "name":  "2-2-Purple",
        "variations":  {
                           "all":  "2-2-Purple.png"
                       }
    },
    {
        "name":  "2-3-Pink",
        "variations":  {
                           "all":  "2-3-Pink.png"
                       }
    },
    {
        "name":  "2-3-Purple",
        "variations":  {
                           "all":  "2-3-Purple.png"
                       }
    },
    {
        "name":  "2-4-Pink",
        "variations":  {
                           "all":  "2-4-Pink.png"
                       }
    },
    {
        "name":  "2-4-Purple",
        "variations":  {
                           "all":  "2-4-Purple.png"
                       }
    },
    {
        "name":  "2-BoxBG",
        "variations":  {
                           "all":  "2-BoxBG.png"
                       }
    },
    {
        "name":  "2-CornerBL",
        "variations":  {
                           "all":  "2-CornerBL.png"
                       }
    },
    {
        "name":  "2-CornerBR",
        "variations":  {
                           "all":  "2-CornerBR.png"
                       }
    },
    {
        "name":  "2-CornerTL",
        "variations":  {
                           "all":  "2-CornerTL.png"
                       }
    },
    {
        "name":  "2-CornerTR",
        "variations":  {
                           "all":  "2-CornerTR.png"
                       }
    },
    {
        "name":  "2-Icon1",
        "variations":  {
                           "all":  "2-Icon1.png"
                       }
    },
    {
        "name":  "2-Icon2",
        "variations":  {
                           "all":  "2-Icon2.png"
                       }
    },
    {
        "name":  "2-Icon2-Popup",
        "variations":  {
                           "all":  "2-Icon2-Popup.png"
                       }
    },
    {
        "name":  "2-Icon3",
        "variations":  {
                           "all":  "2-Icon3.png"
                       }
    },
    {
        "name":  "2-Icon4",
        "variations":  {
                           "all":  "2-Icon4.png"
                       }
    },
    {
        "name":  "2-Pop1",
        "variations":  {
                           "HD":  "2-Pop1_HD.jpg",
                           "MOB":  "2-Pop1_MOB.jpg"
                       }
    },
    {
        "name":  "2-Pop2",
        "variations":  {
                           "HD":  "2-Pop2_HD.jpg",
                           "MOB":  "2-Pop2_MOB.jpg"
                       }
    },
    {
        "name":  "2-Pop3",
        "variations":  {
                           "HD":  "2-Pop3_HD.jpg",
                           "MOB":  "2-Pop3_MOB.jpg"
                       }
    },
    {
        "name":  "2-Pop4",
        "variations":  {
                           "HD":  "2-Pop4_HD.jpg",
                           "MOB":  "2-Pop4_MOB.jpg"
                       }
    },
    {
        "name":  "3-3",
        "variations":  {
                           "all":  "3-3.png"
                       }
    },
    {
        "name":  "3-BG",
        "variations":  {
                           "HD":  "3-BG_HD.png",
                           "MOB":  "3-BG_MOB.png"
                       }
    },
    {
        "name":  "3-Pop1",
        "variations":  {
                           "all":  "3-Pop1.png"
                       }
    },
    {
        "name":  "3-Pop2",
        "variations":  {
                           "all":  "3-Pop2.png"
                       }
    },
    {
        "name":  "3-Pop3",
        "variations":  {
                           "all":  "3-Pop3.png"
                       }
    },
    {
        "name":  "3-PopBG",
        "variations":  {
                           "HD":  "3-PopBG_HD.png",
                           "MOB":  "3-PopBG_MOB.png"
                       }
    },
    {
        "name":  "4-3",
        "variations":  {
                           "all":  "4-3.png"
                       }
    },
    {
        "name":  "4-Chip",
        "variations":  {
                           "HD":  "4-Chip_HD.png",
                           "MOB":  "4-Chip_MOB.png"
                       }
    },
    {
        "name":  "5-3",
        "variations":  {
                           "all":  "5-3.png"
                       }
    },
    {
        "name":  "5-Content",
        "variations":  {
                           "all":  "5-Content.png"
                       }
    },
    {
        "name":  "5-Dial",
        "variations":  {
                           "all":  "5-Dial.png"
                       }
    },
    {
        "name":  "5-DialBase",
        "variations":  {
                           "all":  "5-DialBase.png"
                       }
    },
    {
        "name":  "5-Gamer",
        "variations":  {
                           "all":  "5-Gamer.png"
                       }
    },
    {
        "name":  "5-Premium",
        "variations":  {
                           "all":  "5-Premium.png"
                       }
    },
    {
        "name":  "6-3",
        "variations":  {
                           "all":  "6-3.png"
                       }
    },
    {
        "name":  "6-BG",
        "variations":  {
                           "HD":  "6-BG_HD.png",
                           "MOB":  "6-BG_MOB.png"
                       }
    },
    {
        "name":  "6-Chart-5",
        "variations":  {
                           "all":  "6-Chart-5.jpg"
                       }
    },
    {
        "name":  "6-Chart-7",
        "variations":  {
                           "all":  "6-Chart-7.jpg"
                       }
    },
    {
        "name":  "6-Chart-9",
        "variations":  {
                           "all":  "6-Chart-9.jpg"
                       }
    },
    {
        "name":  "6-Chart-x7",
        "variations":  {
                           "all":  "6-Chart-x7.jpg"
                       }
    },
    {
        "name":  "6-Chart-x9",
        "variations":  {
                           "all":  "6-Chart-x9.jpg"
                       }
    },
    {
        "name":  "Badge-Family",
        "variations":  {
                           "all":  "Badge-Family.png"
                       }
    },
    {
        "name":  "BG-Bottom",
        "variations":  {
                           "HD":  "BG-Bottom_HD.jpg",
                           "MOB":  "BG-Bottom_MOB.jpg"
                       }
    },
    {
        "name":  "BG-Top",
        "variations":  {
                           "HD":  "BG-Top_HD.jpg",
                           "MOB":  "BG-Top_MOB.jpg"
                       }
    },
    {
        "name":  "hand",
        "variations":  {
                           "all":  "hand.png"
                       }
    },
    {
        "name":  "Main-BG",
        "variations":  {
                           "HD":  "Main-BG_HD.jpg"
                       }
    },
    {
        "name":  "Next-Arrow",
        "variations":  {
                           "all":  "Next-Arrow.png"
                       }
    },
    {
        "name":  "popup-close",
        "variations":  {
                           "all":  "popup-close.png"
                       }
    },
    {
        "name":  "Previous-Arrow",
        "variations":  {
                           "all":  "Previous-Arrow.png"
                       }
    },
    {
        "name":  "Wave",
        "variations":  {
                           "all":  "Wave.svg"
                       }
    },
    {
        "name":  "WaveWide",
        "variations":  {
                           "all":  "WaveWide.svg"
                       }
    },
    {
        "name":  "x7",
        "variations":  {
                           "all":  "x7.jpg"
                       }
    },
    {
        "name":  "x9",
        "variations":  {
                           "all":  "x9.jpg"
                       }
    }
];


        if (typeof loaderImageData === "undefined") {
            console.log("Missing preloader image data");
            ImageLoadedDeferred.resolve();
            return
        }

        // Iterate through each image in the imageData array
        loaderImageData.forEach(image => {
            let imageToLoad = null;

            // Check for "all" variation first and load if it exists
            if (image.variations.all) {
                imageToLoad = image.variations.all; // Load the "all" version for all screen sizes

            // Otherwise, determine the appropriate variation based on window width
            } else if (windowWidth > courseOptions.tabletWidth) {
                // HD Size
                if (image.variations.HD) {
                    imageToLoad = image.variations.HD; // Load the HD version for larger screens
                }
                // no fallbacks
            } else if (windowWidth > courseOptions.mobileWidth) {
                // TABLET Size
                if (image.variations.TAB) {
                    imageToLoad = image.variations.TAB; // TAB version preferred
                } else if (image.variations.HD) {
                    imageToLoad = image.variations.HD; // Fallback to HD if no TAB
                } else if (image.variations.MOB) {
                    imageToLoad = image.variations.MOB; // Fallback to MOB if no HD
                }
            } else {
                // MOBILE Size
                if (image.variations.MOB) {
                    imageToLoad = image.variations.MOB; // Load the MOB version for small screens
                } else if (image.variations.TAB) {
                    imageToLoad = image.variations.TAB; // Fallback to TAB if no MOB
                }
            }

            // If a valid imageToLoad is selected, add it to the loader
            if (imageToLoad) {
                //console.log(`Adding ${imageToLoad} to preloader.`);
                loader.addImage('images/' + imageToLoad);
            } else {
                console.log(`No valid image variation found for ${image.name}. Skipping...`);
            }
        });


        // callback that runs every time an image loads
        loader.addProgressListener(function(e) {

            // some debugging tools for dev mode
            if (SliderTurnOn) {
                if (e.loaded == false) {
                    console.error(e.resource.getName() + ' DID NOT LOAD!');
                } else {
                    //console.log(e.resource.getName() + ' Loaded');
                }
            }

            // the event provides stats on the number of completed items
            var percentDoneNow =  ((e.completedCount/e.totalCount) * 100).toFixed(0) - 1 + "%";
            $progress.text(percentDoneNow);
            gsap.set($box,{width:percentDoneNow});

        });

        // log when all resources have completed
        loader.addCompletionListener(function(e) {
            //console.log('Ready to go!');
            ImageLoadedDeferred.resolve();
        });

        loader.start();
    }

}

startPreloader();
