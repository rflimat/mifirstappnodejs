SELECT * FROM schoolxd.usuario;
INSERT INTO USUARIO VALUES (2, 14, aes_encrypt('123123','asdfqwerasdf'));
select cast(aes_decrypt(contrasenia,'asdfqwerasdf') as char) from usuario where id = 2;