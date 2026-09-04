// Dev Tools
/* Used for 2018-04 IREP courses and newer */

// Check if variables exist in global scope, if not define them. 
if (typeof SliderTurnOn === 'undefined') {
	let SliderTurnOn = false;
}
if (typeof ReviewerTurnOn === 'undefined') {
	let ReviewerTurnOn = false;
}

/* -----------------------------------------------------
    HTML code to be appended
-------------------------------------------------------- */
var langChangerDropDown = '<div id="click_to_change"><form id="Pick_One_From_Here"><select id="click_to_change_drop_down" autocomplete="off" > <option selected="selected" id="en-US">en-US</option> <option id="ru-RU">ru-RU</option> <option id="uk-UA">uk-UA</option> <option id="ro-RO">ro-RO</option> <option id="el-GR">el-GR</option> <option id="cs-CZ">cs-CZ</option> <option id="de-DE">de-DE</option> <option id="en-GB">en-GB</option> <option id="es-ES">es-ES</option> <option id="fr-FR">fr-FR</option> <option id="hu-HU">hu-HU</option> <option id="it-IT">it-IT</option> <option id="nl-NL">nl-NL</option> <option id="pl-PL">pl-PL</option> <option id="tr-TR">tr-TR</option> <option id="ar-SA">ar-SA</option> <option id="zh-CHS">zh-CHS</option> <option id="ja-JP">ja-JP</option> <option id="id-ID">id-ID</option> <option id="en-AU">en-AU</option> <option id="ko-KR">ko-KR</option> <option id="th-TH">th-TH</option> <option id="vi-VN">vi-VN</option> <option id="zh-TW">zh-TW</option> <option id="es-MX">es-MX</option> <option id="pt-BR">pt-BR</option></select></form><div id="click_to_change_container"><div id="form_expand_click">+</div><div id="click_to_refresh_lang_css">↻</div></div>';

var sliderHTML = '<div id="slider_wrapper"> <div id="slider"></div><div id="slider_bot"> <div id="slider_left" class="slider_button_wrapper"> <div id="minimizeUI" title="Minimize dev tools UI"></div><div id="parkTimelineBtn" title="Park timeline here"></div><div id="gridlinesBtn" title="Toggle gridlines"></div><div id="swapPosBtn" title="Toggle slider position"></div></div><div id="slider_center" class="slider_button_wrapper"> <div id="reverseBtn"></div><div id="playBtn" class="slider_active_btn"></div><div id="pauseBtn"></div></div><div id="slider_right" class="slider_button_wrapper"> <div id="timeScale_wrapper"> <p class="nohover p16">speed:</p><p id="timeScaleSlowBtn" class="p14">½</p><p id="timeScaleNormalBtn" class="p16 slider_active_speed_btn">1</p><p id="timeScale2xBtn" class="p18">2</p><p id="timeScale4xBtn" class="p20">4</p><p id="timeScale8xBtn" class="p22">8</p></div> <div id="slider_page_name"><p class="p16">wrapper_1_1</p></div> <div id="timer_display"> <p class="p16">0</p></div></div></div></div><div id="unminimizeUI"></div>';


/* -----------------------------------------------------
    Check for vars in the URL
-------------------------------------------------------- */
// Updated 11/4/2019 by Gwen
// Merged 2 similar functions together
var getQueryVariable = function (variable) {
    var query = window.location.href;
    var vars = query.split(/&|\#|\?/);   
    
    for (var i = 0; i < vars.length; i++) {

        var pair = vars[i].split("=");
        
        if (pair.length == 2) {     // looks for a pair like culturecode=en-US
            if (pair[0] == variable) {
				return pair[1];
			}
            
        } else if (pair.length == 1) {  // looks for a single var like slider
            if (pair[0] == variable) {
                 return true
             }
        }
    }

    // returns false if variable is not found in variable list.
    return false 
};


if (getQueryVariable("slider")) {
    SliderTurnOn = true;
}

if (getQueryVariable("reviewer")) {
    ReviewerTurnOn = true;
	$("html").addClass("reviewer_mode");
}

if (getQueryVariable("turnOffQuiz")) {
	TurnOffQuiz = true;
	window.TurnOffQuiz = true;
}



/* -----------------------------------------------------
    Activate slider/dev tools
-------------------------------------------------------- */
if (SliderTurnOn === true) {

	if (courseOptions.coursetype === 'module' || courseOptions.coursetype === 'responsive-module') {
		$("body").append(sliderHTML);
	}

	$("body").append(langChangerDropDown);
	
	courseLanguageChecker();
    
    // Hide preloader on click
    $("#preloader").click(function() {
        $("#preloader").css("display", "none");
    });
	
} 

/* -----------------------------------------------------
    Expand language dropdown list
-------------------------------------------------------- */
$("#form_expand_click").click(function() {

    // if open, close it
	if ($("#form_expand_click").hasClass("slider_active_btn")) {
        TweenMax.to("#click_to_change_drop_down", 0.25, {attr:{size:"0"}, onComplete: function() {
            $("#click_to_change").css("align-items", "center"); 
        }}); 
        $("#click_to_change form select option").css("font-size", "16px");
	} else {
        // if closed, open it
        TweenMax.to("#click_to_change_drop_down", 0.25, {attr:{size:"20"}}); 
        $("#click_to_change form select option").css("font-size", "1em");
        $("#click_to_change").css("align-items", "flex-start"); 
	}

	$("#form_expand_click").toggleClass("slider_active_btn");
});


/* -----------------------------------------------------
    Change locale using language dropdown
-------------------------------------------------------- */
$("#click_to_change_drop_down").change(function () {
	
	$("#Updated-CSS-In-Lang, #Updated-CSS-In-Lang2, #Updated-Font-Type, #Updated-Font-In-Lang, #Intel-Clear-Pro").remove();
    
    //Broken for 2018 mobile video dropdown due to removal of vid slice

	var selectedLanguage = this.value;

	// Check if DEV_API_MODE is active and if we have specific dev PaxUIDs. Quiz requires paxUID to load translations
	if (typeof window.DEV_API_CONFIG !== 'undefined') {
        if (window.DEV_API_CONFIG.devPaxUIDsByLang.hasOwnProperty(selectedLanguage)) {
            // DEV_API_MODE is active AND there's a specific dev PaxUID for this language
            courseOptions.paxUID = window.DEV_API_CONFIG.devPaxUIDsByLang[selectedLanguage];
        }
    }	
	
	$( ".startQuiz" ).off("click"); 
	localize(selectedLanguage);
	return false
});


/* -----------------------------------------------------
    Cache buster for language-specific css style
-------------------------------------------------------- */
$("#click_to_refresh_lang_css").click(function() {
	
	var updateThisLangCss = $("#click_to_change_drop_down").find('option:selected').attr('id');
	var refreshCSSFileMain = (Math.random() * 100).toFixed(2);
	$("#Updated-CSS-In-Lang").remove();
	$("#Updated-CSS-In-Lang2").remove();
	$("#Updated-Font-Type, #Updated-Font-In-Lang").remove();
	localize(updateThisLangCss);
	$("#Update-Main-CSS").attr("href", "css/" + courseOptions.coursetype + ".css?v=" + refreshCSSFileMain);

	return false
});

/* -----------------------------------------------------
    Slider setup
-------------------------------------------------------- */
if (SliderTurnOn === true && (courseOptions.coursetype === 'module' || courseOptions.coursetype === 'responsive-module') ) {
	var playBtn = $("#playBtn"),
		pauseBtn = $("#pauseBtn"),
		resumeBtn = $("#resumeBtn"),
		reverseBtn = $("#reverseBtn"),
		timeScaleSlowBtn = $("#timeScaleSlowBtn"),
		timeScaleNormalBtn = $("#timeScaleNormalBtn"),
		timeScale2xBtn = $("#timeScale2xBtn"),
		timeScale4xBtn = $("#timeScale4xBtn"),
		timeScale8xBtn = $("#timeScale8xBtn"),
		playRangeBtn = $("#playRangeBtn"),
		parkTimelineBtn = $("#parkTimelineBtn"),
		totalTimeValue = $("#timer_display p"),
		minimizeUIBtn = $("#minimizeUI"),
		unminimizeUIBtn = $("#unminimizeUI"),
		swapPosBtn = $("#swapPosBtn"),
		gridlinesBtn = $("#gridlinesBtn");
    

    // 11-1-2019 New course progress tracker changed timeline setup code.
    // Old courses need to have dev-only updateSlider function added back
    // via the check below. New courses have the check in timeline.js -Gwen
    var courseDate = courseOptions.activityCode.slice(0,6);    

    if (courseDate < 201911) {
        tl.eventCallback("onUpdate", updateSlider)
    }

    /*	tl = new TimelineMax({
        onUpdate: updateSlider,
        suppressEvents: false
    });*/


	playBtn.click(function () {

		$(this).addClass("slider_active_btn");
		$("#pauseBtn, #reverseBtn").removeClass();
		tl.play();

	});

	pauseBtn.click(function () {

		$(this).addClass("slider_active_btn");
		$("#pauseBtn, #reverseBtn, #playBtn").removeClass();
		tl.pause();

	});

	resumeBtn.click(function () {

		//Resume playback in current direction.
		tl.resume();

	});

	reverseBtn.click(function () {

		$(this).addClass("slider_active_btn");
		$("#pauseBtn, #playBtn").removeClass();
		tl.reverse();

	});


	timeScaleSlowBtn.click(function () {

		//timescale of .5 will make the tween play at half-speed (slower).
		//Tween will take 12 seconds to complete if normal duration is 6 seconds.

		$("#timeScale_wrapper .slider_active_speed_btn").removeClass("slider_active_speed_btn");
		$(this).addClass("slider_active_speed_btn");
		tl.timeScale(0.5);
		masterTimescale = 0.5;

	});


	timeScaleNormalBtn.click(function () {

		//timescale of 1 will make tween play at normal speed.
		$("#timeScale_wrapper .slider_active_speed_btn").removeClass("slider_active_speed_btn");
		$(this).addClass("slider_active_speed_btn");
		tl.timeScale(1);
		masterTimescale = 1;

	});

	timeScale2xBtn.click(function () {

		//timescale of 2 will make the tween play at double-speed (faster).
		//Tween will take 3 seconds to complete if normal duration is 6 seconds.
		$("#timeScale_wrapper .slider_active_speed_btn").removeClass("slider_active_speed_btn");
		$(this).addClass("slider_active_speed_btn");
		tl.timeScale(2);
		masterTimescale = 2;

	});

	timeScale4xBtn.click(function () {

		$("#timeScale_wrapper .slider_active_speed_btn").removeClass("slider_active_speed_btn");
		$(this).addClass("slider_active_speed_btn");
		tl.timeScale(4);
		masterTimescale = 4;
	});
    
    timeScale8xBtn.click(function () {
		$("#timeScale_wrapper .slider_active_speed_btn").removeClass("slider_active_speed_btn");
		$(this).addClass("slider_active_speed_btn");
		tl.timeScale(8);
		masterTimescale = 8;
	});
    
	// stopExtraTimelines button was removed on 1/9/2019 -Gwen	
    
    if (getQueryVariable("goup")) {
        $('#slider_wrapper').addClass('goUp');
    }    
    
    swapPosBtn.click(function () {
		$('#slider_wrapper').toggleClass('goUp');
	});
    
    gridlinesBtn.click(function () {
		$(this).toggleClass("slider_active_btn");
        // check if gridlines are already present
        if ($('#gridlines').length === 0) {
            $('<div/>', {id: 'gridlines'}).appendTo('#main_wrapper');
        } else {
            $('#gridlines').remove();
        }
	});
    
    // these icons are added to different spots depending on course type.
	devDoubleText();
    devToggleFont();
    
        
    // Minimize dev tools UI - Gwen 1/9/2019    
    var minimizeTL = new TimelineMax({paused: true});
        minimizeTL
        .to("#slider_wrapper, #click_to_change", 0.25, {opacity:0, display:"none", scale: 0.5})
        .from("#unminimizeUI", 0.1, {display:"none"})
    
    minimizeUIBtn.click(function () {
        minimizeTL.play();
	});
    
    unminimizeUIBtn.click(function () {
        minimizeTL.reverse();
	});
    
	var seekTime = getQueryVariable("TIMELINELOCATION");

	parkTimelineBtn.click(function () {

		var restore = tl.time();

		var queryParameters = {},
			queryString = location.search.substring(1),
			re = /([^&=]+)=([^&]*)/g,
			m;


		while (m = re.exec(queryString)) {
			queryParameters[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
		}

		queryParameters['TIMELINELOCATION'] = restore;

		var checkTimelineURL = location.search = $.param(queryParameters)

		if (seekTime == restore) {

			location.reload();
		} else {

			location.search = $.param(queryParameters);
		}

	});    

	$("#slider").slider({
		range: false,
		min: 0,
		max: 100,
		step: .1,
		slide: function (event, ui) {
			tl.progress(ui.value / 100).pause();
		}
	});

	function updateSlider() {
		$("#slider").slider("value", tl.progress() * 100);
		totalTimeValue.html(tl.totalTime().toFixed(2) + " Sec");
	}

} else if (SliderTurnOn === true) {
    
    // dev tools for courses other than modules/ff's
        
    $("#doubleTextBtn2").click(function () {
        
		$(this).toggleClass("slider_active_btn");	
        
		$('#main_wrapper p, #main_wrapper li, #main_wrapper h1, #main_wrapper h2, #main_wrapper h3, #main_wrapper h4, #main_wrapper h5, #main_wrapper h6').each(function() {
			var text = $(this).html(); // get text from tag
			text += " "; // add a space			
			text += text; //then concatenate it to itself
			$(this).html(text); // put it back in the p tag
		});
        
        if (typeof(Waypoint) !== 'undefined') {
            Waypoint.refreshAll();
        }
		
	});
    
    devDoubleText();
    devToggleFont();
    
}


// Duplicate Text - Gwen 4/11/2018 -----------------------------------

function devDoubleText() {    
    
    var doubleHtml = '<div id="doubleTextBtn" class="motech_icon" title="Double text"></div>'
    
    if (courseOptions.coursetype === 'module' || courseOptions.coursetype === 'responsive-module') {
        // append to slider
        $("#slider_left").append(doubleHtml);
        
    } else {
        // append to dropdown
        $("#click_to_change_container").append(doubleHtml);
    }
    
    $("#doubleTextBtn").click(function () {

		$(this).toggleClass("slider_active_btn");	
        
		$('#main_wrapper p, #main_wrapper li:not(.nav_menu_item), #main_wrapper h1, #main_wrapper h2, #main_wrapper h3, #main_wrapper h4, #main_wrapper h5, #main_wrapper h6').each(function() {
			var text = $(this).html(); // get text from p/li tag
			text += " "; // add a space			
			text += text; //then concatenate it to itself
			$(this).html(text); // put it back in the p tag
		});
		
	});

    
}


// Disable Intel One - Gwen 5/2021 -----------------------------------

function devToggleFont() {    
    
    var toggleHtml = '<div id="toggleFontBtn" class="motech_icon" title="Toggle fonts"></div>'
    
    if (courseOptions.coursetype === 'module' || courseOptions.coursetype === 'responsive-module') {
        // append to slider
        $("#slider_left").append(toggleHtml);
        
    } else {
        // append to dropdown
        $("#click_to_change_container").append(toggleHtml);
    }
    
    
    $("#toggleFontBtn").click(function () {
		$(this).toggleClass("slider_active_btn");
        forceIntelOne = !forceIntelOne;
        updateLangCSS();
	});
    
    
}



/* -----------------------------------------------------
    Taylor Reviewer Turn On
-------------------------------------------------------- */
if (SliderTurnOn === true && ReviewerTurnOn === true) {
    
    // Gwen 1/25/2019: prevent left/right arrow keys from changing
    // the selected language in the lang dropdown
    $('select#click_to_change_drop_down').on('keydown', function(e){
        if (e.keyCode === 39 || e.keyCode === 37) {
            e.preventDefault();
            return false;
        }
    });
	
	$( timeScale2xBtn ).trigger( "click" );    

	$(document).ajaxStop(function() {

		$(document).bind('keydown',function(e){
			if (e.which==39) {
				e.preventDefault();
				$( playBtn ).trigger( "click" );
			} else if (e.which===37) {
				e.preventDefault();
				$( reverseBtn ).trigger( "click" );			
			}
		});

		
	});

}

/* -----------------------------------------------------
    Taylor Course Language Checker
-------------------------------------------------------- */
function courseLanguageChecker() {
		
	var part1 = (window.parent.apiURL || "https://retailedge.intel.com/api/") + "quiz/challengeText?cultureCode=",
		part2 = "&activityCode=",
		courseCodes = ["en-US", "ar-SA", "cs-CZ", "de-DE", "el-GR", "en-GB", "es-ES", "fr-FR", "hu-HU", "it-IT", "nl-NL", "pl-PL", "ro-RO", "ru-RU", "tr-TR", "uk-UA", "en-AU", "id-ID", "ko-KR", "th-TH", "vi-VN", "zh-TW", "ja-JP", "es-MX", "pt-BR", "zh-CHS"],
		part3 = "&format=json",
		courseAvailable = [],
		courseNotAvailable = [];

	function courseCheck() {
	  
		$.each(courseCodes, function(i) {

			// Gwen added Nov 2021
			var textSrc = courseOptions.activityCodeText != '' ? courseOptions.activityCodeText : courseOptions.activityCode;

			if (courseOptions.coursetype == "snack") {
				textSrc = courseOptions.sourceActivityCode;
			}

			var url = part1 + courseCodes[i] + part2 + textSrc + part3;

			$.ajax({
				url: url,
				type: "GET",
				dataType: "json",
				cache:false,
				success: function(data) {
					if (data.cultureCode === courseCodes[i]) {
						courseAvailable.push(courseCodes[i]);
					} else if (data.cultureCode !== courseCodes[i]) {
						courseNotAvailable.push(courseCodes[i]);
					}
				},
				error: function() {
					//console.log("failure");
				}
			});

		});

	} 
	
	courseCheck();
	
	$(document).ajaxStop(function() {
  		$.each(courseNotAvailable, function(i) {
			optionId = document.getElementById(courseNotAvailable[i]);
			$(optionId).attr("disabled", "disabled");
		});
	});
	
}

