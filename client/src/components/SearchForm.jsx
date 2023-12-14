import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./SearchForm.css";

const SearchForm = () => {
  const [departureCity, setDepartureCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [departureTowns, setDepartureTowns] = useState([]);
  const [destinationTowns, setDestinationTowns] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDepartureCityChange = async (event) => {
    const inputCity = event.target.value;
    setDepartureCity(inputCity);

    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8800/api/towns?query=${inputCity}`
      );

      if (response.data && response.data.data && response.data.data.towns) {
        setDepartureTowns(response.data.data.towns);
      } else {
        setDepartureTowns([]);
      }
    } catch (error) {
      console.error("Failed to fetch departure towns:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDestinationCityChange = async (event) => {
    const inputCity = event.target.value;
    setDestinationCity(inputCity);

    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8800/api/towns?query=${inputCity}`
      );

      if (response.data && response.data.data && response.data.data.towns) {
        setDestinationTowns(response.data.data.towns);
      } else {
        setDestinationTowns([]);
      }
    } catch (error) {
      console.error("Failed to fetch destination towns:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTownSelection = (selectedTown, isDeparture) => {
    if (isDeparture) {
      setDepartureCity(selectedTown.name);
      setDepartureTowns([]);
    } else {
      setDestinationCity(selectedTown.name);
      setDestinationTowns([]);
    }
  };

  const handleDepartureDateChange = (event) => {
    setDepartureDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Form className="mt-4 border p-4" onSubmit={handleSubmit}>
      <Form.Group controlId="formDepartureCity">
        <Form.Label>Mjesto polijetanja</Form.Label>
        <Form.Control
          type="text"
          placeholder="Unesite mjesto polijetanja"
          value={departureCity}
          onChange={handleDepartureCityChange}
        />
        {loading && <p>Loading...</p>}
        {!loading && departureTowns && departureTowns.length > 0 && (
          <ul className="town-dropdown">
            {departureTowns.map((town) => (
              <li
                key={town.town_ID}
                onClick={() => handleTownSelection(town, true)}
              >
                {town.name}
              </li>
            ))}
          </ul>
        )}
      </Form.Group>

      <Form.Group controlId="formDestinationCity">
        <Form.Label>Mjesto slijetanja</Form.Label>
        <Form.Control
          type="text"
          placeholder="Unesite mjesto slijetanja"
          value={destinationCity}
          onChange={handleDestinationCityChange}
        />
        {!loading && destinationTowns && destinationTowns.length > 0 && (
          <ul className="town-dropdown">
            {destinationTowns.map((town) => (
              <li
                key={town.town_ID}
                onClick={() => handleTownSelection(town, false)}
              >
                {town.name}
              </li>
            ))}
          </ul>
        )}
      </Form.Group>

      <Form.Group controlId="formDepartureDate">
        <Form.Label>Datum polijetanja</Form.Label>
        <Form.Control
          type="date"
          value={departureDate}
          onChange={handleDepartureDateChange}
        />
      </Form.Group>

      <Row className="justify-content-center">
        <Col xs="auto" className="mt-3">
          <Button variant="primary" type="submit">
            Pretraži letove
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchForm;
