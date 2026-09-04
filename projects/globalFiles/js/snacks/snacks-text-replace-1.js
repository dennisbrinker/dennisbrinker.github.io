/* -----------------------------------------------------

    REPLACE TEXT IDS WITH LANGUAGE SPECIFIC TEXT

-------------------------------------------------------- */
/* Used for 2024 Snacks and newer */

//console.log("snack text replace");

let textLoaded = $.Deferred();

/* -----------------------------------------------------
    Update locale text IDs with translated text.
-------------------------------------------------------- */

function replaceLocaleText(data) {

    $('*[data-localeid]').each(function() {
        var returnText = data.text[$(this).data("localeid")];
        if (returnText === undefined) {
            $(this).html(data.text[$(this).data("localeid")]);
        } else {
            $(this).html(returnText);
        }
    });

    $('*[data-linkid]').each(function() {
        var returnLinkURL = data.text[$(this).data("linkid")];
        if (returnLinkURL === undefined) {
            $(this).attr('href', data.text[$(this).data("linkid")]);
        } else {

            $(this).attr('href', returnLinkURL);
        }
    });

}


/* -----------------------------------------------------
    Update universal text IDs with translated text.
-------------------------------------------------------- */

// List of text IDs for universal IDs
var universalIdList = [119904, 119905, 119906, 119907, 119908, 119909, 119910, 119911, 119912, 119913, 119914, 119915, 119916, 119917, 119918, 119919, 119920, 119921, 119922, 119923, 119924, 119925, 119926, 119927, 119928, 119929, 145069, 153582, 132276, 134096, 173945, 173946, 199407, 199408, 62707, 208489, 208490, 208491, 208492, 208493, 208494, 208495, 205930, 221490, 203409, 222045, 223306, 223307, 216918, 227932, 232057, 232058, 232059, 234370, 234371, 237111, 239033, 244523, 265057];

function replaceUniversalText(data) {
    $('*[data-universalid]').each(function() {
        var returnText = data.text[$(this).data("universalid")];
        if (returnText === undefined) {
            $(this).html(data.text[$(this).data("universalid")]);
        } else {
            var a = returnText.replace(/\[/gi, "<sup>");
            returnText = a.replace(/\]/gi, "</sup>");
            $(this).html(returnText);
        }
    });
}

/* -----------------------------------------------------
    Replaces @@ phrase in translation with desired text
-------------------------------------------------------- */
const regex = /\[@@(\w+)@@]/g;

function replaceTextWithVariables(localizedText, data) {
    //console.log(localizedText, data);
    localizedText = localizedText.replace(regex, (match, value) => {
        return data[value] || match;
    });
    return localizedText;
}


/* -----------------------------------------------------
    Master function that replaces text in the course.
-------------------------------------------------------- */

function localize(cc) {

    // If localize function was called with a specific culture code, update to that code.
    if (cc != null) {courseOptions.cultureCode = cc;}

    // Set a default code if one is missing.
    if (courseOptions.cultureCode == "" || !courseOptions.cultureCode) {courseOptions.cultureCode = "en-GB";}

    // Set the lang value on the html div
    var lang = courseOptions.cultureCode.toLowerCase();
    $("html").attr("lang", lang);


    /* ---------------------------
        Pull text from database
    ------------------------------ */

    if (!window.location.origin) {
        window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    }

    var challengeTextUrl,
        localizationUrl,
        apiRootUrl,
        apiRootUrlSecure;

    var parentHasAPIURL = false;
    try {
        parentHasAPIURL = (window.parent.apiURL);
    } catch(e){

    }

    if (parentHasAPIURL) {
        apiRootUrl = window.parent.apiURL;
        apiRootUrlSecure =  window.parent.apiURLSecure;
        challengeTextUrl =  apiRootUrl + "quiz/challengeText";
        localizationUrl = apiRootUrl + "localization/texts";
    } else {
        //console.log("default location");
        challengeTextUrl = "https://retailedge.intel.com/api/quiz/challengeText";
        localizationUrl = 'https://retailedge.intel.com/api/localization/texts';
        apiRootUrl = "https://retailedge.intel.com/api/";
    }


    function getLocaleText() {
        // for testing fail/error state
        //return $.get("fail", {})

        return $.get(challengeTextUrl, {
                    cultureCode: courseOptions.cultureCode,
                    activityCode: courseOptions.sourceActivityCode,
                    format: 'json'
                })
    }

    function getUniversalText() {
        return $.ajax({
                dataType: 'json',
                url: localizationUrl,
                contentType: 'application/json',
                type: 'POST',
                data: JSON.stringify({
                    cultureCode: courseOptions.cultureCode,
                    ids: universalIdList
                })
            })
    }

    function getExtraIds() {
        if (courseOptions.extraIDs.length > 0) {
            return $.ajax({
                    dataType: 'json',
                    url: localizationUrl,
                    contentType: 'application/json',
                    type: 'POST',
                    data: JSON.stringify({
                        cultureCode: courseOptions.cultureCode,
                        ids: courseOptions.extraIDs
                    })
                })
        } else {
            return false
         }
    }

    $.when(getLocaleText(), getUniversalText(), getExtraIds()).then(function(data1, data2, data3) {

        /* console.log("locale", data1);
        console.log("universal", data2);
        console.log("extra", data3); */

        var dataLocale = data1[0];

        if (data3) {
            // merge text IDs
            dataLocale.text = {
                ...dataLocale.text,
                ...data3[0].text
            }
        }
        var dataUniversal = data2[0];

        // @@ replacement check, setup in config.js
        if (courseOptions.hasOwnProperty('replace') && Object.keys(courseOptions.replace).length != 0) {
            Object.keys(courseOptions.replace).forEach(function(id) {
                dataLocale.text[id] = replaceTextWithVariables(dataLocale.text[id], courseOptions.replace[id]);
            });
        }                

        replaceLocaleText(dataLocale);
        replaceUniversalText(dataUniversal);

        return $.when(dataLocale, dataUniversal);

    }).then(function() {

        textLoaded.resolve();

    }).catch(function(err) {
        //console.log(err);
        textLoaded.reject();
        console.log("Snack Client Error in localize()");
        window.snackMessenger.sendCommand('error', { message: "Snack Client Error in localize()", data: JSON.stringify({ activityCode: courseOptions.activityCode })});        
    });

}

// End localize function


/* --------------------------------------
        Clear out default text
    ----------------------------------------- */

function clearText() {
    $('*[data-localeid]').each(function() {
        $(this).empty();
    });
    $('*[data-universalid]').each(function() {
        $(this).empty();
    });

}

clearText();

/* -----------------------------------------------------
    Text replacement function is called in snacks-init.js
    so we have access to messenger error code if needed
-------------------------------------------------------- */

//localize();