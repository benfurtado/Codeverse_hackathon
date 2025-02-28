import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExplorePlantsPage from './pages/ExplorePlantsPage';
import PlantDetailsPage from './pages/PlantDetailsPage';
import GuidedToursPage from './pages/GuidedToursPage';
import UserDashboard from './pages/UserDashboard';
import NotFoundPage from './pages/NotFoundPage';
import ContactPage from './pages/ContactPage'; // Import the ContactPage

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HomePage />} />

        {/* Explore Plants Page */}
        <Route path="/explore" element={<ExplorePlantsPage />} />

        {/* Plant Details Page */}
        <Route path="/plant/:id" element={<PlantDetailsPage />} />

        {/* Guided Tours Page */}
        <Route path="/tours" element={<GuidedToursPage />} />

        {/* Contact Page */}
        <Route path="/contact" element={<ContactPage />} /> {/* Add this line */}

        {/* User Dashboard */}
        <Route path="/dashboard" element={<UserDashboard />} />

        {/* Catch-all Route for 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;