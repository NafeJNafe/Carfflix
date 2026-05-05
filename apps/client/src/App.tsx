import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.tsx";
import AppDescription from "./Pages/AppDescription.tsx";
import Symptoms from "./Pages/Symptoms.tsx";
import GarageSelection from "./Pages/GarageSelection.tsx";
import BookingForm from "./Pages/BookingForm.tsx";
import Confirmation from "./Pages/Confirmation.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app-description" element={<AppDescription />} />
        <Route path="/symptoms" element={<Symptoms />} />
        <Route path="/garages" element={<GarageSelection />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
