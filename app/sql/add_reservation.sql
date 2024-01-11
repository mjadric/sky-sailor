DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_reservation`(
	IN flightId INT,
    IN accountId INT,
    IN seatId INT,
    IN extraBaggage TINYINT(1),
    IN flightInsurance TINYINT(1))
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'add_reservation: An error occurred';
    END;

    START TRANSACTION;
    
	INSERT INTO reservation 
    (`flight_ID`,
    `account_ID`,
    `seat_ID`,
    `extraBaggage`,
    `flightInsurance`) VALUES
    (flightId, accountId, seatId, extraBaggage, flightInsurance);
    
	UPDATE flight_seat 
	SET available = 0
		WHERE flight_ID = flightId
		AND seat_ID = seatId;
	
    COMMIT;
END //

DELIMITER ;
