<?php


abstract class Mapper {
    
    // The database connection, instance of Doctrine\DBAL\Connection
    protected static $dbal;

    public function __construct(Doctrine\DBAL\Connection $dbal) {
        if ( ! isset(self::$dbal) ) {
            self::$dbal = $dbal;
        }
    }
    
    public function getById($event_id) {

        global $log;

        $log->notice("getById: " . $event_id);
        $array = self::$dbal->fetchAssoc($this->getByIdStm, array($event_id));        
        
        if ( 
            !is_array($array) || 
            empty($array) ||
            !array_key_exists('id', $array)
        ) {
            $log->notice('Could not find Event by id: ' . $id);
            $log->notice(
                "checks: !is_array= " . !is_array($array) . 
                '; empty=' . empty($array) . 
                '; !array_key_exists=' . !array_key_exists('id', $array)
            );
            return false;
        }
        $log->notice(json_encode($array));
        
        $event = static::createObject($array);         
        
        return $event;
    }
    /**
     * 
     * @param {numeric} $user_id - User_id 
     * @return type
     * @throws Exception
     */   
    public function getAll($user_id = NULL) {

        global $log;
        
        if ($user_id === NULL) {
            throw new Exception('"getAll()" method must be call with $user_id argument');
        }
        
        if ( ! is_numeric($user_id) ) {
            throw new Exception('Argument $user_id must be number, given: ' . $user_id);
        }
        
        $stmt = self::$dbal->executeQuery($this->getAllStm, array($user_id));
        $array = $stmt->fetchAll();
        
        if ( empty($array) ) {
            return null;
        }
        
        $log->notice(json_encode($array));

        return $this->getCollection($array);        
    }
    
    public function getCollection(Array $array) {        
    
        if ( empty($array) ) {
            throw new Exception('Argument $array must be not empty');
        }
        
        $collection = [];        
        foreach ($array as $data) {
            $collection[] = $this->createObject($data);
        }
        
        return $collection;
    }

    public function getData($class){
        $classMethods=get_class_methods(get_class($class));
        $array=array();
        foreach ($classMethods as $v) {
            if(stripos($v, 'get')===0) {
                $key=strtolower(substr($v, 3, 1)) . substr($v, 4);
                $array[$key] = $class->$v();
            }
        }
        // excluding fields that is not exist in DB
        $array=array_filter($array, function($k){
            foreach ($this->excludeFields as $exclude) {
               if($exclude===$k) return false;
            }
            return true;
        }, ARRAY_FILTER_USE_KEY);
        return $array;
    }
    
    public abstract function createObject(Array $array);
    // public abstract function insert();
    // public abstract function update();

}
