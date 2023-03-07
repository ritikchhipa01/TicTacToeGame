const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".player");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

//Taking input for Player Name 
let playerX = prompt("enter player X name"); 
let playerY = prompt("enter player 0 name");
   

let playX = document.querySelector(".winX");
playX.innerHTML = playerX.toUpperCase();;

let playY = document.querySelector(".winY");
playY.innerText = playerY.toUpperCase();;
//Count how many time player X and 0 wins
let counterX = 0;
let counterY = 0;

let X = document.querySelector('.pointX');
let Y = document.querySelector('.pointY');

const winningPositon = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const initGame = () => {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    //UI boxes need to be empty
    boxes.forEach((box) => {
        box.innerText = "";
        box.style.pointerEvents = "all";
        box.classList.remove('win');
    });
    
    newGameBtn.classList.remove("active");
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
};

initGame();

const checkGameover = () => {
    let answer = 0;

    winningPositon.forEach((position) => {
        if (
            (gameGrid[position[0]] !== "" ||
                gameGrid[position[1]] !== "" ||
                gameGrid[position[2]] !== "") &&
            gameGrid[position[0]] == gameGrid[position[1]] &&
            gameGrid[position[1]] === gameGrid[position[2]]
        ) {
            if (gameGrid[position[0]] === "X") answer = "X";
            else answer = "O";

            answer==="X"?counterX++:counterY++;

            // disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });
            //winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if (answer != "") {
        newGameBtn.classList.add("active");
        gameInfo.innerText = `Winner is ${answer==="X"?playerX:playerY}`;
        // increment in point of winner
        
        X.innerText = counterX;
        Y.innerText = counterY;
        return;
    }

    let fillCounter = 0;

     gameGrid.forEach((box) =>{
        if(box !== ""){
            fillCounter++;
        }
    });

    if(fillCounter === 9){
        newGameBtn.classList.add("active");
        gameInfo.innerText = "GameTied :):";
    }
};
const swapTurn = () => {
    if (currentPlayer == "X") currentPlayer = "O";
    else currentPlayer = "X";
    // UI update
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});

const handleClick = (index) => {
    if (gameGrid[index] === "") {
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //for swap turn
        swapTurn();
        //check Gameover
        checkGameover();
    }
};

newGameBtn.addEventListener("click", initGame);
