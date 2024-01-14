import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchForm.css";
import axios from "axios";

const SearchForm = () => {
  const [departureTown, setDepartureTown] = useState("");
  const [destinationTown, setDestinationTown] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [townSearchResults, setTownSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const navigate = useNavigate();

  const debounce = (func, delay) => {
    let inDebounce;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const searchTowns = async (townName) => {
    const response = await fetch(
      `http://localhost:8800/api/towns?query=${townName}`
    );
    const data = await response.json();
    if (data.status === "success") {
      setTownSearchResults(data.data.towns);
      setShowDropdown(true);
    }
  };

  const debouncedSearchTowns = debounce(searchTowns, 300);

  const handleTownInputChange = (e, setTown, inputType) => {
    setTown(e.target.value);
    debouncedSearchTowns(e.target.value);
    setActiveInput(inputType);
  };

  const handleInputFocus = (inputType) => {
    setActiveInput(inputType);
  };

  const selectTown = (townName, setTown) => {
    setTown(townName);
    setShowDropdown(false);
    setActiveInput(null);
  };

  const getTownIdByName = async (townName) => {
    try {
      const response = await fetch(
        `http://localhost:8800/api/towns?query=${townName}`
      );
      const data = await response.json();
      if (data.status === "success" && data.results > 0) {
        return data.data.towns[0].town_ID;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching town ID:", error);
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const departureTownId = await getTownIdByName(departureTown);
    const destinationTownId = await getTownIdByName(destinationTown);

    if (departureTownId && destinationTownId) {
      const response = await axios.get(`http://localhost:8800/api/search`, {
        params: {
          departureTownId: departureTownId,
          destinationTownId: destinationTownId,
          departureDate: departureDate,
        },
      });

      const data = response.data;
      if (data.status === "success") {
        navigate("/search-results", {
          state: { flights: data.data.flights },
        });
      } else {
        console.error("Search failed", data);
      }
    } else {
      console.error("One of the towns could not be found by name.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Mjesto polijetanja"
          value={departureTown}
          onChange={(e) =>
            handleTownInputChange(e, setDepartureTown, "departure")
          }
          onFocus={() => handleInputFocus("departure")}
        />
        {showDropdown && activeInput === "departure" && (
          <div className="dropdown">
            {townSearchResults.map((town) => (
              <div
                key={town.town_ID}
                onClick={() => selectTown(town.name, setDepartureTown)}>
                {town.name}
              </div>
            ))}
          </div>
        )}
        <input
          type="text"
          placeholder="Mjesto slijetanja"
          value={destinationTown}
          onChange={(e) =>
            handleTownInputChange(e, setDestinationTown, "destination")
          }
          onFocus={() => handleInputFocus("destination")}
        />
        {showDropdown && activeInput === "destination" && (
          <div className="dropdown">
            {townSearchResults.map((town) => (
              <div
                key={town.town_ID}
                onClick={() => selectTown(town.name, setDestinationTown)}>
                {town.name}
              </div>
            ))}
          </div>
        )}
        <input
          type="date"
          placeholder="Datum polijetanja"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
        />

        <button type="submit">Pretraži letove</button>
      </form>
    </div>
  );
};

export default SearchForm;
