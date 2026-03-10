import { useEffect, useState } from "react";
import type { Pizza } from "../types/Pizza";
import apiClient, { baseURL } from "../api/apiClient";
import { useNavigate, useParams } from "react-router-dom";
import * as Sentry from "@sentry/react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";

const OnePizza = () => {
  const [pizza, setPizza] = useState<Pizza>();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    apiClient
      .get(`/pizzak/${id}`)
      .then((res) => setPizza(res.data))
      .catch(() => Sentry.captureException);
  });
  const deletePizza = () => {
    apiClient
      .delete(`/pizzak/${id}`)
      .then(() => toast.success("pizza sikeresen torolve"))
      .catch(() => Sentry.captureException);
  };
  return (
    <Container>
      {pizza ? (
        <Row>
          <Col>
            <h1>{pizza.nev}</h1>
            <h2>{pizza.leiras}</h2>
            <Button onClick={() => navigate(`/edit/${pizza.id}`)}>
              szerkesztes
            </Button>
            <Button onClick={deletePizza}>torles</Button>
          </Col>
          <Col>
            <img src={`${baseURL}/kepek/${pizza.imageUrl}`} />
          </Col>
        </Row>
      ) : (
        <h2>pizza nem talalhato</h2>
      )}
    </Container>
  );
};
export default OnePizza;
