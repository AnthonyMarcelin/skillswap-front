import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

<<<<<<< HEAD
import Home from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import SearchPage from "./pages/SearchPage";
=======
import Home from './pages/Home'
import { NotFound } from './pages/NotFound';
import SearchPage from './pages/SearchPage';
import RegisterPage from './pages/Register';
>>>>>>> fc6c6a0077ebcbe91899e68210640c28f1a99c26

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
