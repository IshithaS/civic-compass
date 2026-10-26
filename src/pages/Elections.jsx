import { ExternalLink, CheckSquare, MapPin, Mail, CalendarDays } from 'lucide-react';

export default function Elections() {
  const votingResources = [
    {
      title: "Check Your Registration",
      description: "Verify that you are registered to vote at your current North Carolina address.",
      icon: CheckSquare,
      url: "https://vt.ncsbe.gov/RegLkup/"
    },
    {
      title: "Find Your Polling Place",
      description: "Look up your official Election Day polling location and operating hours.",
      icon: MapPin,
      url: "https://vt.ncsbe.gov/PPLkup/"
    },
    {
      title: "Request an Absentee Ballot",
      description: "Apply for a mail-in ballot if you cannot vote in person on Election Day.",
      icon: Mail,
      url: "https://votebymail.ncsbe.gov/app/home"
    },
    {
      title: "Early Voting Sites",
      description: "Find one-stop early voting locations in your county before Election Day.",
      icon: CalendarDays,
      url: "https://vt.ncsbe.gov/OSSite/"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 pb-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-navy mb-4">Official Voting Resources</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          CivicCompass helps you prepare, but the <strong>North Carolina State Board of Elections (NCSBE)</strong> is the official source for all voting logistics. Use the links below to handle your actual voting process.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {votingResources.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <a 
              key={index}
              href={resource.url}
              target="_blank"
              rel="noreferrer"
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-teal hover:shadow-md transition-all group flex flex-col h-full"
            >
              <div className="flex items-start gap-4">
                <div className="bg-teal/10 p-3 rounded-lg text-teal group-hover:bg-teal group-hover:text-white transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-grow">
                  <h2 className="text-xl font-bold text-navy mb-2 flex items-center gap-2">
                    {resource.title}
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-teal transition-colors" />
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {resource.description}
                  </p>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      <div className="mt-12 bg-navy rounded-xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">First Time Voter?</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-6">
          In North Carolina, you will be asked to show a photo ID when you vote. This can be a driver's license, state ID, or an approved student ID. 
        </p>
        <a 
          href="https://www.ncsbe.gov/voting/voter-id" 
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-teal hover:bg-teal/90 text-white font-medium px-6 py-3 rounded-lg transition-colors"
        >
          View Approved Voter IDs
        </a>
      </div>
    </div>
  );
}