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
var playerndx;

//};
var opponentHP = 0;
var heroAttackPT = 0;
var opponentAttackPT = 0;
var opponentCounterAttackPT = 0;
//var baseAttackPT = (baseAttackPT + heroAttackPT);
//var lifeLeft = (baseHealthPoints - injuryPoints);
var injuryPoints = 0;

//$(document).ready(resetGame);
var audioElement = document.createElement('audio');
var imageElement = document.createElement('image');

// ---- OnClick Button Section ----
$("#startGame").click(startGame);
$("#attack").click(attack);
$("#resetGame").click(resetGame);
$("#nextRound").click(nextRound);

function startGame () {
	resetUI();    			// Step 1 Start game and reset() from ui
	loadPlayerBoard();		// Step 4 Load player thumbnails on player board

}
function resetGame () {
	resetUI();
	loadPlayerBoard();
}

function attack () {
	yourHealth = (yourHealth - myAttack);	

	if (yourHealth <= 0) {
		myWins++;
		yourLosses++;
		drawMyWins(myWins);
		drawYourLosses(yourLosses);
		$('.msg-text').remove();
		yourHealth = 0;
		yourCounter = 0;
		resetOpponentStats();
		var j = opponentindx; 
		alert("You have defeated your opponent");
		$('#msg-display').append(
			$('<span/>').addClass('msg-text pull-right').text("Select a new opponent to continue"));
		$('#vanquished-display').append (
			$('<div/>').addClass('shown-vanquished pull-left').html(players[j].pix));
		
	} else {

		$('.shown-your-health').remove();
		$('#your-health-display').append(
			$('<span/>').addClass('shown-your-health').text(yourHealth));
		counterAttack();
	}
}

function counterAttack () {
	myHealth = (myHealth - yourCounter);
	
	if (myHealth <= 0) {
		myLosses++;
		yourWins++;
		drawMyLosses(myLosses);
		drawYourWins(yourWins);
		$('.msg-text').remove();
		myHealth = 0;
		myAttack = 0;
		alert("You are dead!");
		resetPlayerStats();
		$('#msg-display').append(
			$('<span/>').addClass('msg-text pull-right').text("Game over, press 'reset game' to play again"));
	} else {
	
		$('.shown-health').remove();
		$('#health-display').append(
			$('<span/>').addClass('shown-health').text(myHealth));
	}
}

function resetOpponentStats() {
	
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

function resetPlayerStats () {
	
	resetUI();
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

function dsplWinnerBoard () {
	$( "#toggle" ).attr( "style", "visibility: visible;" ); 
	$("img").removeAttr("style");
}

// ---
// --- control ui ---
// --- BGN ui ---

function resetUI () {
	myWins = 0;
	myLosses = 0;
	myHealth = 0;
	myAttack = 0;
	yourWins = 0;
	yourLosses = 0;
	yourHealth = 0;
	yourCounter = 0;
	firstChallenger = 0;
	$('.shown-picture').remove();
	$('.opponent-display').remove();
	$('.shown-vanquished').remove();
	$('.shown-health').remove();
	$('.challengers').remove();
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

function drawMyWins( myWins ) {
    $('.shown-wins').remove();
	$('#wins-display').append(
	    $('<span/>').addClass('shown-wins').text(myWins));
    
}
function drawMyLosses( myLosses ) {
    $('.shown-losses').remove();
	$('#losses-display').append(
	    $('<span/>').addClass('shown-losses').text(myLosses));
    
}
function drawMyHealth ( myHealth ) {
	$('.shown-health').remove();
	$('#health-display').append(
		$('<span/>').addClass('shown-health').text(myHealth));
}
function drawMyAttack( myAttack ) {
	$('.shown-attack').remove();
	$('#attack-display').append(
		$('<span/>').addClass('shown-attack').text(myAttack));
}
function drawYourWins( yourWins ) {
    $('.shown-your-wins').remove();
	$('#your-wins-display').append(
	    $('<span/>').addClass('shown-your-wins').text(yourWins));
    
}

function drawYourLosses( yourLosses ) {
    $('.shown-your-losses').remove();
	$('#your-losses-display').append(
	    $('<span/>').addClass('shown-your-losses').text(yourLosses));
    
}
function drawYourHealth ( yourHealth ) {

	$('.shown-your-health').remove();
	$('#your-health-display').append(
		$('<span/>').addClass('shown-your-health').text(yourHealth));
}
function drawYourCounter( yourCounter ) {
	$('.shown-counter').remove();
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
			$('<div/>').addClass('shown-picture challengers pull-left').html(players[i].pix));
		$('#picture-display').append (	
			$('<span/>').addClass('shown-stat challengers pull-left').html(players[i].name));
	}
		
}

function reloadPlayerBoard(arg) {
	checkndx();
	$('.challengers').remove();
	for (var i = 0; i < players.length; i++) {
		if (i != arg) {
		$('#picture-display').append (
			$('<div/>').addClass('shown-picture challengers pull-left').html(players[i].pix));
		$('#picture-display').append (	
			$('<span/>').addClass('shown-stat challengers pull-left').html(players[i].name));
	}}
		
}

function myFunction() {
    document.getElementById("demo").innerHTML = ages.filter(checkAdult);
}

function checkndx(players) {
	return players != (playerndx || opponentindx);
}

function pickChallengers(ndx) {
	firstChallenger++;

	console.log("value of " + ndx);
	console.log("value of " + toggle[ndx]);
	
//	for (var i = 0; i < toggle.length; i++) { //
	if (firstChallenger === 1) {

		for (var i = 0; i < toggle.length; i++) {
			if (i === ndx) {
				playerndx = ndx;
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
				if (i === ndx) {   $('.challenger').remove();}
				reloadPlayerBoard(ndx);
			}
		}	 
	} else if (firstChallenger === 2) {
		
		for (var i = 0; i < players.length; i++) {
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
				if (i === ndx) {   $('.challenger').remove();}
				reloadPlayerBoard(ndx);
			}
		}
			
	} else {
		nextRound(ndx);
	}
//}	//		
		

}
function nextRound (ndx) {
	firstChallenger++;
	reloadPlayerBoard();
	if (firstChallenger > 2) {
		for (var i = 0; i < players.length; i++) {
			if (i === ndx) {
				opponentindx = ndx;
				yourHealth = Math.floor((Math.random() * 350) + 25);
				yourCounter = Math.floor((Math.random() * 25) + 1);			
				$('.shown-your-health').remove();
				$('.shown-counter').remove();
				$('.shown-opponent').remove();
				$('#opponent-display').append(
					$('<span/>').addClass('shown-opponent').html(players[i].pix));
				$('#your-health-display').append(
					$('<span/>').addClass('shown-your-health').text(yourHealth));
				$('#counter-display').append(
					$('<span/>').addClass('shown-counter').text(yourCounter));
		}
	}}
}

// --- END ui ---
// --- 
// ---
// --- rules for game ---
// --- BGN rules ---

// This array holds the players to choose from.
// ------Add new words!

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
			 ' <img id="toggle" onclick="pickChallengers(10)" src="assets/images/darthvader.jpg" style="width: 48; height: 48;" > '
			 ]; 
// --- End of Program --- 			