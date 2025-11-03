/*
AUTHOR: retromacbytes.net owner
CREATED ON: 09/09/2025
EDITED ON: 11/02/2025
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
const question = document.getElementById("Question");
const go_button = document.getElementById("Submit");
const answerBox = document.getElementById("AnswerBox");
const next_button = document.getElementById("Next");
const finished_button = document.getElementById("Finished");
const feedback = document.getElementById("Feedback");
const statistics = document.getElementById("Statistics");
const start_button = document.getElementById("Start");
const Eng_to_Jpns_chkbox = document.getElementById("Eng_to_Jpns");
const Jpns_to_Eng_chkbox = document.getElementById("Jpns_to_Eng");
const noun_chkbox = document.getElementById("nouns");
const i_adjective_chkbox = document.getElementById("い-adjectives");
const na_adjective_chkbox = document.getElementById("な-adjectives");
const u_vrb_chkbox = document.getElementById("う-verbs");
const ru_vrb_chkbox = document.getElementById("る-verbs");
const ireg_vrb_chkbox = document.getElementById("irregular_verbs");
const advrb_othr_chkbox = document.getElementById("adverbs/other");
var Lx_vocab_chkbox;
const all_vocab_chkbox = document.getElementById("all_Lessons");
const hide = document.getElementsByClassName("hide_aft_startpress");
const displayIncorrect = document.getElementById("displayIncorrect");

all_vocab_chkbox.addEventListener('change', function() {
    // Code for checking/unchecking all of the checkboxes for the lessons when the all checkbox is changed
    if (this.checked) {
        Lesson_select(true);
    } else {
        Lesson_select(false);
    }
});
go_button.addEventListener('click', function() {
    goButtonClicked();
    adjustFooterPosition();
});
answerBox.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        goButtonClicked();
    adjustFooterPosition();
    }
});
next_button.addEventListener('click', function() {
    question_words.splice(y,1);
    answer_words.splice(y,1);
    if (question_words.length == 0) {
        correctWrongStats();
        return;
    }
    generateQuestion();
    adjustFooterPosition();
});
start_button.addEventListener('click', function() {
    startButtonClicked();
    adjustFooterPosition();
});
finished_button.addEventListener('click', function() {
    correctWrongStats();
    adjustFooterPosition();
});

// Initial Window resizing
window.addEventListener('DOMContentLoaded', function() {
    adjustFooterPosition();
});
window.addEventListener('resize', function() {
    adjustFooterPosition();
});
window.addEventListener('reset', function() {
    adjustFooterPosition();
});


// Contains Vocab and meanings

// L1 Vocabulary
const L1_nouns_jpns = ["temp"];
const L1_nouns_eng = ["temp"];

const L1_i_adjectives_jpns = ["temp"];
const L1_i_adjectives_eng = ["temp"];
const L1_na_adjectives_jpns = ["temp"];
const L1_na_adjectives_eng = ["temp"];

const L1_u_verbs_jpns = ["temp"];
const L1_u_verbs_eng = ["temp"];
const L1_ru_verbs_jpns = ["temp"];
const L1_ru_verbs_eng = ["temp"];
const L1_ireg_verbs_jpns = ["temp"];
const L1_ireg_verbs_eng = ["temp"];

const L1_adverbs_etc_jpns = ["temp"];
const L1_adverbs_etc_eng = ["temp"];

const L1_all_vocab = [[L1_nouns_jpns,L1_nouns_eng],[L1_i_adjectives_jpns,L1_i_adjectives_eng],[L1_na_adjectives_jpns,L1_na_adjectives_eng],[L1_u_verbs_jpns,L1_u_verbs_eng],[L1_ru_verbs_jpns,L1_ru_verbs_eng],[L1_ireg_verbs_jpns,L1_ireg_verbs_eng],[L1_adverbs_etc_jpns,L1_adverbs_etc_eng]];

// L2 Vocabulary
const L2_nouns_jpns = ["temp"];
const L2_nouns_eng = ["temp"];

const L2_i_adjectives_jpns = ["temp"];
const L2_i_adjectives_eng = ["temp"];
const L2_na_adjectives_jpns = ["temp"];
const L2_na_adjectives_eng = ["temp"];

const L2_u_verbs_jpns = ["temp"];
const L2_u_verbs_eng = ["temp"];
const L2_ru_verbs_jpns = ["temp"];
const L2_ru_verbs_eng = ["temp"];
const L2_ireg_verbs_jpns = ["temp"];
const L2_ireg_verbs_eng = ["temp"];

const L2_adverbs_etc_jpns = ["temp"];
const L2_adverbs_etc_eng = ["temp"];

const L2_all_vocab = [[L2_nouns_jpns,L2_nouns_eng],[L2_i_adjectives_jpns,L2_i_adjectives_eng],[L2_na_adjectives_jpns,L2_na_adjectives_eng],[L2_u_verbs_jpns,L2_u_verbs_eng],[L2_ru_verbs_jpns,L2_ru_verbs_eng],[L2_ireg_verbs_jpns,L2_ireg_verbs_eng],[L2_adverbs_etc_jpns,L2_adverbs_etc_eng]];

// L3 Vocabulary
const L3_nouns_jpns = ["temp"];
const L3_nouns_eng = ["temp"];

const L3_i_adjectives_jpns = ["temp"];
const L3_i_adjectives_eng = ["temp"];
const L3_na_adjectives_jpns = ["temp"];
const L3_na_adjectives_eng = ["temp"];

const L3_u_verbs_jpns = [["いく","行く"],["かえる","帰る"],["きく","聞く"],["のむ","飲む"],["はなす","話す"],["よむ","読む"]];
const L3_u_verbs_eng = ["to go",["to go back","to return"],["to listen","to hear"],"to drink",["to speak","to talk"],"to read"];
const L3_ru_verbs_jpns = [["おきる","起きる"],["たべる","食べる"],["ねる","寝る"],["みる","見る"]];
const L3_ru_verbs_eng = ["to get up","to eat",["to sleep","to go to sleep"],["to see","to look at","to watch"]];
const L3_ireg_verbs_jpns = [["くる","来る"],"する",["べんきょうする","勉強する"]];
const L3_ireg_verbs_eng = ["to come","to do","to study"];

const L3_adverbs_etc_jpns = ["temp"];
const L3_adverbs_etc_eng = ["temp"];

const L3_all_vocab = [[L3_nouns_jpns,L3_nouns_eng],[L3_i_adjectives_jpns,L3_i_adjectives_eng],[L3_na_adjectives_jpns,L3_na_adjectives_eng],[L3_u_verbs_jpns,L3_u_verbs_eng],[L3_ru_verbs_jpns,L3_ru_verbs_eng],[L3_ireg_verbs_jpns,L3_ireg_verbs_eng],[L3_adverbs_etc_jpns,L3_adverbs_etc_eng]];

// L4 Vocabulary
const L4_nouns_jpns = ["temp"];
const L4_nouns_eng = ["temp"];

const L4_i_adjectives_jpns = ["temp"];
const L4_i_adjectives_eng = ["temp"];
const L4_na_adjectives_jpns = ["temp"];
const L4_na_adjectives_eng = ["temp"];

const L4_u_verbs_jpns = ["temp"];
const L4_u_verbs_eng = ["temp"];
const L4_ru_verbs_jpns = ["temp"];
const L4_ru_verbs_eng = ["temp"];
const L4_ireg_verbs_jpns = ["temp"];
const L4_ireg_verbs_eng = ["temp"];

const L4_adverbs_etc_jpns = ["temp"];
const L4_adverbs_etc_eng = ["temp"];

const L4_all_vocab = [[L4_nouns_jpns,L4_nouns_eng],[L4_i_adjectives_jpns,L4_i_adjectives_eng],[L4_na_adjectives_jpns,L4_na_adjectives_eng],[L4_u_verbs_jpns,L4_u_verbs_eng],[L4_ru_verbs_jpns,L4_ru_verbs_eng],[L4_ireg_verbs_jpns,L4_ireg_verbs_eng],[L4_adverbs_etc_jpns,L4_adverbs_etc_eng]];

// L5 Vocabulary
const L5_nouns_jpns = ["temp"];
const L5_nouns_eng = ["temp"];

const L5_i_adjectives_jpns = ["temp"];
const L5_i_adjectives_eng = ["temp"];
const L5_na_adjectives_jpns = ["temp"];
const L5_na_adjectives_eng = ["temp"];

const L5_u_verbs_jpns = ["temp"];
const L5_u_verbs_eng = ["temp"];
const L5_ru_verbs_jpns = ["temp"];
const L5_ru_verbs_eng = ["temp"];
const L5_ireg_verbs_jpns = ["temp"];
const L5_ireg_verbs_eng = ["temp"];

const L5_adverbs_etc_jpns = ["temp"];
const L5_adverbs_etc_eng = ["temp"];

const L5_all_vocab = [[L5_nouns_jpns,L5_nouns_eng],[L5_i_adjectives_jpns,L5_i_adjectives_eng],[L5_na_adjectives_jpns,L5_na_adjectives_eng],[L5_u_verbs_jpns,L5_u_verbs_eng],[L5_ru_verbs_jpns,L5_ru_verbs_eng],[L5_ireg_verbs_jpns,L5_ireg_verbs_eng],[L5_adverbs_etc_jpns,L5_adverbs_etc_eng]];

// L6 Vocabulary
const L6_nouns_jpns = ["temp"];
const L6_nouns_eng = ["temp"];

const L6_i_adjectives_jpns = ["temp"];
const L6_i_adjectives_eng = ["temp"];
const L6_na_adjectives_jpns = ["temp"];
const L6_na_adjectives_eng = ["temp"];

const L6_u_verbs_jpns = ["temp"];
const L6_u_verbs_eng = ["temp"];
const L6_ru_verbs_jpns = ["temp"];
const L6_ru_verbs_eng = ["temp"];
const L6_ireg_verbs_jpns = ["temp"];
const L6_ireg_verbs_eng = ["temp"];

const L6_adverbs_etc_jpns = ["temp"];
const L6_adverbs_etc_eng = ["temp"];

const L6_all_vocab = [[L6_nouns_jpns,L6_nouns_eng],[L6_i_adjectives_jpns,L6_i_adjectives_eng],[L6_na_adjectives_jpns,L6_na_adjectives_eng],[L6_u_verbs_jpns,L6_u_verbs_eng],[L6_ru_verbs_jpns,L6_ru_verbs_eng],[L6_ireg_verbs_jpns,L6_ireg_verbs_eng],[L6_adverbs_etc_jpns,L6_adverbs_etc_eng]];

// L7 Vocabulary
const L7_nouns_jpns = ["temp"];
const L7_nouns_eng = ["temp"];

const L7_i_adjectives_jpns = ["temp"];
const L7_i_adjectives_eng = ["temp"];
const L7_na_adjectives_jpns = ["temp"];
const L7_na_adjectives_eng = ["temp"];

const L7_u_verbs_jpns = ["temp"];
const L7_u_verbs_eng = ["temp"];
const L7_ru_verbs_jpns = ["temp"];
const L7_ru_verbs_eng = ["temp"];
const L7_ireg_verbs_jpns = ["temp"];
const L7_ireg_verbs_eng = ["temp"];

const L7_adverbs_etc_jpns = ["temp"];
const L7_adverbs_etc_eng = ["temp"];

const L7_all_vocab = [[L7_nouns_jpns,L7_nouns_eng],[L7_i_adjectives_jpns,L7_i_adjectives_eng],[L7_na_adjectives_jpns,L7_na_adjectives_eng],[L7_u_verbs_jpns,L7_u_verbs_eng],[L7_ru_verbs_jpns,L7_ru_verbs_eng],[L7_ireg_verbs_jpns,L7_ireg_verbs_eng],[L7_adverbs_etc_jpns,L7_adverbs_etc_eng]];

// L8 Vocabulary
const L8_nouns_jpns = ["temp"];
const L8_nouns_eng = ["temp"];

const L8_i_adjectives_jpns = ["temp"];
const L8_i_adjectives_eng = ["temp"];
const L8_na_adjectives_jpns = ["temp"];
const L8_na_adjectives_eng = ["temp"];

const L8_u_verbs_jpns = ["temp"];
const L8_u_verbs_eng = ["temp"];
const L8_ru_verbs_jpns = ["temp"];
const L8_ru_verbs_eng = ["temp"];
const L8_ireg_verbs_jpns = ["temp"];
const L8_ireg_verbs_eng = ["temp"];

const L8_adverbs_etc_jpns = ["temp"];
const L8_adverbs_etc_eng = ["temp"];

const L8_all_vocab = [[L8_nouns_jpns,L8_nouns_eng],[L8_i_adjectives_jpns,L8_i_adjectives_eng],[L8_na_adjectives_jpns,L8_na_adjectives_eng],[L8_u_verbs_jpns,L8_u_verbs_eng],[L8_ru_verbs_jpns,L8_ru_verbs_eng],[L8_ireg_verbs_jpns,L8_ireg_verbs_eng],[L8_adverbs_etc_jpns,L8_adverbs_etc_eng]];

// L9 Vocabulary
const L9_nouns_jpns = ["temp"];
const L9_nouns_eng = ["temp"];

const L9_i_adjectives_jpns = ["temp"];
const L9_i_adjectives_eng = ["temp"];
const L9_na_adjectives_jpns = ["temp"];
const L9_na_adjectives_eng = ["temp"];

const L9_u_verbs_jpns = ["temp"];
const L9_u_verbs_eng = ["temp"];
const L9_ru_verbs_jpns = ["temp"];
const L9_ru_verbs_eng = ["temp"];
const L9_ireg_verbs_jpns = ["temp"];
const L9_ireg_verbs_eng = ["temp"];

const L9_adverbs_etc_jpns = ["temp"];
const L9_adverbs_etc_eng = ["temp"];

const L9_all_vocab = [[L9_nouns_jpns,L9_nouns_eng],[L9_i_adjectives_jpns,L9_i_adjectives_eng],[L9_na_adjectives_jpns,L9_na_adjectives_eng],[L9_u_verbs_jpns,L9_u_verbs_eng],[L9_ru_verbs_jpns,L9_ru_verbs_eng],[L9_ireg_verbs_jpns,L9_ireg_verbs_eng],[L9_adverbs_etc_jpns,L9_adverbs_etc_eng]];

// L10 Vocabulary
const L10_nouns_jpns = ["temp"];
const L10_nouns_eng = ["temp"];

const L10_i_adjectives_jpns = ["temp"];
const L10_i_adjectives_eng = ["temp"];
const L10_na_adjectives_jpns = ["temp"];
const L10_na_adjectives_eng = ["temp"];

const L10_u_verbs_jpns = ["temp"];
const L10_u_verbs_eng = ["temp"];
const L10_ru_verbs_jpns = ["temp"];
const L10_ru_verbs_eng = ["temp"];
const L10_ireg_verbs_jpns = ["temp"];
const L10_ireg_verbs_eng = ["temp"];

const L10_adverbs_etc_jpns = ["temp"];
const L10_adverbs_etc_eng = ["temp"];

const L10_all_vocab = [[L10_nouns_jpns,L10_nouns_eng],[L10_i_adjectives_jpns,L10_i_adjectives_eng],[L10_na_adjectives_jpns,L10_na_adjectives_eng],[L10_u_verbs_jpns,L10_u_verbs_eng],[L10_ru_verbs_jpns,L10_ru_verbs_eng],[L10_ireg_verbs_jpns,L10_ireg_verbs_eng],[L10_adverbs_etc_jpns,L10_adverbs_etc_eng]];

// L11 Vocabulary
const L11_nouns_jpns = ["temp"];
const L11_nouns_eng = ["temp"];

const L11_i_adjectives_jpns = ["temp"];
const L11_i_adjectives_eng = ["temp"];
const L11_na_adjectives_jpns = ["temp"];
const L11_na_adjectives_eng = ["temp"];

const L11_u_verbs_jpns = ["temp"];
const L11_u_verbs_eng = ["temp"];
const L11_ru_verbs_jpns = ["temp"];
const L11_ru_verbs_eng = ["temp"];
const L11_ireg_verbs_jpns = ["temp"];
const L11_ireg_verbs_eng = ["temp"];

const L11_adverbs_etc_jpns = ["temp"];
const L11_adverbs_etc_eng = ["temp"];

const L11_all_vocab = [[L11_nouns_jpns,L11_nouns_eng],[L11_i_adjectives_jpns,L11_i_adjectives_eng],[L11_na_adjectives_jpns,L11_na_adjectives_eng],[L11_u_verbs_jpns,L11_u_verbs_eng],[L11_ru_verbs_jpns,L11_ru_verbs_eng],[L11_ireg_verbs_jpns,L11_ireg_verbs_eng],[L11_adverbs_etc_jpns,L11_adverbs_etc_eng]];

// L12 Vocabulary
const L12_nouns_jpns = ["temp"];
const L12_nouns_eng = ["temp"];

const L12_i_adjectives_jpns = ["temp"];
const L12_i_adjectives_eng = ["temp"];
const L12_na_adjectives_jpns = ["temp"];
const L12_na_adjectives_eng = ["temp"];

const L12_u_verbs_jpns = ["temp"];
const L12_u_verbs_eng = ["temp"];
const L12_ru_verbs_jpns = ["temp"];
const L12_ru_verbs_eng = ["temp"];
const L12_ireg_verbs_jpns = ["temp"];
const L12_ireg_verbs_eng = ["temp"];

const L12_adverbs_etc_jpns = ["temp"];
const L12_adverbs_etc_eng = ["temp"];

const L12_all_vocab = [[L12_nouns_jpns,L12_nouns_eng],[L12_i_adjectives_jpns,L12_i_adjectives_eng],[L12_na_adjectives_jpns,L12_na_adjectives_eng],[L12_u_verbs_jpns,L12_u_verbs_eng],[L12_ru_verbs_jpns,L12_ru_verbs_eng],[L12_ireg_verbs_jpns,L12_ireg_verbs_eng],[L12_adverbs_etc_jpns,L12_adverbs_etc_eng]];

// L13 Vocabulary
const L13_nouns_jpns = ["temp"];
const L13_nouns_eng = ["temp"];

const L13_i_adjectives_jpns = ["temp"];
const L13_i_adjectives_eng = ["temp"];
const L13_na_adjectives_jpns = ["temp"];
const L13_na_adjectives_eng = ["temp"];

const L13_u_verbs_jpns = ["temp"];
const L13_u_verbs_eng = ["temp"];
const L13_ru_verbs_jpns = ["temp"];
const L13_ru_verbs_eng = ["temp"];
const L13_ireg_verbs_jpns = ["temp"];
const L13_ireg_verbs_eng = ["temp"];

const L13_adverbs_etc_jpns = ["temp"];
const L13_adverbs_etc_eng = ["temp"];

const L13_all_vocab = [[L13_nouns_jpns,L13_nouns_eng],[L13_i_adjectives_jpns,L13_i_adjectives_eng],[L13_na_adjectives_jpns,L13_na_adjectives_eng],[L13_u_verbs_jpns,L13_u_verbs_eng],[L13_ru_verbs_jpns,L13_ru_verbs_eng],[L13_ireg_verbs_jpns,L13_ireg_verbs_eng],[L13_adverbs_etc_jpns,L13_adverbs_etc_eng]];

// L14 Vocabulary
const L14_nouns_jpns = ["おくさん", "ごしゅじん", "パートナー", "おじさん", "おばさん", "りょうしん", "おおやさん", "みなさん", "チョコレート", "みかん", "トレーナー", "シャツ", "ネクタイ", "マフラー", "ゆびわ", "えんぴつ", "ぬいぐるみ", "まんが", "けしょうひん", "ラジオ",
    "おさら", "おかえし", "りれきしょ", "クリスマス", "バレンタインデー", "ホワイトデー"];
const L14_nouns_eng = ["wife", "husband", "partner", ["uncle", "middle-aged man"], ["aunt", "middle-aged woman"], "parents", ["landlord", "landlady"], ["everyone", "all of you"], "chocolate", "mandarin orange", "sweatshirt", "shirt", "necktie", "winter scarf",
    "ring", "pencil", "stuffed animal", "comic book", "cosmetics", "radio", ["plate", "dish"], "return", "resume", "christmas", "valentine's day", "white day"];

const L14_i_adjectives_jpns = ["ほしい"];
const L14_i_adjectives_eng = ["to want"];
const L14_na_adjectives_jpns = ["おしゃれ(な)", "けち(な)"];
const L14_na_adjectives_eng = [["fashionable", "stylish"], ["stingy", "cheap"]];

const L14_u_verbs_jpns = ["おくる", "にあう"];
const L14_u_verbs_eng = ["to send", "to look good"];
const L14_ru_verbs_jpns = ["あきらめる", "あげる", "くれる", "できる"];
const L14_ru_verbs_eng = ["to give up", "to give others", "to give me", ["to come into existance", "to be made"]];
const L14_ireg_verbs_jpns = ["そうだんする", "ちゅういする", "プロポーズする"];
const L14_ireg_verbs_eng = ["to consult", ["to give warning", "to watch out"], "to propose marriage"];

const L14_adverbs_etc_jpns = ["~くん", "~たち", "わたしたち", "こんな~", "きゅうに", "ちょうど", "よく", "さあ", "どうしたらいい"];
const L14_adverbs_etc_eng = [["mr.", "ms."], "plural", "we", ["like this", "this kind of"], "suddenly", "exactly", "well", "i am not sure", "what should one do"];
const L14_counters_jpns = ["~こ", "~さつ", "～だい", "～ひき", "～ほん"];
const L14_counters_eng = ["small items", "bound volumes", "equipment", "small animals", "long objects"];

const L14_all_vocab = [[L14_nouns_jpns,L14_nouns_eng],[L14_i_adjectives_jpns,L14_i_adjectives_eng],[L14_na_adjectives_jpns,L14_na_adjectives_eng],[L14_u_verbs_jpns,L14_u_verbs_eng],[L14_ru_verbs_jpns,L14_ru_verbs_eng],[L14_ireg_verbs_jpns,L14_ireg_verbs_eng],[L14_adverbs_etc_jpns,L14_adverbs_etc_eng]];

// L15 Vocabulary
const L15_nouns_jpns = ["temp"];
const L15_nouns_eng = ["temp"];

const L15_i_adjectives_jpns = ["temp"];
const L15_i_adjectives_eng = ["temp"];
const L15_na_adjectives_jpns = ["temp"];
const L15_na_adjectives_eng = ["temp"];

const L15_u_verbs_jpns = ["temp"];
const L15_u_verbs_eng = ["temp"];
const L15_ru_verbs_jpns = ["temp"];
const L15_ru_verbs_eng = ["temp"];
const L15_ireg_verbs_jpns = ["temp"];
const L15_ireg_verbs_eng = ["temp"];

const L15_adverbs_etc_jpns = ["temp"];
const L15_adverbs_etc_eng = ["temp"];

const L15_all_vocab = [[L15_nouns_jpns,L15_nouns_eng],[L15_i_adjectives_jpns,L15_i_adjectives_eng],[L15_na_adjectives_jpns,L15_na_adjectives_eng],[L15_u_verbs_jpns,L15_u_verbs_eng],[L15_ru_verbs_jpns,L15_ru_verbs_eng],[L15_ireg_verbs_jpns,L15_ireg_verbs_eng],[L15_adverbs_etc_jpns,L15_adverbs_etc_eng]];

// L16 Vocabulary
const L16_nouns_jpns = ["temp"];
const L16_nouns_eng = ["temp"];

const L16_i_adjectives_jpns = ["temp"];
const L16_i_adjectives_eng = ["temp"];
const L16_na_adjectives_jpns = ["temp"];
const L16_na_adjectives_eng = ["temp"];

const L16_u_verbs_jpns = ["temp"];
const L16_u_verbs_eng = ["temp"];
const L16_ru_verbs_jpns = ["temp"];
const L16_ru_verbs_eng = ["temp"];
const L16_ireg_verbs_jpns = ["temp"];
const L16_ireg_verbs_eng = ["temp"];

const L16_adverbs_etc_jpns = ["temp"];
const L16_adverbs_etc_eng = ["temp"];

const L16_all_vocab = [[L16_nouns_jpns,L16_nouns_eng],[L16_i_adjectives_jpns,L16_i_adjectives_eng],[L16_na_adjectives_jpns,L16_na_adjectives_eng],[L16_u_verbs_jpns,L16_u_verbs_eng],[L16_ru_verbs_jpns,L16_ru_verbs_eng],[L16_ireg_verbs_jpns,L16_ireg_verbs_eng],[L16_adverbs_etc_jpns,L16_adverbs_etc_eng]];

// L17 Vocabulary
const L17_nouns_jpns = [["あかちゃん","赤ちゃん"],["おきゃくさん","お客さん"],["しゅしょう","首相"],"サラリーマン",["きゅうりょう","給料"],["ざんぎょう","残業"],"パンダ",["コンタクト","コンタクトレンズ"],"ひげ","ブーツ",["かぎ","鍵"],["たからくじ","宝くじ"],["かみ","紙"],"スプーン",["おゆ","お湯"],["でんしレンジ","電子レンジ"],"ヒーター","ニュース",["かじ","火事"],["りょこうがいしゃ","旅行会社"],"ショッピングモール",["りょう","寮"],["ちがい","違い"],["ひみつ","秘密"],["じゅんび","準備"],["じぶん","自分"]];
const L17_nouns_eng = ["baby",["guest","visitor","client","customer"],"prime minister",["salaryman","office worker"],"salary","overtime work","panda","contact lenses","beard","boots",["lock","key"],"lottery","paper","spoon","hot water","microwave oven","heater","news","fire","travel agency","shopping mall","dormitory","difference","secret","preparation","oneself"];

const L17_i_adjectives_jpns = [["あぶない","危ない"],"うらやましい",["すくない","少ない"],["つごうがわるい","都合が悪い"],"つよい"];
const L17_i_adjectives_eng = ["dangerous","envious",["a little","a few"],["inconvienient","to have a scheduling conflict"],"strong"];
const L17_na_adjectives_jpns = [["さいあくな","最悪"]];
const L17_na_adjectives_eng = ["the worst"];

const L17_u_verbs_jpns = [["えらぶ","選ぶ"],["おゆをわかす","お湯を沸かす"],["かみをとかす","髪をとかす"],"ひげをそる",["ぬぐ","脱ぐ"],["こむ","混む"],["たからくじにあたる","宝くじに当たる"]];
const L17_u_verbs_eng = [["to choose","to select"],"to boil water","to comb one's hair","to shave one's beard","to take off clothes","to get crowded","to win a lottery"];
const L17_ru_verbs_jpns = ["いれる",["うまれる","生まれる"],["かぎをかける","鍵をかける"],["たりる","足りる"],["なれる","慣れる"]];
const L17_ru_verbs_eng = [["to make tea","to make coffee"],"to be born","to lock",["to be sufficient","to be enough"],"to get used to"];
const L17_ireg_verbs_jpns = [["おいのりする","お祈りする"],["けしょうする","化粧する"],["しゅうしょくする","就職する"],["りこんする","離婚する"],"する"];
const L17_ireg_verbs_eng = ["to pray","to put makeup on","to get a full-time job at","to get a divorce","to wear small items"];

const L17_adverbs_etc_jpns = ["ずいぶん",["たとえば","例えば"],["～にくらべて","～に比べて"],"～によると",["まえ","前"],"やっぱり","～かなあ","そうか","おめでとうございます"];
const L17_adverbs_etc_eng = ["very","for example","compared with","according to","before","after all","i wonder","i see","congratulations"];

const L17_all_vocab = [[L17_nouns_jpns,L17_nouns_eng],[L17_i_adjectives_jpns,L17_i_adjectives_eng],[L17_na_adjectives_jpns,L17_na_adjectives_eng],[L17_u_verbs_jpns,L17_u_verbs_eng],[L17_ru_verbs_jpns,L17_ru_verbs_eng],[L17_ireg_verbs_jpns,L17_ireg_verbs_eng],[L17_adverbs_etc_jpns,L17_adverbs_etc_eng]];

// L18 Vocabulary
const L18_nouns_jpns = ["temp"];
const L18_nouns_eng = ["temp"];

const L18_i_adjectives_jpns = ["temp"];
const L18_i_adjectives_eng = ["temp"];
const L18_na_adjectives_jpns = ["temp"];
const L18_na_adjectives_eng = ["temp"];

const L18_u_verbs_jpns = ["temp"];
const L18_u_verbs_eng = ["temp"];
const L18_ru_verbs_jpns = ["temp"];
const L18_ru_verbs_eng = ["temp"];
const L18_ireg_verbs_jpns = ["temp"];
const L18_ireg_verbs_eng = ["temp"];

const L18_adverbs_etc_jpns = ["temp"];
const L18_adverbs_etc_eng = ["temp"];

const L18_all_vocab = [[L18_nouns_jpns,L18_nouns_eng],[L18_i_adjectives_jpns,L18_i_adjectives_eng],[L18_na_adjectives_jpns,L18_na_adjectives_eng],[L18_u_verbs_jpns,L18_u_verbs_eng],[L18_ru_verbs_jpns,L18_ru_verbs_eng],[L18_ireg_verbs_jpns,L18_ireg_verbs_eng],[L18_adverbs_etc_jpns,L18_adverbs_etc_eng]];

// L19 Vocabulary
const L19_nouns_jpns = ["temp"];
const L19_nouns_eng = ["temp"];

const L19_i_adjectives_jpns = ["temp"];
const L19_i_adjectives_eng = ["temp"];
const L19_na_adjectives_jpns = ["temp"];
const L19_na_adjectives_eng = ["temp"];

const L19_u_verbs_jpns = ["temp"];
const L19_u_verbs_eng = ["temp"];
const L19_ru_verbs_jpns = ["temp"];
const L19_ru_verbs_eng = ["temp"];
const L19_ireg_verbs_jpns = ["temp"];
const L19_ireg_verbs_eng = ["temp"];

const L19_adverbs_etc_jpns = ["temp"];
const L19_adverbs_etc_eng = ["temp"];

const L19_all_vocab = [[L19_nouns_jpns,L19_nouns_eng],[L19_i_adjectives_jpns,L19_i_adjectives_eng],[L19_na_adjectives_jpns,L19_na_adjectives_eng],[L19_u_verbs_jpns,L19_u_verbs_eng],[L19_ru_verbs_jpns,L19_ru_verbs_eng],[L19_ireg_verbs_jpns,L19_ireg_verbs_eng],[L19_adverbs_etc_jpns,L19_adverbs_etc_eng]];

// L20 Vocabulary
const L20_nouns_jpns = ["temp"];
const L20_nouns_eng = ["temp"];

const L20_i_adjectives_jpns = ["temp"];
const L20_i_adjectives_eng = ["temp"];
const L20_na_adjectives_jpns = ["temp"];
const L20_na_adjectives_eng = ["temp"];

const L20_u_verbs_jpns = ["temp"];
const L20_u_verbs_eng = ["temp"];
const L20_ru_verbs_jpns = ["temp"];
const L20_ru_verbs_eng = ["temp"];
const L20_ireg_verbs_jpns = ["temp"];
const L20_ireg_verbs_eng = ["temp"];

const L20_adverbs_etc_jpns = ["temp"];
const L20_adverbs_etc_eng = ["temp"];

const L20_all_vocab = [[L20_nouns_jpns,L20_nouns_eng],[L20_i_adjectives_jpns,L20_i_adjectives_eng],[L20_na_adjectives_jpns,L20_na_adjectives_eng],[L20_u_verbs_jpns,L20_u_verbs_eng],[L20_ru_verbs_jpns,L20_ru_verbs_eng],[L20_ireg_verbs_jpns,L20_ireg_verbs_eng],[L20_adverbs_etc_jpns,L20_adverbs_etc_eng]];

// L21 Vocabulary
const L21_nouns_jpns = ["temp"];
const L21_nouns_eng = ["temp"];

const L21_i_adjectives_jpns = ["temp"];
const L21_i_adjectives_eng = ["temp"];
const L21_na_adjectives_jpns = ["temp"];
const L21_na_adjectives_eng = ["temp"];

const L21_u_verbs_jpns = ["temp"];
const L21_u_verbs_eng = ["temp"];
const L21_ru_verbs_jpns = ["temp"];
const L21_ru_verbs_eng = ["temp"];
const L21_ireg_verbs_jpns = ["temp"];
const L21_ireg_verbs_eng = ["temp"];

const L21_adverbs_etc_jpns = ["temp"];
const L21_adverbs_etc_eng = ["temp"];

const L21_all_vocab = [[L21_nouns_jpns,L21_nouns_eng],[L21_i_adjectives_jpns,L21_i_adjectives_eng],[L21_na_adjectives_jpns,L21_na_adjectives_eng],[L21_u_verbs_jpns,L21_u_verbs_eng],[L21_ru_verbs_jpns,L21_ru_verbs_eng],[L21_ireg_verbs_jpns,L21_ireg_verbs_eng],[L21_adverbs_etc_jpns,L21_adverbs_etc_eng]];

// L22 Vocabulary
const L22_nouns_jpns = ["temp"];
const L22_nouns_eng = ["temp"];

const L22_i_adjectives_jpns = ["temp"];
const L22_i_adjectives_eng = ["temp"];
const L22_na_adjectives_jpns = ["temp"];
const L22_na_adjectives_eng = ["temp"];

const L22_u_verbs_jpns = ["temp"];
const L22_u_verbs_eng = ["temp"];
const L22_ru_verbs_jpns = ["temp"];
const L22_ru_verbs_eng = ["temp"];
const L22_ireg_verbs_jpns = ["temp"];
const L22_ireg_verbs_eng = ["temp"];

const L22_adverbs_etc_jpns = ["temp"];
const L22_adverbs_etc_eng = ["temp"];

const L22_all_vocab = [[L22_nouns_jpns,L22_nouns_eng],[L22_i_adjectives_jpns,L22_i_adjectives_eng],[L22_na_adjectives_jpns,L22_na_adjectives_eng],[L22_u_verbs_jpns,L22_u_verbs_eng],[L22_ru_verbs_jpns,L22_ru_verbs_eng],[L22_ireg_verbs_jpns,L22_ireg_verbs_eng],[L22_adverbs_etc_jpns,L22_adverbs_etc_eng]];

// L23 Vocabulary
const L23_nouns_jpns = ["temp"];
const L23_nouns_eng = ["temp"];

const L23_i_adjectives_jpns = ["temp"];
const L23_i_adjectives_eng = ["temp"];
const L23_na_adjectives_jpns = ["temp"];
const L23_na_adjectives_eng = ["temp"];

const L23_u_verbs_jpns = ["temp"];
const L23_u_verbs_eng = ["temp"];
const L23_ru_verbs_jpns = ["temp"];
const L23_ru_verbs_eng = ["temp"];
const L23_ireg_verbs_jpns = ["temp"];
const L23_ireg_verbs_eng = ["temp"];

const L23_adverbs_etc_jpns = ["temp"];
const L23_adverbs_etc_eng = ["temp"];

const L23_all_vocab = [[L23_nouns_jpns,L23_nouns_eng],[L23_i_adjectives_jpns,L23_i_adjectives_eng],[L23_na_adjectives_jpns,L23_na_adjectives_eng],[L23_u_verbs_jpns,L23_u_verbs_eng],[L23_ru_verbs_jpns,L23_ru_verbs_eng],[L23_ireg_verbs_jpns,L23_ireg_verbs_eng],[L23_adverbs_etc_jpns,L23_adverbs_etc_eng]];

// List structure is [Lesson[Part_of_Speech[Type_of_Part_Speech[English_or_Japanese[Word]]]]] for example :    [L13_all_vocab[0[0]]] This will get the nouns from the L13 Vocab
const all_Lessons = [L1_all_vocab,L2_all_vocab,L3_all_vocab,L4_all_vocab,L5_all_vocab,L6_all_vocab,L7_all_vocab,L8_all_vocab,L9_all_vocab,L10_all_vocab,L11_all_vocab,L12_all_vocab,L13_all_vocab,L14_all_vocab,L15_all_vocab,L16_all_vocab,L17_all_vocab,L18_all_vocab,L19_all_vocab,L20_all_vocab,L21_all_vocab,L22_all_vocab,L23_all_vocab];

// Variables for which word appears in the question box and which word is correct
var question_words = [];
var answer_words = [];

// Stores what's in textbox
var textbox;

// LIST OF WORDS GOTTEN INCORRECT
var incorrectQuestion = [];
var incorrectAnswer = [];

// Used in generateQuestion function
var x;
var y;

// Used to calculate the right/wrong statistics
var totalQuestions;

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
    var textboxUnchanged = answerBox.value.trim();
    textbox = answerBox.value.trim().toLowerCase();

    /*
    // Debugging commands
    alert("Button was clicked! You wrote " + textbox);
    console.log("Button was clicked!");
    */

    // Code checking for multiple definitions of a word
    if (typeof answer_words[y] === "string") {
        if (textbox == answer_words[y]) {
            // Is correct
            feedback.textContent = `You wrote "${textboxUnchanged}". This is correct!`;

            console.log("Correct!");
           } else {
            // Is incorrect
            feedback.textContent = `You wrote "${textboxUnchanged}". This is incorrect. Try again. You can do it!!!`;
            incorrectQuestion.push(question_words[y]);
            incorrectAnswer.push(answer_words[y]);
            console.log("Incorrect :(");
           } 
           // Debugging code.
           /*else {
            feedback.textContent = "There was a fucky wucky in your code. Get better >:D";
            console.log("Fucky Wucky!");
           }*/
    } else {
        var z = answer_words[y].length;
        for (let i=0;i != z;i++) {
            if (textbox != answer_words[y][i]) {
                // Is incorrect
                continue;
            } else {
                // Is correct
                // The stuff in here should also be the same as the stuff at the end of the parent function
                console.log("Correct!");
                feedback.textContent = `You wrote "${textboxUnchanged}". This is correct! There are other definitions for this word too, so try to remember those as well!`;
                answerBox.value = "";
                finished_button.hidden = true;
                next_button.style.visibility = "visible";
                return;
            }
        }
        //Debug Command
        //console.log("You're going the right direction.");
        
        // Naturally if it goes through the whole list without ever being correct, we assume the word is incorrect and end up here.
        // The following code executes actions for when the typed word is incorrect.
        incorrectQuestion.push(question_words[y]);
        incorrectAnswer.push(answer_words[y]);
        feedback.textContent = `You wrote "${textboxUnchanged}". This is incorrect Try again. You can do it!!!`;
    }
    answerBox.value = "";
    finished_button.hidden = true;
    next_button.style.visibility = "visible";
}

// Selects a random number within the vocab array scope
function generateQuestion() {
    x = question_words.length;
    y = Math.floor(Math.random() * x);
    question.textContent = `What does "${question_words[y]}" mean?`;
    finished_button.hidden = false;
    next_button.style.visibility = "hidden";
}

// Executes code to start the quiz
function startButtonClicked () {
    // Used in vocab question and answer list calculation
    var Lesson_append = [];
    var Parts_of_speech = [];
    var Translate_to_from = [];

    // List structure is [Lesson[[Part_of_Speech[English_or_Japanese[Word]]]]] for example :    [L13_all_vocab[0[0]]] This will get the nouns from the L13 Vocab
    // [Noun[0], i_Adjective[1], na_Adjective[2]; u_Verb[3], ru_Verb[4], ireg_Verb[5]; Adverb/Other[6]; [Jpns[0], Eng[1]]]];
    if (Jpns_to_Eng_chkbox.checked == true) {
        Translate_to_from.push(0,1);
    }
    if (Eng_to_Jpns_chkbox.checked == true) {
        Translate_to_from.push(1,0);
    }

    // Checks which (if any) parts of speech checkboxes are selected
    var all_pos_chkboxes = [noun_chkbox, i_adjective_chkbox, na_adjective_chkbox, u_vrb_chkbox, ru_vrb_chkbox, ireg_vrb_chkbox, advrb_othr_chkbox];
    for (let i=0;i<all_pos_chkboxes.length;i++) {
        var current_checkbox = all_pos_chkboxes[i];
        if (current_checkbox.checked == true) {
            if (current_checkbox == noun_chkbox) {
                Parts_of_speech.push(0);
            } else if (current_checkbox == i_adjective_chkbox) {
                Parts_of_speech.push(1);
            } else if (current_checkbox == na_adjective_chkbox) {
                Parts_of_speech.push(2);
            } else if (current_checkbox == u_vrb_chkbox) {
                Parts_of_speech.push(3);
            } else if (current_checkbox == ru_vrb_chkbox) {
                Parts_of_speech.push(4);
            } else if (current_checkbox == ireg_vrb_chkbox) {
                Parts_of_speech.push(5);
            } else if (current_checkbox == advrb_othr_chkbox) {
                Parts_of_speech.push(6);
            }
        }
    }

    // Checks if any of the lesson checkboxes are checked
    if (all_vocab_chkbox.checked == true) {
        for (let i=1;i<24;i++) {
            Lesson_append.push(i-1);
        }
    } else {
        for (let i=1;i<24;i++) {
            if (document.getElementById("L"+i+"_vocab").checked == true) {
                Lesson_append.push(i-1);
            }
        }
    }

    // Checks if required checkboxes are checked in order to start program 
    if (Translate_to_from.length == 0 || Parts_of_speech.length == 0 || Lesson_append.length == 0) {
        return;
    }

    // Creates vocab questions and answers lists
    for (let i=0;i<Lesson_append.length;i++) {
        for (let j=0;j<Parts_of_speech.length;j++) {
            for (let k=0;k<Translate_to_from.length;k+=2) {
                for (let l=0;l<all_Lessons[Lesson_append[i]][Parts_of_speech[j]][Translate_to_from[k]].length;l++) {
                    question_words.push(all_Lessons[Lesson_append[i]][Parts_of_speech[j]][Translate_to_from[k]][l]);
                    answer_words.push(all_Lessons[Lesson_append[i]][Parts_of_speech[j]][Translate_to_from[k+1]][l]);
                }
            }
        }
    }

    // Sets up correctWrongStats();
    totalQuestions = question_words.length;

    // Hides/unhides some buttons and text boxes
    next_button.hidden = false;
    answerBox.hidden = false;
    go_button.hidden = false;
    for (let i=0;i<hide.length;i++) {
        hide[i].style.display = 'none';
    }
    start_button.style.display = 'none';
    while (displayIncorrect.rows.length>1) {
        displayIncorrect.deleteRow(-1);
    }
    displayIncorrect.hidden = true;
    statistics.hidden = true;
    feedback.textContent = '';

    // Generates first question
    generateQuestion();
}

// Used to check or uncheck all of the lesson boxes
function Lesson_select(x) {
    for (i=1;i<24;i++) {
        document.getElementById("L"+i+"_vocab").checked = x;
    }
}

// Displays the statistics when you run out of questions or when finished is clicked and shows all incorrect answers
function correctWrongStats() {
    // Unhides elements in prep for next quiz
    next_button.hidden = true;
    finished_button.hidden = true;
    for (let i=0;i<hide.length;i++) {
        hide[i].style.display = '';
    }
    start_button.style.display = '';
    question.textContent = '';
    statistics.hidden = false;
    start_button.textContent = "Restart";

    // Calculations for statistics
    var removeRepeats_Question = [...new Set(incorrectQuestion)];
    var removeRepeats_Answer = [...new Set(incorrectAnswer)];
    var questionsAnswered = totalQuestions-(question_words.length);
    var percentCorrect = (((questionsAnswered-removeRepeats_Question.length)/questionsAnswered)*100).toFixed(2);
    if (isNaN(percentCorrect)) {
        percentCorrect = 0;
    }
    statistics.textContent = `There was a total of ${totalQuestions} questions and you answered ${questionsAnswered} questions. You got ${removeRepeats_Question.length} questions incorrect for a total score of ${percentCorrect}%.`

    // Reset variables for next quiz
    question_words = [];
    answer_words = [];
    totalQuestions = 0;
    incorrectQuestion = [];
    incorrectAnswer = [];

    // Displayes incorrect answers and the correct answer
    for (let i=0;i<removeRepeats_Question.length;i++) {
        var newRow = displayIncorrect.insertRow(-1);
        newRow.insertCell(-1).innerHTML = removeRepeats_Question[i];
        newRow.insertCell(-1).innerHTML = removeRepeats_Answer[i];
    }
    displayIncorrect.hidden = false;
}