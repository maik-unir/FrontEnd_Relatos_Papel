import { Container } from "react-bootstrap";
import { useState } from "react";
import { booksMock } from "../data/books.mock";
import SearchBar from "../components/search/SearchBar";
import PaginationControl from "../components/common/PaginationControl";

const ListaLibros = () => {
  const categorias = [...new Set(booksMock.map(b => b.categoria))];

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
      ? booksMock
      : booksMock.filter((b) =>
          categoriasSeleccionadas.includes(b.categoria)
        );

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
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "4px",
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
                    <strong style={{ fontSize: "18px" }}>
                      ${book.precio}
                    </strong>

                    <div style={{ margin: "8px 0" }}>
                      <label>
                        Qty:
                        <input
                          type="number"
                          min="1"
                          max={book.cantidad}
                          defaultValue="1"
                          style={{ width: "60px", marginLeft: "6px" }}
                        />
                      </label>
                    </div>

                    <button
                      disabled={book.estado !== "Disponible"}
                      style={{
                        width: "100%",
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

