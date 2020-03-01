<?php

$conn = new mysqli('localhost', 'root', 'root', 'uptask');

//Para comprobar la conexion a la base de datos
/*
echo "<pre>";
var_dump($conn);
echo "</pre>";
*/

//para verificar la conexion a la base de datos, si no retorana ningun mensaje en la cabecera entonces la conexion
//fue exitosa, en caso contrario retorna un error de know de database
if($conn->connect_error){
    echo $conn->connect_error;
}

$conn ->set_charset('utf8');
