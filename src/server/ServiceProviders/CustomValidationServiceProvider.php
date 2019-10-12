<?php

//namespace ServiceProvider;
use Silex\Application;
use Pimple\ServiceProviderInterface;

class CustomValidationServiceProvider implements ServiceProviderInterface {

    public function register(Pimple\Container $pimple) {
        
        $pimple['validator.emailExists'] = function ($pimple) {
            $validator = new EmailExistsValidator();
            $validator->setDBAL($pimple['db']);

            return $validator;
        };
        
        $pimple['validator.userNameExists'] = function ($pimple) {
            $validator = new UserNameExistsValidator();
            $validator->setDBAL($pimple['db']);

            return $validator;
        };
    }

    public function boot(Application $pimple) {
        
    }

}
