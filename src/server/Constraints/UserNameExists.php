<?php

//namespace Constraint;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class UserNameExists extends Constraint {

    public $message = "User name '{{ string }}' does already exist.";

    public function validatedBy() {
        
       return 'validator.userNameExists'
        ;
    }

}
