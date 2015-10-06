<?php

$img = $_POST['img'];
$img = substr($img, strpos($img, ',') + 1);
$img = str_replace(' ', '+', $img);
$img = base64_decode($img);
file_put_contents('test.png', $img);
