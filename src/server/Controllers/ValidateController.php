<?php

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use JsonApi\Mappers\ConstraintViolationMapper;
use JsonApi\JsonApiErrorBuilder;
use JsonApi\JsonApiResponse;
/**
 * Description of SignupController
 *
 * @author Grade
 */
class ValidateController {

    public function validate(Request $request, Application $app) {

        //Convert request to User
        $data = $request->request->all();
        
        $valueName = $data['valueName'];
        $value = $data['value'];
        
        $values[$valueName] = $value;        
        $user = new User();
        $user->setData($values);
        
        $test = json_encode($values);
        $app['monolog']->notice($test);   
        $app['monolog']->notice(json_encode($user->getUsername()));
        
        //Validating
        $errors = $app['validator']->validate($user);        
        $errorsBag = array();
        
        if (count($errors) > 0) {
            
            $JAEB = new JsonApiErrorBuilder(new ConstraintViolationMapper);
            
            foreach ($errors as $error) {
                
                // Return only requiring valueName's error
                $errorPath = $error->getPropertyPath();
                if ( $errorPath == $valueName){
                    // Transform CV into Error Object
                    $errorsBag[] = $JAEB->build($error);
                }
            }            
        }
        
        if (empty($errorsBag)) {
            return new JsonApiResponse('Validation complete');
        }
        
        return new JsonApiResponse(null, $errorsBag, 400);

    }

}
