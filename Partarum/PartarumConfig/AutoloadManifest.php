<?php
namespace PartarumConfig {

     enum AutoloadManifest: string {

         case Cache = "Partarum\Cache";
         case Config = "Partarum\Config";
         case Database = "Partarum\Database";
         case Design;
         case Document;
         case Filesystem;
         case HTTP;
         case Security;
         case Service;
         case System;
         case Test;
         case Traits;
         case Workspace;
    }
}