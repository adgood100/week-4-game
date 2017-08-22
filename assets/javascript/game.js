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
var heroindx;
var opponentindx;

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

//$(document).ready(resetGame);
var audioElement = document.createElement('audio');
var imageElement = document.createElement('image');

// ---- OnClick Button Section ----
$("#startGame").click(startGame);
$("#attack").click(attack);

function startGame () {
	resetUI();    			// Step 1 Start game and reset() from ui
	loadPlayerBoard();		// Step 4 Load player thumbnails on player board

}

function attack () {
	yourHealth = (yourHealth - myAttack);	

	if (yourHealth <= 0) {
		myWins++;
		drawMyWins(myWins);
		$('.msg-text').remove();
		yourHealth = 0;
		yourCounter = 0;
		resetOpponentStats();
		var j = opponentindx; 
		alert("You have defeated your opponent");
		$('#msg-display').append(
			$('<span/>').addClass('msg-text pull-right').text("Select a new opponent to continue"));
		$('#vanquished-display').append (
			$('<div/>').addClass('shown-picture pull-left').html(players[j].pix));
		
	} else {
		alert("Your opponent is still alive");
		$('.shown-your-health').remove();
		$('#your-health-display').append(
					$('<span/>').addClass('shown-your-health').text(yourHealth));
	}
}

function resetOpponentStats() {
	alert("You are resetting player stats now");
	yourHealth = 0;
	yourCounter = 0;
	$('.opponent-display').remove();
	$('.shown-your-health').remove();
	$('.shown-counter').remove();
	$('#your-health-display').append(
		$('<span/>').addClass('shown-your-health').text(yourHealth));
	$('#counter-display').append(
		$('<span/>').addClass('shown-counter').text(yourCounter));
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

// ---
// --- control ui ---
// --- BGN ui ---

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
    $('.shown-wins').remove();
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
	for (var i = 0; i < players.length; i++) {
		$('#picture-display').append (
			$('<div/>').addClass('shown-picture pull-left').html(players[i].pix));
		$('#picture-display').append (	
			$('<span/>').addClass('shown-stat pull-left').html(players[i].name));
	}
		
}

function reloadPlayerBoard(arg) {
    
	for (var i = 0; i < players.length; i++) {
		if (i != arg) {
		$('#picture-display').append (
			$('<div/>').addClass('shown-picture pull-left').html(players[i].pix));
		$('#picture-display').append (	
			$('<span/>').addClass('shown-stat pull-left').html(players[i].name));
	}}
		
}

function pickChallengers(ndx) {
	firstChallenger++;
	console.log("value of " + ndx);
	console.log("value of " + toggle[ndx]);
	
//	for (var i = 0; i < toggle.length; i++) { //
	if (firstChallenger === 1) {

		for (var i = 0; i < toggle.length; i++) {
			if (i === ndx) {
				myHealth = Math.floor((Math.random() * 350) + 25);
				console.log(myHealth);
				myAttack = Math.floor((Math.random() * 25) + 1);
				console.log(myAttack);
				$('.shown-health').remove();
				$('.shown-attack').remove();
				$('#hero-display').html(players[i].pix);
				$('#health-display').append(
					$('<span/>').addClass('shown-health').text(myHealth));
				$('#attack-display').append(
					$('<span/>').addClass('shown-attack').text(myAttack));
				$('shown-stat').remove();
			//	reloadPlayerBoard(ndx);
			}
		}	 
	} else if (firstChallenger === 2) {
		
		for (var i = 0; i < toggle.length; i++) {
			if (i === ndx) {
				opponentindx = ndx;
				yourHealth = Math.floor((Math.random() * 350) + 25);
				yourCounter = Math.floor((Math.random() * 25) + 1);			
				$('.shown-your-health').remove();
				$('.shown-counter').remove();
				$('#opponent-display').html(players[i].pix);
				$('#your-health-display').append(
					$('<span/>').addClass('shown-your-health').text(yourHealth));
				$('#counter-display').append(
					$('<span/>').addClass('shown-counter').text(yourCounter));
				$('shown-stat').remove();
			//	reloadPlayerBoard(ndx);
			}
		}
			
	}
//}	//		
		

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
var words = [
			{name:'Rey Skywalker', hp:169, ap:123},
			{name:'Jyn Erso', hp:143, ap:123}, 
			{name:'Finn', hp:196, ap:123}, 
			{name:'Poe Dameron', hp:143, ap:123}, 
			{name:'Hans Solo', hp:259, ap:123}, 
			{name:'Chewbacca', hp:54, ap:123}, 
			{name:'Storm Trooper', hp:110, ap:123}, 
			{name:'Top Storm Trooper', hp:243, ap:123}, 
			{name:'Supreme Leader Snoke', hp:154, ap:123}, 
			{name:'General Hux', hp:184, ap:123}, 
			{name:'Darth Vadr', hp:87, ap:123}]

var players = [
			{pix:' <img id="toggle" onclick="pickChallengers(0)" src="assets/images/reyskywalker2.png" style="width: 48; height: 48; "> ', 
			name:'Rey', hp:169, ap:272},
			{pix:' <img id="toggle" onclick="pickChallengers(1)" src="assets/images/jynerso.png" style="width: 48; height: 48;" > ', 
			name:'Jyn', hp:143, ap:212}, 
			{pix:' <img id="toggle" onclick="pickChallengers(2)" src="assets/images/finn.png" style="width: 48; height: 48;" > ', 
			name:'Finn', hp:196, ap:259}, 
			{pix:' <img id="toggle" onclick="pickChallengers(3)" src="assets/images/stormtrooper.jpg" style="width: 48; height: 48;" > ', 
			name:'Storm Trooper', hp:110, ap:226}, 
			{pix:' <img id="toggle" onclick="pickChallengers(4)" src="assets/images/supremeleadersnoke.png" style="width: 48; height: 48;" > ', 
			name:'Supreme Leader', hp:154, ap:78}, 
			{pix:' <img id="toggle" onclick="pickChallengers(5)" src="assets/images/generalhux.png" style="width: 48; height: 48;" > ', 
			name:'General Hux', hp:184, ap:165} 
			]

var healthPoints = ['<p style="color: white; font-size: 16px;">Health Points: </p>', 
					'<p style="color: white; font-size: 16px;">Health Points: </p>', 
					'<p style="color: white; font-size: 16px;">Health Points: </p>', 
					'<p style="color: white; font-size: 16px;">Health Points: </p>', 
					'<p style="color: white; font-size: 16px;">Health Points: </p>', 
					'<p style="color: white; font-size: 16px;">Health Points: </p>', 
					'<p style="color: white; font-size: 16px;">Health Points: </p>', 
					'<p style="color: white; font-size: 16px;">Health Points: </p>', 
					'<p style="color: white; font-size: 16px;">Health Points: </p>', 
					'<p style="color: white; font-size: 16px;">Health Points: </p>', 
					'<p style="color: white; font-size: 16px;">Health Points: </p>'];

			 
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

var himgs = [' <img id="toggle" onclick="pickChallengers(0)" src="assets/images/reyskywalker.png" style="width: 48; height: 48; "> ',
			 ' <img id="toggle" onclick="pickChallengers(1)" src="assets/images/jynerso.png" style="width: 48; height: 48;" > ',
			 ' <img id="toggle" onclick="pickChallengers(2)" src="assets/images/finn.png" style="width: 48; height: 48;" > ',
			 ' <img id="toggle" onclick="pickChallengers(3)" src="assets/images/PoeDameron180.jpg" style="width: 48; height: 48;" > ',
			 ' <img id="toggle" onclick="pickChallengers(4)" src="assets/images/hanssolo.png" style="width: 48; height: 48;" > ',
			 ' <img id="toggle" onclick="pickChallengers(5)" src="assets/images/chewbacca.png" style="width: 48; height: 48;" > ',
			 ' <img id="toggle" onclick="pickChallengers(6)" src="assets/images/stormtrooper.jpg" style="width: 48; height: 48;" > ',
			 ' <img id="toggle" onclick="pickChallengers(7)" src="assets/images/TopStormTrooper.jpg" style="width: 48; height: 48;" > ',
			 ' <img id="toggle" onclick="pickChallengers(8)" src="assets/images/supremeleadersnoke.png" style="width: 48; height: 48;" > ',
			 ' <img id="toggle" onclick="pickChallengers(9)" src="assets/images/generalhux.png" style="width: 48; height: 48;" > ',
			 ' <img id="toggle" onclick="pickChallengers(10)" src="assets/images/darthvader.jpg" style="width: 48; height: 48;" > ']; 
			

			
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

