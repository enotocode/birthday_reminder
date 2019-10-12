<?php


class Participant {
    private $id = NULL;
    private $name = '';
    private $lastName = '';
    private $description = '';
    
    public function getId() {
        return $this->id;
    }

    public function getName() {
        return $this->name;
    }

    public function getLastName() {
        return $this->lastName;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function setLastName($lastName) {
        $this->lastName = $lastName;
    }

    public function setDescription($description) {
        $this->description = $description;
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
        if (key_exists('last_name', $data)) {
            $this->lastName = $data['last_name'];
        }
    }

}
