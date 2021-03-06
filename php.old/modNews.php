<?php
require_once('lib/jwt_helper.php');

$data = json_decode(file_get_contents("php://input"));
$token = $data->token;
$token = JWT::decode($token, $_SERVER['SECRET_KEY']);

if ($token->admin){
  $database = new SQLite3('../sqlite/newsdb.db');
  $id = $database->escapeString($data->id);
  $title = $database->escapeString($data->title);
  $body = $database->escapeString($data->text);
  $author = $database->escapeString($data->user);
  $tags = $data->tags;

  $sql ="UPDATE NEWS
         SET title = '$title', body = '$body', author = '$author'
         WHERE id='$id'";

  $ret = $database->exec($sql);
  if(!$ret){
    echo $database->lastErrorMsg();
  } else {
    $database->exec("DELETE FROM TAGS WHERE news_id=$id");
    foreach ($tags as $tag){
      $database->exec("INSERT INTO TAGS (name,news_id) VALUES ('$tag',$id)");
    }
    echo "success";
  }
}else
  echo "token is not valid";
?>
