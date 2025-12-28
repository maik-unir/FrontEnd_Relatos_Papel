import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import {
  HomePage,
  ListaLibros,
  DetalleLibro,
  Carrito,
  Checkout
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout único */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="libros" element={<ListaLibros />} />
          <Route path="libros/:id" element={<DetalleLibro />} />
          <Route path="carrito" element={<Carrito />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
