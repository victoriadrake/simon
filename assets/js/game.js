/*
SIMON
onload():
- generate game array
- play intro function - user chooses strict or normal

click():
- input drives gameplay for loop

nuke:
- rumble effect
- emanating glow to white screen
- "Oh no..."
*/

// Globals
var strict = false;

// Generate game array
function makeGame() {
    for (var i = 0; i <= 20; i++) {
        var v = Math.ceil(Math.random() * 4);
        game.push(v);
    }
    console.log(game);
    return game;
}

function simonSays(sequence) {
    for (var i=0; i<sequence.length; i++) {
    console.log('Which orb: ' + sequence[i]);
    $('#orb' + which).addClass('notice');
    setTimeout(() => {
        $('#orb' + which).removeClass('notice');
    }, 350);
    }
} // 👍

function nuke() {
    console.log("Kill with fire.");
}

function dontGetInput() { // no listener for you
    $('.orb').off("click");
}

function getInput(orb) {
        // Get value of clicked orb
        $('.orb').click(function (event) { // Click drives gameplay
            var input = parseInt($(this).attr('value'));
            // Log value
            console.log('input = ' + input);
            compare(orb, input);
        });
}

// Called in game for loop where step is i, click target is input
function compare(orb, input) {
    var verdict = orb === input;
    console.log('verdict: ' + verdict);
    if (verdict === false && strict) {
        nuke();
    }
    if (verdict === false && strict === false) {
        dontGetInput();
        // Feedback
        console.log('Bad human.');
    }
    if (verdict) {
        console.log('Good human.');
    }
}

// One step
function play(step) {
    console.log('step: ' + step);
    console.log('orb: ' + game[step]);
    simonSays(game[step]);
    getInput(game[step]);
}

// Page loaded
$(document).ready(function () {
    console.log('Want to play a game?');
    // make game, intro
    makeGame();
    // strict is true or false



});