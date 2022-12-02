<?php
namespace Partarum\PartarumCLI\System\Filesystem {

    enum PartarumType : int {

        case PARTARUM = 0x0001;
        case PARTARUM_API = 0x0002;
        case PARTARUM_CLI = 0x0004;
        case PARTARUM_CONFIG = 0x0008;
        case PARTARUM_CSS = 0x0010;
        case PARTARUM_INTERN = 0x0020;
        case PARTARUM_JS = 0x0040;
        case PARTARUM_LOG = 0x0080;
        case PARTARUM_LOREM = 0x0100;
        case PARTARUM_PHP = 0x0200;
        case PARTARUM_TEMPLATES = 0x0400;
        case PARTARUM_WORKSPACE = 0x0800;

        public function getPath() : string{

            return "";
        }
    }
}