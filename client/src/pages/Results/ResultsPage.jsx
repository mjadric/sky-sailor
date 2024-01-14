import { useLocation } from "react-router-dom";
import "./ResultsPage.css";
import { useNavigate } from "react-router-dom";

const ResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const flights = location.state?.flights[0] || [];
  const handleReserveClick = (flight) => {
    navigate("/reservation");
  };

  return (
    <div className="results-container">
      {flights.map((flight, index) => (
        <div className="results-card-horizontal" key={index}>
          <div className="flight-details">
            <div className="flight-locations">
              <p>
                {flight.departureTownName} ({flight.departureCountry}) -{" "}
                {flight.destinationTownName} ({flight.destinationCountry})
              </p>
            </div>
            <div className="flight-times">
              <p className="departure-arrival-time">
                {new Date(flight.departureTime).toLocaleTimeString()} -
                {new Date(flight.arrivalTime).toLocaleTimeString()}
              </p>
            </div>
            <p className="price">Cijena za odrasle: {flight.adultSeatPrice}€</p>
            <p className="price">Cijena za djecu: {flight.childSeatPrice}€</p>
          </div>
          <button
            className="reserve-button"
            onClick={() => handleReserveClick(flight)}
          >
            Rezerviraj
          </button>
        </div>
      ))}
    </div>
  );
};

export default ResultsPage;
