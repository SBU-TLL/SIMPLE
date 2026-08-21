/*
	Date:		Spring 2018
	Authors:	James Palmeri
				Anthony John Ripa
	Code:		SIMPLE (Simple Image Program for Learning & Education)
*/
class Simple {
	constructor() {
		this.layerInfo= {};
		this.currentGame= "IndexGame";
		this.health= 3;
		this.layerIndex= 0;
		this.layersLeft= [];
		this.choiceLayer= {};
		this.score= 0;
		this.queryKeys= {};
	}
    init() {
		//console.log(this)
        $.getJSON("resourcesDynamic/simple.json", data => this.loadSimple(data) );
        $("#healthDisplayBox").css({visibility: "hidden"})
        //$("#heart1, #heart2, #heart3").css({visibility: "hidden"})			//	Tony Removed
        $(".heart").css({visibility: "hidden"})									//	Tony
        $("#guessBox").css({visibility: "hidden"})
    }
    gameInit() {
		//this.health = 3;														//	Tony Removed
        this.layersLeft = this.layerInfo.layers.slice(1)
        this.answers = Array(this.layersLeft.length).fill('u');					//	Tony
        this.refreshLayerNames();
		//this.makeHoverEvents(this.layerInfo.layers.length);					//	Tony Removed
		this.populateImageMap();												//	Tony
		//viewdom.render('#healthDisplayBox', v.imgrepeat(simplevm.heart(this)));	//	Tony
		//viewdom.render('#healthDisplayBox',v.progress({value:'100',max:'100'}));
		//$("#heart1, #heart2, #heart3").removeClass("heartDie")
        $("#displayCorrect img").css({display: "none"});
        $("#layerName li").css({display: "none"})
		$("#healthDisplayBox").css({visibility: "visible"})						//	Tony Removed
		//$("#heart1, #heart2, #heart3").css({visibility: "visible"})			//	Tony Removed
        $("#picture").css({display: "block"})
    }
    getUrlVars() {
        var vars = [];
        var hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }
    refreshLayerNames() {
		viewdom.render('#layerName',v.lis(simplevm.objlis(this)));				//	Tony
    }
    populateLayerDivs(layers = this.layerInfo.layers) {							//	Tony
		viewdom.render('#headerName',v.li(simplevm.objli(layers[0])));			//	Tony
		viewdom.render('#background',v.img(simplevm.layerimg(layers[0])));		//	Tony
		viewdom.render('#displayCorrect',v.imgs(simplevm.layerimgs(layers)));	//	Tony
		viewdom.render('#layerName',v.lis(simplevm.objlis(this)));				//	Tony
    }
    populateImageMap() {
		viewdom.render('#nav', v.divs(simplevm.imaps(this)));					//	Tony
    }
    loadSimple(data) {
		//console.log(this)
        this.layerInfo = data;						//	Tony Moved
        //this.populateImageMap(data);				//	Tony
        this.populateImageMap();					//	Tony
        //this.populateLayerDivs(data);				//	Tony
        this.populateLayerDivs();					//	Tony
        //this.makeHoverEvents(data.layers.length)	//	Tony Removed
        this.gameSelectorButtons();
        this.queryKeys = this.getUrlVars();
        var local = localStorage.getItem(this.queryKeys["local"])
        $("#background img,#picture, #nav, #dragHome,#displayCorrect img").css({
            "width": data.width + "%",
            "height": data.height + "%"
        })
        //this.layerInfo = data;				//	Tony Moved
		$('#buttonBox').css("display","none");	//	Tony Moved
        var game = this.queryKeys["game"]
        if (game) {
			//$('#buttonBox').css("display","none");	//	Tony Moved
            game = game.toLowerCase()
        } else {
            game = ""
        }
        if (game == "typing") {
            TypingGame.getInstance().init();
        //} else if (game == "selector") {			//	Tony Removed
        //    SelectorGame.getInstance().init();	//	Tony Removed
        } else if (game == "index") {				//	Tony
            IndexGame.getInstance().init();		//	Tony
        } else if (game == "drag") {
            DragGame.getInstance().init();
        } else {
            //IndexGame.getInstance().init();		//	Tony Removed
            SelectorGame.getInstance().init();		//	Tony
        }
    }
    gameSelectorButtons() {
		viewdom.render('#buttonBox',v.lis(simplevm.games()));						//	Tony
    }
    setMessage(message, isTemp) {
        if (isTemp) {
            $("#tempMessage").remove();
            var tempDiv = $('<div>' + message + '</div>');
            tempDiv.attr("id", "tempMessage")
            $("#message").append(tempDiv);
            $("#permMessage").css("visibility", "hidden");
            //this.clickBlocker().create();											//	Tony
            this.clickBlockercreate();
            $("#tempMessage").stop().fadeTo(500, 0, () => {
                //this.clickBlocker().destroy();									//	Tony
                this.clickBlockerdestroy();
                $("#permMessage").css("visibility", "visible");
            })
        } else {
            $("#permMessage").stop().fadeTo(5, 0, function () {
                $("#permMessage").html(message);
                $("#permMessage").stop().fadeTo(5, 1, function () {
                    // Animation complete.
                });
            });
        }
    }
saveScore(){
    this.score = this.getGrade() * 100;
     $.ajax({
                        url: "resourcesLinked/getData.php",
                        data: { SimpleName: this.layerInfo.layers[0].lname, currentGame: this.currentGame, score: this.score }
                });
}
    wonGame() {
        //Simple.score = 33 * Simple.health + 1;
        this.score = this.getGrade() * 100;
	    this.saveScore()     
   if (this.score == 100) {
            this.overlayCreate("You Won! Perfect!");
        } else {
            this.overlayCreate("You Won! <br>" + "Your Score: " + this.score);
        }
        var local = JSON.parse(localStorage.getItem(this.queryKeys["local"]) || "{}");
        local[this.queryKeys["key"]] = this.score
        localStorage.setItem(this.queryKeys["local"], JSON.stringify(local))
        this.destroy();
        IndexGame.getInstance().init();
		viewdom.render('#healthDisplayBox',v.div());
    }
	gameOver() {	//	Tony
	      this.score = this.getGrade() * 100;
		this.saveScore()
		this.currentGame = '';
		this.setMessage("Game Over : " + Math.round(this.getGrade() * 100) + '%');
	}
    damage(heartIndex) {														//	Tony
        //$(".heart").eq(this.layersLeft.length - 1).addClass("heartDie")
		this.answers[this.layerInfo.layers.length - this.layersLeft.length - 1] = 0;
		viewdom.render('#checks',v.lis(simplevm.checks(this)));		//	Tony
        if (this.layersLeft.length == 0) this.gameOver();			//	Tony
    }
    pickLayer(isCorrect) {
		viewdom.render('#checks',v.lis(simplevm.checks(this)));		//	Tony
        console.log("total layers: " + this.layerInfo.layers.length, " layersLeft: " + this.layersLeft.length)
        if (this.layersLeft.length == 0) {
            //this.wonGame();		//	Tony Removed
            this.gameOver();		//	Tony
            return false;
        }
        if (isCorrect) {
            this.layerIndex = Math.floor(Math.random() * this.layersLeft.length)
        }
        this.choiceLayer = this.layersLeft[this.layerIndex];
        //var isTemp = false;
        return true;
    }
    destroy() {
        //SelectorGame.destroy();
        //TypingGame.destroy();
        //DragGame.destroy();
    }
    overlayCreate(text) {				
                console.log("he");
		if (typeof Lti != 'undefined') Lti.submit(this.getGrade(), typeof(LTI)=='undefined'?null:LTI);	//	Tony
		$("#stage").append(simplev.overlay([text,this]))
	}
	overlayDestroy() {
		$("#overlay").remove();
    }
    clickBlockercreate() {							//	Tony
		$("#stage").append(v.div({id:'blocker'}));
	}
	clickBlockerdestroy() {							//	Tony
		$("#blocker").remove();
	}
	getGrade() {	//	Tony
		return this.answers.reduce((s,e)=>s+e,0) / this.answers.length;	//	Tony
		//return this.right/(this.right+this.wrong);	//	Tony
		//var allComplete = (this.health > 0);
		//var numberOfPotentialQuestions = this.layerInfo.layers.length - 1;
		//var totalAnsweredCorrect = numberOfPotentialQuestions - this.layersLeft.length;
		//var totalAnsweredIncorrect = numberOfPotentialQuestions - this.health;
		//return allComplete ? calculateGrade() : laplacePredictGrade();
		//function calculateGrade() {
		//	var wrong = totalAnsweredIncorrect;
		//	var right = totalAnsweredCorrect;
		//	return right / (right + wrong);
		//}
		//function laplacePredictGrade() {	//	An implementation of Laplace's Rule of Succession
		//	var wrong = 1 + totalAnsweredIncorrect;
		//	var right = 1 + totalAnsweredCorrect;
		//	return right / (right + wrong);
		//}
	}
}

class SelectorGame {
	constructor(simple) {
		this.simple = simple;
	}
	static getInstance(simple) {
		//console.log(simple);
		if (!SelectorGame.instance) SelectorGame.instance = new SelectorGame(simple);
		return SelectorGame.instance;
	}
    init() {
        this.simple.destroy();
        this.simple.gameInit();
        this.simple.currentGame = "SelectorGame";
        this.pickLayer(true);
        $(".map").unbind("click").click((evt) => {
            this.clickedItem(evt)
        })
    }
    clickedItem(evt) {
        var isCorrect = true;
        var layerPicked = $(evt.target).attr("class").split(" ")[0];
        var isTemp = true;
        if (layerPicked == this.simple.choiceLayer.id) {
			if (this.simple.answers[this.simple.layerInfo.layers.length - this.simple.layersLeft.length - 1])		//	Tony
				this.simple.answers[this.simple.layerInfo.layers.length - this.simple.layersLeft.length - 1] = 1;	//	Tony
            this.simple.setMessage("Correct!", isTemp)
            $("#image-" + this.simple.choiceLayer.id).css({display: "block"})
            $("#" + this.simple.choiceLayer.id).css({display: "block"})
            $("#" + this.simple.choiceLayer.id).appendTo('#layerName');	//	Tony
            $("#tempMessage").css("background-color", "green")
            this.simple.layersLeft.splice(this.simple.layerIndex, 1)
			$('.'+layerPicked).unbind('click');	//	Tony
        } else {
            this.simple.setMessage("Please try again", isTemp)
            $("#tempMessage").css("background-color", "red")
            isCorrect = false;
            this.simple.damage(this.simple.health, this.simple.layerIndex)
            //if (Simple.health == 0) {
            //    Simple.lostGame();
            //    return;
            //}
        }
		//viewdom.render('#healthDisplayBox',v.progress({value:this.simple.getGrade()*100,max:'100'}));	//	Tony
        this.pickLayer(isCorrect)
    }
    destroy() {
        $("#displayCorrect img").css({
            display: "none"
        });
        $(".map").unbind("click");
    }
    pickLayer(isCorrect) {
        var isTemp = false;
        if (this.simple.pickLayer(isCorrect)) {
            this.simple.setMessage("Please select: <span class='blink'>" + this.simple.choiceLayer.lname + "</span>", isTemp)
        }
    }
}

class TypingGame {
	constructor(simple) {
		this.simple = simple;
	}
	static getInstance(simple) {
		//console.log(simple);
		if (!TypingGame.instance) TypingGame.instance = new TypingGame(simple);
		return TypingGame.instance;
	}
    //lettersShown: [],
    //lastTime: 0,
    //answerString: "",
    //delaySecs: 2,
    //questionStartTime: 0,
    //animationFrameID: 0,
    init() {
		this.delaySecs = 2;
        this.simple.destroy();
        this.simple.gameInit();
        this.simple.currentGame = "TypingGame";
        $("#guessBox").css({
            visibility: "visible"
        })
        this.pickLayer(true);
        $(".map").unbind();
        // Make a array [1...n] shufflle it
        $("#userInput").focus();
        $("#userInput").on('blur', function () {
            $("#userInput").focus();
        })
        this.pickLetter();
        $("#userInput").unbind("keyup").keyup((evt) => {
            this.typedLetter(evt)
        });
        $("#userInput").submit(function (evt) {
          console.log("hi");
        });

    }
    pickLayer(isCorrect) {
        this.guessMessageDisplay().destroy();
        $("#userInput").val("")
        this.lastTime = 0;
        var isTemp = false;
        this.questionStartTime = new Date().getTime();
        if (this.simple.pickLayer(isCorrect)) {
            this.simple.setMessage("What is the highlighted layer on the right?", isTemp)
            $("#" + this.simple.choiceLayer.id).css({display: "block"})
            $("#" + this.simple.choiceLayer.id).appendTo('#layerName');	//	Tony
            $("#" + this.simple.choiceLayer.id).text("")
            this.lettersShown = this.shuffle(Array.from(Array(this.simple.choiceLayer.lname.length).keys()))
            this.answerString = this.simple.choiceLayer.lname.replace(/[^ ]/g, "*").split('')
            //this.pickLetter();	//	Tony Removed
        }
    }
    highlightPicture() {
        $("#image-" + this.simple.choiceLayer.id).css({display: "block"})
    }
    guessMessageDisplay() {
		return {
			showMessage: (message) => {
				$("#" + this.simple.choiceLayer.id).text(message);
			},
			destroy: function () {
				window.cancelAnimationFrame(this.animationFrameID);
			}
		}
    }
    typedLetter(evt) {
        var isTemp = true;
        var inputText = document.getElementById("userInput").value;
        var lastIndex = inputText.length - 1
        if ((inputText[lastIndex] && this.simple.choiceLayer.lname.split('')[lastIndex]) && inputText[lastIndex].toLowerCase() == this.simple.choiceLayer.lname.split('')[lastIndex].toLowerCase()) {
        this.answerString[lastIndex] = inputText[lastIndex]
            $("#" + this.simple.choiceLayer.id).text(this.answerString.join(""));
        }
        this.checkCorrect(inputText,evt,isTemp);
    }
    checkCorrect(inputText,evt,isTemp) {
		if (inputText.toLowerCase() == this.simple.choiceLayer.lname.toLowerCase()) {
			if (this.simple.answers[this.simple.layerInfo.layers.length - this.simple.layersLeft.length - 1])		//	Tony
				this.simple.answers[this.simple.layerInfo.layers.length - this.simple.layersLeft.length - 1] = 1;	//	Tony
			this.simple.setMessage("Correct!", isTemp);
			$("#" + this.simple.choiceLayer.id).css({display: "block"});
			$("#tempMessage").css("background-color", "green");
			$("#image-" + this.simple.choiceLayer.id).css({display: "none"});
			this.simple.layersLeft.splice(this.simple.layerIndex, 1);
			this.pickLayer(true);
		//} else {								//	Tony Removed
		//	if (evt.which==13) {
		//		this.simple.damage(this.simple.health, this.simple.layerIndex);
		//	}
		}
		viewdom.render('#checks',v.lis(simplevm.checks(this.simple)));		//	Tony
    }
    pickLetter() {
		//console.log(this)
        var currTime = new Date().getTime();
        if (true || currTime >= this.lastTime + this.delaySecs * 1000) {	//	Tony
            var shufflePick = this.lettersShown[0];
            this.answerString[shufflePick] = this.simple.choiceLayer.lname[shufflePick];
            this.lettersShown.shift();
            this.lastTime = currTime;
            this.highlightPicture();
            this.guessMessageDisplay().showMessage(this.answerString.join(""));
            if (this.lettersShown.length == 0) {
                this.simple.damage(this.simple.health, this.simple.layerIndex);
                // Pick a new object
                $("#image-" + this.simple.choiceLayer.id).css({display: "none"})
				this.simple.layersLeft.splice(this.simple.layerIndex, 1);	//	Tony
                this.pickLayer(true);
            }
        } // one second has passed, run some code here
        window.cancelAnimationFrame(this.animationFrameID);
        if (this.simple.currentGame == "TypingGame") {
            //this.animationFramID = window.requestAnimationFrame(() => this.pickLetter.call(this));	//	Tony Removed
            setTimeout(this.pickLetter.bind(this), 1000 * this.delaySecs);								//	Tony
        }
    }
    destroy() {
        this.guessMessageDisplay().destroy();
        window.cancelAnimationFrame(this.animationFramID);
        $("#guessBox").css({visibility: "hidden"});
    }
    shuffle(array) {
        let counter = array.length;
        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            let index = Math.floor(Math.random() * counter);
            // Decrease counter by 1
            counter--;
            // And swap the last element with it
            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
    }
}

class IndexGame {
	constructor(simple) {
		this.simple = simple;
	}
	static getInstance(simple) {
		//console.log(simple);
		if (!IndexGame.instance) IndexGame.instance = new IndexGame(simple);
		return IndexGame.instance;
	}
    init() {
        this.simple.destroy();
        this.simple.gameInit();
        this.simple.currentGame = "IndexGame";
        var indexMessage = "Hover over a piece of the image to highlight the name on the left";
        $("#layerName li").css({display: "block"})
        $("#healthDisplayBox").css({visibility: "hidden"})
        //$("#heart1, #heart2, #heart3").css({visibility: "hidden"})	//	Tony
        $(".heart").css({visibility: "hidden"})							//	Tony
        var isTemp = false;
        this.simple.setMessage(indexMessage, isTemp);
    }
}

class DragGame {
	constructor(simple) {
		this.simple = simple;
	}
	static getInstance(simple) {
		//console.log(simple);
		if (!DragGame.instance) DragGame.instance = new DragGame(simple);
		return DragGame.instance;
	}
    init() {
        this.simple.destroy();
        this.simple.gameInit();
        this.simple.currentGame = "DragGame";
        this.simple.setMessage("Please drag", isTemp)
        $("#buttonBox").css({
            visibility: "hidden"
        })
        $('#imagemap').prepend("<div id='dragHome'></div>");
		$('#dragHome').css('width','20%')
		$('#dragHome').css('margin-left','50%')
        var layerCount = this.simple.layerInfo.layers.length;
        var isTemp = true;
        console.log(layerCount)
        var loop = 1;
        $("<img/>") // Make in memory copy of image to avoid css issues
            .attr("src", $("#background img").attr("src")).load(() => {
                var pic_real_width = this.width/2;
                var pic_real_height = this.height/2;
                while (layerCount - loop++) {
                    $('.' + loop).unbind("hover");
                    var dragItem = "<img style='float:right' id='drag-" + loop + "' src='resourcesDynamic/images/drag-layer-" + loop + ".png' alt='"+this.simple.layerInfo.layers[loop-1].lname+"'/><br>";
                    $('#dragHome').append(dragItem)
                    $("<img/>") // Make in memory copy of image to avoid css issues
                        .attr("src", $("#drag-" + loop).attr("src")).load(function () {
                            var item = $(this).attr("src").split("-")[2].split(".")[0]
                            var percentHeight = this.height / pic_real_height * 100;
                            var percentWidth = this.width / pic_real_width * 100;
                            $("#drag-" + item).css("width", percentWidth + "%")
                            $("#drag-" + item).css("height", percentHeight + "%")
                            $("#drag-" + item).css("float", "left")
                            $("#drag-" + item).css("position", "relative")
                        })
                }
                $('#dragHome').children().draggable({
                    stack: "img",
                    revert: true
                }).on("dragstop", (evt) => {
                    this.simple.setMessage("Please try again", isTemp)
                    $("#tempMessage").css("background-color", "red")
                    this.simple.damage(this.simple.health)
                    //if (Simple.health == 0) {
                    //    Simple.lostGame();
                    //    return;
                    //}
                });
            })
		var width = this.width;
		var height = this.height;
        $('.map').droppable({
            drop: (event, ui) => {
                var dropped = $(event.target).attr("class").charAt(0)
                var dragged = ui.draggable.attr('id').split("-")[1]
                if (dragged == dropped && !$("#drop-" + dropped).length) {
                    $("#drag-" + dragged).remove();
                    //var dragItem = "<img id='drop-" + dropped + "' src='resourcesDynamic/images/layer-" + dropped + ".png'/>";
                    //$('#imagemap').append(dragItem)
                    //$("#drop-" + dropped).attr("style", $('#background').attr("style"))
                    //$("#drop-" + dropped).css("position", "absolute")
                    //$("#drop-" + dropped).css("width", width / 2 + "%")
                    //$("#drop-" + dropped).css("height", height / 2 + "%")
                    //$("#drop-" + dropped).css("z-index", 100 + dropped);
                    this.simple.setMessage("Correct!", isTemp)
                    $("#tempMessage").css("background-color", "green")
                }
                if ($("#dragHome").children().length == 0) {
                    this.simple.wonGame();
                }
                console.log(layerCount);
            }
        });
        $('#layerName').html("")
    }
    destroy() {
        $('#dragHome').css({
            display: "none"
        })
        $('#imagemap img').css({
            display: "none"
        })
    }
}

$(function () {
	simple = new Simple();
    simple.init();
	SelectorGame.getInstance(simple);
	TypingGame.getInstance(simple);
	IndexGame.getInstance(simple);
	DragGame.getInstance(simple);
    resizeWindow();
})
