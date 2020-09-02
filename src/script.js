const isSeatOccupied = (chances) => {
    if (chances > 0.5) return true;
    else return false;
};

const generateSeats = (numOfRows, eachRowSize) => {
    const container = document.querySelector('.container');

    for (let i = 0; i < numOfRows; i++) {
        let row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < eachRowSize; j++) {
            const randInt = Math.random();
            let seat = document.createElement('div');

            seat.classList.add('seat'); // adding default seat class

            if (isSeatOccupied(randInt)) {
                seat.classList.add('occupied'); // randomly occupying seats
            }

            row.appendChild(seat);
        }

        container.appendChild(row);
    }
};

generateSeats(10, 18);

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');

const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

const updateSelectedSeats = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = `$ ${ticketPrice * selectedSeatsCount}`;
};

// movie select event
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    updateSelectedSeats(); // for refreshing the amount
});

// seat click event
container.addEventListener('click', e => {
    const classes = e.target.classList;

    if(classes.contains('seat') && !classes.contains('occupied')){
        e.target.classList.toggle('selected');
        updateSelectedSeats();
    }

});