// Lets me know the program has started
console.log("Program Started");

// Variables, Constants, and Listeners

// Variables and Listeners for different button presses
const go_button = document.getElementById("Submit");
go_button.addEventListener('click', buttonClicked);

// Make a function to separate the english meaning and put each meaning into separate variables.
// Contains Vocab
const L3_u_verbs_jpns = ["いく","かえる","きく","のむ","はなす","よむ"];
const L3_u_verbs_kanji = ["行く","帰る","聞く","飲む","話す","読む"];
const L3_u_verbs_eng = ["to go",["to go back","to return"],["to listen","to hear"],"to drink",["to speak","to talk"],"to read"];

const L3_ru_verbs_jpns = ["おきる","たべる","ねる","みる"];
const L3_ru_verbs_kanji = ["起きる","食べる","寝る","見る"];
const L3_ru_verbs_eng = ["to get up","to eat",["to sleep","to go to sleep"],["to see","to look at","to watch"]];

const L3_ireg_verbs_jpns = ["くる","する","べんきょうする"];
const L3_ireg_verbs_kanji = ["来る","","勉強する"];
const L3_ireg_verbs_eng = ["to come","to do","to study"];

var all_L3_verbs_jpns = [...L3_u_verbs_jpns,...L3_ru_verbs_jpns,...L3_ireg_verbs_jpns];
var all_L3_verbs_kanji = [...L3_u_verbs_kanji,...L3_ru_verbs_kanji,...L3_ireg_verbs_kanji];
var all_L3_verbs_eng = [...L3_u_verbs_eng,...L3_ru_verbs_eng,...L3_ireg_verbs_eng];

// Stores what's in textbox
var textbox = '';

// Selects a random number within the vocab array scope
var x = all_L3_verbs_jpns.length;
var y = Math.floor(Math.random() * x);
document.getElementById("Question").textContent = "What does " + all_L3_verbs_jpns[y] + " mean?";


// When an element with id = "button" is clicked, following code is executed
function buttonClicked() {
    // Gets value inputed into the textbox and stores it
    textbox = document.getElementById("AnswerBox").value.trim().toLowerCase();

    /*
    // Debugging commands
    alert("Button was clicked! You wrote " + textbox);
    console.log("Button was clicked!");
    */

    // Code checking for multiple definitions of a word
    if (typeof all_L3_verbs_eng[y] === "string") {
        if (textbox == all_L3_verbs_eng[y]) {
            document.getElementById("Feedback").textContent = "You wrote " + textbox + ". This is correct!";
            console.log("Correct!");
           } else {
            document.getElementById("Feedback").textContent = "You wrote " + textbox + ". This is incorrect. Try again. You can do it!!!";
            console.log("Incorrect :(");
           } 
           // Debugging code.
           /*else {
            document.getElementById("Feedback").textContent = "There was a fucky wucky in your code. Get better >:D";
            console.log("Fucky Wucky!");
           }*/
    } else {
        var z = all_L3_verbs_eng[y].length;
        for (let i = 0; i != z; i++) {
            if (textbox != all_L3_verbs_eng[y][i]) {
                continue;
            } else {
                console.log("Correct!");
                document.getElementById("Feedback").textContent = "You wrote " + textbox + 
                ". This is correct! There are other definitions for this word too, so try to remember those as well!";
                return;
            }
        }
        //Debug Command
        //console.log("You're going the right direction.");
        document.getElementById("Feedback").textContent = "You wrote " + textbox + ". This is incorrect. Try again. You can do it!!!";
    }
}

/*
function generateQuestion() {
    x = all_L3_verbs_jpns.length;
    y = Math.floor(Math.random() * x);
    document.getElementById("Question").textContent = "What does " + all_L3_verbs_jpns[y] + " mean?";
}
*/

/*
function buttonClicked() {
    let textbox = document.getElementById("AnswerBox").value;
    let userInput = textbox.trim().toLowerCase();

    let correctAnswer = all_L3_verbs_eng[y];

    if (typeof correctAnswer === "string") {
        if (userInput === correctAnswer.toLowerCase()) {
            document.getElementById("Feedback").textContent = `You wrote "${textbox}". This is correct!`;
            console.log("Correct!");
            generateQuestion(); // Optional: go to next question
        } else {
            document.getElementById("Feedback").textContent = `You wrote "${textbox}". This is incorrect. Try again!`;
            console.log("Incorrect :(");
        }
    } else if (Array.isArray(correctAnswer)) {
        let isCorrect = false;
        for (let i = 0; i < correctAnswer.length; i++) {
            if (userInput === correctAnswer[i].toLowerCase()) {
                isCorrect = true;
                break;
            }
        }

        if (isCorrect) {
            document.getElementById("Feedback").textContent = `You wrote "${textbox}". This is correct! There are other meanings too, so try to remember them!`;
            console.log("Correct!");
            generateQuestion(); // Optional
        } else {
            document.getElementById("Feedback").textContent = `You wrote "${textbox}". This is incorrect. Try again!`;
            console.log("Incorrect");
        }
    } else {
        console.log("Something went wrong with the data.");
        document.getElementById("Feedback").textContent = "Unexpected error.";
    }
}
*/