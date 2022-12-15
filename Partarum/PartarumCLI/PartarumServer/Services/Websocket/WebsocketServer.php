<?php
namespace Server\Service\Websocket {

    use \Swoole\Table;
    use \Swoole\WebSocket\Frame;
    use \Swoole\WebSocket\Server;
    use \Swoole\Http\Request;

    class WebsocketServer {

        private Server $server;

        // Client - Table
        private Table $table;

        public function __construct(Server $server, Table $table) {

            $this->server = $server;

            $this->table = $table;
        }

        public function setStartEvent() {

            $server = $this->server;

            $this->server->on("Start", function(Server $server){

                // ! Loggen
                echo "Websocket ist gestartet : " . $server->host . ":" . $server->port . "\n";

            });
        }

        public function setHandshake(){

            $server = $this->server;

            $server->on("Handshake", function( \Swoole\Http\Request $request, \Swoole\Http\Response $response) use ($server){

                $response->status(101);
                $response->end();

                $fd = $request->fd;

                $server->defer(function() use ($fd, $server)
                {
                    echo "Client connected\n";
                    $server->push($fd, "hello, welcome\n");
                });
            } );
        }

        public function setOpenEvent() {

            $server = $this->server;

            $table = $this->table;

            $this->server->on("Open", function(Server $server, Request $request) use ($table){

                $fd = $request->fd;

                $clientName = sprintf("Client-%'.06d\n", $request->fd);

                $table->set($request->fd, [
                    'fd' => $fd,
                    'name' => $clientName
                ]);

                foreach ($table as $key => $value) {

                    if ($key == $fd) {

                        // ! Hier alles senden was beim Zustandekommen der Verbindung gleich mitgesendet werden soll


                        $server->push($request->fd, json_encode($server));

                    } else {

                        // ! Hier alles senden, was bei Eintritt von fd an alle anderen Clienten gesendet werden soll

                        $server->push($key, "");
                    }
                }
            });

        }

        public function setMessageEvent() {

            $server = $this->server;

            $table = $this->table;

            $this->server->on("Message", function(Server $server, Frame $frame) use ($table){

                // Client - ID
                $sender = $table->get(strval($frame->fd), "name");

                foreach ($table as $key => $value) {

                    // ! Wenn alle angeschrieben werden sollen
                    //$server->push($key, json_encode([$key, $frame->fd, $value]));

                    if ($key == $frame->fd) {

                        // Sender === Empfänger

                        $server->push($frame->fd, "Du Vollhost hast diesen Müll hier gesendet: {$frame->data}");

                        $server->push($frame->fd, json_encode($frame));

                        $server->push($frame->fd, json_encode($table));

                    } else {

                        // Empfänger sind alle anderen und nicht der Sender

                        $server->push($key,  "FROM: {$sender} - MESSAGE: " . $frame->data);
                    }
                }
            });
        }

        public function setCloseEvent() {

            $server = $this->server;

            $table = $this->table;

            $this->server->on("Close", function(Server $server, int $fd) use ($table){

                $table->del($fd);
                echo "Connection close: {$fd}, total connections: " . $table->count() . "\n";
            });
        }

        public function setDisconnectEvent() {

            $server = $this->server;

            $table = $this->table;

            $this->server->on("Disconnect", function(Server $server, int $fd) use($table){

                $table->del($fd);

                echo "Disconnect: {$fd}, total connections: " . $table->count() . "\n";
            });
        }
    }
}