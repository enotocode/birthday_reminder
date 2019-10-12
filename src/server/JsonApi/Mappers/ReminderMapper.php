<?php

namespace JsonApi\Mappers;

use JsonApi\Mapper;

/**
 * Description of ReminderEvent
 *
 * @author John
 */
class ReminderMapper extends Mapper {
    
    public function __construct($class) {
        
        parent::__construct($class);
    }
    
   
    public function doGetAttributes($class) {
        $attributes = array(
            'datetime' => $class->getDatetime(),
            'description' => $class->getDescription()
        );
        return $attributes;
    }    
 
    public function doGetChildren($class) { 

        return NULL;
    }  
 

}
