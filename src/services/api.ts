import axios from "axios";
import { Product, CartItem, Order } from "../types";

const API_BASE_URL = "https://67f6b73542d6c71cca630cf4.mockapi.io";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Products API
export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get("/Products");
  return response.data;
};

export const getProduct = async (id: number): Promise<Product> => {
  const response = await api.get(`/Products/${id}`);
  return response.data;
};

export const createProduct = async (
  product: Omit<Product, "id">,
): Promise<Product> => {
  const response = await api.post("/Products", product);
  return response.data;
};

export const updateProduct = async (
  id: number,
  product: Partial<Product>,
): Promise<Product> => {
  const response = await api.put(`/Products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/Products/${id}`);
};

// Cart API
export const getCart = async (): Promise<CartItem[]> => {
  const response = await api.get("/Cart");
  return response.data;
};

export const addToCart = async (
  productId: number,
  quantity: number,
): Promise<CartItem> => {
  const response = await api.post("/Cart", { productId, quantity });
  return response.data;
};

export const updateCartItem = async (
  id: number,
  quantity: number,
): Promise<CartItem> => {
  const response = await api.put(`/Cart/${id}`, { quantity });
  return response.data;
};

export const removeFromCart = async (id: number): Promise<void> => {
  await api.delete(`/Cart/${id}`);
};

// Orders API
export const createOrder = async (items: CartItem[]): Promise<Order> => {
  const response = await api.post("/Orders", { items });
  return response.data;
};

export const getOrders = async (): Promise<Order[]> => {
  const response = await api.get("/Orders");
  return response.data;
};

export const getOrder = async (id: number): Promise<Order> => {
  const response = await api.get(`/Orders/${id}`);
  return response.data;
};
