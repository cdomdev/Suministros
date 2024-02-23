
export const isAuthenticated = () =>{
    const token = localStorage.getItem('userOnValidateScesOnline');
    const isLoggedIn = !!token
    return isLoggedIn 
}
