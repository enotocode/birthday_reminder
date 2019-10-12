<?php

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 * Description of SignupController
 *
 * @author Grade
 */
class SignupController {

    public function Signup(Request $request, Application $app) {

        //Convert request to User
        $data = $request->request->all();
        $user = new User();
        $user->setData($data);

//        $test = json_encode($data);
//        $app['monolog']->notice($test);

        //Validating
        $errors = $app['validator']->validate($user);

        if (count($errors) > 0) {

            $errorPathAndMessages = array('isError' => TRUE, 'errors' => []);

            foreach ($errors as $error) {

                $errorPathAndMessages['errors'][$error->getPropertyPath()] = $error->getMessage();
            }
            // Test: displaying invisible field errors
            //$errorPathAndMessages['errors']['ninjaError'] = 'Displaying invisible field errors';

            return $app->json($errorPathAndMessages, 201);
        }

        //Encoding password
        $encoder = $app['security.encoder_factory']->getEncoder($user);
        $password = $user->getPassword();        
        $passHash = $encoder->encodePassword($password, $user->getSalt());
        $user->setPassHash($passHash);
       

        //Save user in SQL
        $mapper = new UsersMapper($app['db']);
        $mapper->saveUser($user);

        return $app->json('New user created', 201);
    }


}
