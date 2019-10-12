<?php

use Silex\Application;

/**
 * Description of AuthenticationController
 *
 * @author Grade
 */
class AuthenticationController {
    
    public function getUserInfo(Application $app) {

       if ($app['security.authorization_checker']->isGranted('IS_AUTHENTICATED_FULLY')) {
           
           $token = $app['security.token_storage']->getToken();
           $user = $token->getUser();
           $name = $user->getName();
           $userInfo = array(
               'name' => $name,
           );
           
           return $app->json($userInfo, 200);
           
       } else {
           
           return $app->json("user is not fully authenticated", 401);
       }
    }
    

}
