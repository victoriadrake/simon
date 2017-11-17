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

var msg = {
    0: 'Wandering through the post-apocalyptic city of Quin\'see, you suddenly find your path blocked...',
    1: 'Four mysterious floating orbs have appeared!',
    2: 'From all around you, a voice is heard...',
    3: 'Simon: Greetings, traveler. I am Simon, a highly advanced artificial intelligence written in Clojure. I am the keeper of this gateway.',
    4: 'Simon: To pass, you must first prove yourself worthy by accepting my challenge! It is a formidable test of skills based on a children\'s toy from the ancient era known only as "The Eighties."',
    5: 'Simon: Follow the sequence of the orbs. Master twenty steps and you shall pass; fail and you risk certain doom!',
}

var simonPrompt = {
    0: 'Simon: My turn.',
    1: 'Simon: Pay close attention now.',
    2: 'Simon: Concentrate.',
}

function intro() {
    let i = 1;
    $('#message').html(msg[0]); // click to advance
    $('#next').click(function () {
        console.log(msg[i]);
        if (i < 5) {
            $('#message').html(msg[i++]);
            $('#floor').removeClass('empty');
        } else {
            $('#next').css('opacity', '0');
            $('#message').html(msg[i++]);
            $('.controls').css('opacity', '1');
        }
    });
}

function noticeMe(orb) {
    $('#orb' + orb).addClass('notice');
    console.log('notice!');
    switch (orb) {
        case 1: sounds.red.play(); break;
        case 2: sounds.green.play(); break;
        case 3: sounds.yellow.play(); break;
        case 4: sounds.blue.play(); break;
    }
    setTimeout(() => {
        $('#orb' + orb).removeClass('notice');
    }, 400);
}

var simon = {
    name: 'simon',
    simonSays: function () {
        game.values.push(Math.ceil(Math.random() * 4));
        console.log('game: ' + game.values);
        game.stage++;
        $('#stage').html(game.stage);
    },
    playSimon: function () { // could add no-click here?
        var m = Math.ceil(Math.random() * (Object.keys(simonPrompt).length - 1));
        console.log(simonPrompt[m]);
        $('#message').html(simonPrompt[m]);
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
        }, 700)
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
                //$('#message').html('Simon: Good.');
            }
        }
        else {
            game.lose();
        }
    }
};

var setMode = {
    normal: function () {
        game.mode = 'normal';
        $('#mode').html('Normal Mode');
        $('.wrapper').removeClass('strict');
    },
    strict: function () {
        game.mode = 'strict';
        $('#mode').html('Strict Mode');
        $('.wrapper').addClass('strict-flash');
        setTimeout(() => {
            $('.wrapper').removeClass('strict-flash');
            $('.wrapper').addClass('strict');
        }, 35);
    },
    nuke: function () {
        console.log('Kill with fire!');
        $('#floor').addClass('quake');
        setTimeout(() => {
            $('#floor').removeClass('quake');
            $('.controls').addClass('dim');
            $('.wrapper').addClass('nuke-flash');
        }, 2000);
        setTimeout(() => {
            $('#floor').addClass('empty');
            $('.wrapper').removeClass('nuke-flash');
            $('.wrapper').removeClass('strict');
            $('#message').html('Simon: ...');
        }, 2750);
        setTimeout(() => {
            $('#replay').css('display', 'block');
        }, 4000);
        // jQuery, css stuff
        // show option to game.start()
    },
}

var game = {
    state: simon,
    values: [],
    mode: 'normal',
    stage: 0,
    reset: function () {
        game.stage = 0;
        game.state = simon;
        if (game.mode == 'normal') {
            setMode.normal()
        }
        if (game.mode == 'strict') {
            setMode.strict();
        }
        game.values = [];
        $('#stage').html(game.stage);
    },
    start: function () {
        $('#floor').removeClass('empty');
        $('.controls').removeClass('dim');
        $('#replay').css('display', 'none');
        $('#message').html('Simon: Let us begin.');
        game.reset();
        $('.orb').addClass('no-click');
        simon.simonSays();
        simon.playSimon();
    },
    setState: function (state) {
        if (state.name == 'simon') {
            game.state = player;
            player.getInput();
        }
        else {
            game.state = simon;
            $('.orb').addClass('no-click');
            if (game.stage >= 5) {
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
            $('#message').html('Simon: And I was just starting to like you...');
            setMode.nuke();
        }
        else {
            game.state = simon;
            console.log('Bad human.');
            $('#message').html('Simon: Try again.');
            $('.orb').addClass('no-click');
            $('#floor').addClass('quake');
            setTimeout(() => {
                $('#floor').removeClass('quake');
                simon.playSimon();
            }, 500);
        }
    },
    win: function () {
        $('#message').html('Simon: Well done, brave human. Safe passage is yours.');
        //all flash
        $('.wrapper').addClass('happy-time'); // transition?
        $('.controls').addClass('dim');
        let orbs = [3,4,4,3,4,2,1];
        let v = 0;
        let t = setInterval(function () {
            noticeMe(orbs[v]);
            if (v >= orbs.length - 1) {
                clearInterval(t);
            }
            else {
                v++;
            }
        }, 700)
        setTimeout (() => {
            $('.wrapper').removeClass('happy-time');
            $('#floor').addClass('empty');
            $('#replay').css('display', 'block');
        }, 5300)
        // jQuery, css stuff
        // show option to game.start()
    }
};

// Page loaded
$(document).ready(function () {
    Object.keys(sounds).forEach(key => {
        sounds[key].load();
    });

    intro();

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
        $('#start').html('Restart');
    });

    $('#replay').click(function () {
        game.start();
    })

    $('#mode').click(function () {
        if (game.mode == 'normal') {
            setMode.strict();
            console.log('mode: ' + game.mode);
        }
        else {
            setMode.normal();
            console.log('mode: ' + game.mode);
        }
    });
});