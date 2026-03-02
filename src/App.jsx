import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Organizer from "./pages/Organizer";
import EventDetails from "./pages/EventDetails";
import Checkout from "./pages/Checkout";
import TicketSuccess from "./pages/TicketSuccess";
import CreateEvent from "./pages/CreateEvent";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/organizer" element={<Organizer />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/ticket/:id" element={<TicketSuccess />} />
        <Route path="/ticket-success/:id" element={<TicketSuccess />} />
        <Route path="/ticket/:id" element={<TicketSuccess />} />
        <Route path="/organizer" element={<Organizer />} />
        <Route path="/Organizer/create" element={<CreateEvent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;