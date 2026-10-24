import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/elections" element={<div className="p-8 text-center">Elections Page Coming Soon</div>} />
            <Route path="/candidates" element={<div className="p-8 text-center">Candidates Page Coming Soon</div>} />
            <Route path="/compare" element={<div className="p-8 text-center">Compare Page Coming Soon</div>} />
            <Route path="/learn" element={<div className="p-8 text-center">Learn Page Coming Soon</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;