<?php

class ReminderMapper extends Mapper {
    
    protected $findByIdStm = 'SELECT r.id, r.datetime, r.description
                            FROM reminders AS r
                            WHERE r.event_id = ?';
    
    protected $findAllStm = 'SELECT r.id, r.datetime, r.description
                            FROM reminders AS r
                                JOIN events AS e ON r.event_id = e.id
                            WHERE e.id = ?';
    
    
    public function __construct(Doctrine\DBAL\Connection $dbal) {
        parent::__construct($dbal);
    }
    
    public function createObject(Array $values) {
        $reminder = new Reminder();
        $reminder->setData($values);
   
        return $reminder;
    }
    
    public function insert(){
        
    }      
            
    public function update(){

    } 

}
