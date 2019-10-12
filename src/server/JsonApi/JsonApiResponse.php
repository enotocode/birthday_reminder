<?php
namespace JsonApi;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;

/**
 * Description of JsonApiResponse
 *
 * @author Grade
 */
class JsonApiResponse extends Response {
    
    /**
     * Jsonapi response http://jsonapi.org/format/#document-top-level
     * 
     * @param {Array | null} $data - The document’s “primary data”
     * @param {Array | null} $errors - An array of error objects
     * @param {int} $status - HTTP status code
     * @throws Exception
     */
    public function __construct($data = null, $errors = null, $status = 200) {
        
        // The members data and errors MUST NOT coexist in the same document.
        // http://jsonapi.org/format/#document-top-level
        if ( !is_null($data) && !is_null($errors) ) {
            throw new Exception('The members data and errors MUST NOT coexist in the same response.');
        }
        
        $content = array();
        $content['jsonapi'] = array('version'=>'1.0');
        if ( !is_null($data)) { $content['data'] = $data; }  
        if ( !is_null($errors)) { $content['errors'] = $errors; }
        
        $this->headers = new ResponseHeaderBag(array());
        $this->setContent(json_encode($content));
        $this->setStatusCode($status);
        $this->setProtocolVersion('1.0');

        /* RFC2616 - 14.18 says all Responses need to have a Date */
        if (!$this->headers->has('Date')) {
            $this->setDate(\DateTime::createFromFormat('U', time()));
        }
    }
}
