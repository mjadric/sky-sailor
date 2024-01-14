import ReservationForm from "./ReservationForm";
import { Container, Row, Col, ListGroup, Badge } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

const ReservationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const flight = location.state?.flight;
  const [accountId, setAccountId] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }

    if (token) {
      const decoded = jwt_decode(token);
      fetchAccountId(decoded.email);
    }
  }, []);

  const fetchAccountId = async (email) => {
    try {
      const response = await axios.get("http://localhost:8800/api/acc/", {
        params: { email: email },
      });
      if (response.data && response.data.data.account) {
        setAccountId(response.data.data.account[0].account_ID);
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.log("Failed to fetch account:", err);
      navigate("/login");
    }
  };

  const [totalPrice, setTotalPrice] = useState(flight.adultSeatPrice);

  return (
    <Container style={{ maxWidth: "60%", marginTop: "6rem" }}>
      <Row className="justify-content-md-center mt-4 pt-4 border p-4">
        <h1>Rezervacija</h1>
        <Col md={6} className="p-8">
          <ReservationForm
            flight={flight}
            user={accountId}
            setTotalPrice={setTotalPrice}
          />
        </Col>
        <Col md={6}>
          <ListGroup>
            <ListGroup.Item>
              <strong>Vrijeme polijetanja:</strong> {flight.departureTimeDate}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Vrijeme slijetanja:</strong> {flight.arrivalTimeDate}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Mjesto polijetanja:</strong> {flight.departureTownName},{" "}
              {flight.departureCountry}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Mjesto slijetanja:</strong> {flight.destinationTownName},{" "}
              {flight.destinationCountry}
            </ListGroup.Item>
          </ListGroup>
          <Badge
            pill
            bg="info"
            className="mt-3"
            style={{ fontSize: "1.4em", padding: "12px" }}>
            Total Price: {totalPrice}€
          </Badge>
        </Col>
      </Row>
    </Container>
  );
};

export default ReservationPage;
