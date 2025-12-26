USE bookstore;

DELIMITER $$

DROP PROCEDURE IF EXISTS LoadBookstoreData$$

CREATE PROCEDURE LoadBookstoreData()
BEGIN
    DECLARE i INT DEFAULT 1;
    DECLARE rand_cat VARCHAR(50);
    DECLARE rand_pub INT;
    DECLARE rand_auth INT;
    DECLARE new_isbn VARCHAR(13);

    -- 1. Disable Foreign Keys and Triggers for massive speedup
    SET FOREIGN_KEY_CHECKS = 0;
    
    -- 2. Clear existing data
    TRUNCATE TABLE bookauthors;
    TRUNCATE TABLE books;
    TRUNCATE TABLE authors;
    TRUNCATE TABLE publishers;
    TRUNCATE TABLE users;
    TRUNCATE TABLE customers;
    
    -- 3. Insert Publishers
    INSERT INTO publishers (name, address, phone) VALUES 
    ('Penguin Random House', 'New York, USA', '212-782-9000'),
    ('HarperCollins', 'New York, USA', '212-207-7000'),
    ('Simon & Schuster', 'New York, USA', '212-698-7000'),
    ('Macmillan', 'London, UK', '20-7014-6000'),
    ('Hachette', 'Paris, France', '33-1-43-92-30-00'),
    ('Scholastic', 'New York, USA', '212-343-6100'),
    ('Pearson', 'London, UK', '44-20-7010-2000'),
    ('McGraw-Hill', 'New York, USA', '646-766-2000'),
    ('Houghton Mifflin', 'Boston, USA', '617-351-5000'),
    ('Cengage', 'Boston, USA', '617-289-7700');

    -- 4. Insert Authors
    INSERT INTO authors (name) VALUES 
    ('Stephen King'), ('J.K. Rowling'), ('George R.R. Martin'), ('Dan Brown'),
    ('Agatha Christie'), ('J.R.R. Tolkien'), ('Isaac Asimov'), ('Arthur C. Clarke'),
    ('Neil Gaiman'), ('Terry Pratchett'), ('Margaret Atwood'), ('Haruki Murakami'),
    ('Mark Twain'), ('Ernest Hemingway'), ('F. Scott Fitzgerald'), ('Jane Austen'),
    ('Charles Dickens'), ('Leo Tolstoy'), ('Fyodor Dostoevsky'), ('Chinua Achebe');

    -- 5. Loop to Generate 500 Books
    SET i = 1;
    WHILE i <= 500 DO
        SET new_isbn = CONCAT('978', LPAD(i, 10, '0'));
        SET rand_cat = ELT(FLOOR(1 + RAND() * 5), 'Science', 'Art', 'Religion', 'History', 'Geography');
        SET rand_pub = FLOOR(1 + RAND() * 10);
        
        INSERT INTO books (isbn, title, publication_year, price, stock, threshold, publisher_id, category, image)
        VALUES (
            new_isbn, 
            CONCAT(rand_cat, ' Masterclass Vol. ', i),
            FLOOR(1980 + (RAND() * 45)),
            ROUND(15 + (RAND() * 85), 2),
            FLOOR(20 + (RAND() * 80)), -- Start with stock above threshold (20-100)
            15,                        -- Reorder threshold set to 15
            rand_pub,
            rand_cat,
            'book_cover.jpg'
        );

        -- Assign 1-2 authors per book
        SET rand_auth = FLOOR(1 + RAND() * 20);
        INSERT INTO bookauthors (isbn, author_id) VALUES (new_isbn, rand_auth);
        
        -- Occasionally add a second author
        IF i % 5 = 0 THEN
            INSERT INTO bookauthors (isbn, author_id) VALUES (new_isbn, IF(rand_auth = 20, 1, rand_auth + 1));
        END IF;

        SET i = i + 1;
    END WHILE;

    -- 6. Re-enable Foreign Keys
    SET FOREIGN_KEY_CHECKS = 1;
    
END$$

DELIMITER ;

-- Execute
CALL LoadBookstoreData();