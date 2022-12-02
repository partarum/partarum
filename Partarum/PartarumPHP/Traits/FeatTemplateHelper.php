<?php
/**
 *          Copyright 2020 © Alexander Bombis. All rights reserved.
 *          Developed by Alexander Bombis.
 *          Email: email@alexander-bombis.de
 *
 *          The following code was created based on the template for the website http://cordes-software.de.
 *          This may also be used in full by the person or business
 *          representing the domain "cordes-software.de"
 *          and also modified for their use.
 */

trait FeatTemplateHelper
{

    protected function setListOfLinks($array, $language = FALSE)
    {

        foreach ($array as $element => $value) {

            if (empty($value->display)) {

                $navOne = "<li>";
                $navOne .= "<a ";
                $navOne .= "href='{$value->href}' ";

                if ($props = get_object_vars($value)) {

                    if (count($props) > 2) {

                        foreach ($props as $nextAttr => $nextAttrValue) {

                            if (($nextAttr !== "href") && ($nextAttr !== "text")) {

                                $navOne .= $nextAttr . "='" . $nextAttrValue . "'";
                            }
                        }
                    }
                }
                $navOne .= " >";

                if(is_string($value->text)) {

                    $navOne .= $value->text;
                } else {

                    if($language !== FALSE){

                        $navOne .= $value->text->{$language};
                    }
                }

                $navOne .= "</a></li>";

                echo $navOne;
            }
        }
    }

    protected function setHeadline($text, $size, $language){

        $textValue = $this->setLanguage($text, $language);

        $headline = "<h5>".$textValue."</h5>";
        echo $headline;
    }

    protected function setLanguage($item, $language = "de"){

        if(is_string($item)) {

            $string = $item;
        } else {

            $string = $item->{$language};
        }

        return $string;
    }
}