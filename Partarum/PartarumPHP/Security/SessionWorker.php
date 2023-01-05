<?php
namespace Partarum\Security {

    use Partarum\Security\FeatSessionWorker as FeatSessionWorker;
    use SessionHandlerInterface;

    class SessionWorker  implements SessionHandlerInterface
    {
		use FeatSessionWorker;

		public $sessionOpen = FALSE;
	
		public function __construct($setSession){

            /*
            * session_status() == 0 = PHP_SESSION_DISABLED
            * session_status() == 1 = PHP_SESSION_NONE => session_start()
            * session_status() == 2 = PHP_SESSION_ACTIVE
            *
            */

            if(($setSession === TRUE) && (!isset($_COOKIE["PHPSESSID"]))) {

                $this->setINI();

                session_set_save_handler($this, true);

                if(!session_start()) {

                    session_abort();

                } else {

                    $_SESSION["id"] = "true";

                    session_write_close();

                    $this->sessionOpen = TRUE;
                }
            }
		}
	}
}