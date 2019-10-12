<?php

function myAutoload($className) {
        
        // Just add path to folder
        $folders = array(
            '/../Classes/',
            '/../Classes/Mappers/',
            '/../Constraints/',
            '/../Controllers/',
            '/../JsonApi/',
            '/../JsonApi/Mappers/',            
            '/../ServiceProviders/',
            '/../Services/',
            '/../Services/Authentication/',
            '/../tests/Classes/Mappers/',
            '/../',
         
        );
        
        foreach ($folders as $folder) {
            $fullFileName =  __DIR__ . $folder . $className . ".php";
            if (file_exists($fullFileName)) {
                require $fullFileName;
            } 
        }
    }

spl_autoload_register('myAutoload');

