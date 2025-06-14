import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Deposit from './pages/Deposit';
import PrizeDraws from './pages/PrizeDraws';
import Challenges from './pages/Challenges';
import Education from './pages/Education';
import Referral from './pages/Referral';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="deposit" element={<Deposit />} />
          <Route path="draws" element={<PrizeDraws />} />
          <Route path="challenges" element={<Challenges />} />
          <Route path="education" element={<Education />} />
          <Route path="referral" element={<Referral />} />
          <Route path="profile" element={<Profile />} />
          <Route 
            path="admin" 
            element={
              <ProtectedRoute requireAdmin>
                <Admin />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;