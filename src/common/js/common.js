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
    url: baseUrl + 'admin/login',
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
    url: baseUrl + 'v1/user/count',   //大神是users
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
    url: baseUrl + 'v1/users/list',
    method: 'get',
    params
  });
};

export const getShopList = (params) => {
  return axios({
    url: baseUrl + 'shopping/restaurants',
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
    url: baseUrl + 'shopping/restaurants/count',
    method: 'get',
  });
};

export const getAllCategory = () => {
  return axios({
    url: baseUrl + 'shopping/v2/restaurants/category',      //大神是restaurant
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
    url: baseUrl + 'shopping/updateshop',
    method: 'post',
    data
  });
};

export const deleteRestaurant = (id) => {
  return axios({
    url: baseUrl + 'shopping/restaurant/' + id,
    method: 'delete'
  });
};

export const getFoodList = (params) => {
  return axios({
    url: baseUrl + 'shopping/v2/foods',
    method: 'get',
    params
  });
};

export const getFoodCount = () => {
  return axios({
    url: baseUrl + 'shopping/v2/foods/count',
    method: 'get'
  });
};

export const getRestaurantDetail = (restaurantId) => {
  return axios({
    url: baseUrl + 'shopping/restaurant/' + restaurantId,
    method: 'get'
  });
};

export const getCategoryDetail = (categoryId) => {
  return axios({
    url: baseUrl + 'shopping/v2/menu/' + categoryId,
    method: 'get'
  });
};

export const getAllCategoryFromRestaurant = (restaurantId) => {
  return axios({
    url: baseUrl + 'shopping/getcategory/' + restaurantId,
    method: 'get'
  });
};

export const deleteFood = (foodId) => {
  return axios({
    url: baseUrl + 'shopping/v2/food/' + foodId,
    method: 'delete'
  });
};

export const updateFood = (data) => {
  return axios({
    url: baseUrl + 'shopping/v2/updatefood',
    method: 'post',
    data
  });
};

export const getOrderList = (params) => {
  return axios({
    url: baseUrl + 'bos/orders',
    method: 'get',
    params
  });
};

export const getOrderAddress = (addressId) => {
  return axios({
    url: baseUrl + 'v1/address/' + addressId,          //大神是addresse
    method: 'get'
  });
};

export const getUserInfo = (userId) => {
  return axios({
    url: baseUrl + 'v1/user/' + userId,
    method: 'get'
  });
};

export const getAdminList = (params) => {
  return axios({
    url: baseUrl + 'admin/all',
    method: 'get',
    params
  });
};

export const addRestaurant = (data) => {
  return axios({
    url: baseUrl + 'shopping/addshop',
    method: 'post',
    data
  });
};

export const addCategory = (data) => {
  return axios({
    url: baseUrl + 'shopping/addcategory',
    method: 'post',
    data
  });
};

export const addFood = (data) => {
  return axios({
    url: baseUrl + 'shopping/addfood',
    method: 'post',
    data
  });
};

export const getUserCityCount = () => {
  return axios({
    url: baseUrl + 'v1/user/city/count',
    method: 'get'
  });
};
