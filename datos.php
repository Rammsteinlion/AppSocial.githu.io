if($email ==''){
    echo  json_encode('llena todos los campos');
}else{
     /*echo json_encode($email).'</br>';
     echo json_encode($password).'</br>';
     echo json_encode($cpassword).'</br>';*/

     $data = existuser($email,$pdo);

     die($data);

     /*if($password != $password){
        return json_encode('Las contraseñas no coinciden');
     }
     
     //encriptar la contraseña
     $pasbycrp = hash('sha512', $password);

     $sql = 'INSERT INTO campos (name,email,password) VALUES(?,?,?)';
     $pdo->prepare($sql)->execute([$name,$email,$pasbycrp]);

     if($pdo){
         echo json_encode([
            'success' => true,
        ]);
     }else{
        echo json_encode([
            'success' => false,
        ]);
     }*/
}


class Password {
    public static function hash($password) {
        return password_hash($password, PASSWORD_BCRYPT, ['cost' => 15]);
    }
    public static function verify($password, $hash) {
        return password_verify($password, $hash);
    }
}


function existuser($email,$pdo){
    $consulta = $pdo->prepare("SELECT email FROM signup WHERE email = :$email");
    $consulta->bindParam(":email", $email);
    $consulta->execute();
    if($consulta->fetchColumn() > 0){
        echo("EXISTE");
    }else{
        echo("No existe");
    }
}