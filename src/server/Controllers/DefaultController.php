<?php

use Silex\Application;
use Symfony\Component\HttpFoundation\Response;

/**
 * Description of SignupController
 *
 * @author Grade
 */
class DefaultController {

    public function adminAction() {

        return new Response('<html><body>Admin page!</body></html>');
    }

}
