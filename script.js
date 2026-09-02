function updateState(id){
    globalState[Math.trunc(id / 3)][id % 3] = player(globalState);
    console.clear()
    console.log(globalState[0])
    console.log(globalState[1])
    console.log(globalState[2])

}

function makePlayerMove (id) {
    if (globalState[Math.trunc(id / 3)][id % 3] === "" && (isTerminal(globalState) === false)) {
        tiles[id].innerHTML = player(globalState);
        updateState(id, player(globalState));
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
                output.push(`(${i},${j})`)
        }
    }
    return output
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
        console.log(1);
        return state[0][0]
    }
    if (state[0][2] === state[1][1] && state[1][1] === state[2][0] &&  state[0][2] !== "") {
        console.log(2);
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