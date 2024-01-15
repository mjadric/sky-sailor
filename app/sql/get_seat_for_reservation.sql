DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_seat_for_reservation`(
    IN flightId INT,
    IN travelClassId INT,
	OUT seatId INT)
BEGIN
	SELECT 
		fs.seat_ID
		INTO seatId
	FROM flight_seat AS fs
	LEFT JOIN seat AS s ON fs.seat_ID = s.seat_ID
		WHERE flight_ID = flightId 
		AND s.travelClass_ID = travelClassId
		AND fs.available = 1
	LIMIT 1;
END //

DELIMITER //