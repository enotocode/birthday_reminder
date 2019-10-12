import ValidationError from '../Errors/ValidationError';
import JsonApiError from '../Errors/JsonApiError';
import {validationRules} from '../SignUp/validationRules';
import {apiCallValidate} from '../services/apiCall';


/* 
 * Validator
 */

/**
 * Client's side validating
 * 
 * @param {string} valueName - Point on validator rule in validationRules
 * @param {string} value - Validating variable
 * @param {Object.<string, Object>} validationRules - Contains validators rules
 * @returns {Array.<ValidatingErrors>}
 */
export function validate(valueName, value, validationRules) {
    
    console.log('validating...');
    
    if (validationRules === undefined) {
        throw Error('ValidationRules not defined');
    }
    
    if (!(validationRules instanceof Object)) {
        throw Error('ValidationRules must be an Object');
    }   
    
    // In case uncomment <if> block below:
    // Class calls validate() must have information about if the valueName has validators or not.    
//    if (validationRules[valueName] === undefined) { 
//        throw Error('Can not find validators for "' +  valueName + '" in validationRules');
//    }
    
    const validators = validationRules[valueName];    
    let errorBag = [];
    
    // There is possible troubles in debugging in case typo in valueName or in validator's name
    if ('rules' in validators) {
        validators.rules.forEach((rule) => {

            let result = rule.func(value, valueName);

            if (result !== true) {
                errorBag.push( new ValidationError(rule.msg, valueName, value) );
            }
        })
    }

    return errorBag;
}

// Server side validation
export function validateWithApi(valueName, value, validationRules) {
    
    console.log('validating with Api...');
    
    if (validationRules === undefined) {
        throw Error('ValidationRules not defined');
    }
    
    if (!(validationRules instanceof Object)) {
        throw Error('ValidationRules must be an Object');
    }

    const validators = validationRules[valueName];

    if (validators.serverValidation !== undefined && validators.serverValidation) {       

        return apiCallValidate(valueName, value).then(
                json => {
                    return json
                },
                error => {
                    
                    let errorBag = [];
                    
                    // In case error is response with validating errors array
                    if (error instanceof JsonApiError) {                   
                        
                        // The errorObjects are always validation errors
                        error.errors.forEach((error) => {
                            errorBag.push(new ValidationError(
                                    error.detail,
                                    error.source.pointer
                            ))
                        })
                        
                        throw errorBag;
                    }
                    errorBag.push(error)
                    throw errorBag;
                }
        );
    }

    // Returning promise due to compability with function calls validateWithApi
    return Promise.resolve('Validating done'); 
}

