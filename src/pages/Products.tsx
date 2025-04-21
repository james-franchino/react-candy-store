import { useState } from "react";
import { Container, Card, Button, Form } from "react-bootstrap";
import { Product } from "../types";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";

// Import local images
import chocolateBar from "../assets/images/chocolate-bar.jpg";
import gummyBears from "../assets/images/gummy-bears.jpg";
import cola from "../assets/images/cola.jpg";
import lemonade from "../assets/images/lemonade.jpg";
import jellyBeans from "../assets/images/jelly-beans.jpg";

// Map of product IDs to their local images
const productImages: Record<number, string> = {
  1: chocolateBar,
  2: gummyBears,
  3: cola,
  4: lemonade,
  5: jellyBeans,
};

const Products = () => {
  const [filter, setFilter] = useState<"all" | "candy" | "drink">("all");
  const [addedProductId, setAddedProductId] = useState<number | null>(null);
  const { addToCart } = useCart();
  const { products, loading } = useProducts();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setAddedProductId(product.id);

    // Reset the animation after 1 second
    setTimeout(() => {
      setAddedProductId(null);
    }, 1000);
  };

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((product) => product.category === filter);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <h2>Loading products...</h2>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">Our Products</h1>

      <Form.Group className="mb-4 text-center">
        <Form.Select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value as "all" | "candy" | "drink")
          }
          aria-label="Filter products by category"
          title="Filter products by category"
          style={{ maxWidth: "200px", margin: "0 auto" }}
        >
          <option value="all">All Products</option>
          <option value="candy">Candies</option>
          <option value="drink">Drinks</option>
        </Form.Select>
      </Form.Group>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-5">
          <p>No products available in this category.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className={`product-card ${addedProductId === product.id ? "added-to-cart" : ""}`}
            >
              <Card.Img
                variant="top"
                src={productImages[product.id] || product.image}
                alt={product.name}
                className="card-img-top"
              />
              <Card.Body>
                <Card.Title className="text-center">{product.name}</Card.Title>
                <Card.Text>
                  {product.description}
                  <div className="mt-2">
                    <strong>Price: ${product.price.toFixed(2)}</strong>
                    <br />
                    <small className="text-muted">
                      Stock: {product.stock} units
                    </small>
                  </div>
                </Card.Text>
                <Button
                  variant={
                    addedProductId === product.id ? "success" : "primary"
                  }
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                  className="w-100"
                >
                  {product.stock === 0
                    ? "Out of Stock"
                    : addedProductId === product.id
                      ? "Added! ✓"
                      : "Add to Cart"}
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Products;
