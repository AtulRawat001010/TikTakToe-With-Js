const current_player = document.querySelector(".current-player");
const boxes = document.querySelectorAll(".box");
const new_gamebtn = document.querySelector(".new-gameBtn");


let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


function init() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });


    new_gamebtn.classList.remove("active");
    current_player.innerText = `Current Player - ${currentPlayer}`;
};

init();


function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }

    current_player.innerText = `Current Player - ${currentPlayer}`;
};

function checkGameOver() {
    let ans = "";

    winningPositions.forEach((position) => {
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]])){
            if(gameGrid[position[0]] === "X"){
                ans = "X";
            }
            else{
                ans = "O";
            }

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if(ans !== ""){
        current_player.innerText = `Winner is - ${ans}`;
        new_gamebtn.classList.add("active");
        return;
    }


    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            fillCount++;
        }
    });

    if (fillCount === 9) {
        current_player.innerText = `Game Tied`;
        new_gamebtn.classList.add("active");
    }
};


function handleClick(index) {
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        swapTurn();
        checkGameOver();
    }
};


boxes.forEach((box, index) => {
    box.addEventListener("click", ()=>{
        handleClick(index);
    })
});


new_gamebtn.addEventListener("click", () =>{
    init();
});