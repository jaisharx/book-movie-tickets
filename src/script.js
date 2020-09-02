// generating bunch of seats programmatically
(function generateSeatsAndPopulate(numOfRows = 10, eachRowSize = 18) {
    for (let i = 0; i < numOfRows; i++) {
        // creating a row
        const row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < eachRowSize; j++) {
            // creating a seat
            const seat = document.createElement('div');
            seat.classList.add('seat'); // adding default seat class

            row.appendChild(seat); // adding all seats to the row
        }

        document.querySelector('.container').appendChild(row); // adding each rows to the container
    }
})();

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat');
const text = document.querySelector('.text');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
};

const randomlyOccupySeats = () => {
    const occupiedSeats = [];

    seats.forEach((seat) => {
        const shouldWeOccupySeats = Math.round(Math.random());

        if (shouldWeOccupySeats === 1) {
            // yes occupy
            seat.classList.add('occupied');
        }

        occupiedSeats.push(shouldWeOccupySeats);
    });
    saveToLocalStorage('occupiedSeatsData', JSON.stringify(occupiedSeats));
};

const useLSToOccupySeats = (occupiedSeatsArr) => {
    for (let i = 0; i < seats.length; i++) {
        if (occupiedSeatsArr[i] === 1) {
            seats[i].classList.add('occupied');
        }
    }
};

const checkIfOccupiedSeatsDataExistsInLS = () => {
    const occupiedSeats = JSON.parse(localStorage.getItem('occupiedSeatsData'));

    if (occupiedSeats) {
        useLSToOccupySeats(occupiedSeats);
    } else {
        randomlyOccupySeats(); // user's first visit or no localStorage obj found
    }
};

const checkIfSelectedSeatsDataExistsInLS = () => {
    const selectedSeatsArr = JSON.parse(localStorage.getItem('selectedSeatsData'));

    if (selectedSeatsArr) {
        selectedSeatsArr.forEach((index) => {
            seats[index].classList.add('selected');
        });
    }
};

const checkIfMovieIndexDataExistsInLS = () => {
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');

    if (selectedMovieIndex) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }

    if(selectedMoviePrice) {
        ticketPrice = +selectedMoviePrice;
    }
};

(function populateUIWithLSData() {
    checkIfOccupiedSeatsDataExistsInLS();
    checkIfSelectedSeatsDataExistsInLS();
    checkIfMovieIndexDataExistsInLS();
})();

const updateSelectedSeats = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;
    const price = selectedSeatsCount * ticketPrice;
    let updateString = '';

    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

    saveToLocalStorage('selectedSeatsData', JSON.stringify(seatsIndex));

    if (selectedSeatsCount === 0) {
        updateString = "You haven't picked any seats.";
    } else if (selectedSeatsCount === 1) {
        updateString = `
        You have selected <span>${selectedSeatsCount}</span> seat for the price of <span>$${price}</span>.
        `;
    } else {
        updateString = `
        You have selected <span>${selectedSeatsCount}</span> seats for the price of <span>$${price}</span>.
        `;
    }

    text.innerHTML = updateString;
};

// movie pickup event
movieSelect.addEventListener('change', (e) => {
    console.log('log');
    const index = e.target.selectedIndex;
    ticketPrice = +e.target.value;

    saveToLocalStorage('selectedMovieIndex', index);
    saveToLocalStorage('selectedMoviePrice', ticketPrice);
    updateSelectedSeats(); // for refreshing the amount
});

// seat click event
container.addEventListener('click', (e) => {
    const classes = e.target.classList;

    if (classes.contains('seat') && !classes.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedSeats();
    }
});

// inital load
updateSelectedSeats();