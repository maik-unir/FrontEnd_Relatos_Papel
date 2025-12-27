import { Form, Button, InputGroup } from "react-bootstrap";

const SearchBar = ({ onSearch = () => {} }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <InputGroup className="mb-4">
      <Form.Control
        placeholder="Buscar libros..."
        onChange={handleChange}
      />
      <Button variant="secondary">Buscar</Button>
    </InputGroup>
  );
};

export default SearchBar;
