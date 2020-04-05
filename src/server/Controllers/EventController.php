<?php

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use JsonApi\JsonApiResponse;
use JsonApi\DataBuilder;

class EventController {

    public function getAllEvents(Request $request, Application $app) {

        //Get all events
        $eventMapper = new EventMapper($app['db']);
        $events = $eventMapper->getAll(1);
        
        // $events = json_encode($events);
        // $app['monolog']->notice($events); 

        $dataBuilder = new DataBuilder(Array(
            'Event' => 'JsonApi\Mappers\EventMapper',
            'Reminder' => 'JsonApi\Mappers\ReminderMapper',
            'Participant' => 'JsonApi\Mappers\ParticipantMapper'
        ));         
        $data = array();
        foreach ($events as $e) {
            $data[]=$dataBuilder->build($e);
        }
        // $app['monolog']->notice(json_encode($data));

        return new JsonApiResponse($data);
    }

     public function saveEvent(Request $request, Application $app) {

        global $log;

        // Get event's data
        $eventMapper = new EventMapper($app['db']);
        $data = $request->request->all();
        $event = null;

        // finding event by id
        if ($data['id']>=0) {
            $log->notice('finding event by id=' . $data['id']);
            $event = $eventMapper->getById($data['id']);            
        }

        // update
        if ($event) {
            $log->notice('Event found: ' . json_encode($eventMapper->getData($event)));
            $log->notice('updating event');
            $eventMapper->update($event, $data);
            return new JsonApiResponse($data['id']);
        }

        $log->notice('Could not found event!');

        // save new event
        $event = new Event();
        $event->setData($data);        
        $id = $eventMapper->insert($event);
        $app['monolog']->notice("Save new event with id=$id"); 
        return new JsonApiResponse($id);
    }
}
