function updateState(id, user){
    let row = Math.floor(parseInt(id, 10) / 3);
    let col = id % 3;
    state[row][col] = user;
    console.clear()
}

function clicked (id) {
    output = (moveCount % 2 == 0) ? "X" : "O";
    if (tiles[id].innerText.trim() === "") {
        tiles[id].innerHTML = output;
        moveCount++;
    }
    updateState(id, output)
}



let moveCount = 0;
const tiles = []
const state = [["", "", ""],["", "", ""],["", "", ""]]

for (let i = 0; i < 9; i++) {
    let temp = document.getElementById(`${i}`);
    temp.addEventListener("click", () => clicked(i));
    tiles.push(temp);
}


