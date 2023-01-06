<?php
namespace Partarum\Database {

    use JsonException;
    use RuntimeException;

    class DatabaseData {

        private DatabaseDataObject $data;

        private object $dbJSON;

        public function __construct() {

            $this->data = new DatabaseDataObject();

            if(file_exists($_SERVER["DOCUMENT_ROOT"]. "/Partarum/PartarumLorem/.DB.json")){

                try {

                    $dbJSONString = file_get_contents($_SERVER["DOCUMENT_ROOT"]. "/Partarum/PartarumLorem/.DB.json");

                    try {

                        $this->dbJSON = json_decode($dbJSONString, FALSE, 512, JSON_THROW_ON_ERROR);

                        $this->setData();

                    } catch(JsonException $je){

                        print_r($je);
                    }

                } catch(RuntimeException $re){

                    print_r($re);
                }
            } else {
                echo "Datei nicht vorhanden!";
                echo "<br>" . __DIR__;
            }
        }

        private function setData(){

            foreach($this->dbJSON as $key => $value){

                switch ($key) {

                    case "DatabaseType":

                        $this->data->setDatabaseType($value);
                        break;

                    case "DatabaseName":

                        $this->data->setDatabaseName($value);
                        break;

                    case "Host":

                        $this->data->setHost($value);
                        break;

                    case "Username":

                        $this->data->setUsername($value);
                        break;

                    case "Password":

                        $this->data->setPassword($value);
                        break;
                }
            }
        }

        public function getData(){

            return $this->data;
        }
    }
}