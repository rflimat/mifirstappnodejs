USE schoolXD;
-- INSERT INTO USUARIO VALUES (1, AES_ENCRYPT('123123', 'cifrando'));

SET GLOBAL log_bin_trust_function_creators = 1;

DROP FUNCTION IF EXISTS validarCredenciales;
DELIMITER $$
CREATE FUNCTION validarCredenciales( CORREO VARCHAR(30), CONTRASENIA VARCHAR(15), HASHPASSWORD VARCHAR(100) ) RETURNS TINYINT BEGIN
	IF (SELECT COUNT(P.CORREO) FROM PERSONA P WHERE P.CORREO = CORREO) > 0 AND (HASHPASSWORD = '@%HKPl5nl7SWba8El9Zqm6nMfi5u$$dX') THEN
		RETURN ( 
			SELECT COUNT(P.ID) 
            FROM PERSONA P INNER JOIN USUARIO U ON P.ID = U.PERSONA  
            WHERE CONTRASENIA = cast(aes_decrypt( U.CONTRASENIA, 'asdfqwerasdf' ) as char )  
            AND P.CORREO = CORREO
		);
	ELSE
		RETURN -1;
    END IF;
END
$$

select validarCredenciales('raulflimat@gmail.com', '123123') as registrado;