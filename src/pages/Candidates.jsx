import { ExternalLink, Users, AlertCircle, Phone, Mail, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Candidates({ electionData }) {
  if (!electionData || !electionData.contests) {
    return (
      <div className="max-w-4xl mx-auto mt-20 px-4 text-center">
        <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-navy mb-2">No Ballot Loaded</h2>
        <p className="text-gray-600 mb-6">Search your address on the Dashboard to load your specific candidates.</p>
        <Link to="/" className="bg-teal text-white px-6 py-3 rounded-lg font-medium hover:bg-teal/90">Go to Dashboard</Link>
      </div>
    );
  }

  const candidateContests = electionData.contests.filter(c => c.type !== 'Referendum' && c.candidates);

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy mb-2 flex items-center gap-3">
          <Users className="h-8 w-8 text-teal" /> 
          Your Live Ballot Candidates
        </h1>
        <p className="text-gray-600 max-w-2xl">Verified candidates running for office in your specific district.</p>
      </div>

      <div className="space-y-8">
        {candidateContests.map((contest, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-navy px-6 py-4">
              <h2 className="text-xl font-bold text-white">{contest.office}</h2>
            </div>
            <div className="p-6 grid md:grid-cols-2 gap-6">
              {contest.candidates.map((candidate, cIdx) => (
                <div key={cIdx} className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{candidate.name}</h3>
                      {candidate.incumbent && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">Incumbent</span>
                      )}
                    </div>
                    <p className={`text-sm font-bold mb-4 uppercase tracking-wider ${candidate.party?.includes('Democrat') ? 'text-blue-600' : candidate.party?.includes('Republican') ? 'text-red-600' : 'text-gray-600'}`}>
                      {candidate.party || 'No Party Affiliation'}
                    </p>
                    
                    <div className="space-y-2 mb-6">
                      {candidate.phones && (
                        <p className="text-sm text-gray-600 flex items-center gap-2"><Phone className="h-4 w-4 text-gray-400"/> {candidate.phones[0]}</p>
                      )}
                      {candidate.email && (
                        <p className="text-sm text-gray-600 flex items-center gap-2"><Mail className="h-4 w-4 text-gray-400"/> {candidate.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 flex flex-wrap gap-3">
                    {candidate.candidateUrl && (
                      <a href={candidate.candidateUrl} target="_blank" rel="noreferrer" className="text-teal hover:text-navy inline-flex items-center gap-1 text-sm font-bold">
                        <Globe className="h-4 w-4" /> Official Site <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    {candidate.channels?.map((channel, i) => (
                      <a key={i} href={channel.id} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-teal text-sm font-medium">
                        {channel.type}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}