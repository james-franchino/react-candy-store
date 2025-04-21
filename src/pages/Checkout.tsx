import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!formData.name || !formData.email || !formData.address) {
      setError("Please fill in all required fields");
      return;
    }

    // Create order locally
    const order = {
      id: Date.now(), // Simple unique ID
      items,
      total: items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      ),
      status: "completed",
      createdAt: new Date().toISOString(),
      customer: formData,
    };

    // In a real app, you would send this to your API
    console.log("Order created:", order);

    // Clear cart and show success
    clearCart();
    setSuccess(true);

    // Redirect to home after 3 seconds
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  if (items.length === 0) {
    return (
      <Container className="text-center py-5">
        <h3>Your cart is empty</h3>
        <Button variant="primary" href="/products">
          Continue Shopping
        </Button>
      </Container>
    );
  }

  if (success) {
    return (
      <Container className="text-center py-5">
        <Alert variant="success">
          <h3>Order Placed Successfully!</h3>
          <p>
            Thank you for your purchase. You will be redirected to the home
            page.
          </p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="mb-4">Checkout</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name *</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email *</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Address *</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>ZIP Code</Form.Label>
          <Form.Control
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Place Order
        </Button>
      </Form>
    </Container>
  );
};

export default Checkout;
