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
        "name":  "1-Background",
        "variations":  {
                           "HD":  "1-Background_HD.jpg",
                           "MOB":  "1-Background_MOB.jpg"
                       }
    },
    {
        "name":  "2-Background",
        "variations":  {
                           "HD":  "2-Background_HD.jpg",
                           "MOB":  "2-Background_MOB.jpg"
                       }
    },
    {
        "name":  "2-Image_1",
        "variations":  {
                           "all":  "2-Image_1.jpg"
                       }
    },
    {
        "name":  "2-Image_2",
        "variations":  {
                           "all":  "2-Image_2.jpg"
                       }
    },
    {
        "name":  "3-Computer_1",
        "variations":  {
                           "all":  "3-Computer_1.png"
                       }
    },
    {
        "name":  "3-Computer_2",
        "variations":  {
                           "all":  "3-Computer_2.png"
                       }
    },
    {
        "name":  "3-Icon_1",
        "variations":  {
                           "all":  "3-Icon_1.png"
                       }
    },
    {
        "name":  "3-Icon_2",
        "variations":  {
                           "all":  "3-Icon_2.png"
                       }
    },
    {
        "name":  "3-Icon_3",
        "variations":  {
                           "all":  "3-Icon_3.png"
                       }
    },
    {
        "name":  "3-Icon_4",
        "variations":  {
                           "all":  "3-Icon_4.png"
                       }
    },
    {
        "name":  "intel_badge",
        "variations":  {
                           "all":  "intel_badge.jpg"
                       }
    },
    {
        "name":  "snapdragon_badge",
        "variations":  {
                           "all":  "snapdragon_badge.jpg"
                       }
    },
    {
        "name":  "X-Button",
        "variations":  {
                           "all":  "X-Button.svg"
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
