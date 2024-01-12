import ReservationForm from "./ReservationForm";
import { Container, Row, Col, ListGroup, Badge } from "react-bootstrap";
import { useState } from "react";

const ReservationPage = () => {
  const flight = {
    flightId: 3,
    departureTimeDate: "2024-01-10",
    arrivalTimeDate: "2024-01-10",
    extraBaggagePrice: "30.00",
    flightInsurancePrice: "15.00",
    departureTownName: "Pariz",
    departureCountry: "Francuska",
    destinationTownName: "Lyon",
    destinationCountry: "Francuska",
    timezoneName: "Europe/Copenhagen",
    adultSeatPrice: "230.00",
  };

  const [totalPrice, setTotalPrice] = useState(flight.adultSeatPrice);

  return (
    <Container className="mx-auto" style={{ maxWidth: "60%" }}>
      <Row className="justify-content-md-center mt-4 pt-4 border p-4">
        <Col md={6} className="p-8">
          <ReservationForm
            flight={flight}
            accountId={1}
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
          <Badge pill bg="info" className="mt-3">
            Total Price: {totalPrice}€
          </Badge>
        </Col>
      </Row>
    </Container>
  );
};

export default ReservationPage;
