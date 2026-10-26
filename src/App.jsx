import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Elections from './pages/Elections';
import Candidates from './pages/Candidates';
import Compare from './pages/Compare';
import Learn from './pages/Learn';

function App() {
  // This state now holds your live Google Civic API data for the whole app
  const [electionData, setElectionData] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home electionData={electionData} setElectionData={setElectionData} />} />
            <Route path="/elections" element={<Elections />} />
            <Route path="/candidates" element={<Candidates electionData={electionData} />} />
            <Route path="/compare" element={<Compare electionData={electionData} />} />
            <Route path="/learn" element={<Learn />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;