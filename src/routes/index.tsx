import { Route, Routes } from "react-router-dom";
import Nestbox from "../components/Nestbox";
import Home from "../components/Home";

// If you have more pages, you can import them here
// import Home from '../components/Home';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/nestbox/:BuildingNumber/:NestBoxNumber"
        element={<Nestbox />}
      />
    </Routes>
  );
}
