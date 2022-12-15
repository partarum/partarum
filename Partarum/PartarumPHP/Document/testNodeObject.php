<?php
error_reporting(-1);
ini_set("display_errors", 1);

//include $_SERVER["DOCUMENT_ROOT"]."\\office\\bin\\Autoloader.php";

include '../../traits/HTML/FeatHTMLAttributes.php';
include 'HTMLAttribute.php';
include 'HTMLDocument.php';
include 'HTMLElement.php';
include 'HTMLSeries.php';
include 'HTMLFamily.class.php';

$html = new HTMLDocument();

$wrapper = new HTMLElement("div", $html->body);
$wrapper->id = "wrapper";
$wrapper->onclick = "alert('Fuck YOU!!!');";
$wrapper->text = "Ich bin der Wrapper!!!";
$html->wrapper = $wrapper;

$head_0 = new HTMLElement("header", $wrapper);
$head_0->id = "head_0";
$html->head_0 = $head_0;

$head_0_Section = new HTMLSeries("section", $html->head_0);
$head_0_Section->quantity = 2;
$head_0_Section->id = ["head_0_TitleBox", "head_0_NavBox"];

/*
Ausgabe HTMLSeries

  ->nodes || ->node[n]
  ->items || ->item[n]
  ->elements || ->element[n]
*/
/*
$nav = new HTMLElement("nav", $head_0->children[1]);
$nav->id = "mainNavigation";

$navUl = new HTMLFamily("ul", $nav);
$navUl->setChildren("li", 5);
*/

$nav = new HTMLFamily("nav", $head_0->children[1]);
$nav->id = "mainNavigation";
$nav->setChildren("ul", 1);
$nav->children[0]->id = "navUL";
$nav->setChild("ul");
$nav->setGrandChildren("li", 0, 5);
$nav->setGrandChild("li", 0);

$html->set();
?>
