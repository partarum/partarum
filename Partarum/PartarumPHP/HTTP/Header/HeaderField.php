<?php
namespace Partarum\HTTP\Header {

    interface HeaderField {

        public static function getOutput(string | int $field) : string | int | bool;
    }
}