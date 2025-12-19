-- 1. INSERT PUBLISHERS
INSERT INTO `publishers` (`publisher_id`, `name`, `address`, `phone`) VALUES
(1, 'Penguin Classics', 'London, UK', '+44-20-7010-3000'),
(2, 'O\'Reilly Media', 'Sebastopol, CA', '+1-707-827-7000'),
(3, 'HarperCollins', 'New York, NY', '+1-212-207-7000'),
(4, 'Pearson', 'London, UK', '+44-20-7010-2000');

-- 2. INSERT AUTHORS
INSERT INTO `authors` (`author_id`, `name`) VALUES
(1, 'F. Scott Fitzgerald'),
(2, 'George Orwell'),
(3, 'J.K. Rowling'),
(4, 'Robert C. Martin'),
(5, 'Kyle Simpson'),
(6, 'Stephen Hawking');
-- 2. INSERT BOOKS (Hyphens Removed - Exactly 13 Chars)
INSERT INTO `books` (`isbn`, `title`, `publication_year`, `price`, `stock`, `threshold`, `publisher_id`, `category`, `cover_image`) VALUES
('9780743273565', 'The Great Gatsby', 1925, 15.99, 50, 5, 1, 'History', 'https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg'),
('9780451524935', '1984', 1949, 12.50, 100, 10, 1, 'Science', 'https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg'),
('9780590353427', 'Harry Potter and the Sorcerer\'s Stone', 1997, 25.00, 200, 20, 3, 'Art', 'https://m.media-amazon.com/images/I/71-++hbbERL._AC_UF1000,1000_QL80_.jpg'),
('9780132350884', 'Clean Code', 2008, 45.00, 30, 5, 4, 'Science', 'https://m.media-amazon.com/images/I/51E2055ZGUL._AC_UF1000,1000_QL80_.jpg'),
('9781491904244', 'You Don\'t Know JS', 2015, 29.99, 40, 5, 2, 'Science', 'https://m.media-amazon.com/images/I/81z340+A5EL._AC_UF1000,1000_QL80_.jpg'),
('9780553380163', 'A Brief History of Time', 1988, 18.00, 15, 2, 1, 'Science', 'https://m.media-amazon.com/images/I/817R12Sj3LL._AC_UF1000,1000_QL80_.jpg');

-- 3. LINK AUTHORS (Using the new clean ISBNs)
INSERT INTO `bookauthors` (`isbn`, `author_id`) VALUES
('9780743273565', 1),
('9780451524935', 2),
('9780590353427', 3),
('9780132350884', 4),
('9781491904244', 5),
('9780553380163', 6);