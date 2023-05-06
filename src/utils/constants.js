export const JWT_LOCAL = 'TOKEN';
export const USER_DATA = 'UDATA';

const parent = 'http://localhost/tk_dim';

export const API = {
  'login': () => parent + '/login',
  'barang': () => parent + '/barang',
  'supplier': () => parent + '/supplier',
  'pembelian': () => parent + '/pembelian',
  'penjualan': () => parent + '/penjualan',
  'pelanggan': () => parent + '/pelanggan',
  'updatePembelian': () => parent + '/pembelian-update',
  'deletePembelian': () => parent + '/pembelian-delete',
  'laba': () => parent + '/labarugi'
}