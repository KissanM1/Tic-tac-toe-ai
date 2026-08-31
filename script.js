function updateState(id, user){
    let row = Math.floor(parseInt(id, 10) / 3);
    let col = id % 3;
    state[row][col] = user;
    console.clear()
    console.log(state[0])
    console.log(state[1])
    console.log(state[2])

}

function clicked (id) {
    output = (moveCount % 2 == 0) ? "X" : "O";
    if (tiles[id].innerText.trim() === "" && (checkWinner(state) === "NA")) {
        tiles[id].innerHTML = output;
        moveCount++;
        updateState(id, output)
    }
}

function checkWinner(state) {
    let mappings = {"O" : -1, "X" : 1, "T" : 0}
    for (let i = 0; i < 3; i++) {
        let row = state[i]
        let checkVal = row[0];
        if (checkVal === "") {
            continue;
        }
        if (row[0] == checkVal && row[1] == checkVal && row[2] == checkVal){
            return mappings[checkVal]
        }
    }

    for (let i = 0; i < 3; i++) {
        let col = [state[0][i],state[1][i],state[2][i]]
        let checkVal = col[0];
        if (checkVal === "") {
            continue;
        }
        if (col[0] == checkVal && col[1] == checkVal && col[2] == checkVal){
            return mappings[checkVal]
        }
    }


    let checkVal = state[1][1];
    if (state[0][0] == checkVal && state[1][1] == checkVal && state[2][2] == checkVal && checkVal !== ""){
        return mappings[checkVal]
    }
    if (state[0][2] == checkVal && state[1][1] == checkVal && state[2][0] == checkVal && checkVal !== ""){
        return mappings[checkVal]
    }

    if (moveCount === 9) {
        return mappings["T"];
    }

    return "NA";
}

function getAvailableMoves(state){
    output = []
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (state[i][j] === "")
                output.push(`(${i},${j})`)
        }
    }
    return output
}
// function minimax(state, maximizingPlayer) {}
// function makeMove(){}



let moveCount = 0;
const tiles = []
const state = [["", "", ""],["", "", ""],["", "", ""]]

for (let i = 0; i < 9; i++) {
    let temp = document.getElementById(`${i}`);
    temp.addEventListener("click", () => clicked(i));
    tiles.push(temp);
}


