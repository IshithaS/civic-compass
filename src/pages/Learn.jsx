import { useState } from 'react';
import { Landmark, Briefcase, Scale, GraduationCap, Building2, MapPin, Shield, Gavel, FileSignature, Users, ChevronDown, ChevronUp } from 'lucide-react';

export default function Learn() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const roles = [
    { role: "U.S. Senator", icon: Landmark, scope: "Federal", description: "Each state has two U.S. Senators who serve 6-year terms. They vote on federal laws, but uniquely hold the power to confirm or reject the President's appointments (like Supreme Court Justices and Cabinet members) and ratify international treaties." },
    { role: "U.S. Representative", icon: Briefcase, scope: "Federal", description: "Representatives serve 2-year terms and represent a specific geographic district. All federal bills regarding taxation and revenue must start in the House of Representatives. Their short terms are designed to make them highly responsive to immediate public opinion." },
    { role: "Governor", icon: Building2, scope: "State", description: "The Governor is essentially the 'President' of your state. They sign state bills into law, command the state National Guard, create the state budget, and manage state agencies like the Department of Transportation and environmental protections." },
    { role: "State Attorney General", icon: Scale, scope: "State", description: "The chief legal advisor and top law enforcement officer for the state. They prosecute widespread financial fraud, enforce environmental laws, and defend the state if it is sued in federal court." },
    { role: "Secretary of State", icon: FileSignature, scope: "State", description: "The chief election officer. They oversee how elections are run, manage voter rolls, certify election results, and handle business registrations." },
    { role: "State Senator & Rep", icon: Users, scope: "State", description: "These are your state lawmakers. They go to your state capital to debate and pass state-level laws, determine state taxes, fund state universities, and draw district lines for federal elections." },
    { role: "Judges & Supreme Court", icon: Gavel, scope: "State / Local", description: "Depending on your state, you vote for local judges or Supreme Court justices. They interpret laws, rule on constitutionality, handle criminal trials, and resolve civil disputes." },
    { role: "County Commissioner", icon: MapPin, scope: "County", description: "Commissioners act as the executive branch for your county. They set the county property tax rate, manage public health departments, fund the library system, and maintain county roads." },
    { role: "Sheriff", icon: Shield, scope: "County", description: "Directly elected by the people. They oversee the county jail system, provide security for local courts, and serve as primary law enforcement for areas outside city limits." },
    { role: "Mayor & City Council", icon: Building2, scope: "Municipal", description: "These leaders impact your daily life the most. They determine local property taxes, oversee police and fire departments, fix potholes, and decide zoning laws." },
    { role: "School Board Member", icon: GraduationCap, scope: "Local", description: "The School Board oversees the public school district. They hire the Superintendent, approve budgets, and set curriculum policies." }
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 pb-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-navy mb-4">Interactive Down-Ballot Guide</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Click on any office to expand its responsibilities. Understanding these roles is critical, as local elections often impact your daily life more than federal ones.
        </p>
      </div>

      <div className="space-y-4">
        {roles.map((item, index) => {
          const Icon = item.icon;
          const isExpanded = expandedIndex === index;
          return (
            <div 
              key={index} 
              className={`bg-white rounded-xl shadow-sm border overflow-hidden cursor-pointer transition-colors ${isExpanded ? 'border-teal' : 'border-gray-200 hover:border-teal/50'}`}
              onClick={() => setExpandedIndex(isExpanded ? null : index)}
            >
              <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-teal/10 p-2 rounded-lg"><Icon className="h-6 w-6 text-teal" /></div>
                  <div>
                    <h2 className="text-lg font-bold text-navy">{item.role}</h2>
                    <p className="text-teal text-xs font-bold uppercase tracking-wider">{item.scope}</p>
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
              </div>
              {isExpanded && (
                <div className="px-6 pb-5 pt-2 bg-gray-50 border-t border-gray-100">
                  <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}