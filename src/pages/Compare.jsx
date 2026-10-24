import { useState } from 'react';
import { Scale, ShieldAlert, Link as LinkIcon, CheckCircle2, XCircle } from 'lucide-react';
import { mockCandidates } from '../data/mockCandidates';

export default function Compare() {
  // For the prototype, we will automatically select the two candidates in our mock data
  const [candidate1] = useState(mockCandidates[0]);
  const [candidate2] = useState(mockCandidates[1]);

  // Extract a unique list of all issues discussed by either candidate
  const allIssues = Array.from(new Set([
    ...candidate1.policyPriorities.map(p => p.issue),
    ...candidate2.policyPriorities.map(p => p.issue)
  ]));

  const getPosition = (candidate, issue) => {
    const policy = candidate.policyPriorities.find(p => p.issue === issue);
    return policy || { issue, position: "No verified information available.", sourceUrl: null };
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy mb-2 flex items-center gap-3">
          <Scale className="h-8 w-8 text-teal" />
          Candidate Comparison
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Review candidates side-by-side. All positions are sourced directly from candidate statements and campaign materials. CivicCompass does not endorse any candidate.
        </p>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg flex gap-3 mb-8 animate-in fade-in">
        <ShieldAlert className="h-5 w-5 text-yellow-600 flex-shrink-0" />
        <p className="text-sm text-yellow-800">
          <strong>Prototype Mode:</strong> Showing demonstration data for NC State Senate District 40. 
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Comparison Header */}
        <div className="grid grid-cols-2 divide-x divide-gray-200 border-b border-gray-200 bg-gray-50">
          <div className="p-6 text-center">
            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${
              candidate1.party === 'Democrat' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {candidate1.party}
            </span>
            <h2 className="text-2xl font-bold text-navy">{candidate1.name}</h2>
            <p className="text-sm text-gray-500 mt-1">{candidate1.office}</p>
          </div>
          <div className="p-6 text-center">
            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${
              candidate2.party === 'Republican' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {candidate2.party}
            </span>
            <h2 className="text-2xl font-bold text-navy">{candidate2.name}</h2>
            <p className="text-sm text-gray-500 mt-1">{candidate2.office}</p>
          </div>
        </div>

        {/* Comparison Body - Issues */}
        <div className="divide-y divide-gray-200">
          {allIssues.map((issue) => {
            const pos1 = getPosition(candidate1, issue);
            const pos2 = getPosition(candidate2, issue);
            
            return (
              <div key={issue} className="flex flex-col">
                <div className="bg-navy text-white py-2 px-4 text-center text-sm font-bold uppercase tracking-widest shadow-inner">
                  {issue}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-200">
                  {/* Candidate 1 Position */}
                  <div className="p-6 bg-white hover:bg-gray-50 transition-colors">
                    <p className={`text-sm mb-4 ${!pos1.sourceUrl ? 'text-gray-400 italic' : 'text-gray-700'}`}>
                      {pos1.position}
                    </p>
                    {pos1.sourceUrl ? (
                      <a href={pos1.sourceUrl} className="text-teal hover:text-navy inline-flex items-center gap-1 text-xs font-medium">
                        <LinkIcon className="h-3 w-3" /> Source Document
                      </a>
                    ) : (
                      <span className="text-gray-400 text-xs flex items-center gap-1">
                        <XCircle className="h-3 w-3" /> Unverified
                      </span>
                    )}
                  </div>
                  
                  {/* Candidate 2 Position */}
                  <div className="p-6 bg-white hover:bg-gray-50 transition-colors">
                    <p className={`text-sm mb-4 ${!pos2.sourceUrl ? 'text-gray-400 italic' : 'text-gray-700'}`}>
                      {pos2.position}
                    </p>
                    {pos2.sourceUrl ? (
                      <a href={pos2.sourceUrl} className="text-teal hover:text-navy inline-flex items-center gap-1 text-xs font-medium">
                        <LinkIcon className="h-3 w-3" /> Source Document
                      </a>
                    ) : (
                      <span className="text-gray-400 text-xs flex items-center gap-1">
                        <XCircle className="h-3 w-3" /> Unverified
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}