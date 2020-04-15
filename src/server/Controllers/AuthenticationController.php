<?php

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use JsonApi\JsonApiResponse;
use JsonApi\DataBuilder;

/**
 * Description of AuthenticationController
 *
 * @author Grade
 */
class AuthenticationController {
	
	public function signIn(Request $request, Application $app) {

		global $log;

		$credentials = $app['app.password_authenticator']->getCredentials($request);
		$log->notice("credentials: " . json_encode($credentials));
		
		$user 		 = $app['app.password_authenticator']->getUser($credentials, new UserProvider($app['db']));
		$log->notice("user: " . json_encode($user));
		
		$success 	 = $app['app.password_authenticator']->checkCredentials($credentials, $user);
		$log->notice("success: " . json_encode($success));

		if ($success) { // on success, return token
			$data = array(
				'token' => 'demo:foo'
			);
			return new JsonApiResponse($data);
		}

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
