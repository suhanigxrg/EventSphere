import event1 from "../assets/event1.jpg";
import event2 from "../assets/event2.jpg";
import event3 from "../assets/event3.jpg";
import event4 from "../assets/event4.jpg";
const events = [
  {
    id: 1,
    title: "Neon Nights Music Festival",
    category: "Music",
    date: "Mar 15, 2026",
    time: "7:00 PM",
    location: "Madison Square Garden, NYC",
    price: 89,
    rating: 4.8,
    attendees: 12500,
    image: event1,

    description:
      "Experience the ultimate electronic music festival featuring world-class DJs, immersive light shows, and an electrifying atmosphere.",

    longDescription:
      "Neon Nights Music Festival brings together the biggest names in electronic dance music for one unforgettable night. Enjoy multiple stages, premium sound systems, food courts, VIP lounges, and interactive experiences designed for music lovers.",

    organizer: {
      name: "Neon Events Co.",
      role: "Event Organizer",
      avatarLetter: "N",
    },

    venueDetails: {
      name: "Madison Square Garden",
      city: "New York",
      capacity: "20,000",
    },

    ticketTypes: [
      { name: "General Admission", price: 89 },
      { name: "VIP Pass", price: 149 },
      { name: "Early Bird", price: 69 },
    ],
  },

  {
    id: 2,
    title: "Tech Summit 2026",
    category: "Technology",
    date: "Apr 5, 2026",
    time: "10:00 AM",
    location: "Moscone Center, San Francisco",
    price: 299,
    rating: 4.9,
    attendees: 8200,
    image: event2,

    description:
      "Join industry leaders and innovators at the biggest tech conference of the year.",

    longDescription:
      "Tech Summit 2026 features keynote sessions from top tech CEOs, hands-on workshops, startup showcases, networking lounges, and future-tech exhibitions covering AI, Web3, Cloud, and more.",

    organizer: {
      name: "FutureTech Events",
      role: "Conference Organizer",
      avatarLetter: "F",
    },

    venueDetails: {
      name: "Moscone Center",
      city: "San Francisco",
      capacity: "15,000",
    },

    ticketTypes: [
      { name: "Standard Pass", price: 299 },
      { name: "VIP Pass", price: 499 },
      { name: "Student Pass", price: 149 },
    ],
  },

  {
    id: 3,
    title: "City Marathon 2026",
    category: "Sports",
    date: "May 3, 2026",
    time: "6:00 AM",
    location: "Central Park, New York",
    price: 60,
    rating: 4.5,
    attendees: 18000,
    image: event3,

    description:
      "Run through the heart of the city in this exciting annual marathon.",

    longDescription:
      "City Marathon 2026 welcomes runners from around the world. The route covers iconic city landmarks with hydration stations, medical support, timing chips, and finisher medals for all participants.",

    organizer: {
      name: "RunCity Sports",
      role: "Sports Organizer",
      avatarLetter: "R",
    },

    venueDetails: {
      name: "Central Park",
      city: "New York",
      capacity: "25,000",
    },

    ticketTypes: [
      { name: "Runner Entry", price: 60 },
      { name: "Premium Kit", price: 120 },
    ],
  },

  {
    id: 4,
    title: "EDM Beach Party",
    category: "Music",
    date: "Jun 20, 2026",
    time: "8:00 PM",
    location: "Miami Beach, FL",
    price: 120,
    rating: 4.9,
    attendees: 9500,
    image: event4,

    description:
    
      "Dance all night at the hottest beach EDM party of the summer.",

    longDescription:
      "EDM Beach Party brings top DJs to Miami’s coastline with sunset vibes, beachside stages, neon lights, premium bars, and an unforgettable party atmosphere.",

    organizer: {
      name: "Wave Events",
      role: "Music Promoter",
      avatarLetter: "W",
    },

    venueDetails: {
      name: "Miami Beach Arena",
      city: "Miami",
      capacity: "18,000",
    },

    ticketTypes: [
      { name: "Beach Pass", price: 120 },
      { name: "VIP Cabana", price: 250 },
    ],
  },
];

export default events;