const bookingsList = document.querySelector('#bookingsList');

function displayBookings() {
  const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
  
  bookingsList.innerHTML = bookings.map(booking => `
    <li>
      <p><strong>Name:</strong> ${booking.name}</p>
      <p><strong>Email:</strong> ${booking.email}</p>
      <p><strong>Date:</strong> ${booking.date}</p>
      <p><strong>Time:</strong> ${booking.time}</p>
    </li>
  `).join('');
}

displayBookings();

