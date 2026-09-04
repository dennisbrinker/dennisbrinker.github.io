/* ----------------------------------------

    Activity Loading Time Tracker
    Hooked up to specific courses

    Add to very start of <head>:
    <script type="text/javascript" src="../globalFiles/js/loading-tracker-1.js"></script>

    Add to theFinalFunction():
    callLoadingTracker();

 ---------------------------------------- */

// Kill switch
var _trackerActive = false;

var trackerUID;

if (_trackerActive == true) {
    
    var devMode = false;
    
    var getQueryVariable = function (variable) {
        var query = window.location.href;
        var vars = query.split(/&|\#/);

        for (var i = 0; i < vars.length; i++) {
                 if (variable == vars[i]) {
                     return true
                 }
            }
    };
    
    if (getQueryVariable("slider")) {
        devMode = true;
    }
    
    // http://stackoverflow.com/a/873856
    function createUUID() {
        // http://www.ietf.org/rfc/rfc4122.txt
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    };
    
    // get Pax uid
    function getPax() {
        var q = window.location.href.split('#')[0];
        var vars = [],
            hash;
        var q = q.split('?')[1];

        if (q != undefined) {
            q = q.split('&');

            for (var i = 0; i < q.length; i++) {
                hash = q[i].split('=');
                vars.push(hash[1]);
                vars[hash[0].toLowerCase()] = hash[1];
            }
        }
        return vars["paxuid"];
    }
        
    if (devMode == false) {
        trackerUID = createUUID();
        paxUID = getPax();
        
        if (paxUID != undefined && paxUID != null) {     

            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {};
            xhr.open('POST', 'https://retailedge.intel.com/api/activity/startloadingtime', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader("PaxUID", paxUID);
            xhr.send(JSON.stringify({
                "Uid": trackerUID,
                "PaxUID": paxUID
            }))
        
        }
    }

  
}

function callLoadingTracker() {
    
    if (_trackerActive == true && SliderTurnOn == false) {
        
        var data = {
            "Uid": trackerUID, 
            "ActivityCode": courseOptions.activityCode,
            "CultureCode": courseOptions.cultureCode,
            "Site" : courseOptions.sitecollection,
            "WindowWidth": windowWidth
        }
        
        $.ajax({
            url: "https://retailedge.intel.com/api/activity/completeloadingtime",
            dataType: "json",
            contentType: 'application/json',
            type: "POST",
            headers: { "PaxUID": courseOptions.paxUID },
            data: JSON.stringify(data)
        });
        
    }
    
}
