
const buildLibroDetalleBreadcrumb = (params, pathname, libro, books) => {
  const items = [{ label: "Inicio", to: "/" }];

  const libroActual = libro || books.find(
    (item) => item.id === parseInt(params.id)
  );

  if (libroActual) {
    items.push({
      label: libroActual.categoria,
      to: `/libros?categoria=${encodeURIComponent(libroActual.categoria)}`,
    });
    items.push({
      label: libroActual.nombre,
      to: pathname,
    });
  }

  return items;
};


export const breadcrumbConfig = [
  {
    pattern: /^\/libros\/\d+$/, // Ruta: /libros/:id
    builder: (params, pathname, context) => {
      return buildLibroDetalleBreadcrumb(
        params,
        pathname,
        context?.libro,
        context?.books
      );
    },
  },
  {
    pattern: "/libros",
    builder: () => [
      { label: "Inicio", to: "/" },
      { label: "Catálogo", to: "/libros" },
    ],
  },
  {
    pattern: "/carrito",
    builder: () => [
      { label: "Inicio", to: "/" },
      { label: "Carrito", to: "/carrito" },
    ],
  },
  {
    pattern: "/checkout",
    builder: () => [
      { label: "Inicio", to: "/" },
      { label: "Carrito", to: "/carrito" },
      { label: "Checkout", to: "/checkout" },
    ],
  },
  {
    pattern: "/",
    builder: () => [
      { label: "Inicio", to: "/" },
    ],
  },
];


export const getBreadcrumbForRoute = (pathname, params, context = {}) => {
  for (const config of breadcrumbConfig) {
    let matches = false;

    if (config.pattern instanceof RegExp) {
      matches = config.pattern.test(pathname);
    } else if (typeof config.pattern === "string") {
      matches = pathname === config.pattern;
    }

    if (matches) {
      return config.builder(params, pathname, context);
    }
  }

  return [{ label: "Inicio", to: "/" }];
};

