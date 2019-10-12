<?php

namespace JsonApi;

/**
 * Description of ErrorMapperInterface
 *
 * @author Grade
 */
interface ErrorMapperInterface {
    
    /**
     * Error Object as it describes in http://jsonapi.org/format/#error-objects
     */
    public function build($error);
}
