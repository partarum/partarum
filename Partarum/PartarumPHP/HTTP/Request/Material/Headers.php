<?php
/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */
namespace Partarum\HTTP\Request\Material {

    class Headers {


        public array $headers = [
            "css" => [
                "content" => "text/css"
                ],
            "js" => [
                "content" => "application/javascript"
            ],
            "html" => [
                "content" => "text/html"
            ],
            "txt" => [
                "content" => "text/plain"
            ],
            "png" => [
                "content" => "image/png"
            ],
            "jpg" => [
                "content" => "image/jpg"
            ],
            "webp" => [
                "content" => "image/webp"
            ],
            "woff" => [
                "content" => "application/x-font-woff"
            ],
            "woff2" => [
                "content" => "application/x-font-woff"
            ],
            "zip" => [
                "content" => "application/zip"
            ]
        ];

        public string $ext;

        public const CONTENT = "Content-Type: ";

        public const CACHE_CONTROL = "Cache-Control: ";

        public function __construct($ext){

            $this->ext = $ext;

            $this->setContent();

        }

        public static function setHeader(string $ext): Headers {

            return (new Headers($ext));
        }

        protected function setContent(): void {

            if($this->ext !== '') {

                if(array_key_exists($this->ext, $this->headers)) {

                    header(self::CONTENT . $this->headers[$this->ext]["content"]);
                }
            }
        }

        public function setCacheControl(string $type, $age): void {

            if($age === null) {

                header(self::CACHE_CONTROL . $type);

            } else if (is_int($age)){

                header(self::CACHE_CONTROL . $type . ", max-age={$age}");
            }
        }

        public function setContentDisposition($realURL): void {

            header('Content-Disposition: inline; filename="'.basename($realURL).'"');
        }
    }
}

