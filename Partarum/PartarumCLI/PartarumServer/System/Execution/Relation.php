<?php
namespace Server\System\Execution {

    use Server\Service\Websocket\WebsocketServer;
    use Swoole\WebSocket\Server;
    use Swoole\Table;

    use WeakMap;

    class Relation {

        private array $cache = [];

        public function __construct() {

        }

        public function add( string $id, WebsocketServer $websocket, Server $server, Table $table) : void{

            if(!isset($this->cache[$id])){

                $this->cache[$id] = new WeakMap();

            }
            $this->cache[$id]->offsetSet($server, $table);
        }

        public function get( string $id, string $server) : mixed {

            return $this->cache[$id]->offsetGet($server);
        }
    }
}