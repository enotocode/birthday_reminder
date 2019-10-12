<?php

use Symfony\Component\Security\Http\Logout\LogoutSuccessHandlerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

/**
 * Description of CustomLogoutSuccessHandler
 *
 * @author Grade
 */
class CustomLogoutSuccessHandler implements LogoutSuccessHandlerInterface
{
    public function onLogoutSuccess(Request $request) {
        
        $array = array( 'success' => true ); // data to return via JSON
        $response = new Response( json_encode( $array ), 200 );
        $response->headers->set( 'Content-Type', 'application/json' );

        return $response;
    }
}
