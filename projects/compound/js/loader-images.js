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
        "name":  "1_bg",
        "variations":  {
                           "HD":  "1_bg_HD.jpg",
                           "MOB":  "1_bg_MOB.jpg"
                       }
    },
    {
        "name":  "2_bg",
        "variations":  {
                           "HD":  "2_bg_HD.jpg",
                           "MOB":  "2_bg_MOB.jpg"
                       }
    },
    {
        "name":  "2_device1",
        "variations":  {
                           "all":  "2_device1.png"
                       }
    },
    {
        "name":  "2_device2",
        "variations":  {
                           "all":  "2_device2.png"
                       }
    },
    {
        "name":  "2_icon1",
        "variations":  {
                           "all":  "2_icon1.png"
                       }
    },
    {
        "name":  "2_icon2",
        "variations":  {
                           "all":  "2_icon2.png"
                       }
    },
    {
        "name":  "2_icon3",
        "variations":  {
                           "all":  "2_icon3.png"
                       }
    },
    {
        "name":  "2_icon4",
        "variations":  {
                           "all":  "2_icon4.png"
                       }
    },
    {
        "name":  "3_app1",
        "variations":  {
                           "all":  "3_app1.png"
                       }
    },
    {
        "name":  "3_app2",
        "variations":  {
                           "all":  "3_app2.png"
                       }
    },
    {
        "name":  "3_app3",
        "variations":  {
                           "all":  "3_app3.png"
                       }
    },
    {
        "name":  "3_app4",
        "variations":  {
                           "all":  "3_app4.png"
                       }
    },
    {
        "name":  "3_bg",
        "variations":  {
                           "HD":  "3_bg_HD.jpg",
                           "MOB":  "3_bg_MOB.jpg"
                       }
    },
    {
        "name":  "3_device1",
        "variations":  {
                           "all":  "3_device1.png"
                       }
    },
    {
        "name":  "3_device2",
        "variations":  {
                           "all":  "3_device2.png"
                       }
    },
    {
        "name":  "3_Game1",
        "variations":  {
                           "all":  "3_Game1.jpg"
                       }
    },
    {
        "name":  "3_Game10",
        "variations":  {
                           "all":  "3_Game10.jpg"
                       }
    },
    {
        "name":  "3_Game11",
        "variations":  {
                           "all":  "3_Game11.jpg"
                       }
    },
    {
        "name":  "3_Game12",
        "variations":  {
                           "all":  "3_Game12.jpg"
                       }
    },
    {
        "name":  "3_Game13",
        "variations":  {
                           "all":  "3_Game13.jpg"
                       }
    },
    {
        "name":  "3_Game14",
        "variations":  {
                           "all":  "3_Game14.jpg"
                       }
    },
    {
        "name":  "3_Game2",
        "variations":  {
                           "all":  "3_Game2.jpg"
                       }
    },
    {
        "name":  "3_Game3",
        "variations":  {
                           "all":  "3_Game3.jpg"
                       }
    },
    {
        "name":  "3_Game4",
        "variations":  {
                           "all":  "3_Game4.jpg"
                       }
    },
    {
        "name":  "3_Game5",
        "variations":  {
                           "all":  "3_Game5.jpg"
                       }
    },
    {
        "name":  "3_Game6",
        "variations":  {
                           "all":  "3_Game6.jpg"
                       }
    },
    {
        "name":  "3_Game7",
        "variations":  {
                           "all":  "3_Game7.jpg"
                       }
    },
    {
        "name":  "3_Game8",
        "variations":  {
                           "all":  "3_Game8.jpg"
                       }
    },
    {
        "name":  "3_Game9",
        "variations":  {
                           "all":  "3_Game9.jpg"
                       }
    },
    {
        "name":  "3_icon1",
        "variations":  {
                           "all":  "3_icon1.png"
                       }
    },
    {
        "name":  "3_icon2",
        "variations":  {
                           "all":  "3_icon2.png"
                       }
    },
    {
        "name":  "3_icon3",
        "variations":  {
                           "all":  "3_icon3.png"
                       }
    },
    {
        "name":  "4_bg",
        "variations":  {
                           "HD":  "4_bg_HD.jpg",
                           "MOB":  "4_bg_MOB.jpg"
                       }
    },
    {
        "name":  "4_device1",
        "variations":  {
                           "all":  "4_device1.png"
                       }
    },
    {
        "name":  "4_device2",
        "variations":  {
                           "all":  "4_device2.png"
                       }
    },
    {
        "name":  "5_bg",
        "variations":  {
                           "HD":  "5_bg_HD.jpg",
                           "MOB":  "5_bg_MOB.jpg"
                       }
    },
    {
        "name":  "5_device1",
        "variations":  {
                           "all":  "5_device1.png"
                       }
    },
    {
        "name":  "5_device2",
        "variations":  {
                           "all":  "5_device2.png"
                       }
    },
    {
        "name":  "5_icon2",
        "variations":  {
                           "all":  "5_icon2.png"
                       }
    },
    {
        "name":  "5_icon6_bg",
        "variations":  {
                           "all":  "5_icon6_bg.png"
                       }
    },
    {
        "name":  "amd_badge1",
        "variations":  {
                           "all":  "amd_badge1.jpg"
                       }
    },
    {
        "name":  "amd_badge2",
        "variations":  {
                           "all":  "amd_badge2.jpg"
                       }
    },
    {
        "name":  "arc_badge",
        "variations":  {
                           "all":  "arc_badge.jpg"
                       }
    },
    {
        "name":  "arrowL",
        "variations":  {
                           "all":  "arrowL.png"
                       }
    },
    {
        "name":  "arrowR",
        "variations":  {
                           "all":  "arrowR.png"
                       }
    },
    {
        "name":  "close",
        "variations":  {
                           "all":  "close.png"
                       }
    },
    {
        "name":  "main_bg",
        "variations":  {
                           "HD":  "main_bg_HD.jpg",
                           "MOB":  "main_bg_MOB.jpg"
                       }
    },
    {
        "name":  "paw",
        "variations":  {
                           "all":  "paw.png"
                       }
    },
    {
        "name":  "qualcomm_badge",
        "variations":  {
                           "all":  "qualcomm_badge.jpg"
                       }
    },
    {
        "name":  "ultra_badge",
        "variations":  {
                           "all":  "ultra_badge.jpg"
                       }
    },
    {
        "name":  "ultra9_badge",
        "variations":  {
                           "all":  "ultra9_badge.jpg"
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
