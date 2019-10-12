<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace JsonApi;

/**
 * Description of Mapper
 *
 * @author John
 */
abstract class Mapper {
    
    private $children;
    private $attributes;
    private $class;
    
    public function __construct($class) {
        
        $this->class = $class;
    }
    
    public function build($class) {
        
        $resObj = new ResourceObject(); 
        $resObj->setId($class->getId());
        $resObj->setType(get_class($class));
        
        $resObj->setAttributes($this->getAttributes($class));
        
        $children = $this->getChildren($class);
        if ( ! empty($children) ) {
            $relationships = $this->createRelationships($children);
            $resObj->setRelationships($relationships);
        };

        return $resObj->getAsArray();
    }
        
    protected function createRelationships(array $children){        
               
        $relationships = new Relationships();
            
        foreach ($children as $array) { 
            foreach($array as $child) {
                $type = get_class($child);
                $id = $child->getId();
                $relationships->addObject($type, $id);
            }
        }  

        return $relationships;
    }
    
    /**
     * @return {Array.<someClass>}
     */
    public function getChildren($class) {
        
        if ( ! empty($this->children) ) {
            return $this->children;
        }
        
        $this->children = $this->doGetChildren($class);        
    
        return $this->children;
    }
    
    /**
    * @return {Array}
    */
    protected function getAttributes($class) {
        
        if ( ! empty($this->attributes) ) {
            return $this->attributes;
        }
        
        $this->attributes = $this->doGetAttributes($class);        
    
        return $this->attributes;
    }
    
    abstract protected function doGetAttributes($class);
    abstract protected function doGetChildren($class);

}