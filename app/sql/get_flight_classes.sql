DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_flight_classes`(
	IN flightId INT)
BEGIN

SELECT 
	tc.travelClass_ID, 
    tc.name,
    ftc.adultSeatPrice,
    ftc.childSeatPrice
FROM flight_travelclass AS ftc
INNER JOIN travelclass AS tc ON ftc.travelClass_ID = tc.travelClass_ID
	WHERE flight_ID = flightId;
    
END //

DELIMITER ;