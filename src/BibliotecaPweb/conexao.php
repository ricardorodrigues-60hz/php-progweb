<?php
    $servername = 'localhost';
    $username = 'fatec';
    $password = 'fatec2021';
    $dbname = 'bibliotecapweb';

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Falha na conexão: " . $conn->connect_error);
    }
?>