DELIMITER $$
CREATE OR REPLACE PROCEDURE users(IN _id INTEGER) 

BEGIN 

	IF(_id > 0) THEN

		SELECT usr.id, usr.name, usr.email, usr.avatar
		FROM users as usr WHERE usr.id = _id;


	ELSE

		SELECT usr.id, usr.name, usr.email, usr.avatar
		FROM users as usr;

	END IF;
	
	
		 
	 
END$$

DELIMITER ;