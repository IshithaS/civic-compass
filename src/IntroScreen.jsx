import { useState } from 'react';

export default function IntroScreen({ onComplete }) {
  const [slide, setSlide] = useState(0);

  const content = [
    { title: "Welcome to CivicCompass", desc: "Navigating your local ballot with confidence." },
    { title: "Live Logistics Dashboard", desc: "Find your exact polling place, operating hours, and upcoming ballot measures instantly." },
    { title: "Objective Candidate Research", desc: "Safely compare candidate platforms and learn how local government impacts your daily life." },
    { title: "NC-14 Congressional App Challenge", desc: "Created by Ishitha Sabbineni" }
  ];

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: '#0f172a', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px', textAlign: 'center' }}>
      <div style={{ maxWidth: '500px', width: '100%', backgroundColor: '#1e293b', padding: '40px', borderRadius: '12px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '16px', fontWeight: 'bold' }}>{content[slide].title}</h1>
        <p style={{ fontSize: '18px', marginBottom: '40px', color: '#cbd5e1' }}>{content[slide].desc}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {content.map((_, index) => (
              <div key={index} style={{ height: '8px', width: '8px', borderRadius: '50%', backgroundColor: index === slide ? 'white' : '#475569' }} />
            ))}
          </div>
          <button onClick={() => slide === content.length - 1 ? onComplete() : setSlide(slide + 1)} style={{ backgroundColor: 'white', color: '#0f172a', padding: '12px 24px', fontSize: '16px', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            {slide === content.length - 1 ? "Enter App" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}