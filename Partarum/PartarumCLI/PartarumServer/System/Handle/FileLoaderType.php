<?php
namespace Server\System\Handle {

    enum FileLoaderType : int {

        case Cache = 0x0001;
        case Config = 0x0002;
        case Data = 0x0004;
        case Log = 0x0008;
        case Server = 0x0010;

        public function load($type , $responseType) : mixed {

            $filePath = match($this){
                FileLoaderType::Cache, FileLoaderType::Server, FileLoaderType::Log, FileLoaderType::Data, FileLoaderType::Config => $type->getFilePath()
            };

            $file = file_get_contents($filePath);

            return match ($responseType) {
                DataType::Array => json_decode($file, true),
                DataType::Object => json_decode($file, false),
                DataType::String => $file
            };
        }
    }
}