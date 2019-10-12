<?php

use PHPUnit\Framework\TestCase;
use JsonApi\DataBuilder;

class DataBuilderTest extends TestCase {
    
    public function setUp() {
        
        $this->event = new Event();
        $this->event->setData(array(   
            'id' => 1,
            'date' => '2018-06-06',
            'title' => 'Granny`s birthday',
            'description' => 'She turns 101'            
        ));
        
        $this->reminder = new Reminder();
        $this->reminder->setData(array(
            'id' => 1,
            'datetime' => '2018-06-06 10:00:00',
            'description' => 'Phone your Granny'
        ));
        $this->event->setReminder($this->reminder);
       
        $this->participant = new Participant();
        $this->participant->setData(array(
            'id' => 1,
            'name' => 'Granny',
            'lastName' => 'Enotova',
            'description' => 'My favorite granny'           
        ));
        $this->event->setParticipant($this->participant);        
        
        $this->dataBuilder = new DataBuilder(Array(
            'Event' => 'JsonApi\Mappers\EventMapper',
            'Reminder' => 'JsonApi\Mappers\ReminderMapper',
            'Participant' => 'JsonApi\Mappers\ParticipantMapper'
        ));       
    }
    
    public function testBuild(){
        
        $jsonapiObject = array(
            
            'data' => array( 
                'type' => 'Event',
                'id' => 1,
                'attributes' => array(
                    'date' => '2018-06-06',
                    'title' => 'Granny`s birthday',
                    'description' => 'She turns 101'            
                ),
                'relationships' => array(
                    'Reminder' => array(
                        'data' => array('type' => 'Reminder', 'id' => 1)   
                    ),
                    'Participant' => array(
                        'data' => array('type' => 'Participant', 'id' => 1)   
                    )
                ),
                'links' => NULL,
                'meta' => NULL
            ),
            'included' => array(
                array(
                    'type' => 'Reminder', 
                    'id' => 1,
                    'attributes' => array(
                        'datetime' => '2018-06-06 10:00:00',
                        'description' => 'Phone your Granny'
                    ),
                    'relationships' => NULL,               
                    'links' => NULL,
                    'meta' => NULL
                ),
                array(
                    'type' => 'Participant', 
                    'id' => 1,
                    'attributes' => array(
                        'name' => 'Granny',
                        'lastName' => 'Enotova',
                        'description' => 'My favorite granny' 
                    ),
                    'relationships' => NULL,               
                    'links' => NULL,
                    'meta' => NULL
                )
            )
        );

        $this->assertEquals(
                $this->dataBuilder->build($this->event),
                $jsonapiObject
                );
    }
}

