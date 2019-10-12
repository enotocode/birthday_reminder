<?php

//namespace Constraint;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

use src\server\Classes\User;

class EmailExistsValidator extends ConstraintValidator {

    //The database connection, instance of Doctrine\DBAL\Connection
    private $dbal = null;

    public function setDBAL(Doctrine\DBAL\Connection $dbal) {
        $this->dbal = $dbal;
    }

    public function validate($value, Constraint $constraint) {        
        
        $sql = 'SELECT * from users WHERE email = :email';
        $stmt = $this->dbal->prepare($sql);
        $stmt->bindValue(':email', $value);
        $stmt->execute();
                
        if ($stmt->fetch()) {
            $this->context->buildViolation($constraint->message)
                    ->setParameter('{{ string }}', $value)
                    ->addViolation();
        }
    }

}
