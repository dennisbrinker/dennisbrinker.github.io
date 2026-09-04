/* -----------------------------------------------------

                    QUIZ SETUP

-------------------------------------------------------- */
/* Used for 2021-01 internal content courses and newer */

var Course = Course || {};

Course.Quiz = (function (global, undefined) {

    var defaultOptions = {
        bodyStyleAttr: '',
        questions: [],
        answers: [],
        currentQuestion: 0,
        QuestionDisplayLimit: 5,
        PassingPercentage: 80,
        Randomized: false,
        submitAnswers: true,
        returnUrl: 'learning',
        allowReview: true,
        isCertification: false,
        onRetake: null,
        useSCORM: false,
        isMobile: false,
        showFeedback: false,
        resultMessage: true,
        allowRetake: true,
        text: {
            'correct': 'CORRECT',
            'incorrect': 'INCORRECT',
            'review': 'RETAKE',
            'return': 'CLOSE',
            'continue': 'SUBMIT',
            'multiselect': '',
            'comment': '',
            'quizPerfect': 'Great job! You passed the quiz with a perfect score.',
            'quizPass1': 'Nice job!',
            'quizPass2': 'You scored @@playerScore@@% and passed the quiz.',
            'quizFail1': 'Try again!',
            'quizFail2': 'You scored @@playerScore@@%. You must score @@passScore@@% or higher to pass.',
            'quizScore': 'Your Score: @@playerScore@@%'
        },
        quizSelector: '#quizContent',
        startTime: 0,
        answerTime: 0,
        startTimeOffset: 0,
        timeDivisor: 1, // Override this to 1 if you want it in milliseconds.
        quizBodyClass: ""
    };


    var Quiz = function (quizData) {
        this.options = $.extend(defaultOptions, quizData);
        this.setupQuizButton(quizData);
    }


    Quiz.QUESTIONTYPE = {
        'radio': 'SingleSelection',
        'checkbox': 'MultiSelection' // NOT tested!
    };

    Quiz.getTimestamp = function () {
        if (window.performance && window.performance.now) {
            return window.performance.now();
        } else {
            if (window.performance && window.performance.webkitNow) {
                return window.performance.webkitNow();
            } else {
                return new Date().getTime();
            }
        }
    };

    // look for @@ phrase in translation and replace with desired text
    Quiz.prototype.replaceTextWithVariables = function(localizedText, replacements) {
        if (replacements != null) {
            for (var name in replacements) {
                if (replacements.hasOwnProperty(name)) {
                        var regex = new RegExp("@@" + name + "@@", "g");
                        localizedText = localizedText.replace(regex, replacements[name]);
                }
            }
        }
        return localizedText;
    }

    //Taylor 9/21/20
    Quiz.prototype.setupQuizButton = function(quizData) {
        var self = this;

        $(".startQuiz").off('click.quiz').on('click.quiz', function () {
            $.each($('video'), function () {
                this.pause();
            });
            self.startQuiz(quizData);
        });

        //Taylor 9/28/2020
        if (courseOptions.coursetype == "exam") {
            $( ".startQuiz" ).trigger( "click" );
        }
    }

    Quiz.prototype.startQuiz = function (quizData) {
        var self = this;

        this.options.startTime = Quiz.getTimestamp();
        this.options.answerTime = this.getQuizTime();

        this.options.questions = quizData.QuestionPool.Questions;

        if (this.options.Randomized) {
            this.shuffle(this.options.questions.Items);
            $.each(this.options.questions.Items, function (i, question) {
                self.shuffle(question.Answers.Items);
            })
        }

        //Taylor scorm 3/12/18
        this.options.useSCORM = quizData.useSCORM;

        this.displayQuiz().done(function () {
            self.displayQuestion(0).done(function () {

            }).fail(function () {

            });
        });
    };

    Quiz.prototype.resetQuiz = function () {
        this.options.answers = [];
        this.options.currentQuestion = 0;
    };

    Quiz.prototype.displayQuiz = function () {
        var deferred = $.Deferred();

        this.resetQuiz();

        if ($('#quiz-body').length === 0) {
            this.$body = $('<div/>', { id: 'quiz-body', 'class': this.options.quizBodyClass  });
            this.$wrapper = $('<div/>', { id: 'quiz-main-wrapper'});

            this.$questionWrapper = $('<div/>', { id: 'quiz-question-wrapper'});
            this.$questionWrapper.appendTo(this.$wrapper);

            this.$progress = $('<div/>', { id: 'quiz-progress-wrapper'});
            this.$progress.appendTo(this.$wrapper);

            for (i=0;i<this.options.questions.Items.length;i++) {
                var $dot = $('<div/>', { 'class': 'dot', css: { opacity: 0 } });
                $dot.appendTo(this.$progress);
            }

            this.$body.appendTo($('body'));
            this.$wrapper.appendTo(this.$body);
        }

        var timeline = gsap.timeline({
            onComplete: function () {
                deferred.resolve();
            }
        });

        //Taylor 12/2016
        // TODO
        if (this.options.isMobile) {
            timeline.to("#main_wrapper, #module_wrapper, #nav_wrapper", {duration: 0.5, opacity: 0,display: "none"});
        } else {
            timeline.to("#main_wrapper, #module_wrapper, #nav_wrapper", {duration: 0.25, opacity: 0, display: "none"});
        }

        $(this.options.quizSelector).hide();
        this.options.bodyStyleAttr = $('body').attr('style');
        $('body').attr('style', '');

        return deferred;
    };

    Quiz.prototype.removeQuestion = function () {
        var self = this;

        var deferred = $.Deferred();

        if ($('.quiz-question-text').length !== 0) {
            var timeline = gsap.timeline({
                onComplete: function () {
                    $('#quiz-question-wrapper').empty();
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                    $('#quiz-main-wrapper').scrollTop(0);
                    deferred.resolve();
                }
            });
            timeline.to('#quiz-progress-wrapper, #quiz-question-wrapper *', {duration: 0.1, opacity: 0 });
        } else {
            deferred.resolve();
        }

        return deferred;
    };

    Quiz.prototype.displayQuestion = function (questionNumber) {
        var self = this;

        var deferred = $.Deferred();

        this.removeQuestion().done(function () {

            self.options.currentQuestion = questionNumber;

            question = self.options.questions.Items[questionNumber];

            var timeline = gsap.timeline({paused: true});

            // create question text
            var $questionText = $('<p/>', { 'class': 'quiz-question-text', css: { opacity: 0 }, data: { questionid: question.Uid }, html: question.LocaleText.Text });

            // create answer wrapper
            var $answerWrapper = $('<div/>', { class: 'quiz-answer-wrapper'});

            // add everything to DOM
            $questionText.appendTo(self.$questionWrapper);
            $answerWrapper.appendTo(self.$questionWrapper);

            timeline.to($questionText, {duration: 0.25, opacity: 1 });

            $.each(question.Answers.Items, function (i, answer) {

                switch (question.QuestionTypeSlug) {
                    case Quiz.QUESTIONTYPE.radio:
                    case Quiz.QUESTIONTYPE.checkbox:
                        var $answer = $('<div/>', { 'class': 'answer', css: { opacity: 0 }, data: { answerid: answer.Uid }, html: answer.LocaleText.Text });

                        break;
                }

                $answer.appendTo($answerWrapper);
                timeline.set($answer, { rotationX: 90}, "-=0.1");
                timeline.to($answer, {duration: 0.25,  opacity: 1, rotationX: 0}, "-=0.1");

                switch (question.QuestionTypeSlug) {
                    case Quiz.QUESTIONTYPE.radio:
                        $answer.on('click', function (e) {
                            //Do not remove this line, it prevents the RSP from double clicking an answer.  Found out the hard way -- Joe
                            //$answer.off('click');
                            $.each($answerWrapper[0].children, function () {
                                $(this).off('click');
                            });
                            self.selectAnswer(this, e, deferred);
                        });
                        break;
                    case Quiz.QUESTIONTYPE.checkbox:
                        $answer.on('click', function (e) {
                            self.selectAnswer(this, e, deferred);
                        });
                        break;
                }

            });

            // update the current dot
            $("#quiz-progress-wrapper .dot").removeClass("current");
            var dotEl = $("#quiz-progress-wrapper").children().eq(questionNumber);
            $(dotEl).addClass("current");

            if (questionNumber == 0) {
                timeline.to('#quiz-progress-wrapper', {duration: 0.01,  opacity: 1 });
                timeline.to('#quiz-progress-wrapper .dot', {duration: 0.15,  opacity: 1, stagger: 0.1 });
            } else {
                timeline.to('#quiz-progress-wrapper', {duration: 0.5,  opacity: 1 }, "-=0.5");
            }

            timeline.play();

        });

        return deferred;
    };


    Quiz.prototype.selectAnswer = function (element, e, deferred) {
        var self = this;

        var questionid = $('.quiz-question-text').data('questionid');
        var answerid = $(element).data('answerid');
        var questionDiv = $(element).closest('#quiz-question-wrapper');
        var question = this.options.questions.Items[this.options.currentQuestion];

        //console.log(questionid, answerid, questionDiv, question);

        var timeline = new gsap.timeline();

        var result = this.isAnswerCorrect(questionid, answerid);

        var nextQuestion = this.options.currentQuestion + 1;

        var currentTime = this.getQuizTime();
        var answerTime = currentTime - this.options.answerTime;
        this.options.answerTime = currentTime;

        if (question.QuestionTypeSlug === Quiz.QUESTIONTYPE.checkbox) {

            if ($(element).attr('class') == "answer") {
                $(element).removeClass("answer");
                $(element).addClass("answerSelected");

                //if this item is selected add it to the answer array
                this.options.answers.push(result);
            }
            else if ($(element).attr('class') == "answerSelected") {
                $(element).removeClass("answerSelected");
                $(element).addClass("answer");

                //if this item is unselected remove it from the answer array
                var a = $.grep(this.options.answers, function (e) {
                    //returns a new array (a) that omits any answers that match the current result.answerid
                    return e.answerid !== result.answerid;
                });
                //replace the previous array with the new array
                this.options.answers = a;
            }

            var answersForThisQuestion = $.grep(this.options.answers, function (e) {
                //returns a new array (answersForThisQuestion) that contians only the answers for this question
                return e.questionId === result.questionId;
            });

            this.addNextButton(questionDiv, nextQuestion, questionid, question, answerTime);
            if (answersForThisQuestion.length > 0) {
                $("#nextQuestion").show();
                timeline.to("#nextQuestion", {duration: 0.25,  opacity: 1 });
            }
            else {
                timeline.to("#nextQuestion", {duration: 0.25,  opacity: 0 });
                $("#nextQuestion").hide();
            }
        }
        else {
            this.options.answers.push(result);

            $('#quiz-body .answer').css('pointer-events', 'none');

            motech.submitAnswer(questionid, answerid, answerTime).fail(function(err){
                console.log(err);
                showCourseError(true);
            }).done(function() {
                self.nextAnswer(nextQuestion, result);
            });

        }

    };

    // this is untested
    Quiz.prototype.addNextButton = function (questionDiv, nextQuestion, questionId, question, answerTime, callback) {
        var self = this;
        var $results = $('<div/>', { 'class': 'results', style: 'width: auto;' });
        var $qd = $(questionDiv);
        var $answer = $('<a/>', { id: "nextQuestion", html: this.options.text['continue'], 'class': 'continue' });

        var $actions = $('<div/>', { 'class': 'actions' });
        $answer.appendTo($actions);
        $actions.appendTo($results);

        if ($('div.question').children('div.results').length < 1) {
            $results.appendTo($qd);
        }

        $answer.on('click', function (e) {
            if (callback != null) {
                callback();
            }

            $answer.off('click');

            $.each(questionDiv[0].children, function () {
                $(this).off('click');
            });

            gsap.to("#quiz-body .question", {duration: 0.1, opacity:0.5});
            $('#quiz-body .answer, #quiz-body .answerSelected, #quiz-body #nextQuestion').css('pointer-events', 'none');

            //Taylor 10/9/2017
            var answersForThisQuestion = $.grep(self.options.answers, function (e) {
                //returns a new array (answersForThisQuestion) that contains only the answers for this question
                return e.questionId === questionId;
            });

            $.each(answersForThisQuestion, function (i) {
                motech.submitAnswer(answersForThisQuestion[i].questionId, answersForThisQuestion[i].answerid, answerTime).fail(function(){
                    showCourseError(true);
                }).done(function(){
                    // only show next answer on final answer submit
                    if (i==(answersForThisQuestion.length-1)) {
                        self.nextAnswer(nextQuestion);
                    }
                });

            });

        });

    };

    Quiz.prototype.handleResults = function (result) {
        var self = this;

        this.displayResults(result);
    };

    Quiz.prototype.displayResults = function (result) {

        var self = this;
        
        $('#quiz-main-wrapper').empty();
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        $('#quiz-main-wrapper').scrollTop(0);
        
        var timeline = new gsap.timeline();

        //Taylor 12/2016
        if (!this.options.allowReview) {
            if (!this.options.useSCORM) {
                parent.window.location.href = this.options.returnUrl;
                return;
            } else {
                //Taylor scorm 3/12/18
                $('#quiz-body').remove();
                motech.exit();
            }
        }

        var $results = $('<div/>', { 'class': 'results' });

        if (this.options.resultMessage === true) {

            var $resultsMessage = $('<div/>', { 'class': 'quiz-top-text',  css: { opacity: 0 }});

            var $message1, $message2;

            if (result.Pass) {

                var text2 = this.replaceTextWithVariables(this.options.text.quizPass2,  { playerScore: result.Value, passScore: this.options.PassingPercentage });

                $message1 = $('<p/>', { html: this.options.text.quizPass1, class: "quiz-message-1" });
                $message2 = $('<p/>', { html: text2, class: "quiz-message-2" });

            } else {

                var text2 = this.replaceTextWithVariables(this.options.text.quizFail2,  { playerScore: result.Value, passScore: this.options.PassingPercentage });

                $message1 = $('<p/>', { html: this.options.text.quizFail1, class: "quiz-message-1" });
                $message2 = $('<p/>', { html: text2, class: "quiz-message-2" });
            }

            $resultsMessage.append($message1, $message2);
            $resultsMessage.appendTo($results);
            timeline.to($resultsMessage, {duration: 0.25,  opacity: 1 });
        }

        $.each(this.options.questions.Items, function (i, question) {

            var thisResult = $.grep(result.Results, function (e, i) {
                return e.QuestionUid === question.Uid;
            });

            if (thisResult.length === 1) {

                var $questionResultWrapper = $('<div/>', { class: "question-result-wrapper", css: {opacity: 0} });
                $questionResultWrapper.appendTo($results);

                if (thisResult[0].IsCorrectAnswer === true) {
                    // correct answer
                    var $result = $('<div/>', { 'class': "question-result correct" });
                    var $text = $('<p/>', {html: question.LocaleText.Text});

                    /*var $img = '<div><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAcCAYAAACdz7SqAAAA0UlEQVRIiWMYBaNgFFAF/P//n1TM8f//f6////8zgvSRBUi0EGQZMmCktaUS/zGBFq0tnYZm5RJaB+8ELL60pqWlDVgsTIXJU2Jp7P///49BaWQLE7BY2IishlxLRdEM7YcaaIrFwonoIYEPsJDgjgKQWxgYGATQxKczMDDkk+c1NAB1cScWX6EDOWxxTomlINyLx8JAXAmNUktBuA+LhcX4Ujc1LGWAJhYY6CKUpfABnGUkDo16DAwMPxkYGG4ScjQjI3nF7ygYBaMAFTAwMAAAeKWBbjiBhKoAAAAASUVORK5CYII=" alt="" /></div>'*/
					var $img = '<div><img src="images/default/quiz_check.png" alt="" /></div>'

                } else {
                    // incorrect answer
                    var $result = $('<div/>', { 'class': "question-result incorrect" });
                    var $text = $('<p/>', {html: question.LocaleText.Text});
                    /*var $img = '<div><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAcCAYAAACdz7SqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAzIDc5LjE2NDUyNywgMjAyMC8xMC8xNS0xNzo0ODozMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyN2QzYjZmNC1jNTBmLWQ3NDMtODc3MC0xODEwZmRmM2E0NmQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjA5MDVFQkUzRjE0MTFFQjk5REI4QzZGMUZDRTE1NDMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjA5MDVFQkQzRjE0MTFFQjk5REI4QzZGMUZDRTE1NDMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NWU3ZjFmZGEtYTkxYS04MjRlLWJmNGQtOThmNGZkNzZmMDllIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MDZiN2Q2YzAtZDQ1NC0zMjRkLWIxYzEtMzUzZWY2NTQ0ZTBhIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+XsaGjgAAAmNJREFUeNrElz9oU1EYxW+aCFIqNUpqtyxtwUExSMBBkKYhg0XQLRT/ISoFBx10UrCLENDBpXRooZOSTZc2S0UdlEIoUZdALEIQIiRqXhaNoNHzPW7C6+1377uWF3rgBy/vHd7J/f+9UC6XExaKgTNgGhwFh8A+0ASfwXvwAjwHLb+XRXyeHwP3ZWCYeR6V0B+5AH6AZfAAfNG9dEBzfw94CIrgrCaQ0yC4Acrg6v+EHgCvwG2LntBpGCxKwn7dS+aXsruCELV2L7gI/nItDYGnAQZ2dR7c1XXvLDgt+qM5cFwN3S9nXL9E4/pYDZ2VU3/7mopERDKZFJlMRsRise0LGPfoGXnIa9BJcMo7ka7onIlEQqRSqd51Pp8X1WrV/R2Px0U2m93iLxaLpuDL4DW1dAKM61zR6NYOoBAK4wJVLyPa0ULU0hMmV6lUcluoBuu8FtvpGLV0zORqNBpul/qJPOS1kBt60M9FY2gK9o6zhaIDYhdEod/8TNyk4SaXpZoUumkceaxDU6A3mFvHjDYpdN3kUGdudwy5Mea8ir52Qyvgo7Yvmk120nCTS/UyWqHTJpxOp+nHEJjiXPV6XbTbbeE4jigUCqJWq/WetVotUalU3Otyueyu006nYwq9RYshJGsk2vA/6fbfgPRG7r+9Dd8B9/oY+Afc5M7TBbDax/N0gwulcmIGfAg48Il6Vqs7EtWsk+BtQIFL4JK3PtJVg98BHaCPwO8dhtGfvw6uyfG0qnt/gTsgKav2jmXYTzAPDsvyc0cV/jtwDox4PiuOgFG5th35WUHzYA08s/ms+CfAAPTSqcf2anG4AAAAAElFTkSuQmCC" alt="" /></div>'*/
					var $img = '<div><img src="images/default/quiz_close.png" alt="" /></div>'
                }

                $result.append($text, $img);
                $questionResultWrapper.append($result);

                var $questionCorrectAnswer = $('<div/>', { class: "question-correct-answer" });

                function getCorrectText() {
                    var text;
                    $.each(question.Answers.Items, function (i, item) {
                        if (item.IsCorrectAnswer) {
                            text = item.LocaleText.Text;
                        }
                    });
                    return text;
                }

                var $answertext = $('<p/>', {html: getCorrectText()});

                $answertext.appendTo($questionCorrectAnswer);
                $questionCorrectAnswer.appendTo($questionResultWrapper);

                timeline.set($questionResultWrapper, {y: 10});
                timeline.to($questionResultWrapper, {duration: 0.25, opacity: 1, y: 0, ease: "sine"});

            }
        });

        var $actions = $('<div/>', { class: "actions", css: {opacity: 0} });                         

        //Taylor 12/2016
        var $review;

        if (!this.options.useSCORM) {
            $review = $('<a/>', { html: this.options.text.review , 'class': 'stopQuiz' });

            //brad was here 012517
            if (this.options.isMobile) {
                $review.on('click', function () { gsap.to("#main_wrapper, #module_wrapper, #nav_wrapper", {opacity: 1, display: "block"}); } );
            }

        } else {
            //Taylor scorm 3/12/18
            motech.reviewButton(this.options.text.review).done(function(data) {
                $review = data;
            });
        }

        if (this.options.allowRetake) {
            //Taylor hide retake button 9/18/20
            $review.appendTo($actions);
        }

        var $return;

        //Taylor 12/2016
        if (!this.options.useSCORM) {
            $return = $('<a/>', { html: this.options.text['return']});
            $return.one('click', function () { motech.exit();} );
        } else {
            //Taylor scorm 3/12/18
            motech.returnButton( this.options.text['return'] ).done(function(data) {
                $return = data;
            });
        }

        // append all to DOM
        $return.appendTo($actions);
        $actions.appendTo($results);
        $results.appendTo(this.$wrapper);
        
        timeline.to($actions, { duration: 0.25, opacity: 1 });

        $('.stopQuiz').on('click', function () {

            gsap.to("#main_wrapper, #module_wrapper, #nav_wrapper", {duration: 0.25, opacity: 1, display: "block"});

            if (self.options.onRetake !== null) {
                self.options.onRetake();
            } else if (self.options.isCertification) {
                window.location.reload(true);
            } else {
                motech.getQuiz().done(function(data){
                    self.setupQuizButton(data);
                });

                motech.resetQuiz().done(function(){
                    $('#quiz-body').remove();

                    $(self.options.quizSelector).show();
                    $('body').attr('style', self.options.bodyStyleAttr);
                });
            }
        });

    };

    // 12/16/2020 -- this function is untested!
    Quiz.prototype.displayFeedback = function(feedback, nextQuestion) {
        var self = this;

        var $feedback = $('<div/>', { 'class': 'feedback' });
        var $close = $('<div/>', { 'class': 'close', html: 'X' });
        var $p = $('<p/>', { html: feedback });

        $close.on('click', function () {
            if (nextQuestion < this.options.QuestionDisplayLimit) {
                self.displayQuestion(nextQuestion);
            } else {
                $('.question, .dots').remove();
                self.submitAnswers().then(function (data) { self.handleResults(data); });
            }
        });

        $feedback.append($close).append($p).appendTo('#quiz-body .question').fadeIn();
    };

    Quiz.prototype.nextAnswer = function (nextQuestion, result) {

        var self = this;

        var question = $.grep(this.options.questions.Items, function (e, i) {
            return result != null && e.slug === result.questionId;
        })[0];

        if (this.options.showFeedback === true && result != null && result.correct && question.positiveFeedback.length > 0) {
            this.displayFeedback(question.positiveFeedback, nextQuestion);
        } else if (this.options.showFeedback === true && result != null && !result.correct && question.negativeFeedback.length > 0) {
            this.displayFeedback(question.negativeFeedback, nextQuestion);
        } else if (nextQuestion < this.options.QuestionDisplayLimit) {
            this.displayQuestion(nextQuestion);
        } else {
            gsap.to("#quiz-progress-wrapper", {duration: 0.1, opacity: 0, display: "none"})
            // end of questions
            this.removeQuestion().then(function () {
                self.submitAnswers().then(function (data) {
                    self.handleResults(data);
                });
            });
        }
    };

    Quiz.prototype.submitAnswers = function () {

        if (this.options.submitAnswers) {
            var deferred = $.Deferred();
            motech.submitQuiz().done(function(data) {
                deferred.resolve(data);
            });

            return deferred.promise();
        }

    };


    Quiz.prototype.isAnswerCorrect = function (questionid, answerid) {

        var question = $.grep(this.options.questions.Items, function (e, i) {
            return e.Uid === questionid;
        });

        if (question.length === 1) {
            var answer = $.grep(question[0].Answers.Items, function (e, i) {
                return e.Uid === answerid;
            });

            if (answer.length === 1 && answer[0].IsCorrectAnswer !== undefined && answer[0].IsCorrectAnswer === true) {
                return {
                    questionId: questionid,
                    answerid: answerid,
                    correct: true
                };
            } else {
                return {
                    questionId: questionid,
                    answerid: answerid,
                    correct: false
                };
            }
        }

    };

    Quiz.prototype.getCorrectPercent = function () {
        return $.grep(this.options.answers, function (e, i) { return e.correct === true }).length * 100 / this.options.answers.length;
    };

    Quiz.prototype.getQuizTime = function () {
        return Math.round(((Quiz.getTimestamp() - this.options.startTime) + this.options.startTimeOffset) / this.options.timeDivisor, 0);
    }

    Quiz.prototype.shuffle = function (array, rand) {
        var i = array.length, j, swap;
        if (!rand) rand = Math;
        while (--i) {
            j = rand.random() * (i + 1) | 0;
            swap = array[i];
            array[i] = array[j];
            array[j] = swap;
        }
        return array;
    };

    return Quiz;
}(this));
