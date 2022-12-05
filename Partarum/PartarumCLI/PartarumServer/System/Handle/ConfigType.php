<?php

namespace Server\System\Handle {

    require_once "ServerType.php";
    require_once "DataType.php";
    require_once "UserConfig.php";
    require_once "SystemConfig.php";

    use Server\System\Handle\Datatype;
    use Server\System\Handle\ServerType;
    use Server\System\Handle\UserConfig;
    use Server\System\Handle\SystemConfig;

    enum ConfigType: int
    {

        case User = 0x0001;
        case System = 0x0002;

        public function fromServer(ServerType $serverType): UserConfig | SystemConfig
        {
            $name = $serverType->name;

            return match($this){
                ConfigType::User => match($serverType) {
                    ServerType::Websocket => UserConfig::Websocket,
                    default => ""
                },
                ConfigType::System => match($serverType){
                    ServerType::Websocket => SystemConfig::Websocket,
                    default => ""
                }
            };
        }
    }
}