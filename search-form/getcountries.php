<?php
 $l = $_REQUEST['l'];
 $dbg=true;
 $dbg=false;
 dbgprint($dbg,"getlang.php. l=$l\n");
 $langs = ;
$ans = [];
foreach($langs as $lang) {
 if (startsWith($lang,$l)) {
  $ans[] = $lang;
 }
}
$json = json_encode($ans);
echo "$json";

function dbgprint($dbg,$text) {
 if (!$dbg) {return;}
 $filename = "dbg_apidev.txt";
 $fp1 = fopen($filename,"a");
 fwrite($fp1,"$text");
 fclose($fp1);
}
function startsWith ($string, $startString) 
{ 
    $len = strlen($startString); 
    return (substr($string, 0, $len) === $startString); 
} 
?>
