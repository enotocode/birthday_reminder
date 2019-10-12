<?php

class EventMapper extends Mapper {
    
    protected $findAllStm = 'SELECT e.id, e.date, e.title, e.description, et.type, e.user_id
                            FROM events AS e
                                JOIN event_types AS et ON e.event_type_id = et.id
                            WHERE e.user_id = ?';

    protected $excludeFields = array('reminders', 'participants');
    
    public function __construct(Doctrine\DBAL\Connection $dbal) {
        parent::__construct($dbal);
    }
        
    public function createObject(Array $values) {
        $event = new Event();
        $event->setData($values);
        $id = $values['id']; // Event id

        // $reminderMapper = new ReminderMapper(self::$dbal); // todo: add fabric
        // $reminders = $reminderMapper->findAll($id);
        // if ( ! empty($reminders) ) {
        //     $event->setReminders($reminders);   
        // }
        
        // $participantsMapper = new ParticipantMapper(self::$dbal);
        // $participants = $participantsMapper->findAll($id);
        // if ( ! empty($participants) ) {
        //     $event->setParticipants($participants);
        // }
        
        return $event;
    }  

    public function insert(Event $event){
        // inserting event
        $data=$this->getData($event);
        // generating id
        $data['id']=null;
        self::$dbal->insert("events", $data);  
        $id=self::$dbal->lastInsertId();
        return $id;      
    }      
            
    public function update(){

    } 
    
}
