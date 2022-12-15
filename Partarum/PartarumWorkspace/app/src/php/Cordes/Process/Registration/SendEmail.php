<?php
/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */
namespace Cordes\Process\Registration {


    require_once($_SERVER["DOCUMENT_ROOT"] . "app/src/php/Cordes/Email/Email.php");

    use Cordes\Email\Email as Email;


    class SendEmail {

        public object $errors;

        public bool $status = FALSE;

        public object $post;

        public string $sender = "noreply@cordes-hosting.net";

        public string $recipient = "support@cordes-hosting.net";

        public string $subject = "Registrierung_Landingpage | cordes-hosting.net";

        public string $signature;

        public string $dataFromUser;

        private bool $checkedPost;

        public object $email;


        public function __construct($post){

            $this->post = $post;

            $this->setSignatur();

            $this->setDataFromUser();

            $this->checkedPost = Email::checkPost(["firstName", "lastName", "repeatEmail"]);

           // print_r($this->checkedPost);

            ($this->checkedPost) && $this->send();
        }

        public function setDataFromUser(){
            // Die Daten, welche der User übermittelt hat

            $stopKeys = ["number", "status", "anrede"];

            $ul = "<ul>";

            foreach($this->post as $key => $value){

                // $key = formfeld; $value = formfeldeintrag

                if(!in_array($key, $stopKeys)) {
                    $ul .= "<li>" . $key . " = " . $value . "</li>";
                }

            }

            $ul .= "</ul>";

            $this->dataFromUser = $ul;
        }

        public function setSignatur(){

            /*
             *              Email außerhalb in einer HTML abspeichern !!!!!
             *
             */

            $sig = <<<EOT
                <article>
                    <p>Bei Rückfragen stehen wir Ihnen selbstverständlich gerne zur Verfügung.</p>
                    <p>Mit freundlichen Grüßen</p>
                    <p>Ihr Support - Team</p>
                    <br>
                    <p>Cordes-Hosting</p>
                    <p>Mittelpfad 1</p>
                    <p>76351 Linkenheim-Hochstetten</p>
                    <br>
                    <p>Tel. +4972473980814</p>
                    <p>support@cordes-hosting.net</p>
                    <br>
                    <p>Geschäftsführer: Marvin Cordes</p>
                    <br>
                    <p>Diese E-Mail einschliesslich ihrer Anhänge ist vertraulich.</p>
                    <p>Wir bitten, eine fehlgeleitete E-Mail unverzüglich vollständig zu löschen und uns eine Nachricht hierüber zukommen zu lassen.</p>
                    <p>Wir haben die E-Mail beim Ausgang auf Viren geprüft, raten jedoch wegen der Gefahr auf den Übertragungswegen zu einer Eingangskontrolle. Eine Haftung für Virenbefall wird ausgeschlossen.</p>
                    <br>
                    <p>This e-mail and any attachments are strictly confidential.</p>
                    <p>If you are not the intended recipient of this e-mail please delete it immediately and give us notice.</p>
                    <p>This e-mail was checked for virus contamination before being sent; however it is advisable to check for any contamination occurring during transmission. We cannot accept any liability.</p>
                </article>
            EOT;


            $this->signature = $sig;
        }

        public function send() {

            if ($this->checkedPost) {

                $this->email = new Email();

                /*
                 * <article>
                 *  <p>Bei Rückfragen stehen wir Ihnen selbstverständlich gerne zur Verfügung.</p>
                    <br>
                    <p>Mit freundlichen Grüßen</p>
                    <br>
                    <p>Ihr Support - Team</p>
                    <br>
                    <p>Cordes-Hosting</p>
                    <p>Mittelpfad 1</p>
                    <p>76351 Linkenheim-Hochstetten</p>
                    <br>
                    <br>
                    <p>Tel. +4972473980814</p>
                    <p>support@cordes-hosting.net</p>
                    <br>
                    <p>Geschäftsführer: Marvin Cordes</p>
                    <br>
                    <p>Diese E-Mail einschliesslich ihrer Anhänge ist vertraulich.</p>
                    <p>Wir bitten, eine fehlgeleitete E-Mail unverzüglich vollständig zu löschen und uns eine Nachricht hierüber zukommen zu lassen.</p>
                    <p>Wir haben die E-Mail beim Ausgang auf Viren geprüft, raten jedoch wegen der Gefahr auf den Übertragungswegen zu einer Eingangskontrolle. Eine Haftung für Virenbefall wird ausgeschlossen.</p>
                    <br>
                    <p>This e-mail and any attachments are strictly confidential.</p>
                    <p>If you are not the intended recipient of this e-mail please delete it immediately and give us notice.</p>
                    <p>This e-mail was checked for virus contamination before being sent; however it is advisable to check for any contamination occurring during transmission. We cannot accept any liability.</p>
                   </article>
                 */



                $this->email->body = "<h1> Unser Support - Team wird sich mit Ihnen in Verbindung setzen ! </h1>" . $this->dataFromUser . $this->signature;

               // echo $this->signature;

               // $this->email->body =+ $this->signature;

                $this->email->setHTML();

                $this->email->subject = $this->post->firstname." ".$this->post->lastname." | ".$this->subject;

                $this->email->setSender($this->sender);

                $this->email->setRecipient($this->recipient);

                $this->email->addAddress($this->post->email);

                //$this->email->addCC("mcordes@cordes-hosting.net", "Marvin Cordes");

                //$this->email->addCC("ffelger@cordes-hosting.net", "Frank Felger");

                $this->email->addCC("abombis@cordes-hosting.net", "Alexander Bombis");

                $this->email->send();

                print_r($this->email->status);

                $this->status = $this->email->status;
            }
        }
    }
}