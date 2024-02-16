// utils.js
export const getTituloFromPath = (path) => {
  switch (path) {
    case "/suministros/home":
      return "Suministros";
    case "/suministros/lavaplatos":
      return "Lavaplatos";
    case "/suministros/lavaderos":
      return "Lavaderos";
    case "/suministros/pinturas":
      return "Pinturas";
    case "/suministros/pegantes":
      return "Pegantes";
    case "/suministros/limpiadores":
      return "Limpiadores";
    case "/suministros/pisos":
      return "Pisos ceramicos";
    case "/suministros/paredes":
      return "Paredes";
    case "/suministros/ofertas":
      return "Ofertas";
    case "/suministros/nosotros":
      return "Nosotros";
    case "/suministros/sanitarios":
      return "Sanitarios";
    case "/suministros/griferias":
      return "Griferias";
    case "/suministros/espejos":
      return "Espejos";
    default:
      return "Suministros";
  }
};
