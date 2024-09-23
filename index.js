class TicTacToe {
    constructor() {
        this.currentPlayer = 'x'; // Start with player 'x'
        this.boardState = Array(9).fill(null); // Track the board state
    }

    initGame() {
        $('#reset').on('click', () => {
            console.log('Reset this game');
            this.makeBoard();
        });
    }

    makeBoard() {
        const $board = $('#board');
        $board.empty(); // Clear the board

        // Create 9 slots
        for (let x = 0; x < 9; x++) {
            const $slot = $('<div></div>')
                .addClass('slot')
                .attr('data-index', x)
                .on('click', () => {
                    this.playerTurn($slot, x);
                });

            $board.append($slot);
        }
    }

    playerTurn($slot, num) {
        if (this.boardState[num] || !$slot) return;

        this.boardState[num] = this.currentPlayer;
        $slot.text(this.currentPlayer);

        // Check for a winner
        if (this.checkForWin()) {
            setTimeout(() => {
                alert(`Player ${this.currentPlayer} wins!`);
                this.makeBoard(); // Restart the game
            }, 100);
            return;
        }

        // Check for a draw
        if (!this.boardState.includes(null)) {
            setTimeout(() => {
                alert("It's a draw!");
                this.makeBoard(); // Restart the game
            }, 100);
            return;
        }

        // Toggle player
        this.currentPlayer = this.currentPlayer === 'x' ? 'o' : 'x';
    }

    checkForWin() {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (this.boardState[a] && this.boardState[a] === this.boardState[b] && this.boardState[a] === this.boardState[c]) {
                return true; // There is a winner
            }
        }

        return false; // No winner found
    }
}

$(document).ready(() => {
    let game = new TicTacToe();
    game.makeBoard();
    game.initGame(); // Ensure the game initializes properly
});
