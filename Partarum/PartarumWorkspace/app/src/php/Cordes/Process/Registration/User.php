<?php
/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */
namespace Cordes\Process\Registration {

    require_once($_SERVER["DOCUMENT_ROOT"] . "app/src/php/Cordes/Database/Registration/Worker.php");
    require_once($_SERVER["DOCUMENT_ROOT"] . "app/src/php/Cordes/Forms/Registration.php");
    require_once($_SERVER["DOCUMENT_ROOT"] . "app/src/php/Cordes/Process/Registration/SendEmail.php");

    use Cordes\Database\Registration\Worker as Worker;
    use Cordes\Forms\Registration as Form;
    use Cordes\Process\Registration\SendEmail as SendEmail;
    use DateTime;
    use Partarum\Database\CacheConnect as CacheConnect;
    use stdClass;

    class User {

        private object $post;

        public ?array $checkUser;

        private object $user;

        private object $form;

        public array $missingData = [];

        private object $db;

        private bool $connect = FALSE;

        private ?bool $checkedPost;

        public ?bool $checkInsertDB;

        public bool $emailSent = FALSE;

        public function __construct($post){

            $this->user = new Worker();
            $this->post = (object) $post;
            $this->form = new Form();

            $this->db = new CacheConnect();

            $this->connect = $this->db->connect;

            $this->checkPost();



            if($this->checkUser === null) {
                // ist User noch nicht vorhanden, dann:

                $this->setPost();

                if($this->checkInsertDB === true) {
                    // Daten wurden in die DB geschrieben
                    $this->sendMail(1);
                }
            } else {
                // User ist schon vorhanden

                /*
                 *  Es erfolgt eine Ausgabe an den User bzgl. einer Prüfung des Supports, da er schon ein Konto hat
                 */

                $this->sendMail(0);
            }
        }

        protected function checkPost(){

            // check ob alle Formfelder tatsächlich gefüllt sind, und wenn nicht dann wird es in missingData angegeben

            foreach($this->user->columns as $key => $value){

                $formKey = $this->form->$key ?? FALSE;

                $this->checkedPost = isset($this->post->$formKey);

                if($this->checkedPost === FALSE){

                    $this->missingData[] = $formKey;
                } else {

                    if($key === "anrede"){

                        $this->user->columns->anrede = 0;
                    } else {
                        $this->user->columns->$key = $this->post->$formKey;
                    }
                }
            }


            // Reaktion auf "legal" - ob gesetzt oder nicht

            if((isset($this->post->person)) && ($this->post->person === "legal")) {
                if (isset($this->post->legalName)) {
                    $this->user->columns->company = $this->post->legalName;
                }
            }else{
                unset($this->user->columns->company);
            }

            // phone muss noch überarbeitet werden bzgl. der Länderkennwahl
            $this->user->columns->phone = "0".$this->post->phone;

            // prüfen ob User ggf. schon registriert ist -> email, phone, firstname, lastname

            $arg = new stdClass();
            $arg->phone = $this->user->columns->phone;
            $arg->email = $this->user->columns->email;
            $arg->firstname = $this->user->columns->firstname;
            $arg->lastname = $this->user->columns->lastname;

            $checkUser = $this->db->read([
                "user" => $this->user->getQuery("testUser", $arg)
            ])->current();

            if($checkUser !== false){

                $firstName = $checkUser["firstname"] ?? $checkUser[0]["firstname"];
                $lastName = $checkUser["lastname"] ?? $checkUser[0]["lastname"];

                if(($firstName === $arg->firstname) && ($lastName === $arg->lastname)) {

                    $this->checkUser = $checkUser;
                } else {

                    $this->checkUser = null;
                }

            } else {

                $this->checkUser = null;
            }


            if($this->checkUser === null) {

                // Länderbestimmung - z.B.: DE = Deutschland

                $getCountry = $this->db->read([
                    "name" => $this->user->getQuery("country", $this->post->country)
                ])->current();

                // Land in das User - Objekt eintragen

                $this->user->columns->country = $getCountry["label"];


                // holen aller bisherigen Kundennummern

                $getNumbers = $this->db->read([
                    "numbers" => $this->user->number()
                ])->current();

                $number = [];

                foreach ($getNumbers as $numberArray) {

                    $number[] = $numberArray["number"];
                }

                // erstellen einer neuen Kundennummer

                natsort($number);

                $splitNumber = explode("-", $number[array_key_last($number)]);

                $userNumber = strval(intval($splitNumber[1]) + 1);

                $userNumberLength = strlen($userNumber);

                $zeroArray = [1 => "000", 2 => "00", 3 => "0"];

                $date = new DateTime();
                $year = $date->format("y");

                // übergabe der Kundennummer an das Objeckt User zu number

                $this->user->columns->number = "CS" . $year . "-" . $zeroArray[$userNumberLength] . $userNumber;
            }

        }

        protected function setPost(){

            // setzen der Parameter fürs Binden in in der Mysql - Klasse

            // Wenn Firma oder Organisation angegeben ist
            $paramStringLegal = "?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?";
            $paramStringLegalTypes = "issssssssssi";

            // Wenn keine Firma oder Organisation angegeben ist
            $paramStringNatural = "?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?";
            $paramStringNaturalTypes = "isssssssssi";

            if((isset($_POST["person"])) && ( $_POST["person"] !== "legal")){

                $param = $paramStringNatural;
                $paramTypes = $paramStringNaturalTypes;
            } else {

                $param = $paramStringLegal;
                $paramTypes = $paramStringLegalTypes;
            }

            $rowsArray = get_object_vars($this->user->columns);

            $rowsKeys = array_keys($rowsArray);

            $rowsValue = array_values($rowsArray);

            // Alle Daten in die Datenbank eintragen

            $insertQuery = "INSERT INTO customer (".implode(", ", $rowsKeys).") VALUES (".$param.") ";

            $this->checkInsertDB = $this->db->writeWithParams($insertQuery, $rowsValue, $paramTypes);

        }

        public function sendMail($userStatus = null){

            // Status einführen, wann welcher Inhalt in einer Email gesendet wird

            if($userStatus === 1) {

                $contact = new SendEmail($this->user->columns);

                if ($contact->status === true) {

                    $this->emailSent = TRUE;

                } else {

                    //print_r("Email funzt nicht");

                    $this->emailSent = FALSE;
                }
            }
        }
    }
}