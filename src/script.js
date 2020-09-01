const isSeatOccupied = (chances) => {
    if(chances > .5) return true;
    else return false;
}

const generateSeats = (numOfRows, eachRowSize) => {
    const container = document.querySelector('.container');

    for(let i = 0; i < numOfRows; i++){
        let row = document.createElement('div');
        row.classList.add("row");
        
        for(let j = 0; j < eachRowSize; j++){
            const randInt = Math.random();
            let seat = document.createElement('div');
            
            seat.classList.add('seat'); // adding default seat class

            if(isSeatOccupied(randInt)) {
                seat.classList.add('occupied'); // randomly occupying seats
            }

            row.appendChild(seat);
        }

        container.appendChild(row);
    }
}

window.onload = () => {
    generateSeats(10, 18);
}