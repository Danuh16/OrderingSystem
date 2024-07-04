// services/apiService.js
import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL;

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

export const fetchWaiterOrders = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/orders/waiter`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createOrder = async (orderData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${API_URL}/orders`, orderData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
