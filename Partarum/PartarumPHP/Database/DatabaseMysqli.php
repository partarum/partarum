<?php
namespace Partarum\Database {

    use Generator;
    use mysqli as mysqli;
    //use Partarum\Database\FeatDatabase;

    /*
     *  Read und Write auf prepare umschreiben!!!!
     *
     *  Noch eine zweite Klasse erstellen, welche die original Mysqli - Klasse erbt
     *
     */

    class DatabaseMysqli
    {
        use FeatDatabase;

        public mysqli $dbase;
        public $request;

        private string $host;
        private string $username;
        private string $password;
        private string $database;

//-------------------------------------------------------------------------------------

        public function __construct($item = TRUE) {

        }

        public function setData(){

        }

        /**
         * @return string
         */
        public function getHost() : string {

            return $this->host;
        }

        /**
         * @param string $host
         */
        public function setHost(string $host) : void {

            $this->host = $host;
        }

        /**
         * @return string
         */
        public function getUsername() : string {

            return $this->username;
        }

        /**
         * @param string $user
         */
        public function setUsername(string $username) : void {

            $this->username = $username;
        }

        /**
         * @return string
         */
        public function getPassword() : string {

            return $this->password;
        }

        /**
         * @param string $password
         */
        public function setPassword(string $password) : void {

            $this->password = $password;
        }

        /**
         * @return string
         */
        public function getDatabase() : string {

            return $this->database;
        }

        /**
         * @param string $database
         */
        public function setDatabase(string $database) : void {

            $this->database = $database;
        }



        public function open(?array $item = NULL) {

            if (!isset($item)) {

                session_start();

                $this->dbase = mysqli_init();

                if (!$this->dbase) {
                    $_SESSION["dbase"] = FALSE;
                }

                /*
                if (!$this->dbase->options(MYSQLI_INIT_COMMAND, 'SET AUTOCOMMIT = 0')) {
                    $_SESSION["optionAutocomit"] = FALSE;
                }
                */

                if (!$this->dbase->options(MYSQLI_OPT_CONNECT_TIMEOUT, 10)) {

                    $_SESSION["optionConnectTimeout"] = FALSE;
                }

                if (!$this->dbase->options(MYSQLI_OPT_READ_TIMEOUT, 10)){

                    $_SESSION["optionReadTimeout"] = FALSE;
                }

                $this->dbase->real_connect($this->host, $this->username, $this->password, $this->database);

            } else {

                $this->dbase = new mysqli($item[0], $item[1], $item[2], $item[3]);
            }


            if ($this->dbase->connect_errno) {

                $_SESSION["dbaseError"] = $this->dbase->connect_error;

                session_write_close();

                return FALSE;

            } else {

                unset($_SESSION["dbaseError"]);
                unset($_SESSION["counter"]);

                session_write_close();

                return TRUE;
            }

        }

        public function realEscape($item){

            $pureItem = (is_array($item)) ? $item : [$item];

            foreach($pureItem as $key => $value) {

                $escItem = $this->dbase->real_escape_string($value);

                yield $key => $escItem;
            }
        }


        /*
        1. "SELECT"  = ["ALL", "DISTINCT", "DISTINCTROW", "HIGH_PRIORITY", "STRAIGHT_JOIN", "SQL_SMALL_RESULT", "SQL_BIG_RESULT",
                                        "SQL_BUFFER_RESULT", "SQL_CACHE", "SQL_NO_CACHE", "SQL_CALC_FIND_ROWS"];
        2. "FROM" = ["table_name",.......];
        3. "WHERE" = [];
        4. "GROUP" = [];	 // col_name | expr | position  // ["ASC" | "DESC"], ...... ["WITH ROLLUP"]
        5. "HAVING" = [];
        6. "ORDER BY" = [];	 // col_name | expr | position  // ["ASC" | "DESC"], ...... []
        7. "LIMIT" = [];
        */

        public function read($item, string $mode = "both", $column = false) : Generator {

            $query = (is_array($item)) ? $item : [$item];

            $counter = 1;
            $counterGoal = count($query);

            $fetchMode = match($mode){
                "both" => MYSQLI_BOTH,
                "num" => MYSQLI_NUM,
                "assoc" => MYSQLI_ASSOC
            };

            foreach($query as $key => $value) {

                $result = $this->dbase->query($value);

                if (($result) && ($column === false)) {

                   // print_r($result);

                    if ($result->num_rows !== 0) {

                        $setResult = ($result->num_rows > 1) ? [] : "";

                        for ($i = 0; $i < $result->num_rows; $i++) {

                            if(is_array($setResult)) {
                                $setResult[] = $result->fetch_array($fetchMode);
                            }else{
                                $setResult = $result->fetch_array($fetchMode);
                            }
                            //print_r($setResult);
                        }

                        if($counterGoal === $counter){

                            $result->close();
                        }else{

                            $counter++;
                        }

                    } else {

                        $setResult = false;
                    }

                    yield $key => $setResult;

                } else {

                    if(($result) && ($column === true)){

                        // fetch->column() ab PHP8.1
                        yield $result->fetch_row();
                    } else {
                        yield FALSE;
                    }
                }
            }
        }

        public function write($item){

            $sql_mission = $item;

            if ($this->dbase->query($sql_mission) === TRUE) {

                //echo "erfolgreich in die Datenbank geschrieben";

                return TRUE;
            } else {

                if ($this->dbase->connect_error) {
                    die('Connect Error (' . $this->dbase->connect_errno . ') '
                        . $this->dbase->connect_error);
                }

                echo "hier ist etwas schief gelaufen";

                return FALSE;
            }
        }

        public function writeWithParams($query, $valueArray, $types) : bool {

            $stmt = $this->dbase->prepare($query);

            $stmt->bind_param($types, ...$valueArray);

            $stmt->execute();

            $result = $stmt->sqlstate === "00000";

            //echo "<pre>";
            //print_r($stmt);

            $stmt->close();

            return $result;
        }

        public function close()
        {
            $this->dbase->close();
        }
    }
}
