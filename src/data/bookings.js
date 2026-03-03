const event1 = "/src/assets/event1.jpg";
const event2 = "/src/assets/event2.jpg";
const event3 = "/src/assets/event3.jpg";
const event4 = "/src/assets/event4.jpg";

const bookings = [
  {
    id: 1,
    title: "Neon Nights Music Festival",
    date: "Mar 15, 2026",
    tickets: 2,
    status: "confirmed",
    price: 178,
    image: event1,
  },
  {
    id: 2,
    title: "Tech Summit 2026",
    date: "Apr 5, 2026",
    tickets: 1,
    status: "confirmed",
    price: 299,
    image: event2,
  },
  {
    id: 3,
    title: "Marathon City Run 2026",
    date: "May 3, 2026",
    tickets: 1,
    status: "pending",
    price: 60,
    image: event3,
  },
];

export default bookings;