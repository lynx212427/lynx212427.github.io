<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
 
  $date = $_POST['date'];
  $note = $_POST['note'];

 
  if ($date && $note) {
    file_put_contents("notes.txt", "$date: $note\n", FILE_APPEND);
    echo json_encode(['status' => 'success']);
  } else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
  }
}
?>