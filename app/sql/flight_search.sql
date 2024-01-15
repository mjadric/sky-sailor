DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `flight_search`(
    IN departureTownId INT,
    IN destinationTownId INT,
    IN departureDate DATE)
BEGIN
    DECLARE resultCount INT;

    SELECT 
        COUNT(*) INTO resultCount
    FROM flight AS f
	LEFT JOIN airport AS a1 ON f.departureAirport_ID = a1.airport_ID
	LEFT JOIN town AS t1 ON a1.town_id = t1.town_ID
	LEFT JOIN airport AS a2 ON f.destinationAirport_ID = a2.airport_ID
	LEFT JOIN town AS t2 ON a2.town_id = t2.town_ID
    WHERE 
        t1.town_ID = departureTownId
        AND t2.town_ID = destinationTownId
        AND DATE(f.departureTimeDate) = departureDate;

    IF resultCount > 0 THEN
        SELECT 
			f.flight_ID,
            t1.name AS departureTownName,
            c1.name AS departureCountry,
            t2.name AS destinationTownName,
            c2.name AS destinationCountry,
            IFNULL(SUM(s.available), 0) AS totalAvailableSeats,
            f.departureTimeDate AS departureTime,
            f.arrivalTimeDate AS arrivalTime,
            tz.name AS timezoneName,
            ftc.adultSeatPrice,
            ftc.childSeatPrice,
            f.extraBaggagePrice,
            f.flightInsurancePrice
        FROM flight AS f
        LEFT JOIN airport AS a1 ON f.departureAirport_ID = a1.airport_ID
        LEFT JOIN town AS t1 ON a1.town_id = t1.town_ID
        LEFT JOIN country AS c1 ON c1.country_ID = t1.country_id 
        LEFT JOIN airport AS a2 ON f.destinationAirport_ID = a2.airport_ID
        LEFT JOIN town AS t2 ON a2.town_id = t2.town_ID
        LEFT JOIN country AS c2 ON c2.country_ID = t2.country_id 
        LEFT JOIN flight_seat AS s ON f.flight_ID = s.flight_id
        LEFT JOIN timezone AS tz ON f.timezone_ID = tz.timezone_ID
        LEFT JOIN flight_travelclass AS ftc ON f.flight_id = ftc.flight_ID
        WHERE 
            t1.town_ID = departureTownId
            AND t2.town_ID = destinationTownId
            AND DATE(f.departureTimeDate) = departureDate
            AND ftc.travelClass_ID = 1 -- economy class
        GROUP BY f.flight_ID;
    END IF;
END //

DELIMITER ;
