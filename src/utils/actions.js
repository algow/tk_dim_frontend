import axios from 'axios';
import {API} from './constants';

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