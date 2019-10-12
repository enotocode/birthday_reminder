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
        $events = $eventMapper->findAll(1);
        
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

        $app['monolog']->notice(json_encode($data));

        return new JsonApiResponse($data);
    }

     public function saveEvent(Request $request, Application $app) {

        //Get all events
        $eventMapper = new EventMapper($app['db']);
        $event = new Event();
        $data = $request->request->all();

        $event->setData($data);        
        $id = $eventMapper->insert($event);
        $app['monolog']->notice($id);     
        
        return new JsonApiResponse($id);
    }
}
