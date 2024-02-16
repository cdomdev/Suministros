export const SaveStorage = (clave, elemento) => {
  // Conseguir los elementos que estan en el localStorage
  let elementos = JSON.parse(localStorage.getItem(clave));

  // Comprobar si es un array

  if (Array.isArray(elementos)) {
    // si es array se añade un elemento  nuevo
    elementos.push(elemento);
  } else {
    // Si no es un array crear un array con el nuevo elemnto
    elementos = [elemento];
  }

  // Guardar en el locallStorage
  localStorage.setItem(clave, JSON.stringify(elementos));

  // Devolver objeto
  return elemento;
};
