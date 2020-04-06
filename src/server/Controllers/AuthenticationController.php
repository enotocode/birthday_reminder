<?php

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

/**
 * Description of AuthenticationController
 *
 * @author Grade
 */
class AuthenticationController {
	
	public function SignIn(Request $request, Application $app) {

		global $log;

		$credentials = $app['app.token_authenticator']->getCredentials($request);
		$log->notice("credentials: " . json_encode($credentials));
		
		$user 		 = $app['app.token_authenticator']->getUser($credentials, new UserProvider($app['db']));
		$log->notice("user: " . json_encode($user));
		
		$success 	 = $app['app.token_authenticator']->checkCredentials($credentials, $user);
		$log->notice("success: " . json_encode($success));

		return $success;

		// if ($app['security.authorization_checker']->isGranted('IS_AUTHENTICATED_FULLY')) {
		   
		//	 $token = $app['security.token_storage']->getToken();
		//	 $user = $token->getUser();
		//	 $name = $user->getName();
		//	 $userInfo = array(
		//		 'name' => $name,
		//		 'token'=>$token,
		//	 );
		   
		//	 return $app->json($userInfo, 200);
		   
		// } else {
		   
		//	 return $app->json("user is not fully authenticated", 401);
		// }
	}
	

}
