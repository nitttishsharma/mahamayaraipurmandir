import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Committee from './pages/Committee';
import Donation from './pages/Donation';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Events from './pages/Events';
import OnlineSevas from './pages/OnlineSevas';
import SeniorCitizenDarshan from './pages/SeniorCitizenDarshan';
import SpecialEntryDarshan from './pages/SpecialEntryDarshan';

// ScrollToTop component to reset scroll position on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

import Login from './pages/admin/Login';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';

import EventsManager from './pages/admin/EventsManager';
import GalleryManager from './pages/admin/GalleryManager';
import CommitteeManager from './pages/admin/CommitteeManager';
import DonationsManager from './pages/admin/DonationsManager';
import DonationLeadsManager from './pages/admin/DonationLeadsManager';
import SettingsManager from './pages/admin/SettingsManager';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes with Navbar and Footer */}
        <Route element={
          <div className="min-h-screen bg-cream selection:bg-primary selection:text-white flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Outlet />
            </main>
            <Footer />
          </div>
        }>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/committee" element={<Committee />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/online-sevas" element={<OnlineSevas />} />
          <Route path="/senior-citizen-darshan" element={<SeniorCitizenDarshan />} />
          <Route path="/special-entry-darshan" element={<SpecialEntryDarshan />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="events" element={<EventsManager />} />
          <Route path="gallery" element={<GalleryManager />} />
          <Route path="committee" element={<CommitteeManager />} />
          <Route path="donations" element={<DonationsManager />} />
          <Route path="donation-leads" element={<DonationLeadsManager />} />
          <Route path="settings" element={<SettingsManager />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
