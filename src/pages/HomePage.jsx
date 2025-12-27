import { Container } from 'react-bootstrap';
import UserListView from '../views/UserListView'; 
import BannerListView from '../views/BannerListView';
import SearchBar from "../components/search/SearchBar";
import ProductGrid from "../components/products/ProductGrid";
import PaginationControl from "../components/common/PaginationControl";
import { booksMock } from "../data/books.mock";
import { useState } from "react";

const ITEMS_PER_PAGE = 8;

const HomePage = () => {
  const [filteredBooks, setFilteredBooks] = useState(booksMock);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (query) => {
    const result = booksMock.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(result);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentBooks = filteredBooks.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <>
      <Container className="py-4">
        <header className="mb-4 text-center">
          <h1>Bienvenido a tu librería Digital</h1>
          <p className="lead">Descubre miles de libros físicos y digitales.</p>
        </header>

        <BannerListView />

        <SearchBar onSearch={handleSearch} />

        <ProductGrid books={currentBooks} />

        <PaginationControl
          totalItems={filteredBooks.length}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        
      </Container>
    </>
  );
};

export default HomePage;