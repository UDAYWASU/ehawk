export const isLoggedIn = () => {
  return !!localStorage.getItem("access_token");
};


export const getRole = () => {
  return localStorage.getItem("role");
};


export const logout = () => {
  localStorage.clear();
};