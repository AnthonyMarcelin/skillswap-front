import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'
import { NotFound } from './pages/NotFound';
import SearchPage from './pages/SearchPage';

function App() {
 
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  )
}

export default App;
