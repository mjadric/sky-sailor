import ReservationForm from "./ReservationForm";
import { Container, Row, Col, ListGroup, Badge } from "react-bootstrap";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const ReservationPage = () => {
  const location = useLocation();
  const flight = location.state?.flight;

  const [totalPrice, setTotalPrice] = useState(flight.adultSeatPrice);

  return (
    <Container style={{ maxWidth: "60%", marginTop: "6rem" }}>
      <Row className="justify-content-md-center mt-4 pt-4 border p-4">
        <h1>Rezervacija</h1>
        <Col md={6} className="p-8">
          <ReservationForm flight={flight} setTotalPrice={setTotalPrice} />
        </Col>
        <Col md={6}>
          <ListGroup>
            <ListGroup.Item>
              <strong>Vrijeme poljetanja:</strong>{" "}
              {new Date(flight.departureTime).toLocaleTimeString([], {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Vrijeme sljetanja:</strong>{" "}
              {new Date(flight.arrivalTime).toLocaleTimeString([], {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Mjesto poljetanja:</strong> {flight.departureTownName},{" "}
              {flight.departureCountry}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Mjesto sljetanja:</strong> {flight.destinationTownName},{" "}
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
