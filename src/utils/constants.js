export const JWT_LOCAL = 'TOKEN';
export const USER_DATA = 'UDATA';

const parent = 'http://10.100.244.78/tk_dim';

export const API = {
  'login': () => parent + '/login',
  'barang': () => parent + '/barang',
  'supplier': () => parent + '/supplier',
  'pembelian': () => parent + '/pembelian',
  'penjualan': () => parent + '/penjualan',
  'pelanggan': () => parent + '/pelanggan',
  'updatePembelian': () => parent + '/pembelian-update',
  'deletePembelian': () => parent + '/pembelian-delete',
  'laba': () => parent + '/labarugi',
  'stok': () => parent + '/stok',
  'rekomendasi': () => parent + '/rekomendasi'
}