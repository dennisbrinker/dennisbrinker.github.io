(function(global) {
    var autoResolve = function(object) {
        var deferred = new $.Deferred();
        deferred.resolve(object);
        return deferred.promise();
    };

    var getQueryVariable = function(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            if (decodeURIComponent(pair[0]) == variable) {
                return decodeURIComponent(pair[1]);
            }
        }
    };

    var MotechLocalApi = function() {
        this.bookmark = null;
        this.progress = null;
    };

    MotechLocalApi.prototype.getUser = function() {
        var uid = getQueryVariable("uid");
        var cultureCode = getQueryVariable("cultureCode") || "en-US";

        return autoResolve({
            'uid': uid,
            'cultureCode': cultureCode,
        });
    };

    MotechLocalApi.prototype.getLocaleText = function() {
        return autoResolve({localetext: null});
    };

    MotechLocalApi.prototype.getUniversalText = function() {
        return autoResolve({universaltext: null});
    };

    MotechLocalApi.prototype.setBookmark = function(bookmark) {
        this.bookmark = bookmark;
        return autoResolve({bookmark: bookmark});
    };

    MotechLocalApi.prototype.getBookmark = function() {
        return autoResolve({
            'Bookmark': this.bookmark
        });
    };

    MotechLocalApi.prototype.setProgress = function(progress) {
        this.progress = progress;
        return autoResolve({progress: progress});
    };

    MotechLocalApi.prototype.getProgress = function() {
        return autoResolve({
            'Progress': this.progress
        });
    };

    MotechLocalApi.prototype.getQuiz = function(cultureCode) {
        this.answers = [];
        var self = this;
        var deferred = $.Deferred();
        $.ajax({
                dataType: "json",
                url: "quiz.json",
                contentType: "application/json",
                type: "GET",
                cache: false
            }).done(function(data) {
                self.quiz = data;
                deferred.resolve(data);
            });
        return deferred.promise();
    };

    MotechLocalApi.prototype.submitAnswer = function(questionUid, answerUid, answerTime) {
        this.answers.push({ questionUid: questionUid, answerUid: answerUid, answerTime: answerTime });
        return autoResolve({Success: true});
    };

    MotechLocalApi.prototype.submitQuiz = function() {
        var response = {};
        response.Results = [];
        var numberCorrect = 0;
        for (var answerIndex = 0; answerIndex < this.answers.length; answerIndex++) {
            var answer = this.answers[answerIndex];

            for (var questionIndex = 0; questionIndex < this.quiz.QuestionPool.Questions.Items.length; questionIndex++) {
                var question = this.quiz.QuestionPool.Questions.Items[questionIndex];
                if (question.Uid === answer.questionUid){
                    for (var i = 0; i < question.Answers.Items.length; i++) {
                        var a = question.Answers.Items[i];
                        if (a.Uid === answer.answerUid){
                            response.Results.push({ QuestionUid: answer.questionUid, AnswerUid: answer.answerUid, IsCorrectAnswer: a.IsCorrectAnswer});
                            if (a.IsCorrectAnswer){
                                numberCorrect = numberCorrect + 1;
                            }
                            break;
                        }
                    }
                    break;
                }                
            }            
        }
        
        //Taylor MultiSelect Fix START
		var multiselectQuestion = $.grep(this.quiz.QuestionPool.Questions.Items, function (e) {
			return e.QuestionTypeSlug === "MultiSelection";
		});
		
		$.each(multiselectQuestion, function (i) {
			
			var answersForThisQuestion = $.grep(response.Results, function (e) {
				return e.QuestionUid === multiselectQuestion[i].Uid;
			});
			
			var possbileCorrectAnswers = $.grep(multiselectQuestion[i].Answers.Items, function (e) {
				return e.IsCorrectAnswer === true;
			});
			
			var correctAnswers = $.grep(answersForThisQuestion, function (e) {
				return e.IsCorrectAnswer === true;
			});
			
			var incorrectAnswers = $.grep(answersForThisQuestion, function (e) {
				return e.IsCorrectAnswer === false;
			});
						
			function findIndex() {
			  return multiselectQuestion[i].Uid;
			}			
			var index = response.Results.findIndex(findIndex);
			index = index+1;

			//Removes all answers for this question
			var a = $.grep(response.Results, function (e) {
				return e.QuestionUid !== multiselectQuestion[i].Uid;
			});
			response.Results = a;
			
			//Adds only one answer back for disply results
			if (incorrectAnswers.length === 0 && correctAnswers.length === possbileCorrectAnswers.length) {
				response.Results.splice(index, 0, {QuestionUid: multiselectQuestion[i].Uid, IsCorrectAnswer: true});
			} else {
				response.Results.splice(index, 0, {QuestionUid: multiselectQuestion[i].Uid, IsCorrectAnswer: false});
			}			
			
		});
		//Taylor MultiSelect Fix END

        response.Value = numberCorrect / this.quiz.QuestionPool.Questions.Items.length*100;
        response.Pass = response.Value >= 80; // this value is also hard coded into quiz-1.js, so make sure to update it there if this ever changes. look for defaultOptions.text.quizFail and passScore

        return autoResolve(response);
    }

    MotechLocalApi.prototype.exit = function() {
        this.answers = [];
        console.log("exiting!");
        return autoResolve({});
    };

    MotechLocalApi.prototype.resetQuiz = function() {
        this.answers = [];
        console.log("reseting!");
        return autoResolve({});
    };
    
    MotechLocalApi.prototype.getDeviceInfo = function() {
        var height = $(window.parent).height();
        var width = $(window.parent).width();
        return autoResolve({
            'Width': width,
            'Height': height,
            'DeviceOrientation': height > width ? "portrait" : "landscape"
        });
    };

    function findMotechApi() {
        var api = null;
        
		if(typeof(MotechScormApi) !== "undefined") {
			api = new MotechScormApi();
			//console.log("You're using Motech Scorm");
		} else  {
			api = new MotechLocalApi();
			//console.log("You're using Motech Local");
		}
		
		return api;
    }

    var api = findMotechApi();

    var MotechAdapter = function(api) {
        this.api = api;
    };

    MotechAdapter.prototype.getUser = function() {
        return this.api.getUser();
    };

    MotechAdapter.prototype.getLocaleText = function(cultureCode, moduleName) {
        return this.api.getLocaleText(cultureCode, moduleName);
    };

    MotechAdapter.prototype.getUniversalText = function(cultureCode) {
        return this.api.getUniversalText(cultureCode);
    };

    MotechAdapter.prototype.getQuiz = function(cultureCode) {
        return this.api.getQuiz(cultureCode);
    };

    MotechAdapter.prototype.submitQuiz = function() {
        return this.api.submitQuiz();
    };

    MotechAdapter.prototype.submitAnswer = function(questionUid, answerUid, answerTime) {
        return this.api.submitAnswer(questionUid, answerUid, answerTime);
    };

    MotechAdapter.prototype.setBookmark = function(bookmark) {
        return this.api.setBookmark(bookmark);
    };

    MotechAdapter.prototype.getBookmark = function() {
        return this.api.getBookmark();
    };
	
	//brad added this 1027
    MotechAdapter.prototype.setProgress = function(progress) {
        return this.api.setProgress(progress);
    };
	
	MotechAdapter.prototype.getProgress = function() {
        return this.api.getProgress();
    };
	
	//Taylor Scorm 3/12/18
	MotechAdapter.prototype.reviewButton = function(reviewText) {
		  return this.api.reviewButton(reviewText);
    };
	
	//Taylor Scorm 3/12/18
	MotechAdapter.prototype.returnButton = function(returnText) {
		  return this.api.returnButton(returnText);
    };
	
	//Taylor Scorm 3/12/18
	MotechAdapter.prototype.scormSettings = function() {
		  return this.api.scormSettings();
    };

    MotechAdapter.prototype.exit = function() {
        return this.api.exit();
    };

    MotechAdapter.prototype.resetQuiz = function() {
        return this.api.resetQuiz();
    };
    
    MotechAdapter.prototype.getDeviceInfo = function() {
        return this.api.getDeviceInfo();
    };

    global.motech = new MotechAdapter(api);
}(this));
