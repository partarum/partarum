<?php
namespace Partarum\Database {

    use mysqli;
    use Partarum\Security\SessionWorker;
    use Partarum\Service\Binary\FlagWorker;
    use Partarum\Database\DatabaseData;
    use Partarum\Database\DatabaseDataObject;

    class CacheConnect extends FlagWorker {

        public const SESSION = 2;

        public const DATABASE = 4;

        public bool $connect = FALSE;

        private DatabaseDataObject $databaseData;

        public function __construct(int $item = CacheConnect::SESSION | CacheConnect::DATABASE) {
            parent::__construct();


            /*
            switch ($item) {

                case 2 || 6:

                    if ($this->connect === FALSE) {

                        $ses = new SessionWorker(TRUE);

                        if ($ses->sessionOpen === TRUE) {

                            $this->connect = TRUE;
                        }
                    }
                    break;
            }
            */
        }

        public function openDB(?array $data = NULL) : object{

            $this->getData();

            switch($this->databaseData->getDatabaseType()){

                case "MySQL":

                    $db = new DatabaseMysqli();

                    $db->setHost($this->databaseData->getHost());

                    $db->setDatabase($this->databaseData->getDatabaseName());

                    $db->setUsername($this->databaseData->getUsername());

                    $db->setPassword($this->databaseData->getPassword());

                    $this->connect = (isset($data)) ? $db->open($data) : $db->open();

                    break;

                default:

                    $db = new DatabasePDO();

            }

            return $db;
        }

        private function getData(){

            $data = new DatabaseData();

            $this->databaseData = $data->getData();

        }



    }
}
