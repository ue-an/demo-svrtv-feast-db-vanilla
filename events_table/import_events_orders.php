<?php
require '../function/import_function.php';
$conn = $conn;
$table = "events_orders";
$filename = 'file-events-orders';
$idprefix = "eventid-";
$result = importFunction($conn, $table, $filename, $idprefix);
echo $result;
?>