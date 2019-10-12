<?php

//namespace Constraint;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;


class UserNameExistsValidator extends ConstraintValidator {

    //The database connection, instance of Doctrine\DBAL\Connection
    private $dbal = null;

    public function setDBAL(Doctrine\DBAL\Connection $dbal) {
        $this->dbal = $dbal;
    }

    public function validate($value, Constraint $constraint) {        
        
        $sql = 'SELECT * from users WHERE name = :name';
        $stmt = $this->dbal->prepare($sql);
        $stmt->bindValue(':name', $value);
        $stmt->execute();
                
        if ($stmt->fetch()) {
            $this->context->buildViolation($constraint->message)
                    ->setParameter('{{ string }}', $value)
                    ->addViolation();
        }
    }

}
