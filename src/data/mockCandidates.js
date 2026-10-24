export const mockCandidates = [
  {
    id: "cand-1",
    name: "Jane Smith",
    office: "NC State Senate, District 40",
    party: "Democrat",
    biography: "Jane Smith is a former public school educator and small business owner who has served on the local school board for 8 years.",
    experience: ["School Board Member (2018-present)", "High School Teacher (2010-2018)"],
    policyPriorities: [
      {
        issue: "Education",
        position: "Stated support for increasing state funding for public schools and raising teacher pay by 10%.",
        sourceUrl: "https://example.com/jane-smith-education"
      },
      {
        issue: "Economy",
        position: "Focuses on providing state-backed grants for first-time small business owners.",
        sourceUrl: "https://example.com/jane-smith-economy"
      }
    ],
    campaignWebsite: "https://example.com/jane-smith",
    verifiedInformation: true
  },
  {
    id: "cand-2",
    name: "John Doe",
    office: "NC State Senate, District 40",
    party: "Republican",
    biography: "John Doe is an attorney and military veteran with a background in constitutional law and community safety initiatives.",
    experience: ["US Army Veteran (2005-2015)", "Private Practice Attorney (2016-present)"],
    policyPriorities: [
      {
        issue: "Economy",
        position: "Advocates for lowering state income taxes to spur corporate investment and job growth.",
        sourceUrl: "https://example.com/john-doe-economy"
      },
      {
        issue: "Education",
        position: "No verified information available.",
        sourceUrl: null
      }
    ],
    campaignWebsite: "https://example.com/john-doe",
    verifiedInformation: true
  }
];