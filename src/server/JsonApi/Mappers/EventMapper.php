<?php

namespace JsonApi\Mappers;

use JsonApi\Mapper;

/**
 * Description of DataMapper
 *
 * @author John
 */
class EventMapper extends Mapper {
    
    public function __construct($class) {
        
        parent::__construct($class);
    }  
    
    public function doGetChildren($class) {       
        
        $children = array();
        
        $reminders = $class->getReminders();
        if ($reminders) {
            $children[] = $reminders;
        }        
        $participants = $class->getParticipants();
        if ($participants) {
            $children[] = $participants;
        } 

        return $children;
    }
    
    public function doGetAttributes($class) {
        $attributes = array(
            'date' => $class->getDate(),
            'title' => $class->getTitle(),
            'description' => $class->getDescription(),
            'event_type_id' => $class->getEvent_type_id()
        );
        return $attributes;
    }
}
