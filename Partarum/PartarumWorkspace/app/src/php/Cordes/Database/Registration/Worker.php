<?php
/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */

namespace Cordes\Database\Registration {

    use stdClass;

    require_once(__DIR__ . "/Columns.php");

    class Worker {

        public string $databaseName = "cs_office";

        public string $table = "customer";

        public object $columns;

        protected array $columnNames;

        public object $types;


        public function __construct(){

            $this->types = new stdClass();

            $this->columns = new Columns();

            $this->setBase();
        }

        protected function setBase(){

            foreach($this->columns as $key => $value){

                $this->types->$key = gettype($this->columns->$key);

                $this->columnNames[] = $key;
            }
        }

        protected function getColumnNames(): array {

            return $this->columnNames;
        }

        public function getQuery($name, $post){

           return  $this->$name($post);

            //$this->queries->country = "SELECT label FROM llx_c_country WHERE code = '".$country."'";
        }

        public function testUser($arg){

            return "SELECT * FROM customer WHERE email='".$arg->email."' AND phone='".$arg->phone."'";
        }

        public function country($country): string {

            return "SELECT label FROM llx_c_country WHERE code = '".$country."'";
        }

        public function number(): string {

            return "SELECT number FROM customer";
        }
    }
}


