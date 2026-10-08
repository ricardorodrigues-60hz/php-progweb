<?php
include './conexao.php';


$total = mysqli_fetch_array($conn->query("select count(*) from categoria"));

$sql = "select descricao, count(codAssociado) total from categoria, associado 
where categoria.codcategoria = associado.categoria group by categoria.codcategoria";
$result = $conn->query($sql);

$rows = mysqli_fetch_all($result, MYSQLI_ASSOC);

$conn->close();

header("Content-type: application/json");
echo json_encode(['data'=>$rows]);
?>
