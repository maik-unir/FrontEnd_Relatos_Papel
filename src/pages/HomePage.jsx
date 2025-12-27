import { Container } from 'react-bootstrap';
import UserListView from '../views/UserListView'; 
import BannerListView from '../views/BannerListView';

const HomePage = () => {
  return (
    <>
      <div style={{ flex: '1 0 auto' }}>
        <Container className="py-4">
          <header className="mb-5 text-center">
            <h1>Bienvenido a tu librería Digital</h1>
            <p className="lead">Descubre miles de libros físicos y digitales.</p>
          </header>
          <BannerListView />
          <UserListView />
        </Container>
      </div>
    </>
  );
};

export default HomePage;