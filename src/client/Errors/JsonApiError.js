/**
 * Error with jsonapi response contains errors 
 */
export default class JsonApiError extends Error {
    constructor (response) {
        super('Resonse with errors from server');
        this.errors = response.errors;
        this.response = response;
        this.name = 'JsonApiError';            
    }
}

