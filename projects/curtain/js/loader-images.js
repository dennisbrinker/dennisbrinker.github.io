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
        "name":  "1-BG",
        "variations":  {
                           "HD":  "1-BG_HD.jpg",
                           "MOB":  "1-BG_MOB.jpg"
                       }
    },
    {
        "name":  "2-BG",
        "variations":  {
                           "HD":  "2-BG_HD.jpg",
                           "MOB":  "2-BG_MOB.jpg"
                       }
    },
    {
        "name":  "3-Image1",
        "variations":  {
                           "all":  "3-Image1.jpg"
                       }
    },
    {
        "name":  "3-Image2",
        "variations":  {
                           "all":  "3-Image2.jpg"
                       }
    },
    {
        "name":  "3-Image3",
        "variations":  {
                           "all":  "3-Image3.jpg"
                       }
    },
    {
        "name":  "3-Image4",
        "variations":  {
                           "all":  "3-Image4.jpg"
                       }
    },
    {
        "name":  "4-BG",
        "variations":  {
                           "HD":  "4-BG_HD.jpg",
                           "MOB":  "4-BG_MOB.jpg"
                       }
    },
    {
        "name":  "5-BG",
        "variations":  {
                           "HD":  "5-BG_HD.jpg",
                           "MOB":  "5-BG_MOB.jpg"
                       }
    },
    {
        "name":  "6-Icon1",
        "variations":  {
                           "all":  "6-Icon1.gif"
                       }
    },
    {
        "name":  "6-Icon2",
        "variations":  {
                           "all":  "6-Icon2.gif"
                       }
    },
    {
        "name":  "6-Icon3",
        "variations":  {
                           "all":  "6-Icon3.gif"
                       }
    },
    {
        "name":  "6-Icon4",
        "variations":  {
                           "all":  "6-Icon4.gif"
                       }
    },
    {
        "name":  "6-Icon5",
        "variations":  {
                           "all":  "6-Icon5.gif"
                       }
    },
    {
        "name":  "7-BG",
        "variations":  {
                           "HD":  "7-BG_HD.jpg",
                           "MOB":  "7-BG_MOB.jpg"
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
