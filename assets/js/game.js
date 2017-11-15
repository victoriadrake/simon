/*
SIMON
onload():
- generate game array
- play intro function - user chooses strict or normal

click():
- input drives gameplay for loop
*/

// Globals
var game = [];
var strict;

// Generate game array
function makeGame() {
    for (var i = 0; i <= 20; i++) {
        var v = Math.ceil(Math.random() * 4);
        game.push(v);
    }
    return game;
} // 👍 console.log(makeGame());

function simonSays(which) {
    $('#orb' + which).addClass('notice');
    setTimeout(() => {
        $('#orb' + which).removeClass('notice');
    }, 350);
} // 👍


function dontGetInput() { // no listener for you
    $('.orb').off("click");
}

function getInput(step) { // adds event listener
    // Get value of clicked orb
    $('.orb').click(function (event) {
        var input = parseInt($(this).attr('value'));
        // Log value
        console.log('input = ' + input);
        compare(step, input)
    });
}

// Called in game for loop where step is i, click target is input
function compare(step, input) {
    var verdict = step === input;

    if (verdict) {
        console.log('Good human.');
    }
    else {
        console.log('Bad human.');
        dontGetInput();
    }
}

// Page loaded
$(document).ready(function () {
    console.log('Want to play a game?');
    // make game, intro
    makeGame();
    // strict is true or false

    for (var i = 0; i < 1; i++) {
        console.log(game[i]);
        simonSays(game[i]);
        getInput(game[i]);
    }

});