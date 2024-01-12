import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ReservationForm = ({ flight, accountId, setTotalPrice }) => {
  const navigate = useNavigate();

  const [travelClasses, setTravelClasses] = useState(null);
  const [selectedClass, setSelectedClass] = useState({});
  const [ticketType, setTicketType] = useState(""); // ["child", "adult"]
  const [noSeatsWarning, setNoSeatsWarning] = useState("");

  const [formData, setFormData] = useState({
    flightId: flight.flightId,
    accountId: accountId,
    seatId: 0,
    extraBaggage: 0,
    flightInsurance: 0,
  });

  // classes load on page load with flightId
  useEffect(() => {
    const fetchTravelClasses = async () => {
      const flightId = flight.flightId;
      try {
        const response = await axios.get(
          "http://localhost:8800/api/flightclasses",
          {
            params: { flightId: flightId },
          }
        );

        if (response.data && response.data.data.flightClasses) {
          const classes = response.data.data.flightClasses[0];
          setTravelClasses(classes);
        } else {
          setTravelClasses([]);
        }
      } catch (err) {
        console.log("Failed to fetch travel classes:", err);
      }
    };

    fetchTravelClasses();
  }, []);

  // seatId loads when class is selected
  useEffect(() => {
    const fetchFirstAvailableSeat = async () => {
      if (!selectedClass) {
        return;
      }

      try {
        const response = await axios.get("http://localhost:8800/api/seat", {
          params: {
            flightId: flight.flightId,
            classId: selectedClass.travelClass_ID,
          },
        });

        const seatId = response.data.seatId;
        if (!seatId) {
          if (selectedClass.name !== undefined) {
            setNoSeatsWarning("Nema slobodnih sjedala za odabranu klasu.");
          }
          return;
        }

        if (response.data) {
          setFormData((prevData) => ({
            ...prevData,
            seatId: seatId,
          }));
        }
      } catch (err) {
        console.log("Failed to fetch seat:", err);
      }
    };

    fetchFirstAvailableSeat();
  }, [selectedClass, flight.flightId]);

  useEffect(() => {
    const updateTotalPrice = () => {
      let price = Number(flight.adultSeatPrice);

      if (selectedClass) {
        if (ticketType === "child") {
          price = Number(selectedClass.childSeatPrice);
        } else if (ticketType === "adult") {
          price = Number(selectedClass.adultSeatPrice);
        }
      }

      if (formData.extraBaggage === 1) {
        price += Number(flight.extraBaggagePrice);
      }

      if (formData.flightInsurance === 1) {
        price += Number(flight.flightInsurancePrice);
      }
      setTotalPrice(price);
    };

    updateTotalPrice();
  }, [
    selectedClass,
    ticketType,
    flight.adultSeatPrice,
    flight.extraBaggagePrice,
    flight.flightInsurancePrice,
    formData.extraBaggage,
    formData.flightInsurance,
    setTotalPrice,
  ]);

  const handleInputChange = (event) => {
    const { name, type, checked } = event.target;

    if (type === "checkbox") {
      const inputValue = checked ? 1 : 0;

      setFormData((prevData) => ({
        ...prevData,
        [name]: inputValue,
      }));
    }
  };

  const handleTravelClassChange = (classSelection) => {
    setSelectedClass(classSelection);
  };

  const handleTicketTypeChange = (event) => {
    setTicketType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formData);
  };

  const handleCancel = () => {
    navigate("/search-results");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="ReservationForm.TravelClass" className="mb-3">
        <Form.Control
          required
          as="select"
          placeholder="Odaberite klasu"
          name="selectedClass"
          value={selectedClass ? selectedClass.name : ""}
          onChange={(e) =>
            handleTravelClassChange(
              travelClasses.find((c) => c.name === e.target.value)
            )
          }>
          <option value="">Odaberite klasu</option>
          {travelClasses &&
            travelClasses.length > 0 &&
            travelClasses.map((c) => (
              <option key={c.travelClass_ID} value={c.name}>
                {c.name}
              </option>
            ))}
        </Form.Control>
        <label className="text-danger font-weight-bold">{noSeatsWarning}</label>
      </Form.Group>
      <Form.Group controlId="ReservationForm.TicketType" className="mb-3">
        {travelClasses && travelClasses.length > 0 && (
          <Form.Control
            required
            as="select"
            placeholder="Odaberite vrstu karte"
            name="ticketType"
            value={ticketType ? ticketType : ""}
            onChange={(e) => handleTicketTypeChange(e)}>
            <option value="">Odaberite vrstu karte</option>
            <option value="child">Dječja karta</option>
            <option value="adult">Odrasla karta</option>
          </Form.Control>
        )}
      </Form.Group>
      <Form.Group controlId="ReservationForm.ExtraBaggage" className="mb-3">
        <Form.Check
          type="checkbox"
          name="extraBaggage"
          label="Dodatna prtljaga"
          checked={formData.extraBaggage === 1}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="ReservationForm.FlightInsurance" className="mb-3">
        <Form.Check
          type="checkbox"
          name="flightInsurance"
          label="Putno osiguranje"
          checked={formData.flightInsurance === 1}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Row className="justift-content-center">
        <Col xs="auto" className="mt-3">
          <Button variant="success" type="submit">
            Rezerviraj
          </Button>
          <Button variant="danger" className="ms-2" onClick={handleCancel}>
            Odustani
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

ReservationForm.propTypes = {
  flight: PropTypes.object.isRequired,
  accountId: PropTypes.number.isRequired,
  setTotalPrice: PropTypes.func.isRequired,
};

export default ReservationForm;
