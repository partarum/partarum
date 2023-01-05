<?php
namespace Partarum\Service\Binary {

    class FlagWorker {

        protected ?int $flags = NULL;
        
        private array $cache = [];

        public function __construct() {

        }

        public function isFlagSet($flag) : bool {
            return (($this->flags & $flag) === $flag);
        }

        public function setFlags(int $flag, bool $value = FALSE) {

            if($value === TRUE) {
                if(isset($this->flags)) {

                    $this->flags |= $flag;

                } else {

                    $this->flags = $flag;
                }
            } else {
                
                $this->flags &= ~$flag;
            }
        }
    }
}