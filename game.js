class player {
    static players = [];

    constructor(name, num) {
        this.name = name;
        this.num = num;
        if (num != 1 && num != -1) {
            console.log("It's not that deep lil bro");
            return;
        }
        player.players.push(this);
    }

    static num_to_name(num) {
        // Search registry for player with matching num
        return player.players.find(p => p.num === num).name;
    }

    static clear_registry() {
        player.players.length = 0;
    }
}

function create_grid() {
    let won = false;
    let turns = 0;
    const grid = new Array(9).fill(0); //Represents the tic-tac-toe board
    const totals = new Array(8).fill(0); /*keeps track of score totals for each line on the board.
    0-2: rows, top to bottom
    3-5: columns, left to right
    6-7: diagonals, top left to top right*/
    const pos_to_line_match = [
        //Matches each tic_tac_toe pos to the totals it affects
        [0, 3, 6], // pos 0: row 0, col 0, left diagonal (top left to bottom right)
        [0, 4],    // pos 1: row 0, col 1
        [0, 5, 7], // pos 2: row 0, col 2, right diagonal (top right to bottom left)
        [1, 3],    // pos 3: row 1, col 0
        [1, 4, 6, 7], // pos 4: row 1, col 1, both diagonals
        [1, 5],    // pos 5: row 1, col 2
        [2, 3, 7], // pos 6: row 2, col 0, right diagonal
        [2, 4],    // pos 7: row 2, col 1
        [2, 5, 6]  // pos 8: row 2, col 2, left diagonal
    ];
    return {
        place(active_player, pos) {
            if (active_player instanceof player) {
                if (grid[pos] == 0 && pos >= 0 && pos <= 8 && !won) {
                    grid[pos] = active_player.num;
                    for (const x of pos_to_line_match[pos]) {
                        totals[x] += active_player.num;
                    }
                    turns++;
                    if (turns >= 5) {
                        this.check_grid(pos)
                    }
                    if (turns >= 9 && !won) {
                        won = "tie";
                    }
                    return true;
                }
            }
            return false;
        },
        get_turn() {
            return (turns % 2 === 0) ? 1 : -1;
        },
        check_grid(pos) {
            for (const x of pos_to_line_match[pos]) {
                if (totals[x] == 3 || totals[x] == -3) {
                    won = true;
                    break;
                }
            }
        },
        game_won() {
            return won;
        },
        reset() {
            grid.fill(0);
            totals.fill(0);
            turns = 0;
            won = false;
        }
    }
}

const grid = create_grid();

export { player, grid };


