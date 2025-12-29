# FrontEnd Relatos de Papel

Frontend desarrollado en React para el proyecto transversal **Relatos de Papel** - MISSI UNIR 2025-2026.

Una aplicación de e-commerce para una librería digital que permite a los usuarios explorar, buscar, filtrar y comprar libros físicos y digitales.

## 🚀 Tecnologías

- **React 19.2.3** - Biblioteca de JavaScript para construir interfaces de usuario
- **React Router DOM 7.11.0** - Enrutamiento para aplicaciones React
- **React Bootstrap 2.10.10** - Componentes de Bootstrap para React
- **Bootstrap 5.3.8** - Framework CSS
- **React Bootstrap Icons** - Iconos para React Bootstrap

## 📦 Instalación

1. Clonar el repositorio:

```bash
git clone <url-del-repositorio>
cd FrontEnd_Relatos_Papel
```

2. Instalar dependencias:

```bash
npm install
```

3. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

4. Abrir en el navegador:

```
http://localhost:5173
```

## 🛠️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo con Vite
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción

## ✨ Características Principales

### 🛒 Carrito de Compras

- Agregar productos al carrito
- Modificar cantidades
- Eliminar productos
- Persistencia en localStorage
- Cálculo automático de totales

### 📚 Catálogo de Libros

- Listado de libros con paginación
- Búsqueda por nombre
- Filtrado por categorías
- Vista de detalle de cada libro
- Imágenes de portadas

### 💳 Proceso de Checkout

- Formulario de dirección de envío
- Selección de método de envío
- Validación de tarjeta de crédito:
  - Identificación automática de franquicia (VISA, Mastercard, AMEX, etc.)
  - Validación con algoritmo de Luhn
  - Validación de fecha de expiración
  - Validación de CVV
- Confirmación de orden con resumen completo

### 🧭 Navegación

- Breadcrumbs dinámicos basados en rutas
- Navegación intuitiva entre secciones
- Layout responsive

## 📁 Estructura del Proyecto

```
src/
├── assets/           # Recursos estáticos (imágenes, scripts)
├── components/       # Componentes reutilizables
│   ├── breadcrumb/  # Componente de breadcrumbs
│   ├── cart/        # Componentes del carrito
│   ├── checkout/    # Componentes de checkout
│   ├── common/      # Componentes comunes
│   ├── products/    # Componentes de productos
│   └── search/      # Componentes de búsqueda
├── config/          # Archivos de configuración
├── context/         # Contextos de React (CartContext)
├── data/            # Datos mock y base de datos
├── hooks/           # Hooks personalizados
├── layouts/         # Layouts de la aplicación
├── pages/           # Páginas principales
└── views/           # Vistas (contenedores de componentes)
```

## 🗂️ Componentes Principales

### Componentes de Checkout

- **CheckoutForm**: Formulario completo de checkout con validaciones
- **ConfirmOrder**: Página de confirmación de orden
- **OrderSummary**: Resumen de la orden

### Componentes de Productos

- **ProductCard**: Tarjeta individual de producto
- **ProductGrid**: Grid de productos
- **DetalleLibro**: Vista detallada de un libro

### Componentes de Navegación

- **Breadcrumb**: Navegación breadcrumb dinámica
- **Header**: Encabezado con navegación y carrito
- **Footer**: Pie de página

### Componentes de Carrito

- **IconCarrito**: Icono del carrito con contador
- **CartTotals**: Totales del carrito

## 🛣️ Rutas de la Aplicación

- `/` - Página de inicio con catálogo destacado
- `/libros` - Listado completo de libros con filtros
- `/libros/:id` - Detalle de un libro específico
- `/carrito` - Carrito de compras
- `/checkout` - Proceso de checkout
- `/confirmacion` - Confirmación de orden

## 🔄 Contextos

- **CartContext**: Contexto global para el manejo del carrito de compras
  - Estado del carrito
  - Funciones para agregar, eliminar, modificar productos
  - Cálculo de totales
  - Persistencia en localStorage

## ⚙️ Configuraciones

### Breadcrumb Config (`config/breadcrumbConfig.js`)

Configuración centralizada para la navegación breadcrumb. Define las rutas y cómo construir los breadcrumbs automáticamente.

## 📊 Validaciones Implementadas

### Validación de Tarjeta de Crédito

- **Algoritmo de Luhn**: Validación matemática del número de tarjeta
- **Identificación de Franquicia**: Detección automática (VISA, Mastercard, AMEX, Discover, Diners)
- **Formato Automático**: Formateo del número con espacios
- **Validación de Fecha**: Verificación de fecha de expiración
- **Validación de CVV**: Verificación según tipo de tarjeta

## 🎨 Estilos

- Bootstrap 5 para diseño responsive
- CSS personalizado en `App.css` e `index.css`
- Componentes de React Bootstrap para UI consistente

## 📝 Datos

Los datos de libros se encuentran en:

- `src/data/database.js` - Base de datos principal
- `src/data/books.mock.js` - Datos mock adicionales

## 👥 Autores

Proyecto desarrollado para UNIR - MISSI 2025-2026

## 📄 Licencia

Ver archivo [LICENSE](LICENSE) para más detalles.
