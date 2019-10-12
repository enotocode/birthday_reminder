<?php
namespace JsonApi\Mappers;

use Symfony\Component\Validator\ConstraintViolation;
use JsonApi\ErrorMapperInterface;

/**
 * Transform an instance of ConstraintViolation into Error Object 
 * as it describes in http://jsonapi.org/format/#error-objects
 *
 * @author Grade
 */
class ConstraintViolationMapper implements ErrorMapperInterface{    
   
    /**
     * @param {ConstraintViolation} $error
     * @return {Array} - Error Object 
     */
    public function build($error) {
        
        // Instead of param type hint
        // Symfony\Component\Validator\ConstraintViolation
        if (get_class($error) !== 'Symfony\Component\Validator\ConstraintViolation') {
            
            $message = 'Argument must be an instance of ConstraintViolation, ginven: ' . get_class($error) . '.';
            throw new \Exception($message);
        };
        
        return array(        
            //'id' => NULL,
            //'links' => NULL,
            'status' => 422,
            'code' => $error->getCode(), // error code for the violation.
            'title' => "Validator error: constraint violation", 
            'detail' => $error->getMessage(),
            'source' => array( 'pointer' => $error->getPropertyPath() )
            //'meta' => $this->meta,
            );
    }
}


