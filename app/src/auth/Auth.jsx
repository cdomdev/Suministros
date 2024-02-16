
export const isAuthenticated = () =>{
    const token = localStorage.getItem('userSesionToken');
    const isLoggedIn = !!token
    return isLoggedIn 
}
