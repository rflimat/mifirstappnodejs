DELIMITER //
CREATE PROCEDURE listarCursos()
BEGIN
	SELECT *FROM curso;
END
//

CALL listarCursos();

DELIMITER //
CREATE PROCEDURE listarCurso(
	IN _id INT
)
BEGIN
	SELECT *FROM curso WHERE id=_id;
END
//

CALL listarCurso(1);

DELIMITER //
CREATE PROCEDURE filtrarCursosNombre (
	IN _nombre VARCHAR(62)
)
BEGIN
	SELECT *FROM curso WHERE nombre LIKE CONCAT('%', _nombre, '%');
END
//

DELIMITER //
CREATE PROCEDURE listarPersonas (
)
BEGIN
	SELECT *FROM persona;
END
//

DELIMITER //
CREATE PROCEDURE listarUsuarios (
)
BEGIN
	SELECT *FROM persona WHERE id=1;
END
//

DELIMITER //
CREATE PROCEDURE listarDocentes (
)
BEGIN
	SELECT *FROM persona WHERE id=1;
END
//

DELIMITER //
CREATE PROCEDURE listarEstudiantes (
)
BEGIN
	SELECT *FROM persona WHERE id BETWEEN 2 AND 13;
END
//

DROP FUNCTION IF EXISTS registrarPersona;
DELIMITER //
CREATE FUNCTION registrarPersona (
	_nombre VARCHAR(50),
    _apellido1 VARCHAR(50),
    _apellido2 VARCHAR(50),
    _dni VARCHAR(8),
    _correo VARCHAR(30),
    _celular VARCHAR(13)
) RETURNS TINYINT
BEGIN
    IF (SELECT COUNT(DNI) FROM persona WHERE DNI=_dni) <= 0 AND (SELECT COUNT(CORREO) FROM persona WHERE CORREO=_correo) <= 0 THEN
		INSERT INTO persona(nombre, apellido1, apellido2, dni, correo, celular) VALUES (_nombre, _apellido1, _apellido2, _dni, _correo, _celular);
		RETURN 1;
    ELSE
		RETURN 0;
	END IF;
END
//

