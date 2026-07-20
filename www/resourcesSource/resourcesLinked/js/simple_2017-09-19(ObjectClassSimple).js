//Click destroy typing game
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
        $("#heart1, #heart2, #heart3").css({visibility: "hidden"})
        $("#guessBox").css({visibility: "hidden"})
    }
    gameInit() {
        this.health = 3;
        this.layersLeft = this.layerInfo.layers.slice(1)
        this.refreshLayerNames();
        this.makeHoverEvents(this.layerInfo.layers.length);
        $("#heart1, #heart2, #heart3").removeClass("heartDie")
        $("#displayCorrect img").css({display: "none"});
        $("#layerName li").css({display: "none"})
        $("#healthDisplayBox").css({visibility: "visible"})
        $("#heart1, #heart2, #heart3").css({visibility: "visible"})
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
        this.layerInfo.layers.forEach(function (item, index) {
            $("#" + item.id).html(item.lname);
        })
    }
    populateLayerDivs(info) {
        $(info.layers).each(function (index, item) {
            var Objli = $('<li></li>');
            Objli.text(item.lname)
            Objli.attr("id", item.id)
            Objli.attr("data-name", item.lname)
            Objli.attr("class", item.id)
            var layerImage = $('<img></img>');
            layerImage.attr("src", "resourcesDynamic/images/layer-" + item.id + ".png")
            layerImage.attr("id", "image-" + item.id)
            layerImage.attr("data-name", item.lname)
            layerImage.attr("class", item.id)
            if (index == 0) {
                Objli.appendTo("#headerName")
                layerImage.appendTo("#background")
            } else {
                Objli.appendTo("#layerName")
                layerImage.appendTo("#displayCorrect")
            }
        })
    }
    populateImageMap(data) {
		console.log(data);
		var  width = data.imageMap.info.width;
		var height = data.imageMap.info.height;
		console.log(height);
		data.imageMap.rects.forEach(function (item, index) {
			var newDiv = $("<div></div>");
			//console.log(item);
			newDiv.css("left", item["l"] + "%");
			newDiv.css("top", item["t"] + "%");
			newDiv.css("width", Math.ceil(item["w"]) + "%");
			newDiv.css("height",  Math.ceil(item["w"])  + "%");
			newDiv.attr("class",  item["i"]  + " map")
			newDiv.attr("href", "#")
			//newDiv.css("border","1px solid blue");
			$('#nav').append(newDiv);
		});
		// $('#nav').append(holderDiv)
    }
    loadSimple(data) {
		//console.log(this)
        this.populateImageMap(data);
        this.populateLayerDivs(data);
        this.makeHoverEvents(data.layers.length)
        this.gameSelectorButtons();
        this.queryKeys = this.getUrlVars();
        var local = localStorage.getItem(this.queryKeys["local"])
        $("#background img,#picture, #nav, #dragHome,#displayCorrect img").css({
            "width": data.width + "%",
            "height": data.height + "%"
        })
        this.layerInfo = data;
        var game = this.queryKeys["game"]
        if (game) {
            game = game.toLowerCase()
        } else {
            game = ""
        }
        if (game == "typing") {
            TypingGame.init();
        } else if (game == "selector") {
            SelectorGame.init();
        } else if (game == "drag") {
            DragGame.init();
        } else {
            IndexGame.init();
        }
    }
    gameSelectorButtons() {
        $("#buttonBox").children().each(function (index, value) {
            $(value).click(function (evt) {
                switch (evt.target.id) {
                    case "indexCardButton":
                        IndexGame.init();
                        break;
                    case "typingGameButton":
                        TypingGame.init();
                        break;
                    case "selectorGameButton":
                        SelectorGame.init();
                        break;
                }
            });
        })
    }
    makeHoverEvents(numberOfLayers) {
        var size = Math.floor(256 / numberOfLayers);
        for (var i = 1; i <= numberOfLayers; i++) {
            if (i > 1) {
                $("." + i + ", #" + i).hover(this.handlerHover, this.handlerHover);
            }
            $("#" + i).addClass("fs-" + size);
        }
    }
    handlerHover(event) {
        var hoverData = {
            "mouseenter": {
                "bgcolor": "#4e2a7f"
            },
            "mouseleave": {
                "bgcolor": "#3a3a3a"
            }
        }
        var currentSelection = $(event.target).attr("class").split(" ")[0];
        var picEl = $("#picture")
        var picNum = currentSelection;
        var picname = "resourcesDynamic/images/layer-" + picNum + ".png";
        if (event.type != "mouseenter") {
            picname = "resourcesLinked/images/system/1px.png";
        }
        picEl.attr("src", picname);
        $("#" + currentSelection).css({
            "background-color": hoverData[event.type].bgcolor
        })
    }
    setMessage(message, isTemp) {
        if (isTemp) {
            $("#tempMessage").remove();
            var tempDiv = $('<div>' + message + '</div>');
            tempDiv.attr("id", "tempMessage")
            $("#message").append(tempDiv);
            $("#permMessage").css("visibility", "hidden");
            this.clickBlocker().create();
            $("#tempMessage").stop().fadeTo(2000, 0, () => {
                this.clickBlocker().destroy();
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
    wonGame() {
        //Simple.score = 33 * Simple.health + 1;
        this.score = this.getGrade() * 100;
        if (this.score == 100) {
            this.overlayCreate("You Won! Perfect!");
        } else {
            this.overlayCreate("You Won! <br>" + "Your Score: " + this.score);
        }
        var local = JSON.parse(localStorage.getItem(this.queryKeys["local"]) || "{}");
        local[this.queryKeys["key"]] = this.score
        localStorage.setItem(this.queryKeys["local"], JSON.stringify(local))
        this.destroy();
        IndexGame.init();
    }
    lostGame() {
        //Simple.score = 0;
        this.score = this.getGrade() * 100;
        this.overlayCreate("You Lost! <br>" + "Your Score: " + this.score);
        this.destroy();
        IndexGame.init();
    }
    damage(heartIndex) {
        $('#heart' + heartIndex).addClass("heartDie")
        this.health--;
        //Simple.layersLeft.splice(Simple.layerIndex, 1)
        if (this.health == 0) {
            this.lostGame();
            return;
        }
    }
    pickLayer(isCorrect) {
        console.log("total layers: " + this.layerInfo.layers.length, " layersLeft: " + this.layersLeft.length)
        if (this.layersLeft.length == 0) {
            this.wonGame();
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
        SelectorGame.destroy();
        TypingGame.destroy();
        DragGame.destroy();
    }
    overlayCreate(text) {
		var layerOverlay = $('<div></div>');
		// send score to the server
		if (typeof Lti != 'undefined') Lti.submit(this.layerInfo.layers[0].lname,this.getGrade());	//	Tony
		$.ajax({
			type: "POST",
			url: "resourcesLinked/getData.php",
			data: {
				"SimpleName": this.layerInfo.layers[0].lname,
				"currentGame": this.currentGame,
				"score": this.score
			},
			success: (data) => { console.log(data); }
		});
		$("#stage").append(layerOverlay)
		layerOverlay.attr("id", "overlay")
		layerOverlay.load("resourcesLinked/overlay.htm", () => {
			$("#overlayText").html(text);
			$('#overlayButton').click( () => {
				this.overlayDestroy();
				this.destroy();
				IndexGame.init();
			})
		})
	}
	overlayDestroy() {
		$("#overlay").remove();
    }
    clickBlocker() {
		return {
			create: function () {
				var blocker = $('<div></div>');
				$("#stage").append(blocker);
				blocker.attr("id", "blocker");
			},
			destroy: function () {
				$("#blocker").remove();
			}
		}
    }
	getGrade() {
		var allComplete = (this.health > 0);
		var numberOfPotentialQuestions = this.layerInfo.layers.length - 1;
		var totalAnsweredCorrect = numberOfPotentialQuestions - this.layersLeft.length;
		var totalAnsweredIncorrect = 3 - this.health;
		return allComplete ? calculateGrade() : laplacePredictGrade();
		function calculateGrade() {
			var wrong = totalAnsweredIncorrect;
			var right = totalAnsweredCorrect;
			return right / (right + wrong);
		}
		function laplacePredictGrade() {	//	An implementation of Laplace's Rule of Succession
			var wrong = 1 + totalAnsweredIncorrect;
			var right = 1 + totalAnsweredCorrect;
			return right / (right + wrong);
		}
	}
}

class SelectorGame {
    static init() {
        simple.destroy();
        simple.gameInit();
        simple.currentGame = "SelectorGame";
        SelectorGame.pickLayer(true);
        $(".map").unbind("click").click(function (evt) {
            SelectorGame.clickedItem(evt)
        })
    }
    static clickedItem(evt) {
        var isCorrect = true;
        var layerPicked = $(evt.target).attr("class").split(" ")[0];
        var isTemp = true;
        if (layerPicked == simple.choiceLayer.id) {
            simple.setMessage("Correct!", isTemp)
            $("#image-" + simple.choiceLayer.id).css({display: "block"})
            $("#" + simple.choiceLayer.id).css({display: "block"})
            $("#tempMessage").css("background-color", "green")
            simple.layersLeft.splice(simple.layerIndex, 1)
        } else {
            simple.setMessage("Please try again", isTemp)
            $("#tempMessage").css("background-color", "red")
            isCorrect = false;
            simple.damage(simple.health, simple.layerIndex)
            //if (Simple.health == 0) {
            //    Simple.lostGame();
            //    return;
            //}
        }
        SelectorGame.pickLayer(isCorrect)
    }
    static destroy() {
        $("#displayCorrect img").css({
            display: "none"
        });
        $(".map").unbind("click");
    }
    static pickLayer(isCorrect) {
        var isTemp = false;
        if (simple.pickLayer(isCorrect)) {
            simple.setMessage("Please select: <span class='blink'>" + simple.choiceLayer.lname + "</span>", isTemp)
        }
    }
}

class TypingGame {
    //lettersShown: [],
    //lastTime: 0,
    //answerString: "",
    //delaySecs: 2,
    //questionStartTime: 0,
    //animationFrameID: 0,
    static init() {
		TypingGame.delaySecs = 2;
        simple.destroy();
        simple.gameInit();
        simple.currentGame = "TypingGame";
        $("#guessBox").css({
            visibility: "visible"
        })
        TypingGame.pickLayer(true);
        $(".map").unbind();
        // Make a array [1...n] shufflle it
        $("#userInput").focus();
        $("#userInput").on('blur', function () {
            $("#userInput").focus();
        })
        TypingGame.pickLetter();
        $("#userInput").unbind("keyup").keyup(function (evt) {
            TypingGame.typedLetter(evt)
        });
        $("#userInput").submit(function (evt) {
          console.log("hi");
        });

    }
    static pickLayer(isCorrect) {
        TypingGame.guessMessageDisplay().destroy();
        $("#userInput").val("")
        TypingGame.lastTime = 0;
        var isTemp = false;
        TypingGame.questionStartTime = new Date().getTime();
        if (simple.pickLayer(isCorrect)) {
            simple.setMessage("What is the highlighted layer on the right?", isTemp)
            $("#" + simple.choiceLayer.id).css({display: "block"})
            $("#" + simple.choiceLayer.id).text("")
            TypingGame.lettersShown = TypingGame.shuffle(Array.from(Array(simple.choiceLayer.lname.length).keys()))
            TypingGame.answerString = simple.choiceLayer.lname.replace(/[^ ]/g, "*").split('')
            TypingGame.pickLetter();
        }
    }
    static highlightPicture() {
        $("#image-" + simple.choiceLayer.id).css({display: "block"})
    }
    static guessMessageDisplay() {
		return {
			showMessage: function (message) {
				$("#" + simple.choiceLayer.id).text(message);
			},
			destroy: function () {
				window.cancelAnimationFrame(TypingGame.animationFrameID);
			}
		}
    }
    static typedLetter(evt) {
        var isTemp = true;
        var inputText = document.getElementById("userInput").value;
        var lastIndex = inputText.length - 1
        if ((inputText[lastIndex] && simple.choiceLayer.lname.split('')[lastIndex]) && inputText[lastIndex].toLowerCase() == simple.choiceLayer.lname.split('')[lastIndex].toLowerCase()) {
        TypingGame.answerString[lastIndex] = inputText[lastIndex]
            $("#" + simple.choiceLayer.id).text(TypingGame.answerString.join(""));
        }
        TypingGame.checkCorrect(inputText,evt,isTemp);
    }
    static checkCorrect(inputText,evt,isTemp) {
		if (inputText.toLowerCase() == simple.choiceLayer.lname.toLowerCase()) {
			simple.setMessage("Correct!", isTemp);
			$("#" + simple.choiceLayer.id).css({display: "block"});
			$("#tempMessage").css("background-color", "green");
			$("#image-" + simple.choiceLayer.id).css({display: "none"});
			simple.layersLeft.splice(simple.layerIndex, 1);
			TypingGame.pickLayer(true);
		} else {
			if (evt.which==13) {
				simple.damage(simple.health, simple.layerIndex);
			}
		}
    }
    static pickLetter() {
        var currTime = new Date().getTime();
        if (currTime >= TypingGame.lastTime + TypingGame.delaySecs * 1000) {
            var shufflePick = TypingGame.lettersShown[0];
            TypingGame.answerString[shufflePick] = simple.choiceLayer.lname[shufflePick];
            TypingGame.lettersShown.shift();
            TypingGame.lastTime = currTime;
            TypingGame.highlightPicture();
            TypingGame.guessMessageDisplay().showMessage(TypingGame.answerString.join(""));
            if (TypingGame.lettersShown.length == 0) {
                simple.damage(simple.health, simple.layerIndex);
                // Pick a new object
                $("#image-" + simple.choiceLayer.id).css({display: "none"})
                TypingGame.pickLayer(true);
            }
        } // one second has passed, run some code here
        window.cancelAnimationFrame(TypingGame.animationFrameID);
        if (simple.currentGame == "TypingGame") {
            TypingGame.animationFramID = window.requestAnimationFrame(TypingGame.pickLetter);
        }
    }
    static destroy() {
        TypingGame.guessMessageDisplay().destroy();
        window.cancelAnimationFrame(TypingGame.animationFramID);
        $("#guessBox").css({visibility: "hidden"});
    }
    static shuffle(array) {
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
    static init() {
        simple.destroy();
        simple.gameInit();
        simple.currentGame = "IndexGame";
        var indexMessage = "Hover over a piece of the image to highlight the name on the left";
        $("#layerName li").css({display: "block"})
        $("#healthDisplayBox").css({visibility: "hidden"})
        $("#heart1, #heart2, #heart3").css({visibility: "hidden"})
        var isTemp = false;
        simple.setMessage(indexMessage, isTemp);
    }
}

class DragGame {
    static init() {
        simple.destroy();
        simple.gameInit();
        simple.currentGame = "DragGame";
        simple.setMessage("Please drag", isTemp)
        $("#buttonBox").css({
            visibility: "hidden"
        })
        $('#imagemap').prepend("<div id='dragHome'></div>");
		$('#dragHome').css('width','20%')
		$('#dragHome').css('margin-left','50%')
        var layerCount = simple.layerInfo.layers.length;
        var isTemp = true;
        console.log(layerCount)
        var loop = 1;
        $("<img/>") // Make in memory copy of image to avoid css issues
            .attr("src", $("#background img").attr("src")).load(function () {
                var pic_real_width = this.width/2;
                var pic_real_height = this.height/2;
                while (layerCount - loop++) {
                    $('.' + loop).unbind("hover");
                    var dragItem = "<img style='float:right' id='drag-" + loop + "' src='resourcesDynamic/images/drag-layer-" + loop + ".png' alt='"+simple.layerInfo.layers[loop-1].lname+"'/><br>";
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
                }).on("dragstop", function (evt) {
                    simple.setMessage("Please try again", isTemp)
                    $("#tempMessage").css("background-color", "red")
                    simple.damage(simple.health)
                    //if (Simple.health == 0) {
                    //    Simple.lostGame();
                    //    return;
                    //}
                });
            })
		var width = this.width;
		var height = this.height;
        $('.map').droppable({
            drop: function (event, ui) {
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
                    simple.setMessage("Correct!", isTemp)
                    $("#tempMessage").css("background-color", "green")
                }
                if ($("#dragHome").children().length == 0) {
                    simple.wonGame();
                }
                console.log(layerCount);
            }
        });
        $('#layerName').html("")
    }
    static destroy() {
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
    resizeWindow();
})
