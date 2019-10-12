<?php

namespace JsonApi;

/**
 * @author Enotocode <enotocode@yandex.ru>
 */
class DataBuilder {
    
    private $mappers = array();
    
    /**
     * @param {Object.<string, string>} - Key is class name, value is mapper name
     */
    public function __construct(array $mappers) {

        foreach ($mappers as $className => $mapper) {
            $this->setMapper($className, $mapper);
        }
    }
    /**
     * @param $class - Instance of some class
     * @return {( 
     *      {data: (ResourceObjects | ResourceObject[]), included: ResourceObjects[]} |
     *      {data: (ResourceObjects | ResourceObject[])}
     * )} - Part of JSONAPI response http://jsonapi.org/format/
     */
    public function build($class) {
        
        $data = $this->getData($class);
        $array['data'] = $data;        
        $children = $this->getChildrenRecursive($class);  

        if (empty($children)) {
            return $array;
        }
        
        $included = array();
        foreach ($children as $child) {
            $included[] = $this->getData($child);         
        }

        $array['included'] = $included; 

        return $array;
    }
    
    /**
     * @param type $class
     * @return {Array} - Resource Object as array
     */
    public function getData($class) {
        $mapper = $this->getMapper($class);
        $data = $mapper->build($class);
        return $data;        
    }
    
    public function getMapper($class) {
        $className = get_class($class);
        
        if ( ! key_exists($className, $this->mappers)) {
            throw new \Exception('Can not find mapper for class: ' . $className);
        }
        $mapperName = $this->mappers[$className];
        return new  $mapperName($class); 
    }
    /**
     * 
     * @param {string} $className - Class name
     * @param {string} $mapper - Mapper name
     */
    public function setMapper($className, $mapper) {     
    
        if ( ! key_exists($className, $this->mappers)) {
            $this->mappers[$className] = $mapper;           
        }
    }
    
    /**
     * Get children 
     * @param {someClass} $class
     * @return {Array.<SomeClass>} 
     */
    public function getChildren($class) {
        $mapper = $this->getMapper($class);
        $children = $mapper->getChildren($class); 
        
        if (is_array($children)) {
        $children = $this->getOneDimensionArray($children);
        }

        return $children;
    }
    
    /**
     * Get all descendants from parent class: children, grandchildren, etc
     * 
     * @param {someClass} $class
     * @return {Array.<someClasses>}
     */
    public function getChildrenRecursive($class) {
        $descendants = array();
        $queue = array();
      
        $children = $this->getChildren($class);

        $queue = array_merge($queue, $children);
        
        while (!empty($queue)) {
            $descendant = array_shift($queue);
            $descendants[] = $descendant;
            
            $array = $this->getChildren($descendant);
            
            if (is_array($array) && !empty($array)) {
                $queue = array_merge($queue, $array);    
            }
        }
        return $descendants;
    }
    
    private function getOneDimensionArray(Array $twoDimensionArray) {

        $dimArray = $twoDimensionArray;
        $array = array();
        
        foreach($dimArray as $variable) {
            if (is_array($variable)) {
                $array = array_merge($array, $variable);
            } else {
                $array[] = $variable;
            }
        }

        return $array;
    }
    
}
