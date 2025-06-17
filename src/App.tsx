import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SearchPage from "./pages/SearchPage";
import RegisterPage from "./pages/Register";
import ProfilePage from "./pages/ProfilePage";
import PersonalPage from "./pages/PersonalPage";
import ServicePage from "./pages/ServicePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profilepage/:id" element={<ProfilePage />} />
        <Route path="/personalpage" element={<PersonalPage />} /> 
        <Route path="/servicepage"
        element={<ServicePage />} />
      </Routes>
    </Router>
  );
}

export default App;


