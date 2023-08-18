DROP PROCEDURAL IF EXISTS sp_find_book;
                
DELIMITER //

create procedure sp_find_book(IN bookId varchar(36), IN bookName varchar(200),
                              IN bookDescription varchar(500), IN userName varchar(100),
                              IN lastName varchar(100), IN categoryName varchar(200))
BEGIN
    SET bookId = TRIM(bookId);
    SET bookName = TRIM(bookName);
    SET bookDescription = TRIM(bookDescription);
    SET userName = TRIM(userName);
    SET lastName = TRIM(lastName);
    SET categoryName = TRIM(categoryName);

    SELECT bK.bookId,
           bK.name as       'bookName',
           bK.description as 'bookDescription',
           usr.name as    'userName',
           usr.last_name as 'lastName',
           ct.description as 'categoryName'
    FROM book_detail bookD
             JOIN book bK on bK.bookId = bookD.book_id
             JOIN user usr ON bookD.user_id = usr.usr_id
             JOIN category ct ON bookD.category_id = ct.category_id
    WHERE bookD.flgElm = false
      AND (LENGTH(bookId) = 0 OR bk.bookId LIKE CONCAT('%', bookId, '%'))
      AND (LENGTH(bookName) = 0 OR bk.name LIKE CONCAT('%', bookName, '%'))
      AND (LENGTH(bookDescription) = 0 OR bk.description LIKE CONCAT('%', bookDescription, '%'))
      AND (LENGTH(username) = 0 OR usr.name LIKE CONCAT('%', username, '%'))
      AND (LENGTH(lastName) = 0 OR usr.last_name LIKE CONCAT('%', lastName, '%'))
      AND (LENGTH(categoryName) = 0 OR ct.description LIKE CONCAT('%', categoryName, '%'));

END //
    
DELIMITER ;
