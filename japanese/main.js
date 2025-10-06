/*
AUTHOR: retromacbytes.net owner
CREATED ON: 09/09/2025
EDITED ON: 10/04/2025
PURPOSE: A js program to provide functionality to my Japanese language practice webpage.
*/


// Lets me know the program has started
console.log("Program Started");


// Variables, Constants, and Listeners

// Used in adjustFooterPosition();
var screenHeight;
var windowHeight;
var contentHeight;
var footerHeight;

// Variables and Listeners for verious actions

// Button presses
const go_button = document.getElementById("Submit");
const answerBox = document.getElementById("AnswerBox");
const next_button = document.getElementById("Next");
const feedback = document.getElementById("Feedback");
const start_button = document.getElementById("Start");
go_button.addEventListener('click', function(event) {
    goButtonClicked();
    adjustFooterPosition();
});
answerBox.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        goButtonClicked();
        adjustFooterPosition();
    }
});
next_button.addEventListener('click', function(event) {
    generateQuestion();
    adjustFooterPosition();
});
start_button.addEventListener('click', function(event) {
    startButtonClicked();
    adjustFooterPosition();
})

// Initial Window resizing
window.addEventListener('DOMContentLoaded', function() {
    adjustFooterPosition();
});
window.addEventListener('resize', function() {
    adjustFooterPosition();
});
window.addEventListener('reset', function() {
    adjustFooterPosition();
})


// Contains Vocab and meanings

// L14 Vocabulary
const L14_nouns_jpns = ["おくさん", "ごしゅじん", "パートナー", "おじさん", "おばさん", "りょうしん", "おおやさん", "みなさん", "チョコレート", "みかん", "トレーナー", "シャツ", "ネクタイ", "マフラー", "ゆびわ", "えんぴつ", "ぬいぐるみ", "まんが", "けしょうひん", "ラジオ",
    "おさら", "おかえし", "りれきしょ", "クリスマス", "バレンタインデー", "ホワイトデー"];
const L14_nouns_eng = ["wife", "husband", "partner", ["uncle", "middle-aged man"], ["aunt", "middle-aged woman"], "parents", ["landlord", "landlady"], ["everyone", "all of you"], "chocolate", "mandarin orange", "sweatshirt", "shirt", "necktie", "winter scarf",
    "ring", "pencil", "stuffed animal", "comic book", "cosmetics", "radio", ["plate", "dish"], "return", "christmas", "valentine's day", "white day"];

const L14_i_adjectives_jpns = ["ほしい"];
const L14_i_adjectives_eng = ["to want"];
const L14_na_adjectives_jpns = ["おしゃれ(な)", "けち(な)"];
const L14_na_adjectives_eng = [["fashionable", "stylish"], ["stingy", "cheap"]];

const L14_u_verbs_jpns = ["おくる", "にあう"];
const L14_u_verbs_eng = ["to send", "to look good"];
const L14_ru_verbs_jpns = ["あきらめる", "あげる", "くれる", "できる"];
const L14_ru_verbs_eng = ["to give up", "to give others", "to give me", ["to come into existance", "to be made"]];
const L14_ireg_verbs_jpns = ["そうだんする", "ちゅういする", "プロポーズする"];
const L14_ireg_verbs_eng = ["to consult", "to give warning", "to watch out", "to propose marriage"];

const L14_adverbs_etc_jpns = ["~くん", "~たち", "わたしたち", "こんな~", "きゅうに", "ちょうど", "よく", "さあ", "どうしたらいい"];
const L14_adverbs_etc_eng = [["mr.", "ms."], "plural", "we", ["like this", "this kind of"], "suddenly", "exactly", "well", "i am not sure", "what should one do"];
const L14_counters_jpns = ["~こ", "~さつ", "～だい", "～ひき", "～ほん"];
const L14_counters_eng = ["small items", "bound volumes", "equipment", "small animals", "long objects"];


// L3 verbs
const L3_u_verbs_jpns = ["いく","かえる","きく","のむ","はなす","よむ"];
const L3_u_verbs_kanji = ["行く","帰る","聞く","飲む","話す","読む"];
const L3_u_verbs_eng = ["to go",["to go back","to return"],["to listen","to hear"],"to drink",["to speak","to talk"],"to read"];

const L3_ru_verbs_jpns = ["おきる","たべる","ねる","みる"];
const L3_ru_verbs_kanji = ["起きる","食べる","寝る","見る"];
const L3_ru_verbs_eng = ["to get up","to eat",["to sleep","to go to sleep"],["to see","to look at","to watch"]];

const L3_ireg_verbs_jpns = ["くる","する","べんきょうする"];
const L3_ireg_verbs_kanji = ["来る","","勉強する"];
const L3_ireg_verbs_eng = ["to come","to do","to study"];

// Appends vocab lists together
// To be removed when I add the checkbox for custom vocab practice lists
var all_L14_words_jpns = [...L14_nouns_jpns,...L14_i_adjectives_jpns,...L14_na_adjectives_jpns,...L14_u_verbs_jpns,...L14_ru_verbs_jpns,...L14_ireg_verbs_jpns,...L14_adverbs_etc_jpns,...L14_counters_jpns];
var all_L14_words_eng = [...L14_nouns_eng,...L14_i_adjectives_eng,...L14_na_adjectives_eng,...L14_u_verbs_eng,...L14_ru_verbs_eng,...L14_ireg_verbs_eng,...L14_adverbs_etc_eng,...L14_counters_eng];

var all_L3_verbs_jpns = [...L3_u_verbs_jpns,...L3_ru_verbs_jpns,...L3_ireg_verbs_jpns];
var all_L3_verbs_kanji = [...L3_u_verbs_kanji,...L3_ru_verbs_kanji,...L3_ireg_verbs_kanji];
var all_L3_verbs_eng = [...L3_u_verbs_eng,...L3_ru_verbs_eng,...L3_ireg_verbs_eng];

// Stores what's in textbox
var textbox;

// List of words gotten incorrect
var incorrect_jpns = [];
var incorrect_eng = [];
/*
For later
var removeRepeats_jpns = [...new Set(incorrect_jpns)];
var removeRepeats_eng = [...new Set(incorrect_eng)];
*/

// Used in generateQuestion function
var x;
var y;


// Functions


// Adjusts the footer so that it isn't obstructing text on the page
function adjustFooterPosition() {
    screenHeight = window.screen.height;
    windowHeight = window.innerHeight;
    contentHeight = document.getElementById('content').clientHeight
    footerHeight = document.querySelector('.footer').clientHeight;

    if (contentHeight + footerHeight + 38 >= screenHeight || contentHeight + footerHeight + 38 >= windowHeight) {
        document.querySelector('.footer').style.position = 'static';
    } else {
        document.querySelector('.footer').style.position = 'fixed';
    }
    console.log('page adjusted');
}

// When an element with id = "button" is clicked, following code is executed
function goButtonClicked() {
    // Gets value inputed into the textbox and stores it
    var textboxUnchanged = document.getElementById("AnswerBox").value.trim();
    textbox = document.getElementById("AnswerBox").value.trim().toLowerCase();

    /*
    // Debugging commands
    alert("Button was clicked! You wrote " + textbox);
    console.log("Button was clicked!");
    */

    // Code checking for multiple definitions of a word
    if (typeof all_L3_verbs_eng[y] === "string") {
        if (textbox == all_L3_verbs_eng[y]) {
            // Is correct
            feedback.textContent = `You wrote "${textboxUnchanged}". This is correct!`;

            console.log("Correct!");
           } else {
            // Is incorrect
            feedback.textContent = `You wrote "${textboxUnchanged}". This is incorrect. Try again. You can do it!!!`;
            incorrect_jpns.push(all_L3_verbs_jpns[y]);
            incorrect_eng.push(all_L3_verbs_eng[y]);
            console.log("Incorrect :(");
           } 
           // Debugging code.
           /*else {
            feedback.textContent = "There was a fucky wucky in your code. Get better >:D";
            console.log("Fucky Wucky!");
           }*/
    } else {
        var z = all_L3_verbs_eng[y].length;
        for (let i = 0; i != z; i++) {
            if (textbox != all_L3_verbs_eng[y][i]) {
                // Is incorrect
                continue;
            } else {
                // Is correct
                console.log("Correct!");
                feedback.textContent = `You wrote "${textboxUnchanged}". This is correct! There are other definitions for this word too, so try to remember those as well!`;
                answerBox.value = "";
                next_button.style.visibility = "visible";
                return;
            }
        }
        //Debug Command
        //console.log("You're going the right direction.");
        
        // Naturally if it goes through the whole list without ever being correct, we assume the word is incorrect and end up here.
        // The following code executes actions for when the typed word is incorrect.
        incorrect_jpns.push(all_L3_verbs_jpns[y]);
        incorrect_eng.push(all_L3_verbs_eng[y]);
        document.getElementById("Feedback").textContent = `You wrote "${textboxUnchanged}". This is incorrect Try again. You can do it!!!`;
    }
    answerBox.value = "";
    next_button.style.visibility = "visible";
}

// Selects a random number within the vocab array scope
function generateQuestion() {
    x = all_L3_verbs_jpns.length;
    y = Math.floor(Math.random() * x);
    document.getElementById("Question").textContent = `What does "${all_L3_verbs_jpns[y]}" mean?`;
    next_button.style.visibility = "hidden";
}

function startButtonClicked () {
    next_button.style.visibility = "visible";
    answerBox.style.visibility = "visible";
    go_button.style.visibility = "visible";
    start_button.style.visibility = "hidden";
    generateQuestion();
}


// Program start
next_button.style.visibility = "hidden";
answerBox.style.visibility = "hidden";
go_button.style.visibility = "hidden";