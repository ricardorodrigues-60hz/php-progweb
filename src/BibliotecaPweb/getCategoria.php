<?php
include 'conexao.php';
$ini = isset($_GET['page'])?($_GET['page']-1)*10:0;

$filtro = isset($_GET['filtro'])?$_GET['filtro']:'';

$total = mysqli_fetch_array($conn->query("select count(*) from categoria where descricao like '%".$filtro."%'"));

$sql = "SELECT * FROM categoria where descricao like '%".filtro."%' order by codcategoria asc limit ".$ini.", 10";

$result = $conn->query($sql);

$rows = mysqli_fetch_all($result, MYSQLI_ASSOC);

$conn->close();

header('Content-type: application/json');
echo json_encode(['data' => $rows, "total" => $total[0]]);
?>