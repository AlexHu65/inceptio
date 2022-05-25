-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-05-2022 a las 15:10:00
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inceptio`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `createCart` (IN `_total` DOUBLE, IN `_movie` INTEGER, IN `_pagado` BOOLEAN, IN `_date` DATE)  BEGIN
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `loginUsr` (IN `_email` VARCHAR(255), IN `_password` VARCHAR(255))  BEGIN 

	SELECT usr.id, usr.name, usr.email, usr.avatar
	FROM users as usr WHERE usr.email = _email AND usr.password = _password;
		 
	 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `movies` (IN `_id` INTEGER)  BEGIN 

	IF(_id > 0) THEN

		SELECT mov.id, mov.name, mov.sinopsis, mov.thumbnail, mov.banner, gen.name as gender, mov.premiere_date, mov.rent_price, mov.sell_price
		FROM movies as mov INNER JOIN genders as gen ON mov.gender_id = gen.id WHERE mov.id = _id;


	ELSE

		SELECT mov.id, mov.name, mov.sinopsis, mov.thumbnail, mov.banner, gen.name as gender, mov.premiere_date, mov.rent_price, mov.sell_price
		FROM movies as mov INNER JOIN genders as gen ON mov.gender_id = gen.id;

	END IF;
	
	
		 
	 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `users` (IN `_id` INTEGER)  BEGIN 

	IF(_id > 0) THEN

		SELECT usr.id, usr.name, usr.email, usr.avatar
		FROM users as usr WHERE usr.id = _id;


	ELSE

		SELECT usr.id, usr.name, usr.email, usr.avatar
		FROM users as usr;

	END IF;
	
	
		 
	 
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carts`
--

CREATE TABLE `carts` (
  `id` int(15) NOT NULL,
  `total` double NOT NULL,
  `pagado` tinyint(1) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart_detail`
--

CREATE TABLE `cart_detail` (
  `carrito_id` int(15) NOT NULL,
  `movies_id` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genders`
--

CREATE TABLE `genders` (
  `id` int(15) NOT NULL,
  `name` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `genders`
--

INSERT INTO `genders` (`id`, `name`, `icon`) VALUES
(1, 'Ciencia ficcion', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movies`
--

CREATE TABLE `movies` (
  `id` int(15) NOT NULL,
  `gender_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `sinopsis` varchar(255) NOT NULL,
  `banner` varchar(255) NOT NULL,
  `thumbnail` varchar(255) NOT NULL,
  `rent_price` double NOT NULL,
  `sell_price` double NOT NULL,
  `premiere_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `movies`
--

INSERT INTO `movies` (`id`, `gender_id`, `name`, `sinopsis`, `banner`, `thumbnail`, `rent_price`, `sell_price`, `premiere_date`) VALUES
(1, 1, 'Interestelar', 'Interstellar (conocida como Interestelar en Hispanoamérica) es una película épica de drama y ciencia ficción británico-estadounidense y canadiense de 2014, dirigida por Christopher Nolan y protagonizada por Matthew McConaughey.', '1.png', '1.png', 50, 200, '2014-10-26'),
(2, 1, 'Spiderman No way Home', 'Tras descubrirse la identidad secreta de Peter Parker como Spider-Man, la vida del joven se vuelve una locura. Peter decide pedirle ayuda al Doctor Extraño para recuperar su vida. Pero algo sale mal y provoca una fractura en el multiverso.', '2.png', '2.png', 25.5, 350, '2020-12-15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(15) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `avatar`) VALUES
(1, 'Manuel Alejandro Chavez Nunez', 'alejandrotsu23@gmail.com', 'MTIzNDU=', 'avatar.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_cart`
--

CREATE TABLE `user_cart` (
  `cart_id` int(15) NOT NULL,
  `user_id` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cart_detail`
--
ALTER TABLE `cart_detail`
  ADD KEY `cart_detail_fk0` (`carrito_id`),
  ADD KEY `cart_detail_fk1` (`movies_id`);

--
-- Indices de la tabla `genders`
--
ALTER TABLE `genders`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `movies_fk0` (`gender_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `user_cart`
--
ALTER TABLE `user_cart`
  ADD KEY `user_cart_fk0` (`cart_id`),
  ADD KEY `user_cart_fk1` (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `genders`
--
ALTER TABLE `genders`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cart_detail`
--
ALTER TABLE `cart_detail`
  ADD CONSTRAINT `cart_detail_fk0` FOREIGN KEY (`carrito_id`) REFERENCES `carts` (`id`),
  ADD CONSTRAINT `cart_detail_fk1` FOREIGN KEY (`movies_id`) REFERENCES `movies` (`id`);

--
-- Filtros para la tabla `movies`
--
ALTER TABLE `movies`
  ADD CONSTRAINT `movies_fk0` FOREIGN KEY (`gender_id`) REFERENCES `genders` (`id`);

--
-- Filtros para la tabla `user_cart`
--
ALTER TABLE `user_cart`
  ADD CONSTRAINT `user_cart_fk0` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`),
  ADD CONSTRAINT `user_cart_fk1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
