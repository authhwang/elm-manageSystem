'use strict';

const baseUrl = 'http://authhwang.org:8001/';
import axios from 'axios';

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
    url: baseUrl + 'admin/singout',
    method: 'get'
  });
};
