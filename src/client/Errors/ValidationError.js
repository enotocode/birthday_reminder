/**
 * Validation Error 
 */
export default class ValidationError extends Error {
    constructor (message, valueName, value) {
        super(message);
        this.value = value;
        this.valueName = valueName;
        this.name = 'ValidationError';            
    }
}

