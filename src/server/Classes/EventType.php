<?php


class EventType {
    
    private $id = NULL;
    private $type = '';
    private $description = '';  
    
    public function getId() {
        return $this->id;
    }

    public function getType() {
        return $this->type;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setType($type) {
        $this->type = $type;
    }

    public function setDescription($description) {
        $this->description = $description;
    }


}
