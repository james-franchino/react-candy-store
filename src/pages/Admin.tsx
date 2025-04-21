import { useState } from "react";
import {
  Container,
  Table,
  Button,
  Form,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
import { Product } from "../types";
import { useProducts } from "../context/ProductContext";

const Admin = () => {
  const { products, loading, addProduct, updateProduct, deleteProduct } =
    useProducts();
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "candy" as "candy" | "drink",
    price: 0,
    stock: 0,
    image: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products by search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ??
        false),
  );

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    if (name === "category") {
      setFormData({
        ...formData,
        [name]: value as "candy" | "drink",
      });
    } else if (name === "price" || name === "stock") {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Open modal for creating new product
  const handleAddNew = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      description: "",
      category: "candy",
      price: 0,
      stock: 0,
      image: "",
    });
    setShowModal(true);
  };

  // Open modal for editing existing product
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      category: product.category,
      price: product.price,
      stock: product.stock,
      image: product.image || "",
    });
    setShowModal(true);
  };

  // Delete product (locally only)
  const handleDelete = (productId: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(productId);
    }
  };

  // Save product (create or update)
  const handleSave = () => {
    if (editingProduct) {
      // Update existing product
      updateProduct({
        ...editingProduct,
        ...formData,
      });
    } else {
      // Create new product
      addProduct(formData);
    }
    setShowModal(false);
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <h2>Loading products...</h2>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Product Management</h1>
      <p className="text-muted mb-4">
        Changes made here are stored locally and will not affect the actual API
        data. All operations (Create, Read, Update, Delete) are performed on
        local state.
      </p>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <Form.Group style={{ width: "250px" }}>
          <Form.Control
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
        <Button variant="success" onClick={handleAddNew}>
          Add New Product
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-5">
          <p>No products available. Click "Add New Product" to create one.</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-5">
          <p>No products match your search term.</p>
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Product Form Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProduct ? "Edit Product" : "Add New Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="candy">Candy</option>
                    <option value="drink">Drink</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="0"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
              />
              {formData.image && (
                <div className="mt-2 text-center">
                  <img
                    src={formData.image}
                    alt="Product preview"
                    style={{ maxHeight: "100px" }}
                  />
                </div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Admin;
