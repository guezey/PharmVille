DELIMITER //
CREATE TRIGGER add_order_total_to_pharmacy_balance
AFTER UPDATE
ON Orders
FOR EACH ROW
BEGIN
    DECLARE pharmacy_balance DOUBLE;

    IF NEW.order_status = 'SHIPPED' AND OLD.order_status = 'ACTIVE' THEN
        SELECT balance INTO pharmacy_balance FROM Pharmacy WHERE pharmacy_id = NEW.pharmacy_id;

        UPDATE Pharmacy
        SET balance = pharmacy_balance + (
            SELECT payment_amount
            FROM Payment
            WHERE order_id = NEW.order_id
        )
        WHERE pharmacy_id = NEW.pharmacy_id;
    END IF;
END//
DELIMITER ;
