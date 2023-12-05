// established some constants (cells, statusText, restartBtn, and winConditions)
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
// within the winConditions I broke down the various ways a player could win, 
// with each number equalling a cell
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
// have the starting player be player X to begin with empty clicks ("")
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

startGame();
// added event listeners when a box or cell is clicked, the game is started. 
// The same occurs when the restart button is clicked and the game is restarted.
function startGame(){
    cells.forEach(cell => cell.addEventListener("click", boxClicked));
    restartBtn.addEventListener("click", restartGame);
// established a template literal when identifying which player's turn it is.
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}
//function created to display what occurs when a box is clicked.
function boxClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return; 
    }
 updateCell(this, cellIndex);
    checkWinner();
}
// this function updates the cell with the player's name (either "X" or "O")
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
// this function changes between which player's turn it is
function switchPlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}
// in order to check for a winner, the player must have three cells filled in a row, column or diagonal. 
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
    
        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }
    //template literals for each player who wins or if it is a tie game (cat's game)
    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Cat's game!`;
        running = false;
    }
    else{
        switchPlayer();
    }

}
//finally the restart game function which clears the board and begins back with player X
function restartGame(){
    currentPlayer = "X"
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell =>cell.textContent = "");
    running = true;
}