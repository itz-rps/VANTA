import React, { useState, useEffect } from 'react';
import Landing from './pages/Landing';
import Mode2Input from './pages/Mode2Input';
import Mode2Results from './pages/Mode2Results';
import Mode3Input from './pages/Mode3Input';
import Mode3Results from './pages/Mode3Results';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  // Simple routing for MVP
  const renderRoute = () => {
    switch (currentPath) {
      case '/':
        return <Landing onNavigate={navigate} />;
      case '/mode2':
        return <Mode2Input onNavigate={navigate} />;
      case '/mode2/results':
        return <Mode2Results onNavigate={navigate} />;
      case '/mode3':
        return <Mode3Input onNavigate={navigate} />;
      case '/mode3/results':
        return <Mode3Results onNavigate={navigate} />;
      default:
        return <Landing onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen selection:bg-vanta-blue selection:text-white">
      {renderRoute()}
    </div>
  );
}
