import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Usamos el Layout como padre de todas las rutas */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="porDefinir" element={<h2>Página por definir (Próximamente)</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;