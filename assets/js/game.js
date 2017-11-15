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
}
// 👍 console.log(makeGame());

function simonSays() {
    $('#orb' + game[step]).addClass() // Hover state?
}

function getInput() {
    // Get value of clicked orb
    $('.orb').click(function (event) {
        var input = parseInt($(this).attr('value'));
        console.log('input = ' + input);
        return input;
    })
}

function userInput() {
    return new Promise(resolve => {
        console.log('Do something?');
        $('.orb').click(function (event) {
            var input = parseInt($(this).attr('value'));
            console.log('input = ' + input);
            return input;
        })
        resolve();
    });
}

async function play() {
    const a = await userInput();
    return a;
}

// Called in game for loop where step is i, click target is input
function compare(step, input) {
    var verdict = game[step] === input;
    return verdict;
}

function response(verdict) {
    if (verdict) {
        console.log('Good human.');
    }
    else {
        console.log('Bad human.');
    }
}

// Page loaded
$(document).ready(function () {
    console.log('Want to play a game?');
    // make game, intro
    // strict is true or false

play(). then(v => {
    console.log('Play on');
});

});