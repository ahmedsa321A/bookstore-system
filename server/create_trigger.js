const db = require('./config/db');

const createTrigger = async () => {
    const triggerQuery = `
    CREATE TRIGGER before_book_update
    BEFORE UPDATE ON Books
    FOR EACH ROW
    BEGIN
        IF NEW.Stock < 0 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Stock quantity cannot be negative';
        END IF;
    END;
    `;

    try {
        // Drop trigger if exists to avoid errors on re-run
        await db.promise().query("DROP TRIGGER IF EXISTS before_book_update");
        console.log("Dropped existing trigger if any.");

        await db.promise().query(triggerQuery);
        console.log("Trigger 'before_book_update' created successfully.");
        process.exit(0);
    } catch (err) {
        console.error("Error creating trigger:", err.message);
        process.exit(1);
    }
};

createTrigger();
