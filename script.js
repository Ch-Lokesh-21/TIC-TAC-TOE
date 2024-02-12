let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-game");
let new_game = document.querySelector("#new-game");
let msg_container = document.querySelector(".result");
let win = document.querySelector("#winner");
let turnO = true; 
let res = 0;
const win_patterns = [
[0, 1, 2],[0, 3, 6],[0, 4, 8],[1, 4, 7],[2, 5, 8],[2, 4, 6],[3, 4, 5],[6, 7, 8],
];

const reset_game = () => {
    turnO = true;
    res = 0;
    enable_boxes();
    msg_container.classList.add("hide");
};
boxes.forEach((val) => {
    val.addEventListener("click", () => {
        if (turnO) {
            val.style.color="black";
            val.innerText = "O";
            turnO = false;
        } else {
            val.style.color="#ff5400";
            val.innerText = "X";
            turnO = true;
        }
        val.disabled = true;
        res++;
        let is_winner = check_winner();
        if (res === 9 && !is_winner) {
            game_draw();
        }
    });
});
const game_draw = () => {
    win.innerText = `Game was a Draw.`;
    msg_container.classList.remove("hide");
    disable_boxes();
};
const disable_boxes = () => {
    for (let box of boxes)
    box.disabled = true;
};
const enable_boxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};
const show_winner = (winner) => {
    win.innerText = `Congratulations, Winner is ${winner}`;
    msg_container.classList.remove("hide");
    disable_boxes();
};
const check_winner = () => {
    for (let val of win_patterns) {
        let x = boxes[val[0]].innerText;
        let y = boxes[val[1]].innerText;
        let z = boxes[val[2]].innerText;

        if (x != "" && y != "" && z != "") {
            if (x === y && y === z) {
                show_winner(x);
                return true;
            }
        }
    }
};
new_game.addEventListener("click", reset_game);
reset.addEventListener("click", reset_game);