ScormTracker = (function() {
	
    var ScormTracker = function(quiz) {
        
        //Get Course Code
        var courseCode;
        if( typeof activityCode === 'undefined') {
            courseCode = courseOptions.activityCode;
        } else {
            courseCode = activityCode;
        }
        courseYear = courseCode.slice(0,6);
		
		//Scorm Initialize
		pipwerks.SCORM.init();
		
		var scorm_version = pipwerks.SCORM.version;
		var scorm_set = pipwerks.SCORM.set;
		var count = 0;
		
		//Setting Initial Completion Status
		if (scorm_version == 2004) {

				scorm_set("cmi.completion_status", "incomplete");   //Scorm 2004
				scorm_set("cmi.success_status", "failed");         //Scorm 2004

		} else if (scorm_version == 1.2) {

				scorm_set("cmi.core.lesson_status", quiz.options.scormLessonFailed);    //Scorm 1.2

		}	
		
		//If user is NOT allowed to see their answers
		$(quiz).on('scorm_allowReview', function(e) {

			$('#quiz-body').remove();
			quiz.scormEnd();
			
        });
		
		//Creates the retake button if applicable
        $(quiz).on('scorm_review', function(e) {
            
            if (courseYear >= "201810") {
                
                if (quiz.options.scormAllowRetake) {
                    $retakeBut = $('<a/>', { 'class': 'stopQuiz', html: quiz.options.text.retakeCaps, css: { opacity: 0 } });
                } else {
                    $retakeBut = $('<a/>', { css: { opacity: 0, display:"none" } } );
                }
                $(this).data("$retakeBut", $retakeBut);
                
            } else {
                
                if (quiz.options.scormAllowRetake) {
                    $review = $('<a/>', { html: quiz.options.text.review, css: { opacity: 0 }, 'class': 'stopQuiz' });
                } else {
                    $review = $('<a/>', { css: { opacity: 0, display:"none" } } );
                }
                $(this).data("$review", $review);
                
            }
			
        });
		
		//Sets the close button
        $(quiz).on('scorm_return', function(e) {
            
            if (courseYear >= "201810") {
                
                if (quiz.options.scormAllowClose) {
                    $quitBut = $('<a/>', { 'class': 'quitCourse', css: { opacity: 0 }});
                    $quitBut.on('click', function () { quiz.quit();} );
                } else {
                    $quitBut = $('<a/>', { css: { opacity: 0, display:"none" } } );
                }
                $(this).data("$quitBut", $quitBut);
                
            } else {
                
                if (quiz.options.scormAllowClose) {
                    $return = $('<a/>', { html: quiz.options.text['return'], css: { opacity: 0 } } );
				    $return.on('click', function () {quiz.scormEnd();} );
                } else {
                    $return = $('<a/>', { css: { opacity: 0, display:"none" } } );
                }
                $(this).data("$return", $return);
                
            }
            
            //No close button needs to close scorm differently
            /*if (!(quiz.options.scormAllowClose)) {
                quiz.scormEnd();
            }*/
			
        });
		
		//Extra information including question, right or wrong, user answer, correct answer
		$(quiz).on('scorm_results', function(e, element, question, result) {
            
			if (quiz.options.scormSendFeedback) {
				
				var answerText = $(element)[0].innerText;
				var questionText = question.questionText;
				var isCorrect = result.correct;
				var correctAnswer;
				
				scorm_set("cmi.interactions." + count + ".id", "interaction" + count );      //Scorm 1.2 & 2004
				scorm_set("cmi.interactions." + count + ".type", "fill-in" );      //Scorm Scorm 1.2 & 2004
				
				if (scorm_version == 2004) {
						
					scorm_set("cmi.interactions." + count + ".description", questionText );      //Scorm 2004
					
					scorm_set("cmi.interactions." + count + ".learner_response", answerText );      //Scorm 2004

				} else if (scorm_version == 1.2) {

					scorm_set("cmi.interactions." + count + ".student_response", answerText );      //Scorm 1.2

				}
				
				if (isCorrect == true) {
					
					scorm_set("cmi.interactions." + count + ".result", "correct" );      //Scorm Scorm 1.2 & 2004
					
				} else {
					
					if (scorm_version == 2004) {
						
						scorm_set("cmi.interactions." + count + ".result", "incorrect" );      //Scorm Scorm 2004
						
					} else if (scorm_version == 1.2) {
						
						scorm_set("cmi.interactions." + count + ".result", "wrong" );      //Scorm Scorm 1.2 
						
					}
                    
                    var count2 = 0;
                    $.grep(question.answers, function (e) {
                        if (e.isCorrectAnswer) {
                            correctAnswer = e.answerText;
                            var correctResponseNum = '.correct_responses.' + count2 + '.pattern';
                            scorm_set("cmi.interactions." + count + correctResponseNum, correctAnswer );		//Scorm Scorm 1.2 & 2004
                            count2++;
                        }
                    });
					
					/*if (question.answers[0].isCorrectAnswer == true) {correctAnswer = question.answers[0].answerText}
					else if (question.answers[1].isCorrectAnswer == true) {correctAnswer = question.answers[1].answerText}
					else if (question.answers[2].isCorrectAnswer == true) {correctAnswer = question.answers[2].answerText}
					else if (question.answers[3].isCorrectAnswer == true) {correctAnswer = question.answers[3].answerText}

					scorm_set("cmi.interactions." + count + ".correct_responses.0.pattern", correctAnswer );*/		//Scorm Scorm 1.2 & 2004
					
				}
				
				count++;
				
			}

        });	
		
		//Score and Time followed by Scorm Save
		$(quiz).on('scorm_save', function(e, score, time) {
			
			//Setting Score		
			if (scorm_version == 1.2) {

				if (score >= quiz.options.scormReportPercentage) {

					scorm_set("cmi.core.score.raw", score.toString());    	//Scorm 1.2                                                   
					scorm_set("cmi.core.score.min", "0");      				//Scorm 1.2
					scorm_set("cmi.core.score.max", "100");    				//Scorm 1.2

				}

			} else if (scorm_version == 2004) {

				if (score >= quiz.options.scormReportPercentage) {

					scorm_set("cmi.score.raw", score.toString());   				//Scorm 2004                                    
					scorm_set("cmi.score.min", "0");           	   					//Scorm 2004
					scorm_set("cmi.score.max", "100");         	   					//Scorm 2004
					scorm_set("cmi.score.scaled", (score * 0.01).toString());   	//Scorm 2004

				}

			}

			//Setting Time
			var scorm_12 = convertTotalSeconds(time)[0];
			var scorm_2004 = convertTotalSeconds(time)[1];

			function convertTotalSeconds(ts) {
			   var sec = (ts % 60);

			   ts -= sec;
			   var tmp = (ts % 3600);  //# of seconds in the total # of minutes
			   ts -= tmp;              //# of seconds in the total # of hours

			   // convert seconds to conform to CMITimespan type (e.g. SS.00)
			   sec = Math.round(sec*100)/100;

			   var strSec = new String(sec);
			   var strWholeSec = strSec;
			   var strFractionSec = "";

			   if (strSec.indexOf(".") != -1)
			   {
				  strWholeSec =  strSec.substring(0, strSec.indexOf("."));
				  strFractionSec = strSec.substring(strSec.indexOf(".")+1, strSec.length);
			   }

			   if (strWholeSec.length < 2)
			   {
				  strWholeSec = "0" + strWholeSec;
			   }
			   strSec = strWholeSec;

			   if (strFractionSec.length)
			   {
				  strSec = strSec+ "." + strFractionSec;
			   }		   

			   if ((ts % 3600) != 0 )
				  var hour = 0;
			   else var hour = (ts / 3600);
			   if ( (tmp % 60) != 0 )
				  var min = 0;
			   else var min = (tmp / 60);

			   if ((new String(hour)).length < 2)
				  hour = "0"+hour;
			   if ((new String(min)).length < 2)
				  min = "0"+min;

			   var rtnVal = hour+":"+min+":"+strSec;

			   var rtnVal2 =  "PT"+hour+"H"+min+"M"+strSec+"S";

			   return [rtnVal, rtnVal2];

			}

			if (scorm_version == 1.2) {

				scorm_set("cmi.core.session_time", scorm_12 );      //Scorm 1.2	

			} else if (scorm_version == 2004) {

				scorm_set("cmi.session_time", scorm_2004);      	  //Scorm 2004

			}

			//Setting Final Completion Status
			if (score >= this.options.scormPassPercentage) {

				if (scorm_version == 2004) {

					scorm_set("cmi.completion_status", "completed");   //Scorm 2004
					scorm_set("cmi.success_status", "passed");         //Scorm 2004

				} else if (scorm_version == 1.2) {

					scorm_set("cmi.core.lesson_status", quiz.options.scormLessonPassed);    //Scorm 1.2

				}                               

			} 

			else {

				if (scorm_version == 2004) {

					scorm_set("cmi.completion_status", "completed");   //Scorm 2004

				}

			}

			//Saving Everything
			pipwerks.SCORM.save();
			
        });		
		
		//Closing Scorm
		$(quiz).on('scorm_end', function() {
			
			if (quiz.options.scormCloseDelay) {
			
				window.setTimeout(function(){ window.top.close(); }, 2000);
			
			} else {

				if (quiz.options.scormWindowClose) { window.top.close(); } 

			}

			//Quit Scorm
			pipwerks.SCORM.quit();

			//Redirect if applicable
			if (quiz.options.scormRedirectURL) {

				window.location.href = quiz.options.returnUrl;
			} 
			
        });
		
    };

    return ScormTracker;
})();