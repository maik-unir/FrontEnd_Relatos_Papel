import { Container, Button } from "react-bootstrap";
import { useContext, useState } from "react";
import { books } from "../data/database";
import SearchBar from "../components/search/SearchBar";
import PaginationControl from "../components/common/PaginationControl";
import { CartContext } from "../context/CartContext";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import { Link } from "react-router-dom";

const ListaLibros = () => {
  const { dispatch } = useContext(CartContext);
  const [quantities, setQuantities] = useState({});

  //  Handler para cambiar la cantidad seleccionada
  const handleQtyChange = (bookId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [bookId]: Number(value),
    }));
  };

  // Handler para agregar al carrito
  const handleAddToCart = (book) => {
    const cantidad = quantities[book.id] || 1;

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: book.id,
        nombre: book.nombre,
        cantidad,
      },
    });
  };

  const categorias = [...new Set(books.map((b) => b.categoria))];

  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const toggleCategoria = (categoria) => {
    setCategoriasSeleccionadas((prev) =>
      prev.includes(categoria)
        ? prev.filter((c) => c !== categoria)
        : [...prev, categoria]
    );
    setCurrentPage(1);
  };

  const librosFiltrados =
    categoriasSeleccionadas.length === 0
      ? books
      : books.filter((b) => categoriasSeleccionadas.includes(b.categoria));

  const librosBuscados = librosFiltrados.filter((book) =>
    book.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const librosPaginados = librosBuscados.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      <Container fluid>
        <Breadcrumb />
        <SearchBar onSearch={setSearchText} />

        <div style={{ display: "flex", gap: "24px" }}>
          <aside style={{ width: "260px", borderRight: "1px solid #ddd" }}>
            <h5>Filtros</h5>
            <strong>Categorías</strong>
            {categorias.map((cat) => (
              <div key={cat}>
                <label>
                  <input
                    type="checkbox"
                    checked={categoriasSeleccionadas.includes(cat)}
                    onChange={() => toggleCategoria(cat)}
                  />{" "}
                  {cat}
                </label>
              </div>
            ))}
          </aside>

          <section style={{ flex: 1 }}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {librosPaginados.map((book) => (
                <div
                  key={book.id}
                  style={{
                    display: "flex",
                    gap: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "16px",
                    alignItems: "stretch",
                  }}
                >
                  <img
                    src={book.fotos}
                    alt={book.nombre}
                    style={{
                      width: "140px",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      backgroundColor: "#f0f0f0",
                    }}
                    loading="lazy"
                    onError={(e) => {
                      const placeholderUrl = `https://placehold.co/140x200/cccccc/666666?text=${encodeURIComponent(book.nombre)}`;
                      if (e.target.src !== placeholderUrl) {
                        e.target.src = placeholderUrl;
                      }
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <h5>{book.nombre}</h5>
                    <p style={{ fontSize: "14px" }}>{book.descripcion}</p>
                    <small>Categoría: {book.categoria}</small>
                  </div>

                  <div
                    style={{
                      minWidth: "160px",
                      textAlign: "right",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <strong style={{ fontSize: "18px" }}>${book.precio}</strong>

                    <div style={{ margin: "8px 0" }}>
                      <label>
                        Qty:
                        <input
                          type="number"
                          min="1"
                          max={book.cantidad}
                          value={quantities[book.id] || 1}
                          onChange={(e) =>
                            handleQtyChange(book.id, e.target.value)
                          }
                          style={{ width: "60px", marginLeft: "6px" }}
                        />
                      </label>
                    </div>
                    
                    <div className="d-flex gap-2 mt-3">
                      <button
                        disabled={book.estado !== "Disponible"}
                        onClick={() => handleAddToCart(book)}
                        style={{                          
                          background:
                            book.estado === "Disponible" ? "#ffc107" : "#ccc",
                          border: "none",
                          padding: "8px",
                          borderRadius: "4px",
                          cursor:
                            book.estado === "Disponible"
                              ? "pointer"
                              : "not-allowed",
                        }}
                      >
                        Agregar al carrito
                      </button>

                      
                      <Link to={`/libros/${book.id}`} className="btn btn-secondary">
                        Ver detalle
                      </Link>
                    </div>

                    <div className="d-flex justify-content-end mb-3"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "32px",
          }}
        >
          <PaginationControl
            totalItems={librosBuscados.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </Container>
    </>
  );
};

export default ListaLibros;
