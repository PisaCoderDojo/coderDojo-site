<?php
$data = json_decode(file_get_contents("php://input"));
$title = $data->title ;
$body = $data->text ;
$author = $data->user;
$date = '23/23/1999';

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
