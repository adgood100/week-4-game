var myWins = 0;
var myLosses = 0;
var myHealth = 0;
var myAttack = 0;
var yourWins = 0;
var yourLosses = 0;
var yourHealth = 0;
var yourCounter = 0;
var firstChallenger = 0;
var winImage = "";
var lossImage = "";
var hintValue = "";
var hintPicture = "";

//Star Wars Variables
//var player = {
//	name: "",
//	playerRole: "",
//	baseHealthPoints: (Math.floor((Math.random() * 50) + 275);),
//	baseAttackPower: (Math.floor((Math.random() * 25) + 175);),
//	xtremeAttackPower: (xtremeAttackPower + baseAttackPower), 
//	counterAttackPower: (Math.floor((Math.random() * 16) + 245);)
//};
var opponentHP = 0;
var heroAttackPT = 0;
var opponentAttackPT = 0;
var opponentCounterAttackPT = 0;
//var baseAttackPT = (baseAttackPT + heroAttackPT);
//var lifeLeft = (baseHealthPoints - injuryPoints);
var injuryPoints = 0;



function resetGame () {
		resetUI();  // 0. Start game and reset reset() from ui
		gameAnswer = chooseWord();  // 1. chooseWord() from rules
		console.log('this is the word: ' + gameAnswer);
		var hintResult = words.indexOf(gameAnswer);
		chooseHint(hintResult);
		gameShownAnswer = blanksFromAnswer(gameAnswer);  // 2. show "_" blanksFromAnswer from rules
		hangmanState = 0;
		drawWord(gameShownAnswer);    // 3. initialize ui drawWord from ui
		hideHints();
}
//showKeyboard();

//$(document).ready(resetGame);
var audioElement = document.createElement('audio');
var imageElement = document.createElement('image');

$("#startGame").click(startGame);

//$("#hint").click(drawHints); 
//$("#shwHint").click(dsplHints); 

function startGame () {
	resetUI();    			// Step 1 Start game and reset() from ui
	resetPlayerStats(); 	// Step 2 Reset player stats to zero
	setPlayerPoints(); 		// Step 3 Allocate player health points, attack power and counter attack power
	loadPlayerBoard();		// Step 4 Load player thumbnails on player board
}

function resetPlayerStats() {
	alert("You are resetting player stats now");
}

function setPlayerPoints () {
	alert("You are setting player points now");
}

function win () { 
	alert('You win! Total wins: ' + myWins);
	audioElement.setAttribute('src', 'assets/audio/Trumpet_Fanfare.wav');
	audioElement.play();
	resetGame() ;
}
function lose () { 
	alert('Oh no, you lose! Total losses: ' + myLosses); 
	audioElement.setAttribute('src', 'assets/audio/Dragon grawl.mp3');
	audioElement.play();
	resetGame(); 
}

function doKeypress () {
    console.log("Entering the doKeypress function");
	var tempChar = $('#letter-input').val().toLowerCase();
	console.log("This is value of tempChar: " + tempChar);
    var tempString = "";
	$('#letter-input').val("");
    
    // Write here!
    tempString = guessLetter( tempChar, gameShownAnswer, gameAnswer );
	console.log("This is value of tempString:" + tempString);
    if ( tempString != gameShownAnswer ) {
        updateWord( tempString );
        gameShownAnswer = tempString;
        if ( gameShownAnswer === gameAnswer ) {
            myWins = myWins + 1;
/*			$( "#toggle" ).attr( "style", "visibility: visible;" ); */
			dsplWinnerBoard();
			drawMyWins(myWins);
			win();
        }
    } else {
        wrongLetter(tempChar);
        drawSequence[ hangmanState++ ]();
        if ( hangmanState === drawSequence.length ) {
            myLosses = myLosses + 1;
			drawMyLosses(myWins);
			lose();
        }
    }  
}
$('#letter-input').keyup( doKeypress );

function dsplWinnerBoard () {
	$( "#toggle" ).attr( "style", "visibility: visible;" ); 
	$("img").removeAttr("style");
}

function dsplHints () {
	console.log("Entering dsplHints");
	$("#hint-display").attr( "style", "visibility: visible" ); 

}
function hideHints () {
	console.log("Entering dsplHints");
	$("#hint-display").attr( "style", "visibility: hidden" ); 

}
// ---
// --- control ui ---
// --- BGN ui ---

function drawHead () {
  $('.draw-area').append( $('<div/>').addClass("body-part head") );
}
function drawTorso () {
  $('.draw-area').append(
      $('<div/>').addClass("body-part armbox").append(
          $('<div/>').addClass("body-part torso")));
  $('.draw-area').append(
      $('<div/>').addClass("body-part legbox").append(
          $('<div/>').addClass("body-part pelvis")));
}
function drawLeftArm () {
 $('.armbox').prepend( $('<div/>').addClass("body-part leftarm") );
}
function drawRightArm () {
 $('.armbox').prepend( $('<div/>').addClass("body-part rightarm") );   
}
function drawLeftLeg () {
 $('.legbox').prepend( $('<div/>').addClass("body-part leftleg") );   
}
function drawRightLeg() {
 $('.legbox').prepend( $('<div/>').addClass("body-part rightleg") );   
}
var drawSequence = [ drawHead,drawTorso,drawLeftArm,drawRightArm,drawLeftLeg,drawRightLeg ];
function wrongLetter ( letter ) {
    $('#wrong-letters').append(
        $('<span/>').addClass('guessed-letter').text(letter));
}
function resetUI () {
    $('.body-part').remove();
    $('.guessed-letter').remove();
    $('.shown-letter').remove();
	$('.shown-wins').remove();
	$('.shown-losses').remove();
	$('.shown-hint').remove();
/*	$('.shown-picture').remove(); */
	drawMyWins(myWins);
	drawMyLosses(myLosses);
	drawMyHealth(myHealth);
	drawMyAttack(myAttack);
	drawYourWins(yourWins);
	drawYourLosses(yourLosses);
	drawYourHealth(yourHealth);
	drawYourCounter(yourCounter);
	dsplWinnerBoard();
}
function drawWord( answer ) {
    for ( i in answer ) {
	$('.word-display').append(
	    $('<span/>').addClass('shown-letter').html('&nbsp;'));
    }
}
function drawHints( hintValue ) {
    
	if (hintValue != "") {
		$('#hint-display').append(
	    $('<span/>').addClass('shown-hint').text(hintValue));
		console.log("This is the value for hintValue: " + hintValue);
	};

}
function drawMyWins( myWins ) {
    
	$('#wins-display').append(
	    $('<span/>').addClass('shown-wins').text(myWins));
    
}
function drawYourWins( yourWins ) {
    
	$('#your-wins-display').append(
	    $('<span/>').addClass('shown-your-wins').text(yourWins));
    
}
function drawMyLosses( myLosses ) {
    
	$('#losses-display').append(
	    $('<span/>').addClass('shown-losses').text(myLosses));
    
}
function drawYourLosses( yourLosses ) {
    
	$('#your-losses-display').append(
	    $('<span/>').addClass('shown-your-losses').text(yourLosses));
    
}
function drawMyHealth( myHealth ) {
    
	$('#health-display').append(
	    $('<span/>').addClass('shown-health').text(myHealth));
    
}
function drawMyAttack( myAttack ) {
    
	$('#attack-display').append(
	    $('<span/>').addClass('shown-attack').text(myAttack));
    
}
function drawYourHealth( yourHealth ) {
    
	$('#your-health-display').append(
	    $('<span/>').addClass('shown-your-health').text(yourHealth));
    
}
function drawYourCounter( yourCounter ) {
    
	$('#counter-display').append(
	    $('<span/>').addClass('shown-counter').text(yourCounter));
    
}
function drawPicture( myPicture ) {
    
	$('#picture-display').append (
		$('<span/>').addClass('shown-picture pull-left').html(myPicture));
    
}

function loadPlayerBoard() {
    
	for (var i = 0; i < himgs.length; i++) {
		$('#picture-display').append (
			$('<span/>').addClass('shown-picture pull-left').html(himgs[i]));
	}
		
}

function pickChallengers() {
	firstChallenger++;
	if (firstChallenger === 1) {
		
		for (var i = 0; i < toggle.length; i++) {
		$('#toggle').apend (
			$('#hero-display').html(toggle[i]));
		}
	} else if (firstChallenger === 2) {
		
		$('#toggle').apend (
			$('#opponent-display').html(this.toggle));
}			
		

}
function updateWord( answer ) {
    $k = $('.shown-letter:first');
    for ( i in answer ) {
	if ( answer.charAt(i) != '_' ) {
	    $k.text( answer.charAt(i) );
	} else { 
	    $k.html('&nbsp;');
	}
	$k = $k.next();
    }
}

// --- END ui ---
// --- 
// ---
// --- rules for game ---
// --- BGN rules ---

// This array holds the players to choose from.
// ------Add new words!
var words = ['Rey Skywalker', 
			 'Jyn Erso', 
			 'Finn', 
			 'Poe Dameron', 
			 'Hans Solo', 
			 'Chewbacca', 
			 'Storm Trooper', 
			 'Top Storm Trooper', 
			 'Supreme Leader Snoke', 
			 'General Hux', 
			 'Darth Vadr'];

var players = ['Rey Skywalker', 
			 'Jyn Erso', 
			 'Finn', 
			 'Poe Dameron', 
			 'Hans Solo', 
			 'Chewbacca', 
			 'Storm Trooper', 
			 'Top Storm Trooper', 
			 'Supreme Leader Snoke', 
			 'General Hux', 
			 'Darth Vadr'];

			 
var hints = ['THE MAN WHO PASSES THE SENTENCE SHOULD SWING THE SWORD.',
			 'THE THINGS I DO FOR LOVE.',
			 'THE NEXT TIME YOU RAISE A HAND TO ME WILL BE THE LAST TIME YOU HAVE HANDS!',
			 "IT'S THE FAMILY NAME THAT LIVES ON. IT'S ALL THAT LIVES ON.",
			 'WHEN YOU PLAY THE GAME OF THRONES, YOU WIN OR YOU DIE.',
			 'I LEARNED HOW TO DIE A LONG TIME AGO.',
			 'A DRUNKEN DWARF WILL NEVER BE THE SAVIOR OF THE SEVEN KINGDOMS.',
			 "I'M NOT GOING TO STOP THE WHEEL. I'M GOING TO BREAK THE WHEEL.",
			 "A GIRL GIVES A MAN HIS OWN NAME?",
			 "CHAOS ISN'T A PIT. CHAOS IS A LADDER.",
			 "I'M GONNA HAVE TO EAT EVERY F--KING CHICKEN IN THIS ROOM.",
			 'YOU KNOW NOTHING, JON SNOW.',
			 'THE GOOD LORDS ARE DEAD, AND THE REST ARE MONSTERS.',
			 'OLLY, BRING ME MY SWORD.',
			 'HE ALWAYS COMES BACK!']; 

var himgs = [' <img id="toggle" onclick="pickChallengers()" src="assets/images/reyskywalker.png" style="width: 48; height: 48; "> ',
			 ' <img id="toggle" onclick="pickChallengers()" src="assets/images/jynerso.png" style="width: 48; height: 48;" > ',
			 ' <img id="toggle" onclick="pickChallengers()" src="assets/images/finn.png" style="width: 48; height: 48;" > ',
			 ' <img id="toggle" onclick="pickChallengers()" src="assets/images/PoeDameron180.jpg" style="width: 48; height: 48;" > ',
			 ' <img id="toggle" onclick="pickChallengers()" src="assets/images/hanssolo.png" style="width: 48; height: 48;" > ',
			 ' <img id="toggle" onclick="pickChallengers()" src="assets/images/chewbacca.png" style="width: 48; height: 48;" > ',
			 ' <img id="toggle" onclick="pickChallengers()" src="assets/images/stormtrooper.jpg" style="width: 48; height: 48;" > ',
			 ' <img id="toggle" onclick="pickChallengers()" src="assets/images/TopStormTrooper.jpg" style="width: 48; height: 48;" > ',
			 ' <img id="toggle" onclick="pickChallengers()" src="assets/images/supremeleadersnoke.png" style="width: 48; height: 48;" > ',
			 ' <img id="toggle" onclick="pickChallengers()" src="assets/images/generalhux.png" style="width: 48; height: 48;" > ',
			 ' <img id="toggle" onclick="pickChallengers()" src="assets/images/darthvader.jpg" style="width: 48; height: 48;" > ']; 
			

			
function chooseWord () {
    return words[Math.floor(Math.random() * words.length)];
}
function chooseHint (answerHint) {
	hintValue = hints[answerHint];
	hintPicture = himgs[answerHint];
	drawHints(hintValue);
	drawPicture(hintPicture);
    console.log("The value of hintValue is: " + hintValue);
	console.log("The value of answerHint is: " + answerHint);
}

function blanksFromAnswer ( answerWord ) {  
    chooseHint(answerWord);
	var result = ""; 
    for ( i in answerWord ) {
        if (answerWord.charAt(i) != " ") { 
			result = "_" + result;
		} else {
			result = " " + result;
		}
    }
	console.log("This is the value of result: " + result);
    return result;
}
function alterAt ( n, c, originalString ) {
    return originalString.substr(0,n) + c + originalString.substr(n+1,originalString.length);
}
function guessLetter( letter, shown, answer ) {
    var checkIndex = 0;
    
    checkIndex = answer.indexOf(letter);
    while ( checkIndex >= 0 ) {
        shown = alterAt( checkIndex, letter, shown );
        checkIndex = answer.indexOf(letter, checkIndex + 1);
    }
    return shown;
}

// --- END rules ---
// ---
// ---
// --- BGN KEYBRD ---

	function showKeyboard () {
      // Here we are provided an initial array of letters.
      // Use this array to dynamically create buttons on the screen.
      var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "_"];


      // MAJOR TASK #1: DYNAMICALLY CREATE BUTTONS
      // =================================================================================

      // 1. Create a for-loop to iterate through the letters array.
      for (var i = 0; i < letters.length; i++) {

        // Inside the loop...

        // 2. Create a variable named "letterBtn" equal to $("<button>");
        var letterBtn = $("<button>");

        // 3. Then give each "letterBtn" the following classes: "letter-button" "letter" "letter-button-color".
        letterBtn.addClass("letter-button letter letter-button-color");

        // 4. Then give each "letterBtn" a data-attribute called "data-letter".
        letterBtn.attr("data-letter", letters[i]);

        // 5. Then give each "letterBtns" a text equal to "letters[i]".
        letterBtn.text(letters[i]);

        // 6. Finally, append each "letterBtn" to the "#buttons" div (provided).
        $("#buttons").append(letterBtn);

      }

      // Be sure to test that your code works for this major task, before proceeding to the next one!
      // MAJOR TASK #2: ATTACH ON-CLICK EVENTS TO "LETTER" BUTTONS
      // =================================================================================

      // 7. Create an "on-click" event attached to the ".letter-button" class.
	  $(".letter-button").click(buttonClicked);
  //    $(".letter-button").on("click", function() {
	  
		function buttonClicked() {
        // Inside the on-click event...

        // 8. Create a variable called "fridgeMagnet" and set the variable equal to a new div.
			var fridgeMagnet = $("<div>");

        // 9. Give each "fridgeMagnet" the following classes: "letter fridge-color".
			fridgeMagnet.addClass("letter fridge-color");

        // 10. Then chain the following code onto the "fridgeMagnet" variable: .text($(this).attr("data-letter"))
        // attr acts as both a setter and a getter for attributes depending on whether we supply one argument or two
        // NOTE: There IS a $(data) jQuery method, but it doesn't do what you'd expect. So just use attr.
			fridgeMagnet.text($(this).attr("data-letter"));

        // 11. Lastly append the fridgeMagnet variable to the "#display" div (provided);
			$("#display").append(fridgeMagnet);
		}
      

      // Be sure to test that your code works for this major task, before proceeding to the next one!

      // MAJOR TASK #3: ATTACH ON-CLICK EVENTS TO "CLEAR" BUTTON
      // =================================================================================

      // 12. Create an "on-click" event attached to the "#clear" button id.
	  $("#hint").click(drawHints); 
	  $("#clear").click(clearButton); 
	  
	  function clearButton () {

        // Inside the on-click event...

        // 13. Use the jQuery "empty()" method to clear the contents of the "#display" div.
        $("#display").empty();
		resetUI();  // 0. Start game and reset reset() from ui

      }
	}


// --- END KEYBRD ---
// ---