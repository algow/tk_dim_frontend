import axios from 'axios';
import {API} from './constants';
import { getUserData } from './utils';

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