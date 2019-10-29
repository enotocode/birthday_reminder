<?php

use PHPUnit\Framework\TestCase;

/**
 * Description of EventMapperTest
 *
 * @author Enotocode <enotocode@yandex.ru>
 */
class EventMapperTest extends DatabaseTestCase {    

    public function testGetAll(){
        $eventMapper = new EventMapper($this->getDbal());
        $allEvents = $eventMapper->getAll(1); // UserId = 1
        
        // Verify the number of books returned
        $this->assertCount(3, $allEvents);
        
        // Verify items 1 
        $event = $allEvents[0];
        $this->assertEquals( 1, $event->getId() );
        $this->assertEquals( '2018-06-06', $event->getDate() );
        $this->assertEquals( 'Granny`s birthday', $event->getTitle() );
        $this->assertEquals( 'She turns 101', $event->getDescription() );
        $this->assertEquals( 'BIRTHDAY', $event->getType() );
        $this->assertEquals( 1, $event->getUser_id() );
        $reminders = $event->getReminders();
        $this->assertCount( 1, $reminders );
        $participants = $event->getParticipants();
        $this->assertCount( 1, $participants );
        
        // Verify nested items
        $reminder = $reminders[0];
        $this->assertInstanceOf( Reminder::class,  $reminder);
        $this->assertEquals( 1, $reminder->getId() );
        $this->assertEquals( '2018-06-06 10:00:00', $reminder->getDatetime() );
        $this->assertEquals( 'Phone your Granny', $reminder->getDescription() );    
        
        
        $participant = $participants[0];
        $this->assertInstanceOf( Participant::class, $participant);
        $this->assertEquals( 1, $participant->getId() );
        $this->assertEquals( 'Granny', $participant->getName() );
        $this->assertEquals( 'Enotova', $participant->getLastName() );
        $this->assertEquals( 'My favorite granny', $participant->getDescription() ); 
        
    }
}
