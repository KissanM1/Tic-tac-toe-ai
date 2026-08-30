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
    if (tiles[id].innerText.trim() === "" && (!checkState(state))) {
        tiles[id].innerHTML = output;
        moveCount++;
        updateState(id, output)
    }
}

function checkState(state) {
    for (let i = 0; i < 3; i++) {
        let row = state[i]
        let checkVal = row[0];
        if (checkVal === "") {
            continue;
        }
        if (row[0] == checkVal && row[1] == checkVal && row[2] == checkVal){
            return true
        }
    }

    for (let i = 0; i < 3; i++) {
        let col = [state[0][i],state[1][i],state[2][i]]
        let checkVal = col[0];
        if (checkVal === "") {
            continue;
        }
        if (col[0] == checkVal && col[1] == checkVal && col[2] == checkVal){
            return true
        }
    }


    let checkVal = state[1][1];
    if (state[0][0] == checkVal && state[1][1] == checkVal && state[2][2] == checkVal && checkVal !== ""){
        return true;
    }
    if (state[0][2] == checkVal && state[1][1] == checkVal && state[2][0] == checkVal && checkVal !== ""){
        return true
    }

    return false

    
}


let moveCount = 0;
const tiles = []
const state = [["", "", ""],["", "", ""],["", "", ""]]

for (let i = 0; i < 9; i++) {
    let temp = document.getElementById(`${i}`);
    temp.addEventListener("click", () => clicked(i));
    tiles.push(temp);
}


