function updateState(action){
    globalState[Math.trunc(action / 3)][action % 3] = player(globalState);
    tiles[action].innerHTML = globalState[Math.trunc(action / 3)][action % 3];
    console.clear()
    console.log(globalState[0])
    console.log(globalState[1])
    console.log(globalState[2])
}

function makePlayerMove (action) {
    if (globalState[Math.trunc(action / 3)][action % 3] === "" && (isTerminal(globalState) === false)) {
        tiles[action].innerHTML = player(globalState);
        updateState(action);
        let temp = minimax(globalState);
        if (temp !== null) {
            updateState(temp);
        }
    }
}

function isTerminal(state) {
    let broken = false
    for (const row of state) {
        for (const cell of row) {
            if (cell === "") {
                broken = true
            }
        }
    }
    if (!broken || winner(state) !== null){
        return true
    }
    return false

}

function player(state) {
    let count = 0
    for (const row of state) {
        for (cell of row) {
            if (cell !== "") {
                count++
            }
        }
    }
    if (count % 2 === 0) {
        return "X"
    } else {
        return "O"
    }
}

function getAvailableMoves(state){
    output = []
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (state[i][j] === "")
                output.push(i*3 + j)
        }
    }
    return output
}

function result(action, state) {
    let output = structuredClone(state);
    output[Math.trunc(action / 3)][action % 3] = player(output);
    return output;
}

function utility(state) {
    if (winner(state) === "X") {
        return 1
    }
    if (winner(state) === "O") {
        return -1
    }
    return 0
}

function minimax(state) {
    if (isTerminal(state)) {
        return null
    }
    if (player(state) === "X") {
        return maxValue(state)[1]
    }
    return minValue(state)[1]
}


function maxValue(state) {
    if (isTerminal(state)) {
        return [utility(state), null]
    }
    let v = -Infinity;
    let output = null
    for (const move of getAvailableMoves(state)) {
        let val = minValue(result(move, state))[0]
        if (val > v) {
            v = val
            output = move
        }
    }
    return [v, output]
}

function minValue(state) {
    if (isTerminal(state)) {
        return [utility(state), null]
    }
    let v = Infinity;
    let output = null
    for (const move of getAvailableMoves(state)) {
        let val = maxValue(result(move, state))[0]
        if (val < v) {
            v = val
            output = move
        }
    }
    return [v, output]
}


function winner(state) {
    
    if (state[0][0] === state[0][1] && state[0][1] === state[0][2] && state[0][0] !== "") {
        return state[0][0]
    }
    if (state[1][0] === state[1][1] && state[1][1] === state[1][2] && state[1][0] !== "") {
        return state[1][0]
    }
    if (state[2][0] === state[2][1] && state[2][1] === state[2][2] && state[2][0] !== "") {
        return state[2][0]
    }
    
    if (state[0][0] === state[1][0] && state[1][0] === state[2][0] && state[0][0] !== "") {
        return state[0][0]
    }
    if (state[0][1] === state[1][1] && state[1][1] === state[2][1] && state[0][1] !== "") {
        return state[0][1]
    }
    if (state[0][2] === state[1][2] && state[1][2] === state[2][2] && state[0][2] !== "") {
        return state[0][2]
    }
    
    if (state[0][0] === state[1][1] && state[1][1] === state[2][2] && state[0][0] !== "") {
        return state[0][0]
    }
    if (state[0][2] === state[1][1] && state[1][1] === state[2][0] &&  state[0][2] !== "") {
        return state[0][2]
    }
    return null
}

const tiles = []
const globalState = [["", "", ""],["", "", ""],["", "", ""]]

for (let i = 0; i < 9; i++) {
    let temp = document.getElementById(`${i}`);
    temp.addEventListener("click", () => makePlayerMove(i));
    tiles.push(temp);
}