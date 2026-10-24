import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Candidates from './pages/Candidates';
import Compare from './pages/Compare';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/elections" element={<div className="p-8 text-center">Elections Page Coming Soon</div>} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/learn" element={<div className="p-8 text-center">Learn Page Coming Soon</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;