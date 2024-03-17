// funiciones ara obtenr marcas - categorias unicasa de cada producto

// Funcion para obtenrlas marcas unicas de un array de productos
export const obtenerMarcasUnicas = (productos) => {
  const marcasUnicas = [
    ...new Set(productos.map((producto) => producto.title)),
  ];
  return marcasUnicas;
};

// Funcion para obtener subcategorias
export const obtenerSubCategorias = (productos) => {
  const subcategorias = [
    ...new Set(productos.map((producto) => producto.Categorium.nombre)),
  ];
  return subcategorias;
};

