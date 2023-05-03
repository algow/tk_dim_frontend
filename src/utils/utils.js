import { JWT_LOCAL, USER_DATA } from "./constants";

export const setToken = (str) => {
  localStorage.setItem(JWT_LOCAL, JSON.stringify(str));
};

export const setUserData = (str) => {
  localStorage.setItem(USER_DATA, JSON.stringify(str));
};

export const getUserData = () => {
  const userData = localStorage.getItem(USER_DATA);

  return (!userData)
    ? {}
    : JSON.parse(userData);
};

export const isAuthenticated = () => {
  const userData = getUserData();

  if(Object.keys(userData).length) {
    return true;
  }

  return false;
}

export const logout = (navigate) => {
  localStorage.clear();
  window.location.reload();
  navigate('/');
};