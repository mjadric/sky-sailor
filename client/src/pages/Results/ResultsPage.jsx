import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button, Row, Col, Badge } from "react-bootstrap";

const ResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const flights = location.state?.flights[0] || [];

  const handleReserveClick = (flight) => {
    navigate("/reservation", { state: { flight: flight } });
  };

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div
      className="mt-4 pt-4 text-center"
      style={{ display: "flex", flexDirection: "column" }}>
      <h1>Rezultati pretrage</h1>
      <div className="results-container">
        {flights.map((flight, index) => (
          <Card className="results-card-horizontal" key={index}>
            <Card.Body>
              <Row>
                <Col
                  md={7}
                  className="d-flex flex-column justify-content-center">
                  <Card.Title>
                    {flight.departureTownName} ({flight.departureCountry}) -{" "}
                    {flight.destinationTownName} ({flight.destinationCountry})
                  </Card.Title>
                  <Card.Text className="departure-arrival-time">
                    {new Date(flight.departureTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}{" "}
                    -{" "}
                    {new Date(flight.arrivalTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </Card.Text>
                </Col>
                <Col
                  md={3}
                  className="d-flex flex-column justify-content-center">
                  <Card.Text>
                    Osnovna cijena:{" "}
                    <Badge pill bg="danger">
                      {flight.adultSeatPrice}€
                    </Badge>
                  </Card.Text>
                </Col>
                <Col
                  md={2}
                  className="d-flex align-items-center justify-content-end">
                  <Button
                    variant="primary"
                    className="reserve-button"
                    onClick={() => handleReserveClick(flight)}>
                    Rezerviraj
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </div>
      <div className="d-flex justify-content-center mt-4">
        <Button
          variant="secondary"
          className="ms-2 btn-sm px-3"
          style={{ width: "fit-content" }}
          onClick={handleBackClick}>
          Povratak
        </Button>
      </div>
    </div>
  );
};

export default ResultsPage;
