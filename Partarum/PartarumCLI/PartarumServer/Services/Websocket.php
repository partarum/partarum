<?php
namespace Server\Service {

    require_once "Websocket/WebsocketServer.php";
    //require_once "../System/Execution/Relation.php";

    use Server\Service\Websocket\WebsocketServer;
    //use Server\System\Execution\Relation;

    use Swoole\WebSocket\{Server, Frame};
    use Swoole\Table;

    use WeakMap;

    class Websocket {

        private string $ip;

        private int $port;

        private string $id;

        private Table $table;

        //private null | Relation $relation;

        private Server $swooleServer;

        private WebsocketServer $websocketServer;

        public function __construct(string $ip, int $port){

            $this->ip = $ip;

            $this->port = $port;

            $this->id = $ip . "::" . (string)$port;

            $this->table = $this->setTable($this->id);
        }

        public function create() : void {

            //$this->relation = new Relation();

            echo "\n ****** " . $this->id. "****** \n";

            $this->swooleServer = new Server($this->ip, $this->port, SWOOLE_PROCESS, SWOOLE_SOCK_TCP);

            //echo "----swoole-start---- \n";
            //var_dump($this->swooleServer);
            //echo "----swoole-end------ \n";

            $this->websocketServer = new WebsocketServer($this->swooleServer, $this->table);

            /*
             *  User - spezifische Events erstellen lassen
             */

            $this->websocketServer->setStartEvent();

            //$this->websocketServer->setHandshake();

            $this->websocketServer->setOpenEvent();

            $this->websocketServer->setMessageEvent();

            $this->websocketServer->setCloseEvent();

            $this->websocketServer->setDisconnectEvent();

            //$this->relation->add($this->ip, $this->websocketServer, $this->swooleServer, $this->table);

        }

        private function setTable() : Table {

            $table = new Table(2048);

            $table->column("fd", Table::TYPE_INT, 8);

            $table->column("name", Table::TYPE_STRING, 16);

            $table->create();

            return $table;
        }

        public function start(): void {

            $this->swooleServer->start();

        }
    }
}
