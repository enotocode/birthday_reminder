<?php

class Reminder {
    private $id = NULL;
    private $datetime = NULL;
    private $description = '';
    private $event_id = NULL;
    
    public function getId() {
        return $this->id;
    }

    public function getDatetime() {
        return $this->datetime;
    }

    public function getDescription() {
        return $this->description;
    }

    public function getEvent_id() {
        return $this->event_id;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setDatetime($datetime) {
        $this->datetime = $datetime;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function setEvent_id($event_id) {
        $this->event_id = $event_id;
    }
         /**
     * Set property values
     * 
     * @param array $data
     */
    public function setData(Array $data) {
        
       
        foreach ($data as $propertyName => $value) {
            if (property_exists($this, $propertyName)) {
                $this->$propertyName = $value;
            }
        }
    }

}
