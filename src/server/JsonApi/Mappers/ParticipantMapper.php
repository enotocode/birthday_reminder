<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace JsonApi\Mappers;

use JsonApi\Mapper;

/**
 * Description of ParticipanatMapper
 *
 * @author John
 */
class ParticipantMapper extends Mapper {
    
    public function __construct($class) {
        
        parent::__construct($class);
    }  
    
    public function doGetChildren($class) {       
      
        return NULL;
    }
    
    public function doGetAttributes($class) {
        $attributes = array(
            'name' => $class->getName(),
            'lastName' => $class->getLastName(),
            'description' => $class->getDescription()
        );
        return $attributes;
    }
}
