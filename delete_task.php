<?php
header('Content-Type: application/json');

// Connessione al database
$servername = "localhost";
$username = "your_db_username";
$password = "your_db_password";
$dbname = "todo_app";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connessione al database fallita: " . $conn->connect_error);
}

// Prendi i dati dalla richiesta POST
$data = json_decode(file_get_contents("php://input"));
$taskText = $data->taskText;

// Prepara e esegui la cancellazione della task nel database
$stmt = $conn->prepare("DELETE FROM tasks WHERE task_text = ?");
$stmt->bind_param("s", $taskText);
$stmt->execute();

// Chiudi la connessione al database
$stmt->close();
$conn->close();
?>
