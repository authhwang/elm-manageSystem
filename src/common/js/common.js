'use strict';

const baseUrl = 'http://authhwang.org:8001/';
const dataUrl = 'http://cangdu.org:8001/';
//const dataUrl = 'http://localhost:8001/';

import axios from 'axios';
axios.defaults.withCredentials = true;

export const getAdminInfo = () => {
  return axios({
    url: baseUrl + 'admin/info',
    method: 'get',
  });
};

export const login = data => {
  return axios({
    url: dataUrl + 'admin/login',
    method: 'post',
    data
  });
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

export const getShopList = (params) => {
  return axios({
    url: dataUrl + 'shopping/restaurants',
    method: 'get',
    params
  });
};

export const guessPlace = () => {
  return axios({
    url: baseUrl + 'v1/cities',
    method: 'get',
    params: {
      type: 'guess'
    }
  });
};

export const getRestaurantCount = () => {
  return axios({
    url: dataUrl + 'shopping/restaurants/count',
    method: 'get',
  });
};

export const getAllCategory = () => {
  return axios({
    url: dataUrl + 'shopping/v2/restaurant/category',
    method: 'get'
  });
};

export const searchPlace = (params) => {
  return axios({
    url: baseUrl + 'v1/pois',
    method: 'get',
    params: {
      city_id: params.city_id,
      keyword: params.keyword,
      type: 'search'
    }
  });
};

export const updateRestaurant = (data) => {
  return axios({
    url: dataUrl + 'shopping/updateshop',
    method: 'post',
    data
  });
};

export const deleteRestaurant = (id) => {
  return axios({
    url: dataUrl + 'shopping/restaurant/' + id,
    method: 'delete'
  });
};

export const getFoodList = (params) => {
  return axios({
    url: dataUrl + 'shopping/v2/foods',
    method: 'get',
    params
  });
};

export const getFoodCount = () => {
  return axios({
    url: dataUrl + 'shopping/v2/foods/count',
    method: 'get'
  });
};

export const getRestaurantDetail = (restaurantId) => {
  return axios({
    url: dataUrl + 'shopping/restaurant/' + restaurantId,
    method: 'get'
  });
};

export const getCategoryDetail = (categoryId) => {
  return axios({
    url: dataUrl + 'shopping/v2/menu/' + categoryId,
    method: 'get'
  });
};

export const getAllCategoryFromRestaurant = (restaurantId) => {
  return axios({
    url: dataUrl + 'shopping/getcategory/' + restaurantId,
    method: 'get'
  });
};

export const deleteFood = (foodId) => {
  return axios({
    url: dataUrl + 'shopping/v2/food/' + foodId,
    method: 'delete'
  });
};

export const updateFood = (data) => {
  return axios({
    url: dataUrl + 'shopping/v2/updatefood',
    method: 'post',
    data
  });
};

