<?php

include "./conexion.php";
$pdo = new Conexion();
$con = $pdo->Conectar();

// RECIBIR PARAMETROS DE AXIOS
$_POST = json_decode(file_get_contents("php://input"), true);

// OPCIONES:  EDITAR. ELIMINAR
$opciones = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

// PARAMETROS
$id = htmlspecialchars((isset($_POST['id'])) ? $_POST['id'] : '');
$nombre = htmlspecialchars((isset($_POST['nombre'])) ? $_POST['nombre'] : '');
$apellido = htmlspecialchars((isset($_POST['apellido'])) ? $_POST['apellido'] : '');
$edad = htmlspecialchars((isset($_POST['edad'])) ? $_POST['edad'] : '');
$fechanacimiento = htmlspecialchars((isset($_POST['fechanacimiento'])) ? $_POST['fechanacimiento'] : '');

switch ($opciones) {
    case 1: // INSERTAR
        $consulta = "INSERT INTO CLIENTES (nombre,apellido,edad,fechanacimiento) VALUES('$nombre','$apellido','$edad','$fechanacimiento');";
        $resultado = $con->prepare($consulta);
        $resultado->execute();
        break;
    case 2:// ACTUALIZAR
        $consulta = "UPDATE CLIENTES SET nombre='$nombre',apellido='$apellido',edad='$edad',fechanacimiento='$fechanacimiento' WHERE id=$id;";
        $resultado = $con->prepare($consulta);
        $resultado->execute();
        $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 3:// ELIMINAR
        $consulta = "DELETE FROM CLIENTES WHERE id=$id;";
        $resultado = $con->prepare($consulta);
        $resultado->execute();
        break;
    case 4:// LISTAR
        $consulta = "SELECT id,nombre,apellido,edad,fechanacimiento,YEAR(fechanacimiento) as anio FROM CLIENTES;";
        $resultado = $con->prepare($consulta);
        $resultado->execute();
        $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}

print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion = NULL;
