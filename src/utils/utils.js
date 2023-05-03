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

export function getNotifData(i) {
  const notifRef = [
    {
      type: 'success',
      message: 'Berhasil mengambil data'
    },
    {
      type: 'success',
      message: 'Field berhasil diupdate'
    },
    {
      type: 'success',
      message: 'Data berhasil direkam'
    },
    {
      type: 'warning',
      message: 'Something went wrong'
    },
    {
      type: 'warning',
      message: 'Wrong username/password'
    },
    {
      type: 'success',
      message: 'Successful login'
    },
    {
      type: 'warning',
      message: 'Gagal merekam data'
    },
  ];

  return notifRef[i];
}