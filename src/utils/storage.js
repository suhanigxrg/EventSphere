/* ================================
   KEYS
================================ */
const USERS_KEY = "es_users";
const CURRENT_USER_KEY = "es_current_user";
const EVENTS_KEY = "es_events";
const BOOKINGS_KEY = "es_bookings";

/* ================================
   USERS
================================ */
export const getUsers = () =>
  JSON.parse(localStorage.getItem(USERS_KEY)) || [];

export const saveUser = (user) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const loginUser = (email, password) => {
  const users = getUsers();
  const found = users.find(
    (u) => u.email === email && u.password === password
  );

  if (found) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(found));
    return found;
  }

  return null;
};

export const getCurrentUser = () =>
  JSON.parse(localStorage.getItem(CURRENT_USER_KEY));

export const logoutUser = () =>
  localStorage.removeItem(CURRENT_USER_KEY);

/* ================================
   EVENTS (ORGANIZER CREATED)
================================ */
export const getOrganizerEvents = () =>
  JSON.parse(localStorage.getItem(EVENTS_KEY)) || [];

export const addOrganizerEvent = (event) => {
  const events = getOrganizerEvents();
  events.push(event);
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
};

export const updateOrganizerEvent = (id, updated) => {
  const events = getOrganizerEvents().map((e) =>
    e.id === id ? { ...e, ...updated } : e
  );
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
};

// ================= BOOKINGS =================

export const getBookings = () => {
  return JSON.parse(localStorage.getItem("es_bookings") || "[]");
};

export const saveBooking = (booking) => {
  const bookings = getBookings();
  localStorage.setItem(
    "es_bookings",
    JSON.stringify([booking, ...bookings])
  );
};

export const getUserBookings = (userId) => {
  const bookings = getBookings();
  return bookings.filter((b) => b.userId === userId);
};


export const addBooking = saveBooking;