<?php


class ParticipantMapper extends Mapper {
    
    protected $findByIdStm = 'SELECT p.id, p.name, p.last_name, p.description
                            FROM participants AS p
                            WHERE p.user_id = 1';
    
    protected $findAllStm = 'SELECT p.id, p.name, p.last_name, p.description
                            FROM participants AS p
                                JOIN event_to_participant AS etp ON p.id = etp.participant_id
                            WHERE etp.event_id = ?';     
    
    
    public function __construct(Doctrine\DBAL\Connection $dbal) {
        parent::__construct($dbal);
    }
    
    public function createObject(Array $values) {
        $participant = new Participant();
        $participant->setData($values);
        
        return $participant;
    }
    
        public function insert(){
        
    }      
            
    public function update(){

    } 

}
