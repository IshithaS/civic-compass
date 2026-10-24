import { Link, useLocation } from 'react-router-dom';
import { Compass, Calendar, Users, Scale, BookOpen } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { name: 'Dashboard', path: '/', icon: Compass },
    { name: 'Elections', path: '/elections', icon: Calendar },
    { name: 'Candidates', path: '/candidates', icon: Users },
    { name: 'Compare', path: '/compare', icon: Scale },
    { name: 'Learn', path: '/learn', icon: BookOpen },
  ];

  return (
    <nav className="bg-navy text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Compass className="h-8 w-8 text-teal" />
              <span className="font-bold text-xl tracking-tight">CivicCompass</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-teal text-white' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}