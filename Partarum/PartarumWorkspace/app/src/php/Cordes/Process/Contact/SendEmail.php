<?php
/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */
namespace Cordes\Process\Contact {


    require_once($_SERVER["DOCUMENT_ROOT"] . "app/src/php/Cordes/Email/Email.php");

    use Cordes\Email\Email as Email;


    class SendEmail {

        public object $errors;

        public bool $status = FALSE;

        public array $post;

        public string $sender = "kontakt@cordes-hosting.net";
        public string $recipient = "kontakt@cordes-hosting.net";

        public string $subject = "Kontaktanfrage_Landingpage | cordes-hosting.net";

        private bool $checkedPost;

        public object $email;


        public function __construct($post){

            $this->post = $post;

            $this->checkedPost = Email::checkPost(["name", "email", "subject", "message"]);

            ($this->checkedPost) && $this->send();
        }

        public function send() {

            if ($this->checkedPost) {

                $this->email = new Email();

                $this->email->body = $this->post["message"];

                $this->email->subject = $this->post["name"]." | ".$this->subject;

                $this->email->setSender($this->sender);

                $this->email->setRecipient($this->recipient);

                $this->email->setReplyTo($this->post["email"], $this->post["name"]);

                $this->email->addAddress($this->recipient);

                $this->email->addCC("abombis@cordes-hosting.net", "Alexander Bombis");

                $this->email->send();

                $this->status = $this->email->status;
            }
        }
    }
}