<?php
header('Content-Type: application/json');

// Connessione al database
$servername = "localhost";
$username = "if0_36924256";
$password = "dU1niEbC8AL1";
$dbname = "todo_app";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connessione al database fallita: " . $conn->connect_error);
}

// Query per caricare le task
$todoTasks = [];
$doneTasks = [];

$sql = "SELECT task_text, is_done FROM tasks";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        if ($row['is_done'] == 1) {
            $doneTasks[] = $row['task_text'];
        } else {
            $todoTasks[] = $row['task_text'];
        }
    }
}

// Chiudi la connessione al database
$conn->close();

// Ritorna i dati in formato JSON
echo json_encode([
    'todoTasks' => $todoTasks,
    'doneTasks' => $doneTasks
]);
?>
