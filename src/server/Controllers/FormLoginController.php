<?php

use Silex\Application;
use Symfony\Component\HttpFoundation\Response;

/**
 * Description of SignupController
 *
 * @author Grade
 */
class FormLoginController {

    public function sendLoginErrors(Request $request, Application $app) {        
                 
        $responseBody = array(
            'error' => $app['security.last_error']($request),
            'last_name' => $app['session']->get('_security.last_name')
        );
        
        return $app->json($responseBody, 401);
    }

}
