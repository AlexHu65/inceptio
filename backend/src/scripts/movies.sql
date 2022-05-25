DELIMITER $$
CREATE OR REPLACE PROCEDURE movies(IN _id INTEGER) 

BEGIN 

	IF(_id > 0) THEN

		SELECT mov.id, mov.name, mov.sinopsis, mov.thumbnail, mov.banner, gen.name as gender, mov.premiere_date, mov.rent_price, mov.sell_price
		FROM movies as mov INNER JOIN genders as gen ON mov.gender_id = gen.id WHERE mov.id = _id;


	ELSE

		SELECT mov.id, mov.name, mov.sinopsis, mov.thumbnail, mov.banner, gen.name as gender, mov.premiere_date, mov.rent_price, mov.sell_price
		FROM movies as mov INNER JOIN genders as gen ON mov.gender_id = gen.id;

	END IF;
	
	
		 
	 
END$$

DELIMITER ;