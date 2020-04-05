<?php

class EventMapper extends Mapper {
    
    protected $getAllStm = '
        SELECT e.id, e.date, e.title, e.description, e.event_type_id, e.user_id
        FROM events AS e
         -- JOIN event_types AS et ON e.event_type_id = et.id
        WHERE e.user_id = ?';

    protected $getByIdStm = '
        SELECT e.id, e.date, e.title, e.description, e.event_type_id, e.user_id
        FROM events AS e
        WHERE e.id = ?';

     // protected $updateByIdStm = '
     //    UPDATE events as e set 
     //        e.date=?, e.title=?, e.description=?, e.event_type_id=?, e.user_id=?
     //    WHERE e.id = ?';

    protected $excludeFields = array('reminders', 'participants');
    
    public function __construct(Doctrine\DBAL\Connection $dbal) {
        parent::__construct($dbal);
    }
        
    public function createObject(Array $values) {
        
        global $log;

        $log->notice("createObject");
        $log->notice("values: " . json_encode($values));
        $event = new Event();
        $event->setData($values);
        $log->notice('Event created: ' . json_encode($this->getData($event)));
        // $id = $values['id']; // Event id

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
            
    public function update(Event $event, Array $new_data){
        if (empty($new_data)) {
            throw new Exception("No data to update!");            
        }
        $key_data=$this->getData($event);
        $data=array();
        // change values in Event with new values from $new_data
        foreach ($key_data as $k => $v) {
        	if(isset($new_data[$k])) {
        		$data[$k]=$new_data[$k];
        	} else {
        		$data[$k]=$v;
        	}
        }
        self::$dbal->update('events', $data, array('id'=>$data['id']));  
        return true;  
    } 


    
}
