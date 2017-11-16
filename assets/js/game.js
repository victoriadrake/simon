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
var game = [],
    player = [],
    strict = false,
    click = 0,
    turn = 0;

function makeGame() {
    for (var i = 0; i < 20; i++) {
        var v = Math.ceil(Math.random() * 4);
        game.push(v);
    }
    console.log(game);
}

function nuke() {
    console.log("Kill with fire.");
}

// Flash Simon's sequence
function simonSays(orange) {
    console.log('simon says: ' + orange);
    return new Promise(function (resolve) {
        for (var i of orange) {
            let orb = i;
            $('#orb' + orb).addClass('notice');
            setTimeout(() => {
                $('#orb' + orb).removeClass('notice');
            }, 350);
        };
        resolve;
    })
}

// See if player input is correct and dole out results
function compare(a, b) {
    if ((a != b) && (strict)) {
        nuke();
    }
    if ((a != b) && (strict == false)) {
        console.log('Bad human.', a, b);
        simonSays(game.slice(0, click));
        return;
    }
    if ((a === b) && (click === game.slice(0, turn).length)) {
        console.log('Good human.');
        console.log('That all.');
        click = 0;
        simonSays(game.slice(0, turn + 1));
        takeInput(0);
    }
    if (a === b) {
        return;
    }
}

// Receive player input
function takeInput(pie) {
    turn++;
    click++;
    console.log('pie: ' + pie)
    // Add click handler...
    $('.orb').click(function (event) {
        // When clicked...
        var input = parseInt($(this).attr('value'));
        console.log('input = ' + input);

        // Drive game
        compare(input, game[pie]);
        takeInput(pie + 1);

    })
}

// 👍

function play(turn) {
    simonSays(game.slice(0, turn + 1));
    takeInput(0);
}

// Page loaded
$(document).ready(function () {
    console.log('Want to play a game?');

    makeGame();
    play(click);

});