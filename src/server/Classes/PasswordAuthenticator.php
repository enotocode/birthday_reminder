<?php


use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Encoder\EncoderFactoryInterface;

class PasswordAuthenticator extends AbstractGuardAuthenticator
{
	private $encoderFactory;

	public function __construct(EncoderFactoryInterface $encoderFactory)
	{
		$this->encoderFactory = $encoderFactory;
	}

	// public function supports(Request $request)
 //    {
 //        return $request->headers->has('X-AUTH-TOKEN');
 //    }

	public function getCredentials(Request $request)
	{
		global $log;
		// Checks if the username and password provided
		$username = $request->request->get('_username');
		$password = $request->request->get('_password');
		$log->notice("username=$username and password=$password");

		return array(
			'username' => $username,
			'secret' => $password,
		);
	}

	public function getUser($credentials, UserProviderInterface $userProvider)
	{
		return $userProvider->loadUserByUsername($credentials['username']);
	}

	public function checkCredentials($credentials, UserInterface $user)
	{
		// check credentials - e.g. make sure the password is valid
		// return true to cause authentication success

		$encoder = $this->encoderFactory->getEncoder($user);

		return $encoder->isPasswordValid(
			$user->getPassword(),
			$credentials['secret'],
			$user->getSalt()
		);
	}

	public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
	{
		// // on success, return token
		// $data = array(
		// 	'token' => 'demo:foo'
		// );
		// return new JsonResponse($data, 200);
		return null;
	}

	public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
	{
		$data = array(
			'message' => strtr($exception->getMessageKey(), $exception->getMessageData()),

			// or to translate this message
			// $this->translator->trans($exception->getMessageKey(), $exception->getMessageData())
		);

		return new JsonResponse($data, 403);
	}

	/**
	 * Called when authentication is needed, but it's not sent
	 */
	public function start(Request $request, AuthenticationException $authException = null)
	{
		$data = array(
			// you might translate this message
			'message' => 'Authentication Required',
		);

		return new JsonResponse($data, 401);
	}

	public function supportsRememberMe()
	{
		return false;
	}
}