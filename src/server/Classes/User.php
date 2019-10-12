<?php

use Symfony\Component\Validator\Mapping\ClassMetadata;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\UserInterface;
//use Constraint\EmailExistsValidator;
//use EmailExists;

/**
 * Description of User
 *
 */
class User implements UserInterface {
    
    private $userId = NULL;
    private $userName = NULL;
    private $email = NULL;
    private $role = 'ROLE_USER';
    private $passHash = NULL;
    private $password = NULL;
    
    
    public function getUserId() {
        return $this->userId;
    }

    public function getUserName() {
        return $this->userName;
    }

    public function getEmail() {
        return $this->email;
    }

    public function getRoles() {
        return $this->role;
    }

    public function getPassHash() {
        return $this->passHash;
    }

    public function getPassword() {
        return $this->password;
    }
    public function getSalt() {
        return null;
    }
    
    public function setUserId($userId) {
        $this->userId = $userId;
    }

    public function setUserName($userName) {
        $this->userName = $userName;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function setRole($role) {
        $this->role = $role;
    }

    public function setPassHash($passHash) {
        $this->passHash = $passHash;
    }

    public function setPassword($password) {
        $this->password = $password;
    }

    public function eraseCredentials() {
        // do nothing as yet
    }
    
     /**
     * Set property values
     * 
     * @param array $data
     */
    public function setData(Array $data) {
        
       
        foreach ($data as $propertyName => $value) {
            if (property_exists($this, $propertyName)) {
                $this->$propertyName = $value;
            }
        }
        
        $this->passHash = $this->password;
    }
    
    // Silex validation 
    static public function loadValidatorMetadata(ClassMetadata $metadata) {
        $metadata->addPropertyConstraint('userName', new Assert\NotBlank());
        $metadata->addPropertyConstraint('userName', new Assert\Length(array(
            'max' => 80,
            'maxMessage' => 'The user name`s length must be shorter than 80 characters.')));
        $metadata->addPropertyConstraint('userName', new Assert\Regex(array(
            'pattern' => '/[^A-Za-zА-Яа-яё]/ui',
            'match' => false,
            'message' => 'The user name can only contain alphabet characters a-z',
        )));
        $metadata->addPropertyConstraint('userName', new UserNameExists());

        $metadata->addPropertyConstraint('email', new Assert\Email(array("message" => "The email '{{ value }}' is not a valid email.",)));
        $metadata->addPropertyConstraint('email', new EmailExists());
        $metadata->addPropertyConstraint('email', new Assert\NotBlank());
    }
    


}
