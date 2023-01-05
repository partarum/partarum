<?php 
namespace Partarum\Design\TraidChain {
    
    class CategoryObject {
        
        public function __set($key, $value){
            
            $this->{$key} = $value;
        }
        
        public function __get($key){
            
            return $this->{$key};
        }
        
        public function __isset($key){
            
            return isset($this->{$key});
        }
    }
}