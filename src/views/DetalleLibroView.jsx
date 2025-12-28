import { useParams } from "react-router-dom";
import { booksMock } from "../data/books.mock";
import DetalleLibro from "../components/DetalleLibro";

const DetalleLibroView = () => {
  const { id } = useParams();

  const libro = booksMock.find(
    (item) => item.id === parseInt(id)
  );

  if (!libro) return <p>Libro no encontrado</p>;

  return (
    <div className="container mt-4">
      <DetalleLibro libro={libro} />
    </div>
  );
};

export default DetalleLibroView;