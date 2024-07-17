<?php
// Connessione al database
$servername = "localhost";
$username = "if0_36924256";
$password = "dU1niEbC8AL1";
$dbname = "todo_app";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connessione al database fallita: " . $conn->connect_error);
}

// Prendi i dati dalla richiesta POST
$data = json_decode(file_get_contents("php://input"));
$taskText = $data->taskText;
$isDone = $data->isDone;

// Prepara e esegui l'aggiornamento dello stato della task nel database
$stmt = $conn->prepare("UPDATE tasks SET is_done = ? WHERE task_text = ?");
$stmt->bind_param("is", $isDone, $taskText);
$stmt->execute();

// Chiudi la connessione al database
$stmt->close();
$conn->close();
?>
