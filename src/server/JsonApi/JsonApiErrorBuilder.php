<?php
namespace JsonApi;

use JsonApi\ErrorMapperInterface;

/**
 * Create Error Objects as describe in http://jsonapi.org/format/#error-objects
 *
 * @author Grade
 */
class JsonApiErrorBuilder {
    
    private $mapper;
    
    public function __construct(ErrorMapperInterface $mapper) {
        $this->mapper = $mapper;
    }            
    
    public function build(\Symfony\Component\Validator\ConstraintViolation $error) {
        return $this->mapper->build( $error);
    }
}
