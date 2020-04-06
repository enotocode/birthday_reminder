/**
 * Errors with stastus 5xx
 */
export default class ServerError extends Error {
    constructor (response) {
    	console.log(response);
        super('Server error, try later');       
        this.errors = response.status;
        this.response = response;
        this.name = 'ServerError';            
    }
}