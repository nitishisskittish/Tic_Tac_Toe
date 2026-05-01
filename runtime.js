import { player, grid } from "./game.js";

const player1 = new player("Player 1", 1);
const player2 = new player("Player 2", -1);
const playing_grid = document.querySelector(".grid");
const game_info = document.getElementById("game_info")

for (let x = 0; x < 9; x++) {
    const cell = document.createElement("div");
    cell.dataset.pos = x;
    playing_grid.append(cell);
}

game_info.textContent = "It's Player 1's turn!"

playing_grid.addEventListener("click", e => {
    const cell = e.target.closest("[data-pos]");
    if (!cell || grid.game_won()) return;
    const pos = parseInt(cell.dataset.pos);
    const active_player = grid.get_turn() == 1 ? player1 : player2;
    game_info.textContent = `It's ${cell.style.backgroundColor = active_player == player1 ? player2.name : player1.name}'s turn!`;
    if (grid.place(active_player, pos)) {
        cell.textContent = active_player == player1 ? "X" : "O";
        cell.style.color = active_player == player1 ? "#334a97" : "#d1885e";
        if (grid.game_won() === true) {
            for (const cell of playing_grid.children) {
                cell.style.backgroundColor = active_player == player1 ? "#c9dbf1" : "#fce9d0";
            }
            game_info.textContent = `${active_player == player1 ? player1.name : player2.name} wins!`;
        }
        else if (grid.game_won() === "tie") {
            for (const cell of playing_grid.children) {
                cell.style.backgroundColor = "#d3d3d4";
            }
            game_info.textContent = "It's a tie!";
        }
    }
})

document.getElementById("reset").addEventListener("click", e => {
    grid.reset();
    for (const cell of playing_grid.children) {
        cell.textContent = "";
        cell.style.backgroundColor = "white"
        game_info.textContent = "It's Player 1's turn!"
    }
    game_info.textContent = "It's Player 1's turn!"
})
