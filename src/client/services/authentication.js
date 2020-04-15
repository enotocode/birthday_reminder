import {requestCheckAuth} from '../services/apiCall';

// export function refreshToken(data){
	
// 	let token;
// 	// get token from server
// 	return getToken(data)
//                 .then((response) => {
//                 	console.log("Authentication response is recevived");

//                     // this.setState({ statusBar: 'Form is submited' });
//                     // this.handleResponse(response);
//                     // this.props.setUser();

//                     if (!token) token = 'demo:foo';
// 					// save token
// 					sessionStorage.setItem('X-AUTH-TOKEN', token);

// 					// if (typeof callback === "function") {
// 		   //              console.log('execution callbak...');
// 		   //              callback(response);
// 		   //          }

// 		   			return response;

//                  })
//                 .catch(error => {
//                 	console.log("ERROR: in authentication request");
//                 	throw error;
//                 	// callback(response, errors)
//                     // this.setErrors(errors);
//                     // this.setState({ isSubmiting: false })
//                 })    
// }

export function checkAuth(data){ 

    // sessionStorage.setItem('X-AUTH-OLD-TOKEN', sessionStorage.getItem('X-AUTH-TOKEN'));
    // sessionStorage.setItem('X-AUTH-TOKEN', token);
    console.log("username:password");
    console.log(data);

    return requestCheckAuth(data)
                .then((response) => {
                    console.log("Authentication response is recevived");


                    // this.setState({ statusBar: 'Form is submited' });
                    // this.handleResponse(response);
                    // this.props.setUser();

                    // if (!token) token = 'demo:foo';
                    // save token
                    // sessionStorage.setItem('X-AUTH-TOKEN', token);

                    // if (typeof callback === "function") {
           //              console.log('execution callbak...');
           //              callback(response);
           //          }
                    if (response.token) {
                        sessionStorage.setItem('X-AUTH-TOKEN', token);
                        return true
                    }  else {                        
                        return false
                    }

                })
                .catch(error => {
                    console.log("ERROR: in authentication request");
                    throw error;
                    // callback(response, errors)
                    // this.setErrors(errors);
                    // this.setState({ isSubmiting: false })
                })    

};

export function getToken(){
    let token = sessionStorage.getItem('X-AUTH-TOKEN');
    if (!token) token = 'demo:foo';
    return token;
};

export function saveToken(token){
    if (!token) token = 'demo:foo';
    sessionStorage.setItem('X-AUTH-TOKEN', token);
}

