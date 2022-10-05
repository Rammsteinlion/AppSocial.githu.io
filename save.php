<?php
require_once 'database.php';

$fieldsempty=true;

$name = htmlspecialchars($_POST['name']);
$email = htmlspecialchars($_POST['email']);
$password = htmlspecialchars($_POST['password']);
$cpassword = htmlspecialchars($_POST['cpassword']);

if($password == $cpassword){
    $pass =  htmlspecialchars(sha1($_POST['password']));
}



if (empty($name)) {
   // echo  json_encode(['false' => 'debes especificar el nombre']). '</br>';
   echo $fieldsempty = false;
}

if (empty($email)) {
    //echo  json_encode(['false' => 'debes especificar el email']). '</br>';
    echo $fieldsempty = false;
}

if (empty($password)) {
    //echo json_encode(['false' => 'debes especificar la password']). '</br>';
    echo $fieldsempty = false;
}


if($fieldsempty == true){
    $sql = "SELECT email FROM signup Where email = '$email' ";
$result = $con->query($sql);

if ($result->num_rows > 0) {
    echo json_encode(['success' => 'false', 'error' => 'Ya existe el usuario']);
}else{
    $save = "INSERT INTO signup(name,email,password,created_at) Values('$name','$email','$pass', now())";

if ($con->query($save) == true) {
    echo json_encode(['success' => 'true', 'save'=>'Guardado con exito']);
} else {
    echo  json_encode(['false' => 'Error al guardar']) . $con->error;
}
}
}else{
    echo  json_encode(['false' => 'campos vacios']) . $con->error;
}





/*
$filteremail = filter_var($datos['email'], FILTER_VALIDATE_EMAIL);

if($filteremail ==false || empty($datos['email'])){
    $aErrores[] = json_encode(['success' => 'falses']);
}

if(empty($datos['name'])){
    $aErrores[] = "Debes especificar el nombre";
}

// Si han habido errores se muestran, sino se mostrán los mensajes
if( count($aErrores) > 0 )
{
    echo "<p>ERRORES ENCONTRADOS:</p>";
    // Mostrar los errores:
    for( $contador=0; $contador < count($aErrores); $contador++ )
        echo $aErrores[$contador]."<br/>";
}*/


/*if(strlen($name >=7)){
    echo('El NOmbre es muy largo');
}else{
    if(isValid($name) !==0){
        echo('FUNCIONa');
    }else{
        echo json_encode(['success' => 'false']);
    }

    if(isValidemail($email)){
        echo('FUNCIONa email');
    }else{
        echo json_encode(['success' => 'false']);
    }
}*/

function isValidemail($email)
{
    $pattern = "/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i";
    return preg_match($pattern, $email);
}


function isValid($text)
{
    $pattern = "/^[a-zA-Z\sñáéíóúÁÉÍÓÚ]{5,}$/";
    return preg_match($pattern, $text);
}
