
const axios = require("axios");

// Get the clear storage button element
const clearStorageButton = document.querySelector('#clearStorageButton');

// Add a click event listener to the button
clearStorageButton.addEventListener('click', () => {
  // Clear the local storage
  localStorage.clear();
  // Redirect the user back to the booking form
  window.location.href = 'booking.html';
});


const bookedDatesAndTimes = JSON.parse(localStorage.getItem('bookedDatesAndTimes')) || [];
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');
const availableTimesList = document.getElementById('available-times');

dateInput.addEventListener('input', (event) => {
  const selectedDate = event.target.value;
  const availableTimes = getAvailableTimesForDate(selectedDate);
  populateAvailableTimesList(availableTimes);
});

function getAvailableTimesForDate(date) {
  const bookedTimes = bookedDatesAndTimes
    .filter((dateAndTime) => dateAndTime.startsWith(date))
    .map((dateAndTime) => dateAndTime.split(' ')[1]);
  const allTimes = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  return allTimes.filter((time) => !bookedTimes.includes(time));
}

function populateAvailableTimesList(availableTimes) {
  availableTimesList.innerHTML = '';
  availableTimes.forEach((time) => {
    const option = document.createElement('option');
    option.value = time;
    availableTimesList.appendChild(option);
  });
}

function populateDates() {
  // Get current date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Clear existing options
  dateInput.innerHTML = '';

  // Create options for the next 7 days
  for (let i = 0; i < 7; i++) {
    const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
    const dateString = formatDate(date);

    // Check if date is available
    const available = availableDates.includes(dateString);

    // Add option if date is available
    if (available) {
      const option = document.createElement('option');
      option.value = dateString;
      option.textContent = dateString;
      dateInput.appendChild(option);
    }
  }

  // Populate times for selected date
  populateTimes();
}

function handleBooking(event) {
    event.preventDefault(); // Prevent form from submitting
  
    const name = event.target.name.value;
    const phone = event.target.phone.value;
    const email = event.target.email.value;
    const date= event.target.date.value;
    const time =event.target.time.value;
  
    // Validate inputs
    if (name.trim() === '' || phone.trim() === '' || email.trim() === '' || date.trim() === '' || time.trim() === ''  ) {
      alert('Please fill out all fields.');
      return;
    }
  
    // Send booking information to server or save locally
    // Example code to save to localStorage:
    const booking = {
      name,
      phone,
      email,
      date,
      time,
    };
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
  
 
  
const booked = `${date} ${time} `;

    bookedDatesAndTimes.push(booked);
    // Save updated bookedDatesAndTimes array to localStorage
    localStorage.setItem('bookedDatesAndTimes', JSON.stringify(bookedDatesAndTimes));
  
    // Remove booked date and time from available times
    const index = bookedDatesAndTimes.findIndex((dateAndTime) => dateAndTime === `${date} ${time}`);
    if (index !== -1) {
      bookedDatesAndTimes.splice(index, 1);
    }

    
  // Hide the form
  formboook.style.display = 'none';

  // Show the thank you modal
  showThankYouModal();
    
  // Show the toast
  showToast('Booking successful!');
  }
  const bookingForm = document.querySelector('form');
  bookingForm.addEventListener('submit', handleBooking);
  
  // Retrieve the booking information from local storage
  const booking =JSON.parse(localStorage.bookings)
  
  // Display the booking information on the webpage
  const bookingDetails = document.querySelector('#booking-details');
  bookingDetails.innerHTML = ` ${Object.entries(booking)
    .map(([key, value]) => `<p>${key}: ${value.name} ${value.phone} ${value.email}${value.date}${value.time}</p>`)
    .join('')}
`;
  




// Get the modal
const modal = document.getElementById('modal');

// Get the <span> element that closes the modal
const closeBtn = modal.querySelector('.close');

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function() {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// Show the modal when the form is submitted
function showThankYouModal() {
  modal.style.display = 'block';
}


// Get the toast container
const toast = document.getElementById('toast');

// Show the toast
function showToast(message) {
  // Set the message text
  toast.innerText = message;

  // Add the "show" class to the toast
  toast.classList.add('show');

  // Remove the "show" class after 2.5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}
const okButton = document.getElementById('ok-button');

// Close the modal when the OK button is clicked
okButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

const options = {
  method: 'GET',
  url: 'https://odds.p.rapidapi.com/v4/sports',
  params: {all: 'true'},
  headers: {'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY', 'X-RapidAPI-Host': 'odds.p.rapidapi.com'}
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
