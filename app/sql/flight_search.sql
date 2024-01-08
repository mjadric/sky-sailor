CREATE DEFINER=`root`@`localhost` PROCEDURE `flight_search`(
	IN departureTownId INT,
    IN destinationTownId INT,
    IN departureDate DATE)
BEGIN
SELECT 
        f.*, 
        t1.name AS departureTownName,
        c1.name AS departureCountry,
        t2.name AS destinationTownName,
        c2.name AS destinationCountry,
        -- SUM(s.available) AS totalAvailableSeats
        f.departureTimeDate AS departureTime,
        f.arrivalTimeDate AS arrivalTime,
        tz.name AS timezoneName
    FROM flight AS f
    JOIN airport AS a1 ON f.departureAirport_ID = a1.airport_ID
    JOIN town AS t1 ON a1.town_id = t1.town_ID
    JOIN country AS c1 ON c1.country_ID = t1.country_id 
    JOIN airport AS a2 ON f.destinationAirport_ID = a2.airport_ID
    JOIN town AS t2 ON a2.town_id = t2.town_ID
    JOIN country AS c2 ON c2.country_ID = t2.country_id 
    -- JOIN seat AS s ON f.flight_ID = s.flight_id
    JOIN timezone AS tz ON f.timezone_ID = tz.timezone_ID
    WHERE 
        f.departureAirport_ID = departureTownId
        AND f.destinationAirport_ID = destinationTownId
        AND DATE(f.departureTimeDate) = departureDate;
END