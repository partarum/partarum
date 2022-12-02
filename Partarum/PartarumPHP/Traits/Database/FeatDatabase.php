<?php
namespace Partarum\Database {


    trait FeatDatabase{

        public function getTableMission($item, $mission)
        {

            if ((isset($mission)) && ($mission != "self")) {

                if (isset($item["table"])) {
                    $tableName = $item["table"];
                }

                if (isset($item["select"])) {
                    $setSelect = $item["select"];
                }
            }

            switch ($mission) {
                case "base":
                    $sqlMission = "SELECT $setSelect FROM $tableName";
                    break;
                    /*
                case "newSelect":
                    $sqlMission = "SELECT $setSelect AS $setNewSelect FROM $tableName";
                    break;
                    */
                case "self":
                    $sqlMission = $item;
                    break;
            }
            return $sqlMission;
        }

        public function mysqlBase(){

            // SQL-Befehl ausf�hren
            $version = $this->dbase->query("SELECT version() AS version");
            $tables = $this->dbase->query("SHOW  FULL TABLES FROM ");
            //$info = $this->dbase->query("SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA LIKE bombisa;");

            //var_dump($tables);

            //$list_tables_sql = "SHOW TABLES FROM usr_web832_1";
            //$result = self::$dbase->query($list_tables_sql);
            //$tables = array($result->num_rows);
            //echo "Enthaltene Tabellen: ".array_sum($tables)."\n";
            //var_dump($result);
            // Antwort der Datenbank in ein Objekt �bergeben
            $resultVersion = $version->fetch_object();
            //$resultTables	= $info->fetch_object();
            //$resultTables	= json_encode($resultTables);
            $resultVersion = json_encode($resultVersion);
            //var_dump($resultVersion);
            //var_dump($resultTables);
            //return $result;
        }

        public function createUser($item)
        {
            $user = $item[0];
            $password = $item[1];
            $sql_befehl = "GRANT ALL PRIVILEGES ON *.* TO '" . $user . "'@'localhost' IDENTIFIED BY '" . $password . "' WITH GRANT OPTION";
            if ($this->dbase->query($sql_befehl)) {
                $result = true;
            } else {
                $result = false;
            }
            return $result;
        }

        public function createDatabase($item)
        {
            $sql_befehl = "CREATE DATABASE IF NOT EXISTS $item";

            if ($this->dbase->query($sql_befehl)) {
                // Meldung bei erfolgreicher Erstellung der Datenbank
                echo "Datenbank erfolgreich angelegt.";
                return true;
            } else {
                // Meldung bei Fehlschlag
                echo "Datenbank konnte nicht angelegt werden!";
                return false;
            }
        }

        public function showDatabase($item = true)
        {
            /*
            true == alle Datenbanken, ist immer, auch ohne Angabe
            false == keine systembezogenen Datenbanken, muss angegeben werden
            string == suchen nach einer bestimmten Datenbank, muss mitgegeben werden
            array mit strings == suchen bestimmter Datenbanken, muss mitgegeben werden
            */

            $mysqlSystemDatabases = ["information_schema", "cdcol", "mysql", "performance_schema", "phpmyadmin"];
            $databases = $this->read("SHOW DATABASES");

            $GLOBALS["argument"] = $item;


            if (($item === true) && (is_bool($item) === true))        // wenn true
            {
                $result = array_map(function ($x) {
                    return $x[0];
                }, $databases);
            } else {
                if (($item === false) && (is_bool($item) === true))        // wenn false
                {
                    $result = array_values(array_diff(array_map(function ($x) {
                        return $x[0];
                    }, $databases), $mysqlSystemDatabases));
                } else {
                    if (is_string($item) === true)        // wenn String
                    {
                        $getResult = array_filter($databases, function ($x) {
                            if ($x[0] == $GLOBALS["argument"]) {
                                return $x[0];
                            }
                        });

                        if (count($getResult) > 0) {
                            $result = array_values($getResult)[0][0];
                        } else {
                            $result = false;
                        }
                    } elseif (is_array($item) === true)    // wenn Array
                    {
                        $getResult = array_filter($databases, function ($x) {
                            if (in_array($x[0], $GLOBALS["argument"])) {
                                return $x[0];
                            }
                        });
                        $result = array_values(array_map(function ($x) {
                            return $x[0];
                        }, $getResult));
                    }
                }
            }

            return $result;
        }

        public function getUser($itemUser = TRUE, $itemRow = TRUE)
        {
            /*only root!!!!*/
            /*
            true, true = alle User und alle dazugeh�rigen Spalten
            true, false = alle User, aber keine weiteren Spalten
            string, true = ein User, alle dazugeh�rigen Hosts und alle Spalten
            string, false = selbst geschriebenes SQL
            string, string = ein User und eine auserw�hlte Spalte
            string, array = ein User und mehrere auserw�hlte Spalten
            array, true = mehrere User und alle Spalten
            array, false = check ob es die User gibt
            array, string = mehrere User und auserw�hlte Spalte
            array, array = mehrere User und mehrere auserw�hlte Spalten

            */
            if (($itemUser === true) && (is_bool($itemUser) === true)) {

                if (($itemRow === true) && (is_bool($itemRow) === true)) {

                    $getUser = $this->read("SELECT * FROM  user");

                } elseif (($itemRow === false) && (is_bool($itemRow) === true)) {

                    $getUser = $this->read("SELECT user FROM user");
                }
            } elseif (is_string($itemUser) === true) {

                if (($itemRow === true) && (is_bool($itemRow))) {

                    $getUser = $this->read("SELECT * FROM '" . $itemUser . "'");

                } elseif (($itemRow === false) && (is_bool($itemRow))) {

                    $getUser = $this->read($itemUser);

                } elseif (is_string($itemRow) === true) {

                    $getUser = $this->read("SELECT '" . $itemRow . "' FROM '" . $itemUser . "'");

                } elseif (is_array($itemRow) === true) {

                    $rowString = implode(", ", $itemRow);
                    $getUser = $this->read("SELECT '" . $rowString . "' FROM '" . $itemUser . "'");
                }
            } elseif (is_array($itemUser) === true) {

                $userString = implode(", ", $itemUser);

                if (($itemRow === true) && (is_bool($itemRow))) {

                    $getUser = $this->read("SELECT * FROM '" . $userString . "'");

                } elseif (($itemRow === false) && (is_bool($itemRow) === false)) {

                    $getUser = $this->read();

                } elseif (is_string($itemRow) === true) {

                    $getUser = $this->read("SELECT '" . $itemRow . "' FROM '" . $userString . "'");

                } elseif (is_array($itemRow) === true) {

                    $rowString = implode(", ", $itemRow);
                    $getUser = $this->read("SELECT '" . $rowString . "' FROM '" . $userString . "'");
                }
            }
            /*
            $sqlUsers = "SELECT user FROM user WHERE Host = 'localhost'";
            $getUsers = parent::read($sqlUsers);
            $getSvenskandaUser = self::filterSvenskanda($getUsers);

                if(count($getSvenskandaUser) == 0)
                {
                $createUserSvenskanda = parent::createUser([""]);
                $getNewUsers = parent::read($sqlUsers);
                }
            */
            return $getUser;
        }

        /*
       $sql = "CREATE TABLE user (\n"
           . " user_id INT NOT NULL auto_increment,\n"
           . " firstName CHAR(100) NOT NULL,\n"
           . " lastName CHAR(100) NOT NULL,\n"
           . " startDateComplete TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, \n"
           . " startDate DATE NOT NULL, \n"
           . " startTime TIME NOT NULL,\n"
           . " PRIMARY KEY(user_id)) ENGINE=InnoDB DEFAULT CHARSET=latin1";

       */

        public function createTable($item)
        {
            if (true === isset($item["name"])) {

                $tableName = $item["name"];
            }

            $sql_befehl = "CREATE TABLE IF NOT EXISTS anders (
                        id INT(11) NOT NULL AUTO_INCREMENT,
                        name VARCHAR(50) DEFAULT NULL,
                        bevdichte FLOAT DEFAULT NULL,
                        PRIMARY KEY (id))";

            if ($this->dbase->query($sql_befehl)) {

                // Meldung bei erfolgreicher Erstellung der Datenbanktabelle
                $result = json_encode(["Tabelle wurde angelegt"]);
                return $result;

            } else {

                // Meldung bei Fehlschlag
                $result = json_encode(["Tabelle konnte nicht angelegt werden!"]);
                return $result;
            }
        }
    }
}