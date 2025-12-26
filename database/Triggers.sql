DELIMITER // -- Allows the use of ; in the trigger body without ending the definition

CREATE TRIGGER prevent_negative_stock
BEFORE UPDATE ON books -- runs before an update
FOR EACH ROW 
BEGIN
    IF NEW.stock < 0 THEN
        SIGNAL SQLSTATE '45000' -- standard SQLSTATE for user-defined exceptions
        SET MESSAGE_TEXT = 'Error: Stock cannot be negative. Update rejected.';
    END IF;
END //

DELIMITER ; -- Ends the trigger and returns to default delimiter

----------------------------------------------------------------------------------------------

DELIMITER //

CREATE TRIGGER auto_reorder_books
AFTER UPDATE ON books
FOR EACH ROW
BEGIN
    DECLARE new_order_id INT; -- Variable to hold the new order ID
    DECLARE reorder_qty INT DEFAULT 50; -- Quantity to reorder

    IF OLD.stock >= OLD.threshold AND NEW.stock < NEW.threshold THEN -- Check if stock has fallen below threshold
        
        INSERT INTO publisher_orders (publisher_id, order_date, status) -- Insert a new pending order
        VALUES (NEW.publisher_id, CURDATE(), 'Pending');

        SET new_order_id = LAST_INSERT_ID(); -- Get the ID of the newly created order

        INSERT INTO publisher_order_items (publisher_order_id, isbn, quantity)
        VALUES (new_order_id, NEW.isbn, reorder_qty); -- Add the book to the order with the reorder quantity
        
    END IF;
END //

DELIMITER ;