DELIMITER $$
CREATE OR REPLACE PROCEDURE loginUsr(IN _email VARCHAR, IN _password VARCHAR) 

BEGIN 

	SELECT usr.id, usr.name, usr.email, usr.avatar
	FROM users as usr WHERE usr.email = _email AND usr.password = _password;
		 
	 
END$$

DELIMITER ;