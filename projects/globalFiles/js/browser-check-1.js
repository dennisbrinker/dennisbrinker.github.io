// Check for Internet Explorer

if (detectIE() === true) {    
    window.location.replace("../globalFiles/upgrade.html") 
}

/**
 * detect IE
 * returns true if browser is Internet Explorer, or false if not
 */
function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older
        return true
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 =>
        return true
    }

    // other browser
    return false;
}
