<?php
$data = json_decode(file_get_contents("php://input"));
$database = new SQLite3('../sqlite/newsdb.db');

$title = $database->escapeString($data->title);
$body = $database->escapeString($data->text);
$author = $database->escapeString($data->user);
$date = time()*1000;

$sql ="INSERT INTO news (TITLE,BODY,AUTHOR,DATE_CREATE) VALUES ('$title','$body','$author','$date')";

 /*INSERT INTO news (TITLE,BODY,AUTHOR,DATE_CREATE)
 VALUES ($POST['title'],$POST['body'],$POST['uthor'],$POST['bdaytime']);
*/
$database = new SQLite3('../sqlite/newsdb.db');

$ret = $database->exec($sql);
if(!$ret){
  echo $database->lastErrorMsg();
} else {
  echo "success";
}

?>
