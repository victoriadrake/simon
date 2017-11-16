/*
SIMON
nuke:
- rumble effect
- emanating glow to white screen
- "Oh no..."
*/

var sounds = {
    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
};

function noticeMe(orb) {
    $('#orb' + orb).addClass('notice');
    switch (orb) {
        case 1: sounds.red.play(); break;
        case 2: sounds.green.play(); break;
        case 3: sounds.yellow.play(); break;
        case 4: sounds.blue.play(); break;
    }
    setTimeout(() => {
        $('#orb' + orb).removeClass('notice');
    }, 350);
}

var simon = {
    name: 'simon',
    simonSays: function () {
        game.values.push(Math.ceil(Math.random() * 4));
        console.log('game: ' + game.values);
        game.stage++;
        // show game stage
    },
    playSimon: function () { // could add no-click here?
        var v = 0;
        var t = setInterval(function () {
            noticeMe(game.values[v]);
            if (v >= game.values.length - 1) { // do I need -1?
                clearInterval(t);
                game.setState(simon);
            }
            else {
                v++;
            }
        }, 500)
    }
};

var player = {
    name: 'player',
    step: 0,
    total: 0,
    getInput: function () {
        // Remove clickability
        $('.orb').removeClass('no-click');
        player.step = 0;
        player.total = game.values.length;
    },
    checkInput: function (input) {
        if (input == game.values[player.step]) {
            player.step++;
            if (player.step >= player.total) {
                game.setState(player);
                console.log('Good human.');
            }
        }
        else {
            game.lose();
        }
    }
};

/* var mode = {
    normal: function () {
        // normal mode
    },
    strict: function() {
        $('.wrapper').addClass('strict');
    },
    nuke: function () {
        console.log('Kill with fire!');
        // jQuery, css stuff
        // show option to game.start()
    },
}
 */
var game = {
    state: simon,
    values: [],
    mode: 'normal',
    stage: 0,
    reset: function () {
        game.stage = 0;
        game.state = simon;
        game.values = [];
        // show game stage
    },
    start: function () {
        console.log('Let us begin.');
        game.reset();
        $('.orb').addClass('no-click');
        simon.simonSays();
        simon.playSimon();
    },
    nuke: function () {
        console.log('Kill with fire!');
        $('#floor').addClass('quake');
        setTimeout(() => {
            $('#floor').removeClass('quake');
            $('.wrapper').addClass('nuke-flash');
        }, 2000);
        setTimeout(() => {
            $('.wrapper').removeClass('nuke-flash');
            $('.wrapper').removeClass('strict');
            $('#floor').addClass('empty');
        }, 2750);
        // jQuery, css stuff
        // show option to game.start()
    },
    setState: function (state) {
        if (state.name == 'simon') {
            game.state = player;
            player.getInput();
        }
        else {
            game.state = simon;
            $('.orb').addClass('no-click');
            if (game.stage >= 20) {
                game.win(); //win?
            }
            else {
                simon.simonSays();
                setTimeout(simon.playSimon, 500);
            }
        }
        console.log('game state: ' + game.state.name);
    },
    lose: function () {
        if (game.mode == 'strict') {
            game.nuke();
        }
        else {
            game.state = simon;
            console.log('Bad human.');
            $('.orb').addClass('no-click');
            setTimeout(simon.playSimon, 500);
        }
    },
    win: function () {
        // jQuery, css stuff
        // show option to game.start()
    }
};

// Page loaded
$(document).ready(function () {
    Object.keys(sounds).forEach(key => {
        console.log('loaded sound: ' + key);
        sounds[key].load();
    });

    $('.orb').click(function (event) {
        var orb = parseInt($(this).attr('value'));
        console.log('input = ' + orb);
        switch (orb) {
            case 1: sounds.red.play(); break;
            case 2: sounds.green.play(); break;
            case 3: sounds.yellow.play(); break;
            case 4: sounds.blue.play(); break;
        }
        if (game.state == player) {
            player.checkInput(orb);
        }
    });

    $('#start').click(function () {
        game.start();
    });

    $('#mode').click(function () {
        if (game.mode == 'normal') {
            game.mode = 'strict';
            $('#mode').html('Strict Mode');
            $('.wrapper').addClass('strict-flash');
            setTimeout(() => {
                $('.wrapper').removeClass('strict-flash');
                $('.wrapper').addClass('strict');
            }, 35);
            console.log('mode: ' + game.mode);
            // Show mode
        }
        else {
            game.mode = 'normal';
            // Show mode
            $('#mode').html('Normal Mode');
            $('.wrapper').removeClass('strict', 1000, 'linear'); // no transition?
            console.log('mode: ' + game.mode);
        }
    });
});