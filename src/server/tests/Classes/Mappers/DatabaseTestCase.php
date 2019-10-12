<?php

use PHPUnit\Framework\TestCase;
use PHPUnit\DbUnit\TestCaseTrait;
use PHPUnit\DbUnit\DataSet\CsvDataSet;
use Doctrine\DBAL\DriverManager;

/**
 * Description of DatabaseTestCase
 *
 * @author Enotocode <enotocode@yandex.ru>
 */
class DatabaseTestCase extends TestCase {
    
    use TestCaseTrait;
    
    // One $conf for test clean-up/fixture load
    static private $dbal = null;
    static private $pdo = null;
    
    private $conn = null;
    
    public function getConnection() {
        
        if ($this->conn === null) {
            if (self::$pdo == null) {
                self::$pdo = new PDO("mysql:dbname=birthday_reminder_test;host=localhost", $GLOBALS['DB_USER'], $GLOBALS['DB_PASSWD'] );
            }
            $this->conn = $this->createDefaultDBConnection(self::$pdo, $GLOBALS['DB_DBNAME']);
        }
        return $this->conn;
    }
    
    protected function getDataSet() {
//        $dataSet = new CsvDataSet();
//        $dataSet->addTable('events', dirname(__FILE__)."/EventsDataSet.csv");
//        $dataSet->addTable('reminders', dirname(__FILE__)."/RemindersDataSet.csv");
//        $dataSet->addTable('participants', dirname(__FILE__)."/ParticipantsDataSet.csv");
//        return $dataSet;
        
        return $this->createMySQLXMLDataSet(dirname(__FILE__)."/dump.xml");
    }
    
    /**
     * @return \Doctrine\DBAL\Connection
    */
    protected function getDbal()
    {
        if (self::$dbal === null)
        {

            
            //$this->dbal = \Doctrine\DBAL\DriverManager::getConnection($connectionParams, $conf);
            self::$dbal = DriverManager::getConnection(array('pdo' => $this->getPdo()));
        }
 
        return self::$dbal;
    }
    protected function getPdo() {
        return self::$pdo;
    }
    
}
