import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import './App.css';
import { HomePage, ListaLibros, DetalleLibro, Carrito, Checkout } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Usamos el Layout como padre de todas las rutas */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="porDefinir" element={<h2>Página por definir (Próximamente)</h2>} />
        </Route>
        <Route path="/listalibros" element={<MainLayout />}>
          <Route index element={<ListaLibros />} />
          <Route path="porDefinir" element={<h2>Mostrar acá lista de todos los libros</h2>} />
        </Route>
        <Route path="/detallelibro" element={<MainLayout />}>
          <Route index element={<DetalleLibro />} />
          <Route path="porDefinir" element={<h2>Mostrar acá el detalle de un libro</h2>} />
        </Route>
        <Route path="/carrito" element={<MainLayout />}>
          <Route index element={<Carrito />} />
          <Route path="porDefinir" element={<h2>Mostrar acá los libros añadidos al carrito</h2>} />
        </Route>
        <Route path="/checkout" element={<MainLayout />}>
          <Route index element={<Checkout />} />
          <Route path="porDefinir" element={<h2>Mostrar acá el proceso de compra</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;