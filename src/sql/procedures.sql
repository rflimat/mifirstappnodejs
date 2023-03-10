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
