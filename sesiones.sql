-- USE schoolXD;
-- INSERT INTO USUARIO VALUES (1, AES_ENCRYPT('12345678', 'cifrando'));

SET GLOBAL log_bin_trust_function_creators = 1;

DELIMITER $$
CREATE FUNCTION validarCredenciales( CORREO VARCHAR(30), CONTRASENIA VARCHAR(15) ) RETURNS TINYINT BEGIN
	IF (SELECT COUNT(P.CORREO) FROM PERSONA P WHERE P.CORREO = CORREO) > 0 THEN
		RETURN ( 
			SELECT COUNT(P.ID) 
            FROM PERSONA P INNER JOIN USUARIO U ON P.ID = U.ID  
            WHERE CONTRASENIA = cast(aes_decrypt( U.CONTRASENIA, 'cifrando' ) as char )  
            AND P.CORREO = CORREO
		);
	ELSE
		RETURN -1;
    END IF;
END
$$

select validarCredenciales('raulflimat@gmail.com', '12345678') as registrado;