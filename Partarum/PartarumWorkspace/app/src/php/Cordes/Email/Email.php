<?php
/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */

namespace Cordes\Email {

    require_once($_SERVER["DOCUMENT_ROOT"] . "app/src/php/PHPMailer/Exception.php");
    require_once($_SERVER["DOCUMENT_ROOT"] . "app/src/php/PHPMailer/PHPMailer.php");
    require_once($_SERVER["DOCUMENT_ROOT"] . "app/src/php/PHPMailer/SMTP.php");
    require_once($_SERVER["DOCUMENT_ROOT"] . "app/src/php/Cordes/Email/Config.php");


    use PHPMailer\PHPMailer\PHPMailer as PHPMailer;
    use PHPMailer\PHPMailer\SMTP as SMPT;
    use Cordes\Email\Config as Config;

    class Email {

        public string $body;

        public string $subject;

        public object $mail;

        public object $config;

        public static bool $checkedPost = TRUE;

        public bool $status = FALSE;


        public function __construct(){

            $this->mail = new PHPMailer();

            $this->setMailConfig();

            $this->setSMTP();
        }

        public function setSMTP(){

            $this->mail->isSMTP();

            $this->mail->Host = $this->config->smtp->hostname;

            $this->mail->Port = $this->config->smtp->port;

            $this->mail->SMTPAutoTLS = true;

            $this->mail->SMTPAuth = true;

            $this->mail->Username = $this->config->smtp->username;

            $this->mail->Password = $this->config->smtp->password;
        }

        public function setMailConfig(){

            $this->config = new Config();

            $this->mail->WordWrap = $this->config->wordwrap;

            $this->mail->CharSet = PHPmailer::CHARSET_UTF8;

            $this->mail->Encoding = PHPmailer::ENCODING_QUOTED_PRINTABLE;
        }

        public function send(){

            $this->setContent();

            $this->mail->setFrom($this->config->sender);

            $this->status = $this->mail->send();

        }

        public function setContent(){

            $this->mail->Body = $this->body;

            $this->mail->Subject = $this->subject;
        }

        public function setSender($sender){

            $this->config->sender = $sender;
        }

        public function setRecipient($recipient){

            $this->config->recipient = $recipient;
        }

        public function setReplyTo($address, $name = ""){

            $this->mail->addReplyTo($address, $name);

        }

        public function addAddress($address, $name = ""){

            $this->mail->addAddress($address, $name);
        }

        public function addCC($address, $name){

            $this->mail->addCC($address, $name);
        }

        public function setHTML(){
            $this->mail->isHTML(true);
        }

        public function getHTML($document, $basedir){

            $this->mail->msgHTML(file_get_contents($document), $basedir);
        }

        public static function checkPost($formKeys){

            $result = FALSE;

            if ($_SERVER['REQUEST_METHOD'] === 'POST') {

                foreach ($formKeys as $key) {

                    if (self::$checkedPost) {

                        self::$checkedPost = isset($_POST[$key]);

                        $result = TRUE;

                    } else {

                        $result = FALSE;
                    }
                }
            }

            return $result;
        }
    }
}