<?php

//namespace Constraint;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class EmailExists extends Constraint {

    public $message = "User with the email '{{ string }}' does already exist.";

    public function validatedBy() {
        
       return 'validator.emailExists'
        ;
    }

}
