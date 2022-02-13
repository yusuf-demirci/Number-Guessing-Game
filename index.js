let gameOver = false;
let easyLevel = $("#easy");
let hardLevel = $("#hard");

let answer = randomNumber();
let previousGuesses = [];
$("#guess-number").focus();

function randomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function reset() {
    $(".down")[0].innerText = 1;
    $(".up")[0].innerText = 100;
    $(".report")[0].innerText = "Make a guess!"
    $(".attempts span")[0].innerText = "10"
    $("#guess-number")[0].value = "";
    $("#guess-number").focus();
    previousGuesses = [];
    easyLevel.prop("checked", true);

    answer = randomNumber();
    console.log(answer)
    gameOver = false;
}

function guess(){
    let guess = +$("#guess-number")[0].value
    let report = $(".report")[0]
    let down = $(".down")[0]
    let up = $(".up")[0]
    let remainingAttempts = $(".attempts span")[0]

    if (!guess || gameOver || guess < 0 || guess > 100) {
        $("#guess-number")[0].value = "";
        $("#guess-number").focus();
        return;
    }

    if (previousGuesses.includes(guess)) {
        report.innerText = `You already guessed ${guess}!`;
    } else {
        if (guess > answer) {
            report.innerText = "Little lower!";
            up.innerText > guess ? (up.innerText = guess) : null
        }
        else if (guess < answer) {
            report.innerText = "Little higher!";
            down.innerText < guess ? (down.innerText = guess) : null
        }
        else {
            report.innerText = `You got it! The number was ${answer}.`;
            gameOver = true;
        }

        previousGuesses.push(guess)
        remainingAttempts.innerText = +remainingAttempts.innerText - 1;

        if (remainingAttempts.innerText == 0) {
            report.innerText = `You run out of attempts! The number was ${answer}.`
            gameOver = true;
        }
    }
    $("#guess-number")[0].value = "";
    $("#guess-number").focus();
}

$("#guess-btn").click(guess)
$(".reset").click(reset)

$(".difficulty").change(function () {
    if (easyLevel.is(":checked")) {
        reset();
        $(".attempts span")[0].innerText = "10";
    } else {
        reset();
        hardLevel.prop("checked", true)
        $(".attempts span")[0].innerText = "5";
    }
})

$(document).keydown(function(e){
    if (e.code === "Enter") guess();
})



