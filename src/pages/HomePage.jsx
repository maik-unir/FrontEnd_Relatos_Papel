import { Container } from 'react-bootstrap';
import UserListView from '../views/UserListView'; 

const HomePage = () => {
  return (
    <Container>
      <header className="mb-5 text-center">
        <h1>Bienvenido a tu libreria Digital</h1>
        <p className="lead">Descubre miles de libros fisicos y digitales.</p>
      </header>
      <UserListView />
    </Container>
  );
};

export default HomePage;