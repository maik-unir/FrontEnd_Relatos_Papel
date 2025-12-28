import { useParams } from "react-router-dom";
import { books } from "../data/database";
import DetalleLibro from "../components/DetalleLibro";

const DetalleLibroView = () => {
  const { id } = useParams();

  const libro = books.find(
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