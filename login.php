<?php 

require_once 'database.php';

session_start();

$fieldsempty=true;

$email = htmlspecialchars($_POST['email']);
$password = htmlspecialchars(sha1($_POST['password']));

if (empty($email)) {
    echo $fieldsempty = false;
}

if (empty($password)) {
    echo $fieldsempty = false;
}

if($fieldsempty == true){
    $sql = "SELECT email,password FROM signup Where email = '$email' and password ='$password' LIMIT 1";
    $result = $con->query($sql);

    if($result->num_rows > 0){
        //echo  json_encode(['success' => 'false','exist' => 'Ya existe el usuario']);
        echo  json_encode(['success' => 'true']);
        $_SESSION['user']=$sql;
    }else{
        echo  json_encode(['success' => 'false','exist' => 'Este correo no se encuentra registrado']);
    }
}