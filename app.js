//тоглоом дууссан эсэхийг шалгана
var isNewGame;
//тоглогч
var activePlayer;

// Тоглогчдын цуглуулсан оноог хадгалах хувьсагч
var scores;

// Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
var roundScore;

var diceDom = document.querySelector('.dice');

initNewGame();

function initNewGame(){
    isNewGame = true;
    // Тоглогчийн ээлжийг хадгалах хувьсагч
activePlayer = 0;

// Тоглогчдын цуглуулсан оноог хадгалах хувьсагч
scores = [0, 0];

// Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
roundScore = 0;

// Шооны аль талаар буусныг хадгалах хувьсагч хэрэгтэй, 1 - 6 гэсэн утгыг энэ хувьсагчид санамсаргүйгээр үүсгэж өгнө.
//Програм эхлэхэд бэлтгэх
document.getElementById('score-0').textContent = 0;
document.getElementById('score-1').textContent = 0; 
document.getElementById('current-0').textContent = 0;
document.getElementById('current-1').textContent = 0;

document.getElementById('name-0').textContent = "Player 1";
document.getElementById('name-1').textContent = "Player 2";

document.querySelector(".player-0-panel").classList.remove("winner");
document.querySelector(".player-1-panel").classList.remove("winner");

document.querySelector(".player-0-panel").classList.remove("active");
document.querySelector(".player-1-panel").classList.remove("active");
document.querySelector(".player-0-panel").classList.add("active");

diceDom.style.display = 'none';
}

// шоог шидэх эвэнт листенер
document.querySelector('.btn-roll').addEventListener("click", shooShid);
document.querySelector('.btn-hold').addEventListener("click", ScoreSave);

function shooShid(){
if (isNewGame === true){ // isGameOver биш бол
        // 1-6 хүртлэх санамсаргүй тоо гаргах
        var diceNumber = Math.floor(Math.random() * 6) + 1;
        // шооны зургыг гаргаж ирнэ
        diceDom.style.display = 'block';
        // буусан санамсаргүй тоо
        diceDom.src = "dice-" + diceNumber + ".png";
        // буусан тоо нь 1 ээс ялгаатай бол тоглогч үргэлжлүүлэн тоглоно.
        if (diceNumber !== 1){
            roundScore = roundScore + diceNumber;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else{
    
            switchToNextPlayer();
        }
} else {
    alert("Тоглоом дууссан байна new game дарж дахин эхэлнэ үү");
}
};

function ScoreSave(){
    if (isNewGame){
        scores[activePlayer] = scores[activePlayer] + roundScore;
    //дэлгэц дээрх оноог нь өөрчилнө
    document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
    if(scores[activePlayer] >= 10){
        isNewGame = false;
        document.getElementById('name-' + activePlayer).textContent = "WINNER!!!";
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
    } else {
        switchToNextPlayer();
    }
    }
};

function switchToNextPlayer(){
        roundScore = 0;
        document.getElementById("current-" + activePlayer).textContent = 0;
        activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
        // улаан цэг шилжүүлэх
        document.querySelector(".player-0-panel").classList.toggle("active");
        document.querySelector(".player-1-panel").classList.toggle("active");
        diceDom.style.display = 'none';
};
//new game event listener
document.querySelector(".btn-new").addEventListener("click",initNewGame);
