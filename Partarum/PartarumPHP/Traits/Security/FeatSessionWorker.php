<?php
namespace Partarum\Security {


    use \mysqli as mysqli;

    trait FeatSessionWorker
	{

		protected $sessionPath;

		public function setINI()
		{
			ini_set("session.use_only_cookies", "1");
			ini_set("session.use_trans_sid", "0");
			ini_set("session.gc_maxlifetime", "3600");
			ini_set("session.gc_probability", "1");
			ini_set("session.gc_divisor", "100");
		}
/*
		public static function createTableForSESS(){

			$sql = "CREATE TABLE IF NOT EXISTS sessions ( 
        	sess_id VARCHAR(32) NOT NULL PRIMARY KEY, 
        	sess_time INT NOT NULL,  
        	sess_value MEDIUMTEXT NOT NULL)";
		}
*/
		function open($path, $name){

			$this->sessionPath = new mysqli("localhost", "bombisa", "oifunknroll69bombis81", "bombisa");

			if($this->sessionPath->connect_error){

			    return false;
            }else{

			    return true;
            }
		}

		public function close(){

			return $this->sessionPath->close();
		}

        public function write($sess_id, $sess_value){

            $sql = "REPLACE INTO sessions (sess_id, sess_time, sess_value) VALUES ('" . $sess_id . "', '" . time() . "', '" . $sess_value . "')";
            $result = $this->sessionPath->query($sql);

            return $result;
        }

		public function read($sess_id){

		    $escape = $this->sessionPath->real_escape_string($sess_id);
			$sql = "SELECT sess_value FROM sessions WHERE sess_id = '" . $escape . "'";
			$resultObject = $this->sessionPath->query($sql);
            $resultString = "";

			    foreach($resultObject as $value){
			        $resultString = $value;
			    }

			return $resultString; // muss ein String sein!!!!
		}

		public function destroy($sess_id)
		{
//echo "@delete<br>";
			$sql = "DELETE FROM sessions WHERE sess_id = '" . $sess_id . "'";
			$result = $this->sessionPath->write($sql);
			return $result;
		}

		public function gc($sess_time)
		{
//echo "@trash<br>";
			$sessLife = time() - $sess_time;
			$sql = "DELETE FROM sessions WHERE sess_time < '" . $sessLife . "' ";
			$result = $this->sessionPath->write($sql);
			return $result;
		}

	}
}
