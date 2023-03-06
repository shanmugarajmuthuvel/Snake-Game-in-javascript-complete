var playBoard = document.querySelector(".play-board");
var scoreelement=document.querySelector(".score")
const highscoreelement=document.querySelector(".high-score")
var controls=document.querySelectorAll(".controls i")
let score=0;
let gameOver=false
let foodX, foodY;
let snakeX=10,snakeY=5
let velocityX = 0, velocityY = 0;
let snakeBody=[]
let intervalid;
let highscore=localStorage.getItem("high-score")|| 0;
highscoreelement.textContent=`High score:${highscore}`
const changefood=()=>{
	foodX=Math.floor(Math.random()*30)+1
	foodY=Math.floor(Math.random()*30)+1
	
}
const replay=()=>{
	//clearing the time and reloading the page on game over
	alert("Game Over Press Ok to Replay")
	clearInterval(intervalid)
	location.reload()
}
const playgame=e=>{
	 if(e.key === "ArrowUp" && velocityY!=1) {
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY!=-1) {
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowLeft" && velocityX!=1) {
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === "ArrowRight" && velocityX!=-1  ) {
        velocityX = 1;
        velocityY = 0;
    }
	else if(e.key === "Enter") {
        velocityX = 0;
        velocityY = 0;
    }
	
}

controls.forEach((key)=>{
	   key.addEventListener("click",()=>{
		      playgame({key:key.dataset.key})
	   })
})


const initgame=()=>{
	if(gameOver)return replay()
	let htmltag=`<div class="food" style="grid-area:${foodY}/${foodX}"></div>`
	 if(foodX === snakeX && foodY === snakeY) {
        changefood();
		snakeBody.push([foodY,foodX])
		score++ //increase score one by one
		scoreelement.textContent=`Score:${score}`
		//set high score in localStorage in the game
		highscore=score>=highscore ? score :highscore
		localStorage.setItem("high-score",highscore)
	
		
    }
    snakeX += velocityX
    snakeY += velocityY
	for(i=snakeBody.length-1;i>0;i--){
		snakeBody[i]=snakeBody[i-1]
	}

	
	snakeBody[0]=[snakeX,snakeY]//push the snake body in the snakes
	
	//cheking if the snake's head is out of wall, if so setting gameOver to true
	if(snakeX<=0 || snakeX > 30 || snakeY <=0 || snakeY > 30){
             gameOver=true
		}

	for(i=0;i<snakeBody.length;i++){
	   htmltag+=`<div class="head" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`
	   if(i!==0 && snakeBody[0][1]=== snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
		   gameOver=true
		   
	   }
	}
	playBoard.innerHTML=htmltag
}

changefood()
intervalid=setInterval(initgame,200)
document.addEventListener("keyup",playgame)
