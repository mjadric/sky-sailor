INSERT INTO `aviokompanija`.`flight`
(
`departureTimeDate`,
`arrivalTimeDate`,
`plane_ID`,
`departureAirport_ID`,
`destinationAirport_ID`,
`extraBaggagePrice`,
`flightInsurancePrice`,
`timezone_ID`)
VALUES
('2024-01-10 08:00:00', '2024-01-10 12:00:00', 1, 3, 4, 30.00, 15.00, 2),
('2024-01-15 14:30:00', '2024-01-15 18:30:00', 2, 5, 6, 25.00, 12.50, 3);

INSERT INTO `aviokompanija`.`flight_travelclass`
(`flight_ID`,
`travelClass_ID`,
`adultSeatPrice`,
`childSeatPrice`)
VALUES
(3, 1, 200, 170),
(3, 2, 250, 220),
(3, 3, 330, 300),
(4, 1, 230, 190),
(4, 2, 270, 260),
(4, 3, 340, 330);

INSERT INTO `aviokompanija`.`flight_seat`
(`available`, `flight_ID`, `seat_ID`)
SELECT
  1 AS `available`,
  25 AS `flight_ID`,
  seat_id
FROM (
  SELECT
    ROW_NUMBER() OVER () AS seat_id
  FROM information_schema.columns
) numbered_seats
WHERE seat_id <= 150;


INSERT INTO `aviokompanija`.`flight_seat`
(`available`, `flight_ID`, `seat_ID`)
SELECT
  1 AS `available`,
  27 AS `flight_ID`,
  seat_id + 500 AS seat_id
FROM (
  SELECT
    ROW_NUMBER() OVER () AS seat_id
  FROM information_schema.columns
) numbered_seats
WHERE seat_id <= 170;  -- Ograničavamo broj redova na 200 da bismo dobili sedišta od 151 do 350







