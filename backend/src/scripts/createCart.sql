DELIMITER $$

CREATE PROCEDURE createCart(
    IN _total DOUBLE, 
    IN _movie INTEGER,
    IN _pagado BOOLEAN,
    IN _date DATE
)
BEGIN
    DECLARE l_cart_id INT DEFAULT 0;
    
    START TRANSACTION;
    -- Insert CART data
    INSERT INTO carts(total, pagado, date)
    VALUES(_total, _pagado, _date);
    
    -- get CART id
    SET l_cart_id = LAST_INSERT_ID();
    
    -- insert DETAIL cart
    IF (l_cart_id > 0) THEN
	INSERT INTO cart_detail(carrito_id, movies_id)
        VALUES(l_cart_id,_movie);
        COMMIT;
     ELSE
	ROLLBACK;
    END IF;
END$$

DELIMITER ;