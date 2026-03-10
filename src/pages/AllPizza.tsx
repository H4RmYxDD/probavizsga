import { useEffect, useState } from "react";
import type { Pizza } from "../types/Pizza";
import apiClient, { baseURL } from "../api/apiClient";
import * as Sentry from "@sentry/react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AllPizza = () => {
  const [pizzak, setPizzak] = useState<Array<Pizza>>([]);
  const [cart, setCart] = useState<Array<Number>>(
    JSON.parse(localStorage.getItem("cart") ?? "[]"),
  );
  const navigate = useNavigate();
  useEffect(() => {
    apiClient
      .get("/pizzak")
      .then((res) => setPizzak(res.data))
      .catch(() => Sentry.captureException);
  }, []);

  useEffect(() => {
    localStorage.setItem("kosar", JSON.stringify(cart));
  }, [cart]);
  const generateCard = (p: Pizza) => {
    return (
      <Col>
        <Card>
          <CardHeader>
            <Card.Img src={`${baseURL}/kepek/${p.imageUrl}`} />
          </CardHeader>
          <CardBody>
            <Card.Title>{p.leiras}</Card.Title>
            <Card.Text>{p.leiras}</Card.Text>
          </CardBody>
          <CardFooter>
            <Card.Text>{p.ar}</Card.Text>
            <Button onClick={() => navigate(`/pizza/${p.id}`)}>
              megtekintes
            </Button>
            <Button onClick={() => setCart([...cart, Number(p.id)])}>
              kosarba
            </Button>
          </CardFooter>
        </Card>
      </Col>
    );
  };
  return (
    <Container>
      <Row>{pizzak.map((a) => generateCard(a))}</Row>
    </Container>
  );
};
export default AllPizza;
