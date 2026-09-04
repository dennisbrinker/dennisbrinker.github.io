/* ----------------------------------
            PRELOADER
---------------------------------- */

if (courseOptions.usePreloader) {

    // Variable setup
    var loader = new PxLoader();

        
    // example
    loader.addImage('images/default/instructions_X.svg');

    // Images used for all screen sizes
    loader.addImage('images/1-Sign.png');
    loader.addImage('images/11-BG.jpg');
    loader.addImage('images/3-Panel.jpg');
    loader.addImage('images/4-Panel.jpg');
    loader.addImage('images/5-1.jpg');
    loader.addImage('images/5-2.jpg');
    loader.addImage('images/5-3.jpg');
    loader.addImage('images/5-4.jpg');
    loader.addImage('images/5-5.jpg');
    loader.addImage('images/5-6.jpg');
    loader.addImage('images/5-7.jpg');
    loader.addImage('images/7-1.jpg');
    loader.addImage('images/7-2.jpg');
    loader.addImage('images/7-3.jpg');
    loader.addImage('images/7-Band.jpg');
    loader.addImage('images/8-BG.jpg');
    loader.addImage('images/8-PostIt.png');
    loader.addImage('images/9-1.jpg');
    loader.addImage('images/9-2.jpg');
    loader.addImage('images/9-3.jpg');
    loader.addImage('images/9-4.jpg');
    loader.addImage('images/Hand.svg');
    loader.addImage('images/lock.svg');
    loader.addImage('images/lock_1.svg');
    loader.addImage('images/lock_2.svg');
    loader.addImage('images/tiny.gif');
    loader.addImage('images/default/hand_gray.png');
    loader.addImage('images/default/instructions_X.svg');
    loader.addImage('images/default/quiz_check.png');
    loader.addImage('images/default/quiz_close.png');





    // 4K images
    if (windowWidth >= 3500) {
    loader.addImage('images/1-BG_4K.jpg');
    loader.addImage('images/10-Band_4K.jpg');
    loader.addImage('images/12-BG_4K.jpg');
    loader.addImage('images/2-Mat_4K.jpg');
    loader.addImage('images/3-BG_4K.jpg');
    loader.addImage('images/4-BG_4K.jpg');
    loader.addImage('images/6-BG_4K.jpg');
    loader.addImage('images/8-Lock_4K.png');



    }

    // HD images
    else if (windowWidth > 768) {
    loader.addImage('images/1-BG_HD.jpg');
    loader.addImage('images/10-Band_HD.jpg');
    loader.addImage('images/12-BG_HD.jpg');
    loader.addImage('images/2-Mat_HD.jpg');
    loader.addImage('images/3-BG_HD.jpg');
    loader.addImage('images/4-BG_HD.jpg');
    loader.addImage('images/6-BG_HD.jpg');
    loader.addImage('images/8-Lock_HD.png');



    }

    // Mobile images
    else {
    loader.addImage('images/1-BG_MOB.jpg');
    loader.addImage('images/12-BG_MOB.jpg');
    loader.addImage('images/2-Mat_MOB.jpg');
    loader.addImage('images/3-BG_MOB.jpg');
    loader.addImage('images/4-BG_MOB.jpg');
    loader.addImage('images/6-BG_MOB.jpg');
    loader.addImage('images/8-Lock_MOB.png');



    }

    
    // log when all resources have completed
    loader.addCompletionListener(function(e) {
        ImageLoadedDeferred.resolve();
    });

    loader.start();
}
