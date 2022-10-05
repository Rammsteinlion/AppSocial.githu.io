<?php

$server = 'localhost';
$user='root';
$pass='';
$database='practica';


$con = new mysqli($server,$user,$pass,$database);

if($con-> connect_error){
 die('Conexion Fallida'. $con-> connect_error);
}
    

//echo('Conexion Exitosa');