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
    var v = Math.ceil(Math.random() * 4);
    game.push(v);
    console.log(game);
    return game;
}

function simonSays(game) {
    for (var i = 0; i < game.length; i++) {
        console.log('Which orb: ' + game[i]);
        let orb = game[i];
        $('#orb' + orb).addClass('notice');
        setTimeout(() => {
            $('#orb' + orb).removeClass('notice');
        }, 350);
    }
} // 👍

function nuke() {
    console.log("Kill with fire.");
}

function dontGetInput() { // no listener for you
    $('.orb').off("click");
}

function getInput(game) {
    for (var v = 0; v < game.length; v++) { // For each val in game sequence, turn on handler
        $('.orb').click(function (event) { // Click drives gameplay
            var input = parseInt($(this).attr('value'));
            // Log value
            console.log('input = ' + input);
            compare(orb, input, game);
        });
    }
    makeGame();
    console.log('game length: ' + game.length);
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
        simonSays(game);
    }
    if (verdict) {
        console.log('Good human.');
    }
}

// One step
function play(game) {
    simonSays(game); // Show sequence
    getInput(game); // Turn on click handler, passing in var for later
}

// Page loaded
$(document).ready(function () {
    console.log('Want to play a game?');
    // make game, intro
    makeGame();
    // strict is true or false



});