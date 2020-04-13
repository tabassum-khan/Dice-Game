var scores = [];
var count = [0, 0, 0, 0, 0, 0];
var dice = $('.dice');

$(document).ready(function () {

    flick($($('.dice p')[0]));


    // Play the dice on click
    $(dice).click(function (e) {
        play(this)
    });

});

//Play function
function play(input) {
    if ($(input).hasClass('disable'))
        console.log("Is Disable");
    else {
        rollDice(input);
        // $(this).unbind("click");
        $(input).addClass('disable');
        
        var player = $(input).find('p');
        stopFlick(player);

        var nextPlayer = $(input).next().find('p');
        flick(nextPlayer);
       
        $(input).next().removeClass('disable');
    }
}


// Rolling the dice on keypresses : 1,2,3....
$(document).keypress(function (e) {
    if (e.key === " ") {
        console.log("Browser Refreshed");
        location.reload();
    }
    var key = parseInt(e.key);

    // console.log($('.img').hasClass(key));
    if (!$('.img').hasClass(key) || key === NaN) {
        console.log("Player doesn't exist");
    } else {
        console.log("Player " + key + "played.");
        play(dice[key - 1]);
    }

});


//the player 'p' will keep flicking until the player has played
function flick(player) {
    $(player).addClass('flicker');
}


//Stop flicking 'p' after the player has played
function stopFlick(player) {
    $(player).removeClass('flicker');
}


// Roll a random number on the Dice 
function rollDice(input) {
    var n = Math.floor(Math.random() * 6) + 1;
    scores.push(n);
    count[n - 1]++;

    var randomImage = 'images/dice' + n + '.png';
    var img = $(input).find("img");

    img.hide();
    img.attr("src", randomImage).fadeIn(500);

    console.log(scores);
    // When all the scores have been recorded, print the winner
    if (scores.length === dice.length) {
        printWinner();
        playAudio();
    }

}

function printWinner() {
    console.log("PrintWinner");
    var max = 0;
    var winner = 0;


    //Calculate who the winner is
    for (var i = 0; i < scores.length; i++) {
        if (scores[i] > max) {
            max = scores[i];
            winner = i + 1;
        }
    }
    
    // console.log(count)
    // console.log(max+ " " + winner);
    

    // the match is drawn if more than one player has the same 'max' number on the dice 
    if (count[max - 1] > 1) {
        $('h1').hide();
        $('h1').text("Draw. Play Again!").fadeIn(500);
    } else {
        $('h1').hide();
        $('h1').text("Player " + winner + " wins!").fadeIn(500);
    }

}


//Play Audio on annoucing the winner
function playAudio(){
    var audio1 = new Audio('sounds/snare.mp3');
    var audio2 = new Audio('sounds/crash.mp3');
       
    audio1.play();
    audio2.play();
    audio1.play();
}