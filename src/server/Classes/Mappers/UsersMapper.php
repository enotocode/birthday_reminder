<?php

class UsersMapper {

    //The database connection, instance of Doctrine\DBAL\Connection
    private $dbal = null;

    public function __construct(Doctrine\DBAL\Connection $dbal) {
        $this->dbal = $dbal;
    }

    //User $user
    public function saveUser(User $user) {
        //insert into users values (null, null, null, 'mail1@mail.ru', '12345');
        $sql = 'insert into users values (
                    :user_id,
                    :name ,
                    :email,
                    :pass_hash,
                    :role
                )';
        
        $stmt = $this->dbal->prepare($sql);

        $stmt->bindValue(':user_id', $user->getUserId());
        $stmt->bindValue(':name',  $user->getUserName());
        $stmt->bindValue(':email', $user->getEmail());
        $stmt->bindValue(':pass_hash', $user->getPassHash());
        $stmt->bindValue(':role', $user->getRoles());

        $stmt->execute();

//        $qB = $this->dbal->createQueryBuilder();
//        $qB
//                ->insert('users')
//                ->values(
//                        array(
//                            'user_id' => '?',
//                            'first_name' => '?',
//                            'last_name' => '?',
//                            'email' => '?',
//                            'pass_hash' => '?'
//                        )
//                )
//                ->setParameter(0, $user->getUserId())
//                ->setParameter(1, $user->getName())
//                ->setParameter(2, $user->getLastName())
//                ->setParameter(3, $user->getEmail())
//                ->setParameter(4, $user->getPassHash())
//        ;
//        $result = $qB->execute();
    }
    

}
