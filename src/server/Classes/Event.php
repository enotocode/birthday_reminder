<?php

class Event {
    
   private $id = NULL;
   private $date = NULL;
   private $title = NULL;
   private $description = NULL;
   private $event_type_id = NULL;
   private $user_id = NULL;
   private $reminders = array();   
   private $participants = array();

   function __construct() {
      // user id fron session 
      $this->setUser_id(1);
   }


   public function getId() {
       return $this->id;
   }

   public function getDate() {
       return $this->date;
   }

   public function getTitle() {
       return $this->title;
   }

   public function getDescription() {
       return $this->description;
   }

   public function getEvent_type_id() {
       return $this->event_type_id;
   }

   public function getUser_id() {
       return $this->user_id;
   }
   
   public function getReminders() {
       return $this->reminders;
   }

   public function getParticipants() {
       return $this->participants;
   }

   public function setId($id) {
       $this->id = $id;
   }

   public function setDate($date) {
       $this->date = $date;
   }

   public function setTitle($title) {
       $this->title = $title;
   }

   public function setDescription($description) {
       $this->description = $description;
   }

   public function setEvent_type_id($type_id) {
       $this->event_type_id = $type_id;
   }

   public function setUser_id($user_id) {
       $this->user_id = $user_id;
   }
   
   /**
    * 
    * @param {Array.<Reminder>} 
    */
   public function setReminders(Array $reminders) {
       foreach($reminders as $reminder) {
           if (! $reminder instanceof Reminder) {
               throw new Exception('Each member of passed array must be instance of Reminder class. Given: ' . get_class($reminder));
           }
       }
       $this->reminders = $reminders;
   }
   
   public function setReminder(Reminder $reminder) {
       $this->reminders[] = $reminder;
   }

   /**
    * 
    * @param {Array.<Participant>} 
    */
   public function setParticipants(Array $participants) {
       foreach($participants as $participant) {
           if (! $participant instanceof Participant) {
               throw new Exception('Each member of passed array must be instance of Participant class. Given: ' . get_class($participant));
           }
       }
       $this->participants = $participants;
   }
   
   public function setParticipant(Participant $participant) {
       $this->participants[] = $participant;
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
