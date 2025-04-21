import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getProducts } from "../services/api";
import { Product } from "../types";
import { Toast, ToastContainer } from "react-bootstrap";

interface ProductContextType {
  products: Product[];
  loading: boolean;
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: number) => void;
  showToast: boolean;
  toastMessage: string;
  toastVariant: string;
  hideToast: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  // Fetch products on initial load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setToastMessage("Failed to load products");
        setToastVariant("danger");
        setShowToast(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...product,
      id: Math.max(0, ...products.map((p) => p.id)) + 1,
    };

    setProducts([...products, newProduct]);
    setToastMessage(`${newProduct.name} added successfully`);
    setToastVariant("success");
    setShowToast(true);
  };

  const updateProduct = (product: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === product.id ? product : p)),
    );

    setToastMessage(`${product.name} updated successfully`);
    setToastVariant("success");
    setShowToast(true);
  };

  const deleteProduct = (productId: number) => {
    const productName = products.find((p) => p.id === productId)?.name;

    setProducts((prevProducts) =>
      prevProducts.filter((p) => p.id !== productId),
    );

    setToastMessage(`${productName || "Product"} deleted successfully`);
    setToastVariant("success");
    setShowToast(true);
  };

  const hideToast = () => {
    setShowToast(false);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
        showToast,
        toastMessage,
        toastVariant,
        hideToast,
      }}
    >
      {children}

      <ToastContainer
        position="top-end"
        className="p-3"
        style={{ zIndex: 1000 }}
      >
        <Toast
          onClose={hideToast}
          show={showToast}
          delay={3000}
          autohide
          bg={toastVariant}
        >
          <Toast.Header>
            <strong className="me-auto">Product Management</strong>
          </Toast.Header>
          <Toast.Body className={toastVariant === "danger" ? "text-white" : ""}>
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
