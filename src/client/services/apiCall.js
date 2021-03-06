import JsonApiError from '../Errors/JsonApiError';
import AuthenticationError from '../Errors/AuthenticationError';
import ServerError from '../Errors/ServerError';
import {getToken} from './authentication';


////import {SUBMIT} from '../Login/actions';
//import {VALIDATE_WITH_API} from './validator';
/* 
 * API call middleware
 */
//const apiCall = store => next => action => {
//
//            next(action);
//
//            switch (action.type) {
//                case SUBMIT:
//                    //send request
//                    return submit(next, action);
//                case VALIDATE_WITH_API:
//                    //console.log('VALIDATE_WITH_API');
//                    return validateWithAPI(next, action);
//                default:
//                    break
//            }
//        }
//export default apiCall;

function sendRequest(url, request) {

    // get X-AUTH-TOKEN from sessionStorage
    // let token = sessionStorage.getItem('X-AUTH-TOKEN');
    let token = getToken();
    //if (!token) token = 'demo:foo1';

    // set X-AUTH-TOKEN header
    if (!request.headers) request.headers={};
    request.headers['X-AUTH-TOKEN']=token;

    return handleResponse(
            fetch(url, request)
            //.then(response => Promise.all([ response, response.json() ]))
            
    );
}

function handleResponse(promise) {
    console.log(promise)
    // return promise.then(([ response, json ]) => { 
    return promise.then((response) => { 
                        // status = 2xx
                        //console.log(response);
                        if (response.ok) {
                            var json;
                            try{
                               json = response.json(); 
                            } catch(error){
                                // cant parse json content
                                throw new Error(error);
                            }
                            return json;
                        // forbiden (dont have access)
                        } else if (response.status==403)  {
                            return new AuthenticationError(json); 
                        // all other errors (5xx, 4xx, etc)    
                        } else  {
                            console.log("ERROR: all other errors (5xx, 4xx, etc)");

                            throw new ServerError(response);  
                        }            
                        // } else {
                        //     // Transforming JsonApi response in internal entitie
                        //     // Server response contains Error property
                            
                        //     throw new JsonApiError(json);
                        // }
                    }
            ).catch((error) => {
                
                    console.log("ERROR: in apiCall/handleResponse");
                    // console.log(response);

                   // SyntaxError in response.json()
                   // Network error
                   // Fetch() error
                   // Server response with errors object
                   throw error
                }
            );
}

export function apiCallValidate(valueName, value) {

    let input = {
        valueName: valueName,
        value: value
    }
    
    let url = '/validate';
    let request = {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(input)
    };
    
    return (sendRequest(url, request))

}

export function submitSingnUpForm(inputs) {

    let url = '/signup';
    let request = {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(inputs)
    };

    return (sendRequest(url, request))
}

// export function getToken(inputs) {
    
//     var formBody = [];
//     for (var property in inputs) {
//         var encodedKey = encodeURIComponent(property);
//         var encodedValue = encodeURIComponent(inputs[property]);
//         formBody.push(encodedKey + "=" + encodedValue);
//     }
//     formBody = formBody.join("&");

//     let url = '/admin/user';
//     let request = {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//             'Accept': 'text/html, application/xhtml',
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'X-Requested-With': 'XMLHttpRequest'
//           },
//         body: formBody
//     };

//     return (sendRequest(url, request))
// }

// Send token to authentication url
export function requestCheckAuth(data) {
    
    // var formBody = [];
    // for (var property in data) {
    //     var encodedKey = encodeURIComponent(property);
    //     var encodedValue = encodeURIComponent(data[property]);
    //     formBody.push(encodedKey + "=" + encodedValue);
    // }
    // formBody = formBody.join("&");

    // let url = '/admin/user';
    let url = '/signin';
    let request = {
        method: 'POST',
        credentials: 'include', //?
        headers: {'Content-type': 'application/json'},
        body:  JSON.stringify({_username:'demo', _password:'foo'})
    };

    return (sendRequest(url, request))
}

// The UserBarComponent's requests
export function requestUserInfo() {
    let url = '/admin/user';    
    let request = {
        method: 'GET',
        credentials: 'include',
        headers: {'Content-type': 'application/json'}            
        }
    return (sendRequest(url, request))
}

export function requestLogout() {
    let url = '/admin/logout';
    let request = {
        method: 'GET',
        credentials: 'include',
        headers: {'Content-type': 'application/json'}            
        }
    return (sendRequest(url, request))
}

export function saveEvent(event) {
    let url = 'api/save_event';
    let request = {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(event)
    };
    return (sendRequest(url, request))
}

export function getAllEvents() {
        let url = 'api/get_events';
    let request = {
        method: 'GET',
        credentials: 'include',
        headers: {'Content-type': 'application/json'}            
        }
    return (sendRequest(url, request))
}

    