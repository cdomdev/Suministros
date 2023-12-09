
export const isAuthenticated = () =>{
    return localStorage.getItem('userSesionToken') !== null;
}

export const isAdmin = () => {
  const token = JSON.parse(localStorage.getItem('userRole'))
  return token && token.role === 'admin'
}