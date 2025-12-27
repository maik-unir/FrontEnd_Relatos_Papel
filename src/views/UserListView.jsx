import { Row, Col } from 'react-bootstrap';
import { users } from '../data/database';
import UserCard from '../components/UserCard';

const UserListView = () => {
  return (
    <div className="py-3">
      <h2 className="text-center mb-5">Lista de Colaboradores</h2>
      <Row className="g-4">
        {users.map((user) => (
          <Col key={user.id} xs={12} md={6} lg={4}>
            <UserCard user={user} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default UserListView;