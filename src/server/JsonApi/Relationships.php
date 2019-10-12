<?php


namespace JsonApi;

/**
 * Description of Relationships
 *
 * @author John
 */
class Relationships {
    
    private $values = array();    
    
    public function addObject($type, $id) {
       
        if ( ! isset($type) || ! isset($id) ) {
            throw new Exception('$type and $id must not be null');
        }

        $relationship = array('type' => $type, 'id' => $id);
        
        if (array_key_exists($type, $this->values)) {
            $this->values[$type]['data'][] = $relationship;
            return;
        }
        
        $this->values[$type]['data'] = $relationship;        
    }
    
    public function getAsArray() {
        return $this->values;
    }


}
