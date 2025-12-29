import { Navbar, Container, Nav } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import '../App.css';
import Header from '../components/Header';
import ErrorBoundary from "../components/ErrorBoundary";
import InactivityDetector from '../components/common/InactivityDetector';

const MainLayout = () => {
  return (
    <>
      <InactivityDetector />
      <Header />

      <main style={{ flex: 1 }}>
        <Container className="py-4">
          <Outlet />
        </Container>
      </main>

      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </>
  );
};

export default MainLayout;
