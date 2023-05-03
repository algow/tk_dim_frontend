export const JWT_LOCAL = 'TOKEN';
export const USER_DATA = 'UDATA';

const parent = 'http://localhost/tk_dim';

export const API = {
  'login': () => parent + '/login',
  'barang': () => parent + '/barang'
}