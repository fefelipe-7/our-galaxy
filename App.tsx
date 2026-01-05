import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './src/contexts/AuthContext';
import Welcome from './pages/Welcome';
import Auth from './src/pages/Auth';
import Letters from './pages/Home';
import LetterRead from './pages/LetterRead';
import LetterWrite from './pages/LetterWrite';
import Absences from './pages/Absences';
import Moments from './pages/Moments';
import MapDetails from './pages/MapDetails';
import BottomNav from './components/BottomNav';

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const location = useLocation();
  
  // Navigation appears on main list pages
  const showNav = ['/home', '/absences', '/moments'].includes(location.pathname);

  return (
    <div className="min-h-screen w-full max-w-md mx-auto bg-cozy-cream shadow-2xl overflow-hidden relative font-sans flex flex-col">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {children}
      </div>
      {showNav && <BottomNav />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/home" element={<Letters />} />
            <Route path="/letter/read/:id" element={<LetterRead />} />
            <Route path="/letter/write" element={<LetterWrite />} />
            <Route path="/absences" element={<Absences />} />
            <Route path="/moments" element={<Moments />} />
            <Route path="/map" element={<MapDetails />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;