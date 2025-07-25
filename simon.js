let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

let btns = ["red" ,"yellow" , "green" , "blue"];

let highScore = localStorage.getItem("highScore") || 0;
document.getElementById("highScore").innerText = `Highest Score: ${highScore}`;


document.addEventListener("keypress" , function(){
// console.log("game started ");
if(started == false){
    console.log("game started ");
started = true ;

levelUp();

}
});


function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    } ,250);
}


function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    } ,250);
}


function levelUp(){
userSeq = [];

    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randBtn);
    // console.log(randColor);
    // console.log(randIdx);

    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}


function checkAns(idx){
if(userSeq[idx] === gameSeq[idx]){
if(userSeq.length == gameSeq.length){
    // levelUp();
setTimeout(levelUp , 1000);

}
}
else{

// ✅ Update high score if needed
    if (level > highScore) {
      highScore = level;
      localStorage.setItem("highScore", highScore);
      document.getElementById("highScore").innerText = `Highest Score: ${highScore}`;
    }

        h2.innerHTML = `game over ! your score was <b>${level}</b><br> press any key to restart`;
        document.querySelector("body").style.backgroundColor ="red";
        setTimeout(function(){
         document.querySelector("body").style.backgroundColor ="white";

        } , 100);
        
        reset();

}
}

function btnPress(){
    // console.log(this);
    let btn = this;
    userflash(btn);

     userColor = btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);

checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click" , btnPress);
}


function reset(){
    started = false;
    gameSeq = [];
    userSeq =[];
    level =0;

}