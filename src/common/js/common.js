'use strict';

const baseUrl = 'http://authhwang.org:8001/';
const dataUrl = 'http://cangdu.org:8001/';
import axios from 'axios';
axios.defaults.withCredentials = true;

export const getAdminInfo = () => {
  return axios({
    url: baseUrl + 'admin/info',
    method: 'get',
  });
};

export const login = data => {
  return axios.post(
    baseUrl + 'admin/login',
    data
  );
};

export const signout = () => {
  return axios({
    url: baseUrl + 'admin/signout',   //大神是sing
    method: 'get'
  });
};

export const getTodayRegisterUserCount = (today) => {
  return axios({
    url: baseUrl + 'statis/user/' + today + '/count',
    method: 'get'
  });
};

export const getTodayOrderCount = (today) => {
  return axios({
    url: baseUrl + 'statis/order/' + today + '/count',
    method: 'get'
  });
};

export const getTodayRegisterAdminCount = (today) => {
  return axios({
    url: baseUrl + 'statis/admin/' + today + '/count',
    method: 'get'
  });
};

export const getTodayApiCount = (today) => {
  return axios({
    url: baseUrl + 'statis/api/' + today + '/count',
    method: 'get'
  });
};

export const getAllRegisterUserCount = () => {
  return axios({
    url: dataUrl + 'v1/users/count',   //大神是users
    method: 'get'
  });
};

export const getAllOrderCount = () => {
  return axios({
    url: baseUrl + 'bos/orders/count',
    method: 'get'
  });
};

export const getAllRegisterAdminCount = () => {
  return axios({
    url: baseUrl + 'admin/count',
    method: 'get'
  });
};

export const getAllApiCount = () => {
  return axios({
    url: baseUrl + 'statis/api/count',
    method: 'get'
  });
};

export const getUserList = (params) => {
  return axios({
    url: dataUrl + 'v1/users/list',
    method: 'get',
    params
  });
};
