<?php
namespace Partarum\Design\TraidChain {


    class Factory {
        
        public const AREA = 0xF1;
        
        public const TEAM = 0xF2;
        
        public const WORKER = 0xF3;
        
        public const TASK = 0xF4;

        
        protected function createArea($class){
            
            $object = new $class();
             
            Storage::add("factory", $object, self::AREA);
             
            return $object;
            
        }
        
        protected function addArea(){
            
        }
        
        protected function createTeam(){
            
        }
        
        protected function addTeam(){
            
        }
        
        protected function createWorker(){
            
        }
        
        protected function addWorker(){
            
        }
        
        protected function createTask(){
            
        }
        
        protected function addTask(){
            
        }

        protected function createStore(){

        }

        protected function addStore(){

        }

    }
}