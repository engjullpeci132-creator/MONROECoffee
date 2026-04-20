import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Welcome from "./components/Welcome";
import BentoGrid from "./components/BentoGrid";
import Menu from "./components/Menu";
import Philosophy from "./components/Philosophy";
import Press from "./components/Press";
import Journal from "./components/Journal";
import Physicality from "./components/Physicality";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";
import UserProfile from "./components/UserProfile";
import SystemNotice from "./components/SystemNotice";
import { AuthProvider } from "./context/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";

function HomePage() {
  return (
    <main>
      <Hero />
      <Welcome />
      <Philosophy />
      <BentoGrid />
      <Menu />
      <Journal />
      <Press />
      <Physicality />
      <CTA />
    </main>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <div className="grain-overlay" />
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/profile" element={<UserProfile />} />
            </Routes>
            <Footer />
            <SystemNotice />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}
