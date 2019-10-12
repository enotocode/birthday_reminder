<?php


abstract class Mapper {
    
    // The database connection, instance of Doctrine\DBAL\Connection
    protected static $dbal;

    public function __construct(Doctrine\DBAL\Connection $dbal) {
        if ( ! isset(self::$dbal) ) {
            self::$dbal = $dbal;
        }
    }
    
    public function findById($id) {
        
        $stmt = self::$dbal->executeQuery(static::$findByIdStm, array($id));
        $array = $stmt->fetchAll();
        
        if ( ! is_array($array) || ! isset($array[$id]) ) {
            throw new Exception('Could not find Event by id: ' . $id);
        }
        
        $event = static::createObject($array);         
        
        return $event;
    }
    /**
     * 
     * @param {numeric} $id - User_id in case finding Event or Event_id in case finding Reminders
     * @return type
     * @throws Exception
     */   
    public function findAll($id = NULL) {

        global $log;
        
        if ($id === NULL) {
            throw new Exception('"findAll()" method must be call with $id argument');
        }
        
        if ( ! is_numeric($id) ) {
            throw new Exception('Argument $id must be number, given: ' . $id);
        }
        
        $stmt = self::$dbal->executeQuery($this->findAllStm, array($id));
        $array = $stmt->fetchAll();
        
        if ( empty($array) ) {
            return null;
        }
        
        $log->notice(json_encode($array));

        return $this->getCollection($array);        
    }
    
    public function getCollection(Array $raws) {        
    
        if ( empty($raws) ) {
            throw new Exception('Argument $raws must be not empty');
        }
        
        $collection = [];        
        foreach ($raws as $data) {
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
