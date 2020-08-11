<?php
 $l = $_REQUEST['l'];
 $dbg=true;
 $dbg=false;
 dbgprint($dbg,"getlang.php. l=$l\n");
 $langs = [
	"html",
	"head",
	"title",
	"base",
	"link",
	"meta",
	"style",
	"script",
	"noscript",
	"body",
	"section",
	"nav",
	"article",
	"aside",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"header",
	"footer",
	"address",
	"p",
	"hr",
	"br",
	"pre",
	"dialog",
	"blockquote",
	"ol",
	"ul",
	"li",
	"dl",
	"dt",
	"dd",
	"a",
	"q",
	"cite",
	"em",
	"strong",
	"small",
	"mark",
	"dfn",
	"abbr",
	"time",
	"progress",
	"meter",
	"code",
	"var",
	"samp",
	"kbd",
	"sub",
	"sup",
	"span",
	"i",
	"b",
	"bdo",
	"ruby",
	"rt",
	"rp",
	"ins",
	"del",
	"figure",
	"img",
	"iframe",
	"embed",
	"object",
	"param",
	"video",
	"audio",
	"source",
	"canvas",
	"map",
	"area",
	"table",
	"caption",
	"colgroup",
	"col",
	"tbody",
	"thead",
	"tfoot",
	"tr",
	"td",
	"th",
	"form",
	"fieldset",
	"label",
	"input",
	"button",
	"select",
	"datalist",
	"optgroup",
	"option",
	"textarea",
	"output",
	"details",
	"command",
	"bb",
	"menu",
	"legend",
	"div"
];
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
