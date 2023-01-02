<?php
namespace Partarum\PartarumCLI\System\Base {

    enum Handle : int {

        case USER = 0x0001;
        case GROUP = 0x0002;
        case PROCESS = 0x0004;

        public function read(UserType $type = UserType::PHP) {

            return match($this) {
                Handle::USER => User::read($type),
                Handle::GROUP => Group::read($type)
            };
        }

        public function check() {

        }

        public function create() {

        }

        public function toggle() {

        }

        public function delete() {

        }
    }
}