import { Routes, Route, Link } from "react-router-dom";
import { Container, Navbar, Nav, Badge } from "react-bootstrap";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import { useCart } from "./context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const { items } = useCart();

  // Calculate total items in cart
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-container">
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Sweet Treats
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/products">
                Products
              </Nav.Link>
              <Nav.Link as={Link} to="/cart" className="position-relative">
                Cart
                {totalItems > 0 && (
                  <Badge
                    pill
                    bg="danger"
                    className="position-absolute translate-middle"
                    style={{ top: "0", right: "-5px" }}
                  >
                    {totalItems}
                  </Badge>
                )}
              </Nav.Link>
              <Nav.Link as={Link} to="/admin">
                Admin
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
