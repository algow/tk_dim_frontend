import axios from 'axios';
import {API} from './constants';
import { getUserData, toQueryString } from './utils';

export const postLogin = (data) => {
  return axios({
    method: 'post',
    url: API.login(),
    data
  }).then(res => {
    return res.data;
  });
}

export const getBarang = () => {
  return axios({
    method: 'get',
    url: API.barang()
  }).then(res => {
    return res.data;
  });
}

export const getSupplier = () => {
  return axios({
    method: 'get',
    url: API.supplier(),
    headers: {
      Authorization: getUserData()['Token']
    }
  }).then(res => {
    return res.data;
  });
}

export const getPembelian = () => {
  return axios({
    method: 'get',
    url: API.pembelian(),
    headers: {
      Authorization: getUserData()['Token']
    }
  }).then(res => {
    return res.data;
  });
}

export const postPembelian = (data) => {
  return axios({
    method: 'post',
    url: API.pembelian(),
    headers: {
      Authorization: getUserData()['Token']
    },
    data
  }).then(res => {
    return res.data;
  });
}


export const updatePembelian = (data) => {
  return axios({
    method: 'post',
    url: API.updatePembelian(),
    headers: {
      Authorization: getUserData()['Token']
    },
    data
  }).then(res => {
    return res.data;
  });
}

export const deletePembelian = (data) => {
  return axios({
    method: 'post',
    url: API.deletePembelian(),
    headers: {
      Authorization: getUserData()['Token']
    },
    data
  }).then(res => {
    return res.data;
  });
}


export const postPenjualan = (data) => {
  return axios({
    method: 'post',
    url: API.penjualan(),
    headers: {
      Authorization: getUserData()['Token']
    },
    data
  }).then(res => {
    return res.data;
  });
}

export const getPenjualan = () => {
  return axios({
    method: 'get',
    url: API.penjualan(),
    headers: {
      Authorization: getUserData()['Token']
    }
  }).then(res => {
    return res.data;
  });
}

export const getPelanggan = (data) => {
  return axios({
    method: 'get',
    url: API.pelanggan(),
    headers: {
      Authorization: getUserData()['Token']
    },
  }).then(res => {
    return res.data;
  });
}

export const getLaba = () => {
  return axios({
    method: 'get',
    url: API.laba(),
    headers: {
      Authorization: getUserData()['Token']
    }
  }).then(res => {
    return res.data;
  });
}
export const getStok = () => {
  return axios({
    method: 'get',
    url: API.stok(),
    headers: {
      Authorization: getUserData()['Token']
    }
  }).then(res => {
    return res.data;
  });
}

export const getRekomendasi = (params) => {
  const url = toQueryString(API.rekomendasi(), params);

  return axios({
    method: 'get',
    url,
    headers: {
      Authorization: getUserData()['Token']
    }
  }).then(res => {
    return res.data;
  });
}