import { Routes, Route } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails";
import Homepage from "./pages/Homepage";
import UserPage from "./pages/UserPage";
import Login from "./pages/Login"


function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user" element={<UserPage />} />
    </Routes>
  );
}

export default App;
