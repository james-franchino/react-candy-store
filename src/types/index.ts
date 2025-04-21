export interface Product {
  id: number;
  name: string;
  price: number;
  category: "candy" | "drink";
  image: string;
  description?: string;
  stock: number;
}

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
}

export interface Order {
  id: number;
  items: CartItem[];
  total: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: string;
}
