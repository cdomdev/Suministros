// Importar axios
import axios from 'axios';

// Crear una instancia de axios con la URL base del servidor de Node
const api = axios.create({
  baseURL: 'http://localhost:3001'
});

// Exportar la función que hace la petición de registro
export const registerUser = (user) => {
  // Hacer una petición POST al endpoint /register y enviar el objeto user
  return api.post('/register', user);
};
