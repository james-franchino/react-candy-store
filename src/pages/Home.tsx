import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="jumbotron">
        <Container>
          <h1 className="display-4">Welcome to Sweet Treats</h1>
          <p className="lead mb-4">
            Your one-stop shop for delicious candies and fizzy drinks!
          </p>
          <Button
            variant="light"
            size="lg"
            onClick={() => navigate("/products")}
          >
            Shop Now
          </Button>
        </Container>
      </div>

      <section className="featured-section">
        <Container>
          <h2 className="mb-4">Featured Products</h2>
          <Row className="justify-content-center">
            <Col sm={12} md={4} className="mb-4">
              <Card className="featured-card">
                <Card.Header as="h5">Sweet Candies</Card.Header>
                <Card.Body>
                  <Card.Text>
                    Explore our wide selection of delicious candies from around
                    the world.
                  </Card.Text>
                  <Button
                    variant="primary"
                    className="w-100 mt-auto"
                    onClick={() => navigate("/products")}
                  >
                    Browse Candies
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col sm={12} md={4} className="mb-4">
              <Card className="featured-card">
                <Card.Header as="h5">Fizzy Drinks</Card.Header>
                <Card.Body>
                  <Card.Text>
                    Refresh yourself with our collection of unique fizzy drinks.
                  </Card.Text>
                  <Button
                    variant="primary"
                    className="w-100 mt-auto"
                    onClick={() => navigate("/products")}
                  >
                    Browse Drinks
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col sm={12} md={4} className="mb-4">
              <Card className="featured-card">
                <Card.Header as="h5">Special Offers</Card.Header>
                <Card.Body>
                  <Card.Text>
                    Check out our latest deals and special offers.
                  </Card.Text>
                  <Button
                    variant="primary"
                    className="w-100 mt-auto"
                    onClick={() => navigate("/products")}
                  >
                    See Offers
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
