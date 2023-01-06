<?php
namespace Partarum\PartarumCLI\System\Base {

    class User {

        public static function create() {

        }

        public static function read(UserType $userType) : array {

            $result = [];

            switch ($userType) {

                case UserType::ROOT:
                        // posix
                    $result = posix_getpwuid(0);
                    break;
                case UserType::PHP:
                        // php
                    $result = [
                        "file" => posix_getpwuid(filegroup(__FILE__)),
                        "currentUser" => get_current_user(),
                        "phpInfo" => posix_getpwuid(getmyuid())
                    ];
                    break;
                case UserType::SHELL:
                    // aktuell eingeloggte User - posix
                    $result = posix_getpwuid(posix_getgid());
                    break;
                case UserType::CHECK:
                        // posix und php
                    $result = [
                        "root" => posix_getpwuid(0),
                        "php" => [
                            "file" => posix_getpwuid(filegroup(__FILE__)),
                            "currentUser" => get_current_user(),
                            "phpInfo" => posix_getpwuid(getmyuid())
                        ],
                        "shell" => posix_getpwuid(posix_getgid())

                    ];

            }

            return $result;
        }

        public static function change() {

        }
    }
}