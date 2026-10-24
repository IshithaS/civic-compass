import { Landmark, Map, Building, Home } from 'lucide-react';

export default function Learn() {
  const governmentLevels = [
    {
      level: "Federal Government",
      icon: Landmark,
      color: "text-navy",
      bgColor: "bg-blue-50",
      description: "Makes laws for the entire United States, manages national defense, and handles foreign policy.",
      offices: ["President", "U.S. Senators", "U.S. House Representatives"],
      impact: "Decides on national taxes, federal student loans, and nationwide environmental or economic regulations."
    },
    {
      level: "State Government",
      icon: Map,
      color: "text-teal",
      bgColor: "bg-teal-50",
      description: "Manages state-specific laws, public education funding, state highways, and public health initiatives.",
      offices: ["Governor", "State Senators", "State Representatives", "Attorney General"],
      impact: "Determines funding for your local public schools, state universities, and sets the state minimum wage and income tax."
    },
    {
      level: "County Government",
      icon: Building,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Handles regional services like law enforcement (sheriff), property records, elections, and waste management.",
      offices: ["County Commissioners", "Sheriff", "Clerk of Court"],
      impact: "Runs the local elections you vote in, manages the county jail, and maintains county parks and libraries."
    },
    {
      level: "Municipal (Local) Government",
      icon: Home,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Runs your specific city or town. Focuses on immediate community needs like police, fire, zoning, and local roads.",
      offices: ["Mayor", "City Council", "School Board"],
      impact: "Decides if a new apartment complex can be built in your neighborhood, fills potholes, and funds local police and fire departments."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 pb-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-navy mb-4">How Your Government Works</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Elections can be confusing because you aren't just voting for one government—you are voting for people across four different levels. Here is a quick guide to who does what.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {governmentLevels.map((gov, index) => {
          const Icon = gov.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
              <div className={`${gov.bgColor} px-6 py-4 border-b border-gray-100 flex items-center gap-3`}>
                <Icon className={`h-6 w-6 ${gov.color}`} />
                <h2 className={`text-xl font-bold ${gov.color}`}>{gov.level}</h2>
              </div>
              
              <div className="p-6 flex-grow">
                <p className="text-gray-700 mb-6">{gov.description}</p>
                
                <div className="mb-4">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Who you vote for</h3>
                  <div className="flex flex-wrap gap-2">
                    {gov.offices.map((office, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md font-medium border border-gray-200">
                        {office}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">How it affects you</h3>
                  <p className="text-sm text-gray-600 italic bg-gray-50 p-3 rounded-lg border border-gray-100">
                    {gov.impact}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}