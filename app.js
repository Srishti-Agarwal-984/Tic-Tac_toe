let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-button");
let newGameBtn = document.querySelector("#new-button");
let messageContainer = document.querySelector(".messageContainer");
let msg = document.querySelector("#msg");

let turnO = true; // 'O' starts first
let gameOver = false;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

// Function to check for a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return;
        }
    }
};

// Function to display the winner message
const showWinner = (winner) => {
    if (!gameOver) {
        msg.innerText = `🎉 Winner: ${winner}`;
        messageContainer.classList.add("show");
        messageContainer.classList.remove("hide");
        disableAllBoxes();
        gameOver = true;
    }
};

// Function to disable all boxes after a winner is found
const disableAllBoxes = () => {
    boxes.forEach(box => box.style.pointerEvents = "none");
};

// Function to reset the game
const resetGame = () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.style.pointerEvents = "auto";
    });

    messageContainer.classList.remove("show");
    setTimeout(() => {
        messageContainer.classList.add("hide");
    }, 300);

    gameOver = false;
    turnO = true;
};

// Game logic when clicking a box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver || box.innerText !== "") return;

        box.innerText = turnO ? "O" : "X";
        turnO = !turnO;
        checkWinner();
    });
});

// Event Listeners
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
