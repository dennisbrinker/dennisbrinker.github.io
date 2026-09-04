/* ---------------------

    COURSE CONFIG

--------------------- */

var courseOptions = {
    activityCode: '3-WR01-OverviewWorkingRemotely',
    coursetype: '',
    courseUID: '',
    cultureCode: '',
    isIOS: (/iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)),
    usePreloader: true
}

var screenHeight = window.screen.height,
    screenWidth =  window.screen.width,
    windowHeight = $(window).height(),
    windowWidth = $(window).width();

if (courseOptions.usePreloader) {
    var ImageLoadedDeferred = $.Deferred();
}

if (courseOptions.isIOS) {
    $('html').addClass("ios");
} 