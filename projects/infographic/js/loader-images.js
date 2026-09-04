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
        "name":  "1_Picture_1",
        "variations":  {
                           "HD":  "1_Picture_1_HD.png",
                           "MOB":  "1_Picture_1_MOB.png"
                       }
    },
    {
        "name":  "1_Picture_2",
        "variations":  {
                           "all":  "1_Picture_2.png"
                       }
    },
    {
        "name":  "1-Backpack",
        "variations":  {
                           "all":  "1-Backpack.png"
                       }
    },
    {
        "name":  "1-Book",
        "variations":  {
                           "HD":  "1-Book_HD.png",
                           "MOB":  "1-Book_MOB.png"
                       }
    },
    {
        "name":  "1-Laptop",
        "variations":  {
                           "HD":  "1-Laptop_HD.png",
                           "MOB":  "1-Laptop_MOB.png"
                       }
    },
    {
        "name":  "1-Paper",
        "variations":  {
                           "all":  "1-Paper.png"
                       }
    },
    {
        "name":  "2-Badge",
        "variations":  {
                           "all":  "2-Badge.png"
                       }
    },
    {
        "name":  "2-Purple_Bkgd",
        "variations":  {
                           "HD":  "2-Purple_Bkgd_HD.jpg",
                           "MOB":  "2-Purple_Bkgd_MOB.jpg"
                       }
    },
    {
        "name":  "3-Chart",
        "variations":  {
                           "all":  "3-Chart.gif"
                       }
    },
    {
        "name":  "3-Name-Tag",
        "variations":  {
                           "all":  "3-Name-Tag.png"
                       }
    },
    {
        "name":  "3-Object_Webcam",
        "variations":  {
                           "all":  "3-Object_Webcam.png"
                       }
    },
    {
        "name":  "3-Paper",
        "variations":  {
                           "all":  "3-Paper.png"
                       }
    },
    {
        "name":  "3-Paper_Bottom",
        "variations":  {
                           "HD":  "3-Paper_Bottom_HD.png",
                           "MOB":  "3-Paper_Bottom_MOB.png"
                       }
    },
    {
        "name":  "3-Paper_Top",
        "variations":  {
                           "HD":  "3-Paper_Top_HD.png",
                           "MOB":  "3-Paper_Top_MOB.png"
                       }
    },
    {
        "name":  "3-Picture_1",
        "variations":  {
                           "HD":  "3-Picture_1_HD.png",
                           "MOB":  "3-Picture_1_MOB.png"
                       }
    },
    {
        "name":  "3-Picture_2",
        "variations":  {
                           "HD":  "3-Picture_2_HD.png",
                           "MOB":  "3-Picture_2_MOB.png"
                       }
    },
    {
        "name":  "3-Software_Screen",
        "variations":  {
                           "HD":  "3-Software_Screen_HD.png",
                           "MOB":  "3-Software_Screen_MOB.png"
                       }
    },
    {
        "name":  "3-Sticker_1",
        "variations":  {
                           "all":  "3-Sticker_1.png"
                       }
    },
    {
        "name":  "3-Sticker_2",
        "variations":  {
                           "all":  "3-Sticker_2.png"
                       }
    },
    {
        "name":  "3-Sticker_3",
        "variations":  {
                           "all":  "3-Sticker_3.png"
                       }
    },
    {
        "name":  "3-Sticker_4",
        "variations":  {
                           "all":  "3-Sticker_4.png"
                       }
    },
    {
        "name":  "3-Women_Video",
        "variations":  {
                           "all":  "3-Women_Video.gif"
                       }
    },
    {
        "name":  "4-DeviceScreen",
        "variations":  {
                           "HD":  "4-DeviceScreen_HD.png",
                           "MOB":  "4-DeviceScreen_MOB.png"
                       }
    },
    {
        "name":  "4-Name-Tag",
        "variations":  {
                           "all":  "4-Name-Tag.png"
                       }
    },
    {
        "name":  "4-Object_PineNeedles",
        "variations":  {
                           "all":  "4-Object_PineNeedles.png"
                       }
    },
    {
        "name":  "4-Paper",
        "variations":  {
                           "all":  "4-Paper.png"
                       }
    },
    {
        "name":  "4-Paper_Bottom",
        "variations":  {
                           "all":  "4-Paper_Bottom.png"
                       }
    },
    {
        "name":  "4-Paper_Top",
        "variations":  {
                           "all":  "4-Paper_Top.png"
                       }
    },
    {
        "name":  "4-Picture_1",
        "variations":  {
                           "all":  "4-Picture_1.png"
                       }
    },
    {
        "name":  "4-Picture_2",
        "variations":  {
                           "all":  "4-Picture_2.png"
                       }
    },
    {
        "name":  "4-Picture_3",
        "variations":  {
                           "all":  "4-Picture_3.png"
                       }
    },
    {
        "name":  "4-prompt_loop",
        "variations":  {
                           "all":  "4-prompt_loop.gif"
                       }
    },
    {
        "name":  "4-Prompt-Box",
        "variations":  {
                           "all":  "4-Prompt-Box.png"
                       }
    },
    {
        "name":  "4-Sticker_1",
        "variations":  {
                           "all":  "4-Sticker_1.png"
                       }
    },
    {
        "name":  "4-Sticker_2",
        "variations":  {
                           "all":  "4-Sticker_2.png"
                       }
    },
    {
        "name":  "5-Name-Tag",
        "variations":  {
                           "all":  "5-Name-Tag.png"
                       }
    },
    {
        "name":  "5-Object_Lock",
        "variations":  {
                           "all":  "5-Object_Lock.png"
                       }
    },
    {
        "name":  "5-Paper_Bottom",
        "variations":  {
                           "all":  "5-Paper_Bottom.png"
                       }
    },
    {
        "name":  "5-Paper_Top",
        "variations":  {
                           "all":  "5-Paper_Top.png"
                       }
    },
    {
        "name":  "5-Picture_1",
        "variations":  {
                           "all":  "5-Picture_1.png"
                       }
    },
    {
        "name":  "5-Picture_2",
        "variations":  {
                           "all":  "5-Picture_2.png"
                       }
    },
    {
        "name":  "5-Popup",
        "variations":  {
                           "all":  "5-Popup.png"
                       }
    },
    {
        "name":  "5-Popup_Arrow",
        "variations":  {
                           "all":  "5-Popup_Arrow.png"
                       }
    },
    {
        "name":  "5-Software_Screen",
        "variations":  {
                           "HD":  "5-Software_Screen_HD.png",
                           "MOB":  "5-Software_Screen_MOB.png"
                       }
    },
    {
        "name":  "5-Sticker_1",
        "variations":  {
                           "all":  "5-Sticker_1.png"
                       }
    },
    {
        "name":  "5-Sticker_2",
        "variations":  {
                           "all":  "5-Sticker_2.png"
                       }
    },
    {
        "name":  "5-Sticker_3",
        "variations":  {
                           "all":  "5-Sticker_3.png"
                       }
    },
    {
        "name":  "5-Voice_Lines",
        "variations":  {
                           "all":  "5-Voice_Lines.gif"
                       }
    },
    {
        "name":  "6-Picture",
        "variations":  {
                           "HD":  "6-Picture_HD.png",
                           "MOB":  "6-Picture_MOB.png"
                       }
    },
    {
        "name":  "6-Purple_Bkgd",
        "variations":  {
                           "HD":  "6-Purple_Bkgd_HD.jpg",
                           "MOB":  "6-Purple_Bkgd_MOB.jpg"
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
