import { User, Briefcase, ExternalLink, ShieldAlert, Link as LinkIcon } from 'lucide-react';
import { mockCandidates } from '../data/mockCandidates';

export default function Candidates() {
  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy mb-2">Candidate Profiles</h1>
        <p className="text-gray-600 max-w-2xl">
          Explore candidates on your ballot. Policy positions listed below are summarized directly from candidate public statements and official campaign websites. 
        </p>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg flex gap-3 mb-8">
        <ShieldAlert className="h-5 w-5 text-yellow-600 flex-shrink-0" />
        <p className="text-sm text-yellow-800">
          <strong>Prototype Mode:</strong> Showing demonstration data for NC State Senate District 40. Positions reflect candidate-stated goals, not independently verified outcomes.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {mockCandidates.map((candidate) => (
          <div key={candidate.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 flex-grow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-navy">{candidate.name}</h2>
                  <p className="text-teal font-medium">{candidate.office}</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  candidate.party === 'Democrat' ? 'bg-blue-100 text-blue-800' : 
                  candidate.party === 'Republican' ? 'bg-red-100 text-red-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {candidate.party}
                </span>
              </div>

              <p className="text-gray-700 text-sm mb-6">{candidate.biography}</p>

              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-gray-400" />
                  Experience
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {candidate.experience.map((exp, idx) => (
                    <li key={idx}>{exp}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  Stated Priorities
                </h3>
                <div className="space-y-4">
                  {candidate.policyPriorities.map((policy, idx) => (
                    <div key={idx} className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm">
                      <span className="font-semibold text-navy block mb-1">{policy.issue}</span>
                      <p className={`mb-2 ${policy.position.includes('No verified information') ? 'text-gray-400 italic' : 'text-gray-700'}`}>
                        {policy.position}
                      </p>
                      {policy.sourceUrl && (
                        <a href={policy.sourceUrl} className="text-teal hover:text-navy inline-flex items-center gap-1 text-xs font-medium transition-colors">
                          <LinkIcon className="h-3 w-3" /> Source
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-200">
              <a 
                href={candidate.campaignWebsite}
                className="text-navy hover:text-teal font-medium text-sm flex items-center gap-1 transition-colors"
              >
                Official Campaign Site <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}