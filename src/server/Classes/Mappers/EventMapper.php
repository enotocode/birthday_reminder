<?php

class EventMapper extends Mapper {
    
    protected $getAllStm = 'SELECT e.id, e.date, e.title, e.description, e.event_type_id, e.user_id
                            FROM events AS e
                                -- JOIN event_types AS et ON e.event_type_id = et.id
                            WHERE e.user_id = ?';

    protected $getByIdStm = 'SELECT e.id, e.date, e.title, e.description, e.event_type_id, e.user_id
                            FROM events AS e
                            WHERE e.id = ?';

    protected $excludeFields = array('reminders', 'participants');
    
    public function __construct(Doctrine\DBAL\Connection $dbal) {
        parent::__construct($dbal);
    }
        
    public function createObject(Array $values) {
        $event = new Event();
        $event->setData($values);
        $id = $values['id']; // Event id

        // $reminderMapper = new ReminderMapper(self::$dbal); // todo: add fabric
        // $reminders = $reminderMapper->getAll($id);
        // if ( ! empty($reminders) ) {
        //     $event->setReminders($reminders);   
        // }
        
        // $participantsMapper = new ParticipantMapper(self::$dbal);
        // $participants = $participantsMapper->getAll($id);
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
            
    public function update($id){
        if (is_null($id)) {
            throw new Exception("Id is not defined!");            
        }
        $data=$this->getData($event);
        self::$dbal->update("events", $data, array('id'=>$id));  
        return true;  
    } 


    
}
