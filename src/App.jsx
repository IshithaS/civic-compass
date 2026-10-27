import { useState } from 'react';
import IntroScreen from './IntroScreen';
import Home from './pages/Home';
import Elections from './pages/Elections';
import Candidates from './pages/Candidates';
import Compare from './pages/Compare';
import Learn from './pages/Learn';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // This line fixes your error by defining the state!
  const [electionData, setElectionData] = useState(null);

  if (showIntro) {
    return <IntroScreen onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: 'sans-serif' }}>
      <nav style={{ backgroundColor: '#1e293b', padding: '16px', display: 'flex', gap: '16px', color: 'white', alignItems: 'center', flexWrap: 'wrap' }}>
        <h2 style={{ margin: '0 24px 0 0', fontSize: '20px', fontWeight: 'bold' }}>CivicCompass</h2>
        {['dashboard', 'elections', 'candidates', 'compare', 'learn'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)} 
            style={{ background: 'none', border: 'none', color: activeTab === tab ? '#38bdf8' : 'white', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', textTransform: 'capitalize' }}
          >
            {tab}
          </button>
        ))}
      </nav>

      <main style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* We are now passing the state down as props to fix the crash */}
        {activeTab === 'dashboard' && <Home electionData={electionData} setElectionData={setElectionData} />}
        {activeTab === 'elections' && <Elections electionData={electionData} setElectionData={setElectionData} />}
        {activeTab === 'candidates' && <Candidates electionData={electionData} setElectionData={setElectionData} />}
        {activeTab === 'compare' && <Compare electionData={electionData} setElectionData={setElectionData} />}
        {activeTab === 'learn' && <Learn electionData={electionData} setElectionData={setElectionData} />}
      </main>
    </div>
  );
}