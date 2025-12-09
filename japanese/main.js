/*
AUTHOR: retromacbytes.net owner
CREATED ON: 09/09/2025
EDITED ON: 12/01/2025
PURPOSE: A js program to provide functionality to my Japanese language practice webpage.
*/

// CONSIDER HAVEING A SEPARATE FILE WITH JUST THE VOCABULARY

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
const L1_nouns_jpns = [["だいがく","大学"],["こうこう","高校"],["がくせい","学生"],["だいがくせい","大学生"],["りゅうがくせい","留学生"],["せんせい","先生"],["いちねんせい","一年生"],["せんこう","専攻"],["わたし","私"],["ともだち","友達"],["にほんじん","日本人"],["いま","今"],["ごぜん","午前"],["ごご","午後"],["いちじ","一時"],["はん","半"],["にじはん","二時半"],["にほん","日本"],"アメリカ",["にほんご","日本語"],["でんわ","電話"],["ばんごう","番号"],["なまえ","名前"],["なん","なに","何"],"イギリス","オーストラリア",["かんこく","韓国"],"カナダ",["ちゅうごく","中国"],"インド","エジプト","フィリピン",["アジアけんきゅう","アジア研究"],["けいざい","経済"],["こうがく","工学"],["こくさいかんけい","国際関係"],"コンピューター",["せいじ","政治"],["せいぶつがく","生物学"],"ビジネス",["ぶんがく","文学"],["れきし","歴史"],["いしゃ","医者"],["かいしゃいん","会社員"],["かんごし","看護師"],["こうこうせい","高校生"],["しゅふ","主婦"],["だいがくいんせい","大学院生"],["べんごし","弁護士"],["おかあさん","お母さん"],["おとうさん","お父さん"],["おねえさん","お姉さん"],["おにいさん","お兄さん"],["いもうと","妹"],["おとうと","弟"]];
const L1_nouns_eng = [["college","university"],"high school","student","college student","international student",["teacher","Professor"],["first-year student","first year student"],"major","I","friend","Japanese people","now",["A.M.","AM"],["P.M.","PM"],"one o'clock","half",["half past two","two thirty","2:30"],"Japan",["U.S.A","America","United States","United States of America"],"Japanese language",["telephone","phone"],"number","name","what","Britain","Australia","Korea","Canada","China","India","Egypt","Philippines","Asian studies","economics","engineering","international relations","computer","politics","biology","business","literature","history","doctor","office worker","nurse","high school student","housewife","graduate student","lawyer","mother","father","older sister","older brother","younger sister","younger brother"];

const L1_i_adjectives_jpns = [];
const L1_i_adjectives_eng = [];
const L1_na_adjectives_jpns = [];
const L1_na_adjectives_eng = [];

const L1_u_verbs_jpns = [];
const L1_u_verbs_eng = [];
const L1_ru_verbs_jpns = [];
const L1_ru_verbs_eng = [];
const L1_ireg_verbs_jpns = [];
const L1_ireg_verbs_eng = [];

const L1_adverbs_etc_jpns = [["～ねんせい","～年生"],"～さん",["～じん","～人"],["～じ","～時"],["～ご","～語"],["～さい","～歳"],["～ばん","～番"],"あのう","はい","そうです","そうですか",["おはよう","お早う"],["おはようございます","お早うございます"],["こんにちは","今日は"],["こんばんは","今晩は"],"さようなら",["おやすみ","お休み","おやすみなさい","お休みなさい"],["ありがとう","有難う"],["ありがとうございます","有難うございます"],["すみません","済みません"],"いいえ",["いってきます","行ってきます"],["いってらっしゃい","行ってらっしゃい"],["ただいま","只今"],["おかえり","お帰り","おかえりなさい","お帰りなさい"],["いただきます","頂きます"],["ごちそうさま","ご馳走様","ごちそうさまでした","ご馳走様でした"],["はじめまして","初めまして"],"～です",["よろしくおねがいします","宜しくお願いします"]];
const L1_adverbs_etc_eng = ["year student",["Mr.","Ms."],"people","o'clock","language","years old","number","um","yes","That's right",["I see.","Is that so?"],"Good morning",["Good morning (polite)","Good morning. (polite)"],"Good afternoon","Good evening",["Good bye","Good-bye"],"Good night","Thank you",["Thank you (polite)","Thank you. (polite)"],["Excuse me","I'm sorry"],["No","Not at all"],"I'll go and come back","Please go and come back","I'm home","Welcome home",["Thank you for the meal (before eating)","Thank you for the meal. (before eating)"],["Thank you for the meal (after eating)","Thank you for the meal. (after eating)"],"How do you do",["I am","something is"],"Nice to meet you"];

const L1_all_vocab = [[L1_nouns_jpns,L1_nouns_eng],[L1_i_adjectives_jpns,L1_i_adjectives_eng],[L1_na_adjectives_jpns,L1_na_adjectives_eng],[L1_u_verbs_jpns,L1_u_verbs_eng],[L1_ru_verbs_jpns,L1_ru_verbs_eng],[L1_ireg_verbs_jpns,L1_ireg_verbs_eng],[L1_adverbs_etc_jpns,L1_adverbs_etc_eng]];

// L2 Vocabulary
const L2_nouns_jpns = ["これ","それ","あれ","どれ","この","その","あの","どの","ここ","そこ","あそこ","どこ","だれ",["さかな","魚"],"とんかつ","にく","メニュー",["やさい","野菜"],["かさ","傘"],["かばん","鞄"],["くつ","靴"],["さいふ","財布"],"ジーンズ",["じてんしゃ","自転車"],["しんぶん","新聞"],"スマホ",["Tシャツ","Tーシャツ","Tシャツ","T-シャツ"],["とけい","時計"],"ノート","ペン",["ぼうし","帽子"],["ほん","本"],["ぎんこう","銀行"],"コンビニ","トイレ",["としょかん","図書館"],["ゆうびんきょく","郵便局"],"イギリス",["かんこく","韓国"],["ちゅうごく","中国"],["えいご","英語"],["けいざい","経済"],"コンピューター","ビジネス",["れきし","歴史"],["おかあさん","お母さん"],["おとうさん","お父さん"]];
const L2_nouns_eng = ["this one","that one","that one over there","which one","this","that","that over there","which","here","there","over there","where","who","fish","pork cutlet","meat","menu","vegetable","umbrella","bag","shoes","wallet","jeans","bicycle","newspaper",["smartphone","mobile"],["T-shirt","T shirt"],["watch","clock"],"notebook","pen",["hat","cap"],"book","bank","convenience store",["toilet","restroom"],"library","post office","Britain","Korea","China",["English language","English"],"economics","computer","business","history","mother","father"];

const L2_i_adjectives_jpns = [["おいしい","美味しい"],["たかい","高い"]];
const L2_i_adjectives_eng = ["delicious",["expensive","high"]];
const L2_na_adjectives_jpns = [];
const L2_na_adjectives_eng = [];

const L2_u_verbs_jpns = [];
const L2_u_verbs_eng = [];
const L2_ru_verbs_jpns = [];
const L2_ru_verbs_eng = [];
const L2_ireg_verbs_jpns = [];
const L2_ireg_verbs_eng = [];

const L2_adverbs_etc_jpns = [["いくら","幾ら"],["えん","円"],"いらっしゃいませ",["おねがいします","お願いします"],["ください","下さい"],"じゃあ","どうぞ","どうも"];
const L2_adverbs_etc_eng = ["how much","yen",["Welcome to our store.","Welcome to our store"],"please","please give me",["then","if that is the case"],["Please.","Please","Here it is.","Here it is"],["Thank you.","Thank you"]];

const L2_all_vocab = [[L2_nouns_jpns,L2_nouns_eng],[L2_i_adjectives_jpns,L2_i_adjectives_eng],[L2_na_adjectives_jpns,L2_na_adjectives_eng],[L2_u_verbs_jpns,L2_u_verbs_eng],[L2_ru_verbs_jpns,L2_ru_verbs_eng],[L2_ireg_verbs_jpns,L2_ireg_verbs_eng],[L2_adverbs_etc_jpns,L2_adverbs_etc_eng]];

// L3 Vocabulary
const L3_nouns_jpns = [["えいが","映画"],["おんがく","音楽"],["ざっし","雑誌"],"スポーツ","デート","テニス","テレビ","アイスクリーム","ハンバーガー",["おさけ","お酒"],["おちゃ","お茶"],"コーヒー",["みず","水"],["あさごはん","朝ご飯"],["ひるごはん","昼ご飯"],["ばんごはん","晩ご飯"],["いえ","家","うち"],["がっこう","学校"],"カフェ",["あした","明日"],["きょう","今日"],["あさ","朝"],["こんばん","今晩"],["まいにち","毎日"],["まいばん","毎晩"],["しゅうまつ","週末"],["どようび","土曜日"],["にちようび","日曜日"],"いつ","～ごろ"];
const L3_nouns_eng = ["movie","music","magazine","sports","date","tennis","TV","ice cream","hamburger",["sake","alcoholic drink"],"green tea","coffee","water","breakfast","lunch","dinner",["home","house","my place"],"school","cafe","tomorrow","today","morning","tonight","every day","every night","weekend","Saturday","Sunday","when","at about"];

const L3_i_adjectives_jpns = ["いい",["はやい","早い"]];
const L3_i_adjectives_eng = ["good","early"];
const L3_na_adjectives_jpns = [];
const L3_na_adjectives_eng = [];

const L3_u_verbs_jpns = [["いく","行く"],["かえる","帰る"],["きく","聞く"],["のむ","飲む"],["はなす","話す"],["よむ","読む"]];
const L3_u_verbs_eng = ["to go",["to go back","to return"],["to listen","to hear"],"to drink",["to speak","to talk"],"to read"];
const L3_ru_verbs_jpns = [["おきる","起きる"],["たべる","食べる"],["ねる","寝る"],["みる","見る"]];
const L3_ru_verbs_eng = ["to get up","to eat",["to sleep","to go to sleep"],["to see","to look at","to watch"]];
const L3_ireg_verbs_jpns = [["くる","来る"],"する",["べんきょうする","勉強する"]];
const L3_ireg_verbs_eng = ["to come","to do","to study"];

const L3_adverbs_etc_jpns = ["あまり",["ぜんぜん","全然"],"たいてい","ちょっと",["ときどき","時々"],"よく","そうですね","でも","どうですか","ええ"];
const L3_adverbs_etc_eng = ["not much","not at all","usually","a little","sometimes",["often","much"],["That's right.","That's right","Let me see.","Let me see"],"but",["How about","How about?","How is","How is?"],"yes"];

const L3_all_vocab = [[L3_nouns_jpns,L3_nouns_eng],[L3_i_adjectives_jpns,L3_i_adjectives_eng],[L3_na_adjectives_jpns,L3_na_adjectives_eng],[L3_u_verbs_jpns,L3_u_verbs_eng],[L3_ru_verbs_jpns,L3_ru_verbs_eng],[L3_ireg_verbs_jpns,L3_ireg_verbs_eng],[L3_adverbs_etc_jpns,L3_adverbs_etc_eng]];

// L4 Vocabulary
const L4_nouns_jpns = ["ゲーム",["アルバイト","バイト"],["かいもの","買い物"],"クラス",["いぬ","犬"],["ねこ","猫"],["ひと","人"],["こども","子供"],"あなた","いす",["つくえ","机"],["しゃしん","写真"],["はな","花"],"レポート",["ごはん","ご飯"],"パン",["おてら","お寺"],["こうえん","公園"],"スーパー",["バスてい","バス停"],["びょういん","病院"],"ホテル",["ほんや","本屋"],["まち","町"],"レストラン",["きのう","昨日"],["～じかん","～時間"],["いちじかん","一時間"],["せんしゅう","先週"],["とき","時"],["げつようび","月曜日"],["かようび","火曜日"],["すいようび","水曜日"],["もくようび","木曜日"],["きんようび","金曜日"]];
const L4_nouns_eng = ["game",["part-time job","part time job"],"shopping","class","dog","cat","person","child","you","chair","desk",["picture","photograph"],"flower","term paper",["rice","meal"],"bread","temple","park","supermarket","bus stop","hospital","hotel","bookstore",["town","city"],"restaurant","yesterday","hours","one hour","last week",["when","at the time of"],"Monday","Tuesday","Wednesday","Thursday","Friday"];

const L4_i_adjectives_jpns = [];
const L4_i_adjectives_eng = [];
const L4_na_adjectives_jpns = [];
const L4_na_adjectives_eng = [];

const L4_u_verbs_jpns = [["あう","会う"],"ある",["かう","買う"],["かく","書く"],["とる","撮る"],["まつ","待つ"],"わかる"];
const L4_u_verbs_eng = [["to meet","to see a person"],"there is","to buy","to write","to take a picture","to wait","to understand"];
const L4_ru_verbs_jpns = ["いる"];
const L4_ru_verbs_eng = [["a person is in","a person stays at"]];
const L4_ireg_verbs_jpns = [];
const L4_ireg_verbs_eng = [];

const L4_adverbs_etc_jpns = ["～ぐらい","ごめんなさい","それから","だから","たくさん","～と","どうして",["ひとりで","一人で"],"もしもし",["みぎ","右"],["ひだり","左"],["まえ","前"],["うしろ","後ろ"],["なか","中"],["うえ","上"],["した","下"],["ちかく","近く"],["となり","隣"],["あいだ","間"]];
const L4_adverbs_etc_eng = [["about (approximate measurement)"],["I'm sorry.","I'm sorry"],"and then",["so","therefore"],["many","a lot"],["together with a person","and"],"why","alone","Hello? (used on the phone)","right","left","front","back","inside","on","under",["near","nearby"],"next","between"];

const L4_all_vocab = [[L4_nouns_jpns,L4_nouns_eng],[L4_i_adjectives_jpns,L4_i_adjectives_eng],[L4_na_adjectives_jpns,L4_na_adjectives_eng],[L4_u_verbs_jpns,L4_u_verbs_eng],[L4_ru_verbs_jpns,L4_ru_verbs_eng],[L4_ireg_verbs_jpns,L4_ireg_verbs_eng],[L4_adverbs_etc_jpns,L4_adverbs_etc_eng]];

// L5 Vocabulary
const L5_nouns_jpns = [["たべもの","食べ物"],["のみもの","飲み物"],["くだもの","果物"],["やすみ","休み"],["りょこう","旅行"],["うみ","海"],"サーフィン",["おみやげ","お土産"],"バス",["てんき","天気"],["しゅくだい","宿題"],"テスト",["たんじょうび","誕生日"],["へや","部屋"],["ぼく","僕"],["Lサイズ","エルサイズ"]];
const L5_nouns_eng = ["food","drink","fruit",["holiday","day off","absence"],"travel","sea","surfing","souvenir","bus","weather","homework","test","birthday","room","I (used by men)",["size L","L size","large size","size large"]];

const L5_i_adjectives_jpns = [["あたらしい","新しい"],["ふるい","古い"],["あつい","暑い"],["さむい","寒い"],["あつい","熱い"],["いそがしい","忙しい"],["おおきい","大きい"],["ちいさい","小さい"],["おもしろい","面白い"],"つまらない","やさしい",["むずかしい","難しい"],"かっこいい",["こわい","怖い"],["たのしい","楽しい"],["やすい","安い"]];
const L5_i_adjectives_eng = ["new","old thing","hot weather","cold weather","hot thing",["busy","busy people","busy day"],"large","small",["interesting","funny"],"boring",["easy","easy problem","kind","kind person"],"difficult",["good looking","good-looking"],"frightening","fun",["inexpensive","inexpensive thing","cheap","cheap thing"]];
const L5_na_adjectives_jpns = [["すきな","好きな"],["きらいな","嫌いな"],["だいすきな","大好きな"],["だいきらいな","大嫌いな"],"きれいな",["げんきな","元気な"],["しずかな","静かな"],"にぎやかな",["ひまな","暇な"]];
const L5_na_adjectives_eng = [["fond of","to like"],["disgusted with","to dislike"],["very fond of","to love"],"to hate",["beautiful","clean"],["healthy","energetic"],"quiet","lively",["not busy","free time"]];

const L5_u_verbs_jpns = [["およぐ","泳ぐ"],["きく","聞く"],["のる","乗る"],"やる"];
const L5_u_verbs_eng = ["to swim","to ask",["to ride","to board"],["to do","to perform"]];
const L5_ru_verbs_jpns = [["でかける","出かける"]];
const L5_ru_verbs_eng = ["to go out"];
const L5_ireg_verbs_jpns = [];
const L5_ireg_verbs_eng = [];

const L5_adverbs_etc_jpns = [["いっしょに","一緒に"],"すごく",["だいじょうぶ","大丈夫"],"とても","どんな",["～まい","～枚"]];
const L5_adverbs_etc_eng = ["together","extremely",["It's okay.","It's okay","Not to worry.","Not to worry","Everything is under control.","Everything is under control"],"very","what kind of","flat objects"];

const L5_all_vocab = [[L5_nouns_jpns,L5_nouns_eng],[L5_i_adjectives_jpns,L5_i_adjectives_eng],[L5_na_adjectives_jpns,L5_na_adjectives_eng],[L5_u_verbs_jpns,L5_u_verbs_eng],[L5_ru_verbs_jpns,L5_ru_verbs_eng],[L5_ireg_verbs_jpns,L5_ireg_verbs_eng],[L5_adverbs_etc_jpns,L5_adverbs_etc_eng]];

// L6 Vocabulary
const L6_nouns_jpns = [["かんじ","漢字"],["きょうかしょ","教科書"],"ページ",["つぎ","次"],["おかね","お金"],["にもつ","荷物"],"パソコン","シャワー","エアコン",["でんき","電気"],["まど","窓"],["でんしゃ","電車"],["くに","国"],["こんしゅう","今週"],["らいしゅう","来週"],["らいねん","来年"],["よる","夜"]];
const L6_nouns_eng = [["kanji","Chinese character"],"textbook","page","next","money","baggage","personal computer","shower","air conditioner",["electricity","light"],"window","train",["country","place of origin"],"this week","next week","next year","night"];

const L6_i_adjectives_jpns = [];
const L6_i_adjectives_eng = [];
const L6_na_adjectives_jpns = [["たいへんな","大変な"]];
const L6_na_adjectives_eng = ["tough situation"];

const L6_u_verbs_jpns = [["あそぶ","遊ぶ"],["いそぐ","急ぐ"],["かえす","返す"],["けす","消す"],["しぬ","死ぬ"],["すわる","座る"],["たつ","立つ"],["たばこをすう","たばこを吸う"],["つかう","使う"],["てつだう","手伝う"],["はいる","入る"],["もつ","持つ"],["やすむ","休む"]];
const L6_u_verbs_eng = [["to play","to spend time pleasantly"],"to hurry","to return a thing",["to turn off","to erase"],"to die","to sit down","to stand up","to smoke","to use","to help","to enter",["to carry","to hold"],["to be absent from","to rest"]];
const L6_ru_verbs_jpns = [["あける","開ける"],["しめる","閉める"],["おしえる","教える"],["わすれる","忘れる"],["おりる","降りる"],["かりる","借りる"],["シャワーをあびる","シャワーを浴びる"],"つける"];
const L6_ru_verbs_eng = ["to open something","to close something",["to teach","to instruct"],["to forget","to leave behind"],"to get off","to borrow","to take a shower","to turn on"];
const L6_ireg_verbs_jpns = [["でんわする","電話する"],["つれてくる","連れてくる"],["もってくる","持ってくる"]];
const L6_ireg_verbs_eng = ["to call","to bring a person","to bring a thing"];

const L6_adverbs_etc_jpns = [["あとで","後で"],"すぐ","ゆっくり",["けっこうです","結構です"],["ほんとうですか","本当ですか"]];
const L6_adverbs_etc_eng = ["later on","right away",["slowly","leisurely","unhurriedly"],["That would be fine.","That would be fine","That wouldn't be necessary.","That wouldn't be necessary"],"Really?"];

const L6_all_vocab = [[L6_nouns_jpns,L6_nouns_eng],[L6_i_adjectives_jpns,L6_i_adjectives_eng],[L6_na_adjectives_jpns,L6_na_adjectives_eng],[L6_u_verbs_jpns,L6_u_verbs_eng],[L6_ru_verbs_jpns,L6_ru_verbs_eng],[L6_ireg_verbs_jpns,L6_ireg_verbs_eng],[L6_adverbs_etc_jpns,L6_adverbs_etc_eng]];

// L7 Vocabulary
const L7_nouns_jpns = [["かぞく","家族"],"おじいさん","おばあさん",["おにいさん","お兄さん"],["おねえさん","おねえさん"],["ちち","父"],["はは","母"],["あに","兄"],["あね","姉"],["いもうと","妹"],["おとうと","弟"],["きょうだい","兄弟"],["おとこのひと","男の人"],["おんなのひと","女の人"],["かいしゃ","会社"],["しょくどう","食堂"],"デパート",["かみ","髪"],["くち","口"],["め","目"],["めがね","眼鏡"],["うた","歌"],"サークル",["くるま","車"]];
const L7_nouns_eng = ["family",["grandfather","old man"],["grandmonter","old woman"],"older brother","older sister","my father","my mother","my older brother","my older sister","younger sister","younger brother",["brothers and sisters","sibilings"],"man","woman","company",["cafeteria","dining commons"],"department store","hair","mouth","eye","glasses","song","club activity","car"];

const L7_i_adjectives_jpns = [["ながい","長い"],["みじかい","短い"],["はやい","速い"],["せがたかい","背が高い"],["せがひくい","背が低い"],["あたまがいい","頭がいい"],"かわいい"];
const L7_i_adjectives_eng = ["long","short (length)","fast","tall","short (stature)",["bright","smart","clever"],"cute"];
const L7_na_adjectives_jpns = [["しんせつな","親切な"],["べんりな","便利な"]];
const L7_na_adjectives_eng = ["kind","convenient"];

const L7_u_verbs_jpns = [["うたう","歌う"],"かぶる","はく",["しる","知る"],["しっています","知っています"],["しりません","知りません"],["すむ","住む"],["はたらく","働く"],["ふとる","太る"],["ふとっています","太っています"]];
const L7_u_verbs_eng = ["to sing","to put on a hat","to put on items below your waist","to get to know","I know",["I don't know","I do not know"],"to live","to work","to gain weight",["to be on the heavy side","overweight"]];
const L7_ru_verbs_jpns = [["めがねをかける","かける","眼鏡をかかる"],["きる","着る"],"やせる","やせています"];
const L7_ru_verbs_eng = ["to put on glasses","to put on clothes above your waist","to lose weight","to be thin"];
const L7_ireg_verbs_jpns = [["けっこんする","結婚する"]];
const L7_ireg_verbs_eng = ["to get married"];

const L7_adverbs_etc_jpns = ["～が",["なにも","何も"],["～にん","～人"],["ひとり","一人"],["ふたり","二人"],["べつに","別に"],"もちろん","よかったら"];
const L7_adverbs_etc_eng = ["but","not anything","counter for people","one person","two people","nothing in particular","of course","if you like"];

const L7_all_vocab = [[L7_nouns_jpns,L7_nouns_eng],[L7_i_adjectives_jpns,L7_i_adjectives_eng],[L7_na_adjectives_jpns,L7_na_adjectives_eng],[L7_u_verbs_jpns,L7_u_verbs_eng],[L7_ru_verbs_jpns,L7_ru_verbs_eng],[L7_ireg_verbs_jpns,L7_ireg_verbs_eng],[L7_adverbs_etc_jpns,L7_adverbs_etc_eng]];

// L8 Vocabulary
const L8_nouns_jpns = [["はれ","晴れ"],["あめ","雨"],["くもり","曇り"],["ゆき","雪"],["てんきよほう","天気予報"],["きおん","気温"],["なつ","夏"],["ふゆ","冬"],["けさ","今朝"],"あさって",["まいしゅう","毎週"],["こんげつ","今月"],["らいげつ","来月"],["かいしゃいん","会社員"],["しごと","仕事"],"カメラ","カラオケ",["ところ","所"],"トマト","はし","パーティー","バーベキュー","ホームステイ",["おふろ","お風呂"],"スペイン",["なにか","何か"]];
const L8_nouns_eng = ["sunny weather","rain","cloudy wether","snow","weather forcast","temperature","summer","winter","this morning","the day after tomorrow","every week","this month","next month","office worker",["job","work","occupation"],"camera","karaoke","place","tomato","chopsticks","party","barbecue",["homestay","living with a local family"],"bath","Spain","something"];

const L8_i_adjectives_jpns = [];
const L8_i_adjectives_eng = [];
const L8_na_adjectives_jpns = [["じょうずな","上手な"],["へたな","下手な"],["ゆうめいな","有名な"]];
const L8_na_adjectives_eng = [["skillful","good at"],["clumsy","poor at"],"famous"];

const L8_u_verbs_jpns = [["あらう","洗う"],["いう","言う"],"いる",["おそくなる","遅くなる"],["おふろにはいる","お風呂に入る"],["おもう","思う"],["きる","切る"],["つくる","作る"],["あめがふる","雨が降る"],["ゆきがふる","雪が降る"],["もっていく","持っていく"]];
const L8_u_verbs_eng = ["to wash","to say","to need","to be late","to take a bath","to think","to cut","to make","rain falls","snow falls","to take a thing"];
const L8_ru_verbs_jpns = [["すてる","捨てる"],["はじめる","始める"]];
const L8_ru_verbs_eng = ["to throw away","to begin"];
const L8_ireg_verbs_jpns = [["うんてんする","運転する"],["せんたくする","せんたくする"],["そうじする","掃除する"],["りょうりする","料理する"]];
const L8_ireg_verbs_eng = ["to drive","to do laundry","to clean","to cook"];

const L8_adverbs_etc_jpns = ["うん","ううん","いつも",["おそく","遅く"],["かんぱい","乾杯"],"みんなで",["ざんねんですね","ざんねん","残念","残念ですね"],"まだ","～について",["～ど","～度"],"どう"];
const L8_adverbs_etc_eng = [["uh-huh","uh huh","yes"],["uh-uh","uh uh","no"],"always","do something late","Cheers!",["all of the people together","all together"],["That's too bad","That's too bad."],"not yet",["about","concerning"],"degrees","how"];

const L8_all_vocab = [[L8_nouns_jpns,L8_nouns_eng],[L8_i_adjectives_jpns,L8_i_adjectives_eng],[L8_na_adjectives_jpns,L8_na_adjectives_eng],[L8_u_verbs_jpns,L8_u_verbs_eng],[L8_ru_verbs_jpns,L8_ru_verbs_eng],[L8_ireg_verbs_jpns,L8_ireg_verbs_eng],[L8_adverbs_etc_jpns,L8_adverbs_etc_eng]];

// L9 Vocabulary
const L9_nouns_jpns = [["たんご","単語"],["さくぶん","作文"],["しけん","試験"],["てがみ","手紙"],"メール","ギター","ピアノ","コンサート","チケット",["かぶき","歌舞伎"],"スキー",["おべんとう","お弁当"],"ピザ",["びょうき","病気"],["くすり","薬"],["いいこ","いい子"],["いろ","色"],["こんど","今度"],["せんげつ","先月"],["きょねん","去年"]];
const L9_nouns_eng = [["word","vocabulary"],["essay","composition"],"exam","letter",["email","e-mail"],"guitar","piano","concert","ticket",["Kabuki","traditional Japanese theatrical art"],"ski","boxed lunch","pizza",["illness","sickness"],"medicine","good child","color","near future","last month","last year"];

const L9_i_adjectives_jpns = [["あおい","青い"],["あかい","赤い"],["くろい","黒い"],["しろい","白い"],["さびしい","寂しい"],["わかい","若い"]];
const L9_i_adjectives_eng = ["blue","red","black","white","lonely","young"];
const L9_na_adjectives_jpns = [["いじわるな","意地悪な"]];
const L9_na_adjectives_eng = [["mean-spirited","mean spirited"]];

const L9_u_verbs_jpns = [["おどる","踊る"],["おわる","終わる"],["くすりをのむ","薬を飲む"],["にんきがある","人気がある"],["はじまる","始まる"],["ひく","弾く"],"もらう"];
const L9_u_verbs_eng = ["to dance","something ends","to take medicine","to be popular","something begins",["to play a string instrument or piano","to play a string instrument"],"to get from somebody"];
const L9_ru_verbs_jpns = [["おぼえる","覚える"],["でる","出る"]];
const L9_ru_verbs_eng = ["to memorize",["to appear","to attend","to exit"]];
const L9_ireg_verbs_jpns = [["うんどうする","運動する"],["さんぽする","散歩する"]];
const L9_ireg_verbs_eng = ["to exercise","to take a walk"];

const L9_adverbs_etc_jpns = ["そう","～から","～まで",["ぜひ","是非"],"ところで","みんな","もう",["ひとつ","一つ"],["ふたつ","二つ"],["みっつ","三つ"],["よっつ","四つ"],["いつつ","五つ"],["むっつ","六つ"],["ななつ","七つ"],["やっつ","八つ"],["ここのつ","九つ"],["とお","十"]];
const L9_adverbs_etc_eng = ["I think so","from",["to a place","to a time"],"by all means","by the way","all","already","one","two","three","four","five","six","seven","eight","nine","ten"];

const L9_all_vocab = [[L9_nouns_jpns,L9_nouns_eng],[L9_i_adjectives_jpns,L9_i_adjectives_eng],[L9_na_adjectives_jpns,L9_na_adjectives_eng],[L9_u_verbs_jpns,L9_u_verbs_eng],[L9_ru_verbs_jpns,L9_ru_verbs_eng],[L9_ireg_verbs_jpns,L9_ireg_verbs_eng],[L9_adverbs_etc_jpns,L9_adverbs_etc_eng]];

// L10 Vocabulary
const L10_nouns_jpns = [["きせつ","季節"],["はる","春"],["あき","秋"],["ぎゅうにゅう","牛乳"],"ケーキ","すし",["てんぷら","天ぷら"],"りんご",["りょうり","料理"],"サッカー",["やきゅう","野球"],["いしゃ","医者"],["おかねもち","お金持ち"],["ゆうめいじん","有名人"],["かお","顔"],["としうえ","年上"],["えき","駅"],["しんかんせん","新幹線"],["ちかてつ","地下鉄"],["ふね","船"],["ひこうき","飛行機"],["よやく","予約"],"ツアー",["どうぶつえん","動物園"],["じかん","時間"],["せかい","世界"],["びよういん","美容院"],["てぶくろ","手袋"],["せいかつ","生活"],["ことし","今年"]];
const L10_nouns_eng = ["season","spring","fall","milk","cake","sushi","tempura","apple",["cooking","cuisine"],"soccer","baseball","doctor","rich person","cleebrity","face","someone older","station",["Shinkansen","Bullet Train"],"subway",["ship","boat"],"airplane","reservation","tour","zoo","time","world","beauty parlor","gloves",["life","living"],"this year"];

const L10_i_adjectives_jpns = [["あたたかい","暖かい"],["すずしい","涼しい"],["つめたい","冷たい"],["おそい","遅い"],["ねむい","眠い"]];
const L10_i_adjectives_eng = ["warm","cold weather",["cold things","cold person","cold people"],["slow","late"],"sleepy"];
const L10_na_adjectives_jpns = [["かんたんな","簡単な"]];
const L10_na_adjectives_eng = [["easy","simple"]];

const L10_u_verbs_jpns = ["かかる",["とまる","泊まる"],"なる"];
const L10_u_verbs_eng = [["to take amount of time","to take amount of money"],"to stay at a hotel","to become"];
const L10_ru_verbs_jpns = [["きめる","決める"]];
const L10_ru_verbs_eng = ["to decide"];
const L10_ireg_verbs_jpns = ["ごろごろする",["りょこうする","旅行する"],["れんしゅうする","練習する"]];
const L10_ireg_verbs_eng = [["to chill out at home","to stay home and do nothing"],"to travel","to practice"];

const L10_adverbs_etc_jpns = [["いちばん","一番"],["どっち","どちら"],["はやく","早く","速く"],["あるいて","歩いて"],"～で","どうやって","どのぐらい",["～しゅうかん","～週間"],["～かげつ","～か月"],["～ねん","～年"],"このごろ",["～ご","～後"],"～か～"];
const L10_adverbs_etc_eng = ["best","which",["do something early","do something fast"],"on foot",["by means of transportation","with a tool"],["how","by what means"],["how much","how long"],"for weeks","for months","years","these days",["in time","after"],"or"];

const L10_all_vocab = [[L10_nouns_jpns,L10_nouns_eng],[L10_i_adjectives_jpns,L10_i_adjectives_eng],[L10_na_adjectives_jpns,L10_na_adjectives_eng],[L10_u_verbs_jpns,L10_u_verbs_eng],[L10_ru_verbs_jpns,L10_ru_verbs_eng],[L10_ireg_verbs_jpns,L10_ireg_verbs_eng],[L10_adverbs_etc_jpns,L10_adverbs_etc_eng]];

// L11 Vocabulary
const L11_nouns_jpns = [["がいこく","外国"],"オーストラリア",["かわ","川"],["おんせん","温泉"],"つり",["みずうみ","湖"],["やま","山"],"キャンプ","ドライブ",["じんじゃ","神社"],["びじゅつかん","美術館"],["しゃちょう","社長"],["かしゅ","歌手"],"ルームメイト","ホストファミリー",["しょうらい","将来"],["ゆめ","夢"],["おまつり","お祭り"],["おしょうがつ","お正月"],["おかし","お菓子"],"ビール","おもちゃ",["こんがっき","今学期"],["らいがっき","来学期"],["じゅぎょう","授業"],"こちら",["さっか","作家"],"ジャーナリスト",["けいさつかん","警察官"],["しょうぼうし","消防士"],["きょうし","教師"],["けんきゅうしゃ","研究者"],["うちゅうひこうし","宇宙飛行士"],["スポーツせんしゅ","スポーツ選手"],["だいとうりょう","大統領"],["はいゆう","俳優"],["かんごし","看護師"],"シェフ",["まんがか","漫画家"]];
const L11_nouns_eng = ["foreign country","Austrailia","river",["spa","hot spring"],"fishing","lake","mountain","camp","drive","shrine","art museum","president of a company","singer","roommate","host family","future","dream","festival","New Year's",["snacks","drinks"],"beer","toy","this semester","next semester","class",["this person","this person (polite)"],"writer","journalist","police officer","firefighter","schoolteacher","researcher","astronaut","athlete","president of a country",["actor","actress"],"nurse","chef","cartoonist"];

const L11_i_adjectives_jpns = [];
const L11_i_adjectives_eng = [];
const L11_na_adjectives_jpns = [];
const L11_na_adjectives_eng = [];

const L11_u_verbs_jpns = ["うそをつく","おなかがすく",["かう","飼う"],"サボる",["とる","取る"],["ならう","習う"],["のぼる","登る"],["はしる","走る"]];
const L11_u_verbs_eng = ["to tell a lie","to become hungry","to own a pet","to cut classes",["to take a class","to get a grade"],"to learn","to climb","to run"];
const L11_ru_verbs_jpns = [["つかれる","疲れる"],"やめる"];
const L11_ru_verbs_eng = ["to get tired","to quit"];
const L11_ireg_verbs_jpns = ["けんかする",["しょうかいする","紹介する"],"ダイエットする",["ちこくする","遅刻する"],["りゅうがくする","留学する"]];
const L11_ireg_verbs_eng = [["to have a fight","to quarrel"],"to introduce","to go on a diet","to be late for an appointment","to study abroad"];

const L11_adverbs_etc_jpns = [["しゅっしん","出身"],["ひさしぶり","久しぶり"],"まあまあ","もっと",["あと","後"],"そして","～だけ",["～てん","～点"]];
const L11_adverbs_etc_eng = ["coming from","it has been a long time",["okay","so-so"],"more","after an event","and then",["just","only"],"points"];

const L11_all_vocab = [[L11_nouns_jpns,L11_nouns_eng],[L11_i_adjectives_jpns,L11_i_adjectives_eng],[L11_na_adjectives_jpns,L11_na_adjectives_eng],[L11_u_verbs_jpns,L11_u_verbs_eng],[L11_ru_verbs_jpns,L11_ru_verbs_eng],[L11_ireg_verbs_jpns,L11_ireg_verbs_eng],[L11_adverbs_etc_jpns,L11_adverbs_etc_eng]];

// L12 Vocabulary
const L12_nouns_jpns = ["おなか",["あし","足"],["のど","喉"],["は","歯"],"インフルエンザ",["かぜ","風邪"],"せき",["ふつかよい","二日酔い"],"ホームシック","アレルギー","ジュース",["たまご","卵"],["ふく","服"],["もの","物"],"プレゼント",["きっぷ","切符"],["～だい","～代"],["ようじ","用事"],["おてあらい","お手洗い"],["しあい","試合"],["せいじ","政治"],["せいせき","成績"],["かのじょ","彼女"],["かれ","彼"],["かれし","彼氏"],["いみ","意味"]];
const L12_nouns_eng = ["stomach",["leg","foot"],"throat","tooth",["influenza","flu"],"cold","cough","hangover","homesickness","allergy","juice","egg","cloths","thing","present",["train ticket","ticket"],["charge","fee"],"business to take care of","restroom",["match","game"],"politics","grade",["she","girlfriend"],["he","boyfriend"],"boyfriend","meaning"];

const L12_i_adjectives_jpns = [["せまい","狭い"],["ひろい","広い"],["わるい","悪い"],["いたい","痛い"],["あまい","甘い"],["おおい","多い"]];
const L12_i_adjectives_eng = [["narrow","not spacious"],["wide","spacious"],"bad",["hurt","painful"],"sweet","there are many"];
const L12_na_adjectives_jpns = [["すてきな","素敵な"]];
const L12_na_adjectives_eng = ["nice"];

const L12_u_verbs_jpns = [["あるく","歩く"],["かぜをひく","風邪をひく"],["ねつがある","熱がある"],["のどがかわく","喉が渇く"],["はらう","払う"],"なくす",["きょうみがある","興味がある"]];
const L12_u_verbs_eng = ["to walk","to catch a cold","to have a feaver","to become thirsty","to pay","to lose",["to be interested in","to be interested"]];
const L12_ru_verbs_jpns = [["せきがでる","せきが出る"],["わかれる","別れる"]];
const L12_ru_verbs_eng = ["to cough",["to break up","to separate"]];
const L12_ireg_verbs_jpns = [["きんちょうする","緊張する"],["しんぱいする","心配する"]];
const L12_ireg_verbs_eng = ["to get nervous","to worry"];

const L12_adverbs_etc_jpns = [["おだいじに","お大事に"],["げんきがない","元気がない"],"できるだけ",["たぶん","多分"],"もうすぐ",["はじめて","初めて"],["にさんにち","二三日"],"それに",["おなじ","同じ"]];
const L12_adverbs_etc_eng = ["Get well soon","don't look well","as much as possible",["probably","maybe"],["very soon","in a few moments","in a few days"],"for the first time","for two to three days","moreover","same"];

const L12_all_vocab = [[L12_nouns_jpns,L12_nouns_eng],[L12_i_adjectives_jpns,L12_i_adjectives_eng],[L12_na_adjectives_jpns,L12_na_adjectives_eng],[L12_u_verbs_jpns,L12_u_verbs_eng],[L12_ru_verbs_jpns,L12_ru_verbs_eng],[L12_ireg_verbs_jpns,L12_ireg_verbs_eng],[L12_adverbs_etc_jpns,L12_adverbs_etc_eng]];

// L13 Vocabulary
const L13_nouns_jpns = [["おとな","大人"],["べんごし","弁護士"],["わたくし","私"],"カレー",["こうちゃ","紅茶"],["きもの","着物"],"セーター",["がっき","楽器"],["からて","空手"],"ゴルフ","バイク",["ぞう","象"],["からだ","体"],["がいこくご","外国語"],["ことば","言葉"],["ぶんぽう","文法"],"アプリ","アパート","マンション",["くうこう","空港"],["みせ","店"],["ぶっか","物価"],["こうこく","広告"],["ぼしゅう","募集"],["やくそく","約束"]];
const L13_nouns_eng = ["adult","lawyer",["I","I (formal)"],"curry","black tea",["kimono","Japanese traditional dress"],"sweater","musical instrument","karate","golf","motorcycle","elephant","body","foreign language","language","grammar","application",["apartment","smaller apartment building"],["larger apartment building","condominium"],"airport",["shop","store"],"consumer prices","advertisement","recruitment",["promise","appointment"]];

const L13_i_adjectives_jpns = ["うれしい",["かなしい","悲しい"],["きびしい","厳しい"],["きぶんがわるい","気分が悪い"],["からい","辛い"],"すごい",["ちかい","近い"]];
const L13_i_adjectives_eng = ["glad","sad","strict","to feel sick",["hot and spicy","salty"],["incredible","awesome"],["close","near"]];
const L13_na_adjectives_jpns = ["いろいろな",["しあわせな","幸せな"],"だめな"];
const L13_na_adjectives_eng = [["various","different kinds of"],["happy","lasting happiness"],"no good"];

const L13_u_verbs_jpns = [["あむ","編む"],["がんばる","頑張る"],["なく","泣く"],["みがく","磨く"],["やくそくをまもる","やくそくをまもる"]];
const L13_u_verbs_eng = ["to knit",["to do one's best","to try hard"],"to cry",["to brush teeth","to polish"],"to keep a promise"];
const L13_ru_verbs_jpns = [];
const L13_ru_verbs_eng = [];
const L13_ireg_verbs_jpns = [["かんどうする","感動する"]];
const L13_ireg_verbs_eng = [["to be moved by","to be touched by"]];

const L13_adverbs_etc_jpns = [["～かい","～回"],"～キロ",["ぜんぶ","全部"],["～ともうします","～と申します"],["とくに","特に"],["いちにち","一日"],["ふつか","二日"],["みっか","三日"],["よっか","四日"],["いつか","五日"],["むいか","六日"],["なのか","七日"],["ようか","八日"],["ここのか","九日"],["とおか","十日"]];
const L13_adverbs_etc_eng = ["times",["kilometers","kilograms"],"all","my name is","especially","one day","two days","three days","four days","five days","six days","seven days","eight days","nine days","ten days"];

const L13_all_vocab = [[L13_nouns_jpns,L13_nouns_eng],[L13_i_adjectives_jpns,L13_i_adjectives_eng],[L13_na_adjectives_jpns,L13_na_adjectives_eng],[L13_u_verbs_jpns,L13_u_verbs_eng],[L13_ru_verbs_jpns,L13_ru_verbs_eng],[L13_ireg_verbs_jpns,L13_ireg_verbs_eng],[L13_adverbs_etc_jpns,L13_adverbs_etc_eng]];

// L14 Vocabulary
const L14_nouns_jpns = [["おくさん","奥さんが"],["ごしゅじん","ご主人"],"パートナー","おじさん","おばさん",["りょうしん","両親"],["おおやさん","大家さん"],["みなさん","皆さん"],"チョコレート","みかん","トレーナー","シャツ","ネクタイ","マフラー",["ゆびわ","指輪"],["えんぴつ","鉛筆"],"ぬいぐるみ",["まんが","漫画"],["けしょうひん","化粧品"],"ラジオ",["おさら","お皿"],["おかえし","お返し"],["りれきしょ","履歴書"],"クリスマス","バレンタインデー","ホワイトデー"];
const L14_nouns_eng = ["wife","husband","partner",["uncle","middle-aged man"],["aunt", "middle-aged woman"],"parents",["landlord","landlady"],["everyone","all of you"],"chocolate","mandarin orange","sweatshirt","shirt","necktie","winter scarf","ring","pencil","stuffed animal","comic book","cosmetics","radio",["plate","dish"],"return","resume","christmas","valentine's day","white day"];

const L14_i_adjectives_jpns = [["ほしい","欲しい"]];
const L14_i_adjectives_eng = ["to want"];
const L14_na_adjectives_jpns = ["おしゃれな","けちな"];
const L14_na_adjectives_eng = [["fashionable","stylish"],["stingy","cheap"]];

const L14_u_verbs_jpns = [["おくる","送る"],["にあう","似合う"]];
const L14_u_verbs_eng = ["to send","to look good on somebody"];
const L14_ru_verbs_jpns = ["あきらめる","あげる","くれる","できる"];
const L14_ru_verbs_eng = ["to give up","to give others","to give me",["to come into existance","to be made"]];
const L14_ireg_verbs_jpns = [["そうだんする","相談する"],["ちゅういする","注意する"],"プロポーズする"];
const L14_ireg_verbs_eng = ["to consult",["to give warning","to watch out"],"to propose marriage"];

const L14_adverbs_etc_jpns = [["～くん","～君"],"～たち",["わたしたち","私たち"],["こんな～","こんな"],["きゅうに","急に"],"ちょうど","よく","さあ","どうしたらいい",["～こ","～個"],["～さつ","～冊"],["～だい","～台"],["～ひき","～匹"],["～ほん","～本"]];
const L14_adverbs_etc_eng = [["Mr.","Ms."],["plural","makes a noun plural"],"we",["like this","this kind of"],"suddenly","exactly","well","I am not sure","what should one do","small items","bound volumes","equipment","small animals","long objects"];

const L14_all_vocab = [[L14_nouns_jpns,L14_nouns_eng],[L14_i_adjectives_jpns,L14_i_adjectives_eng],[L14_na_adjectives_jpns,L14_na_adjectives_eng],[L14_u_verbs_jpns,L14_u_verbs_eng],[L14_ru_verbs_jpns,L14_ru_verbs_eng],[L14_ireg_verbs_jpns,L14_ireg_verbs_eng],[L14_adverbs_etc_jpns,L14_adverbs_etc_eng]];

// L15 Vocabulary
const L15_nouns_jpns = [["がいこくじん","外国人"],"そば",["え","絵"],["ちず","地図"],["じしょ","辞書"],["かぐ","家具"],["でんち","電池"],"ジャケット","ペット",["わりびきけん","割引券"],["インターネット","ネット"],["じしん","地震"],["ほけん","保険"],["ぜいきん","税金"],["きょうしつ","教室"],["たてもの","建物"],"プール",["えいがかん","映画館"],["りょかん","旅館"],["にわ","庭"],"ボランティア",["かつどう","活動"],["けいけん","経験"],["しゅうかん","習慣"],["しめきり","締め切り"],["よてい","予定"],["そつぎょうしき","卒業式"],["けっこんしき","結婚式"]];
const L15_nouns_eng = ["foreigner",["soba","Japanese buckwheat noodles"],["painting","picture","drawing"],"map","dictionary","furniture","battery","jacket","pet","discount coupon","internet","earthquake","insurance","tax","classroom","building","swimming pool","movie theater","Japanese inn","garden","volunteer","activity","experience","custom","deadline",["schedual","plan"],"graduation ceremony","wedding"];

const L15_i_adjectives_jpns = [];
const L15_i_adjectives_eng = [];
const L15_na_adjectives_jpns = [];
const L15_na_adjectives_eng = [];

const L15_u_verbs_jpns = [["うる","売る"],["おろす","下ろす"],["かく","描く"],["さがす","探す"],["さそう","誘う"],"しゃべる",["つきあう","付き合う"],["つく","着く"],["ほけんにはいる","保険に入る"]];
const L15_u_verbs_eng = ["to sell","to withdraw money",["to draw","to paint"],"to look for","to invite","to chat",["to date someone","to keep company"],"to arrive","to buy insurance"];
const L15_ru_verbs_jpns = [["きをつける","気をつける"],["しらべる","調べる"],["みえる","見える"]];
const L15_ru_verbs_eng = [["to be cautious","to be careful"],"to look into a matter","to be visible"];
const L15_ireg_verbs_jpns = ["する",["かんこうする","観光する"],["よやくする","予約する"],["さんかする","参加する"],["そつぎょうする","卒業する"],["はっぴょうする","発表する"]];
const L15_ireg_verbs_eng = ["to decide on an item","to do sightseeing","to reserve","to participate","to graduate from",["to make a presentation","to make public"]];

const L15_adverbs_etc_jpns = ["～けど",["～め","～目"],["いちにちめ","一日目"],["いちにちじゅう","一日中"],["さいきん","最近"],["もういちど","もう一度"],["たのしみです","楽しみです"]];
const L15_adverbs_etc_eng = [["but","so"],"-th","first day","all day long","recently","one more time",["cannot wait","to look forward to it"]];

const L15_all_vocab = [[L15_nouns_jpns,L15_nouns_eng],[L15_i_adjectives_jpns,L15_i_adjectives_eng],[L15_na_adjectives_jpns,L15_na_adjectives_eng],[L15_u_verbs_jpns,L15_u_verbs_eng],[L15_ru_verbs_jpns,L15_ru_verbs_eng],[L15_ireg_verbs_jpns,L15_ireg_verbs_eng],[L15_adverbs_etc_jpns,L15_adverbs_etc_eng]];

// L16 Vocabulary
const L16_nouns_jpns = [["えきいん","えきいんさん","駅員","駅員さん"],["おや","親"],["しんせき","親せき"],"ごみ",["さとう","砂糖"],"ファイル",["おおきさ","大きさ"],["みち","道"],["きまつしけん","期末試験"],["けんきゅう","研究"],["だいがくいん","大学院"],["しょうがくきん","奨学金"],["すいせんじょう","推薦状"],["たいふう","台風"],["ぶんか","文化"],["へんじ","返事"],["ひ","日"]];
const L16_nouns_eng = ["station attendant","parent","relatives","garbage","sugar",["folder","file folder","portfolio","file"],"size",["way","road","directions"],"final examination","research","graduate school","scholarship","letter of recommendation","typhoon","culture","reply","day"];

const L16_i_adjectives_jpns = [["きたない","汚い"]];
const L16_i_adjectives_eng = ["dirty"];
const L16_na_adjectives_jpns = [];
const L16_na_adjectives_eng = [];

const L16_u_verbs_jpns = [["おこす","起こす"],"おごる",["わらう","笑う"],["おちこむ","落ち込む"],["こまる","困る"],["だす","出す"],["なおす","直す"],["みつかる","見つかる"],["やくす","訳す"],["かす","貸す"],["つれていく","連れていく"],["みちにまよう","道に迷う"],["むかえにいく","迎えに行く"]];
const L16_u_verbs_eng = ["to wake someone up","to treat someone to a meal","to laugh","to get depressed","to have difficulty",["to take something out","to hand in something"],["to correct","to fix"],"to be found","to translate","to lend","to take someone to a place",["to become lost","to lose one's way"],"to go to pick up"];
const L16_ru_verbs_jpns = [["あつめる","集める"],["いれる","入れる"],["みせる","見せる"],["のりおくれる","乗り遅れる"],"アイロンをかける"];
const L16_ru_verbs_eng = ["to collect","to put something in","to show",["to miss a train","to miss a bus"],"to iron cloths"];
const L16_ireg_verbs_jpns = [["あさねぼうする","朝寝坊する"],["あんないする","案内する"],["せつめいする","説明する"],["むかえにくる","迎えに来る"]];
const L16_ireg_verbs_eng = ["to oversleep","to show someone around","to explain","to come to pick up"];

const L16_adverbs_etc_jpns = [["きょうじゅうに","今日中に"],["じゅぎょうちゅうに","授業中に"],["このあいだ","この間"],"これから","このぐらい",["じぶんで","自分で"],["ほかの","他の"],"ええと",["じつは","実は"],["～いがい","～以外"],"ごめん",["しつれいします","失礼します"]];
const L16_adverbs_etc_eng = ["by the end of the day",["in class","during the class"],"the other day","from now on","about this much","do something by oneself","other",["well","let me see"],["actually","in fact"],"other than","I'm sorry",["Excuse me","Sorry to interrupt you"]];

const L16_all_vocab = [[L16_nouns_jpns,L16_nouns_eng],[L16_i_adjectives_jpns,L16_i_adjectives_eng],[L16_na_adjectives_jpns,L16_na_adjectives_eng],[L16_u_verbs_jpns,L16_u_verbs_eng],[L16_ru_verbs_jpns,L16_ru_verbs_eng],[L16_ireg_verbs_jpns,L16_ireg_verbs_eng],[L16_adverbs_etc_jpns,L16_adverbs_etc_eng]];

// L17 Vocabulary
const L17_nouns_jpns = [["あかちゃん","赤ちゃん"],["おきゃくさん","お客さん"],["しゅしょう","首相"],"サラリーマン",["きゅうりょう","給料"],["ざんぎょう","残業"],"パンダ",["コンタクト","コンタクトレンズ"],"ひげ","ブーツ",["かぎ","鍵"],["たからくじ","宝くじ"],["かみ","紙"],"スプーン",["おゆ","お湯"],["でんしレンジ","電子レンジ"],"ヒーター","ニュース",["かじ","火事"],["りょこうがいしゃ","旅行会社"],"ショッピングモール",["りょう","寮"],["ちがい","違い"],["ひみつ","秘密"],["じゅんび","準備"],["じぶん","自分"]];
const L17_nouns_eng = ["baby",["guest","visitor","client","customer"],"prime minister",["salaryman","office worker"],"salary","overtime work","panda","contact lenses","beard","boots",["lock","key"],"lottery","paper","spoon","hot water","microwave oven","heater","news","fire","travel agency","shopping mall","dormitory","difference","secret","preparation","oneself"];

const L17_i_adjectives_jpns = [["あぶない","危ない"],"うらやましい",["すくない","少ない"],["つごうがわるい","都合が悪い"],"つよい"];
const L17_i_adjectives_eng = ["dangerous","envious",["a little","a few"],["inconvienient","to have a scheduling conflict"],"strong"];
const L17_na_adjectives_jpns = [["さいあくな","最悪な"]];
const L17_na_adjectives_eng = ["the worst"];

const L17_u_verbs_jpns = [["えらぶ","選ぶ"],["おゆをわかす","お湯を沸かす"],["かみをとかす","髪をとかす"],"ひげをそる",["ぬぐ","脱ぐ"],["こむ","混む"],["たからくじにあたる","宝くじに当たる"]];
const L17_u_verbs_eng = [["to choose","to select"],"to boil water","to comb one's hair","to shave one's beard","to take off clothes","to get crowded","to win a lottery"];
const L17_ru_verbs_jpns = ["いれる",["うまれる","生まれる"],["かぎをかける","鍵をかける"],["たりる","足りる"],["なれる","慣れる"]];
const L17_ru_verbs_eng = [["to make tea","to make coffee"],"to be born","to lock",["to be sufficient","to be enough"],"to get used to"];
const L17_ireg_verbs_jpns = [["おいのりする","お祈りする"],["けしょうする","化粧する"],["しゅうしょくする","就職する"],["りこんする","離婚する"],"する"];
const L17_ireg_verbs_eng = ["to pray","to put makeup on","to get a full-time job at","to get a divorce","to wear small items"];

const L17_adverbs_etc_jpns = ["ずいぶん",["たとえば","例えば"],["～にくらべて","～に比べて"],"～によると",["まえ","前"],"やっぱり","～かなあ","そうか","おめでとうございます"];
const L17_adverbs_etc_eng = ["very","for example","compared with","according to","before","after all","I wonder","I see","congratulations"];

const L17_all_vocab = [[L17_nouns_jpns,L17_nouns_eng],[L17_i_adjectives_jpns,L17_i_adjectives_eng],[L17_na_adjectives_jpns,L17_na_adjectives_eng],[L17_u_verbs_jpns,L17_u_verbs_eng],[L17_ru_verbs_jpns,L17_ru_verbs_eng],[L17_ireg_verbs_jpns,L17_ireg_verbs_eng],[L17_adverbs_etc_jpns,L17_adverbs_etc_eng]];

// L18 Vocabulary
const L18_nouns_jpns = ["カーテン","ソファ",["れいぞうこ","冷蔵庫"],"スイッチ",["しょうゆ","しょう油"],"スープ","バナナ","ポップコーン","シャンプー","ろうそく","タオル","スカート",["にっき","日記"],["けいたい","けいたいでんわ","携帯","携帯電話"],["さくら","桜"],["むし","虫"],["やちん","家賃"],["そと","外"],["あと","後"],["ゆうがた","夕方"]];
const L18_nouns_eng = ["curtain","sofa","refrigerator","switch","soy sauce","soup","banana","popcorn","shampoo","candle","towel","skirt","diary","cell phone","cherry blossom","insect","rent","outside","the rest","evening"];

const L18_i_adjectives_jpns = [["あかるい","明るい"],["くらい","暗い"],["はずかしい","恥ずかしい"]];
const L18_i_adjectives_eng = ["bright","dark",["embarrassing","to feel embarrassed"]];
const L18_na_adjectives_jpns = [["たいせつな","大切な"],["ふあんな","不安な"],["むりな","無理な"]];
const L18_na_adjectives_eng = [["precious","important"],["anxious","worried"],"impossible"];

const L18_u_verbs_jpns = [["あく","開く"],["しまる","閉まる"],["あやまる","謝る"],["おす","押す"],["おとす","落とす"],["おゆがわく","お湯が湧く"],["ころぶ","転ぶ"],["こわす","壊す"],["さく","咲く"],["たすかる","助かる"],["たのむ","頼む"],"つく",["よごす","汚す"]];
const L18_u_verbs_eng = ["something opens","something closes","to apologize",["to press","to push"],"to drop something","water boils","to fall down","to break something","to bloom",["to be saved","to be helped"],"to ask a favor","something turns on","to make dirty"];
const L18_ru_verbs_jpns = [["おちる","落ちる"],["かたづける","片付ける"],["かんがえる","考える"],["きえる","消える"],["こわれる","壊れる"],["よごれる","汚れる"]];
const L18_ru_verbs_eng = ["something drops","to tidy up",["to think about","to consider"],"something goes off","something breaks","to become dirty"];
const L18_ireg_verbs_jpns = [["ちゅうもんする","注文する"]];
const L18_ireg_verbs_eng = ["to place an order"];

const L18_adverbs_etc_jpns = [["いますぐ","今すぐ"],"～までに",["ほんとうに","本当に"],"まず","おかげで","どうしよう",["～んだろう","～だろう"],["おさきにしつれいします","お先に失礼します"],["おつかれさま","おつかれさまでした","お疲れ様","お疲れ様でした"]];
const L18_adverbs_etc_eng = ["right away",["by (time/date)","by time/date","by this time","by this date"],"really","first of all","thanks to",["What should I/we do?","What should I do?","What should we do?","What should I do","What should we do"],["short form of ～(ん)でしょう","short form of ～んでしょう","short form of ～でしょう"],["See you.","See you"],["You must be tired after working so hard.","You must be tired after working so hard"]];

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
    // Fixes bug where, usually on mobile, a smart apostrophe would make the inputed answer incorrect
    textbox = textboxUnchanged.toLowerCase().replace("’","'");

    /*
    // Debugging commands
    alert("Button was clicked! You wrote " + textbox);
    console.log("Button was clicked!");
    */

    // Code checking for multiple definitions of a word
    if (typeof answer_words[y] === "string") {
        if (textbox == answer_words[y].toLowerCase()) {
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
        for (let i=0;i != answer_words[y].length;i++) {
            if (textbox != answer_words[y][i].toLowerCase()) {
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
            Parts_of_speech.push(i);
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

    // Checks if there are words in the list, other wise exits fuction.
    if (question_words.length == 0) {
        feedback.textContent = "There is no such vocabulary for the selected lesson/s. Not all lessons have all vocabulary types. Please select 'Start' when you have resolved this by selecting another vocabulary type for the selected lessons/s or another lesson with the desired vocabulary type.";
        return;
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