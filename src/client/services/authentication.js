import {getToken} from '../services/apiCall';

export function refreshToken(data){
	
	let token;
	// get token from server
	return getToken(data)
                .then((response) => {
                	console.log("Authentication response is recevived");

                    // this.setState({ statusBar: 'Form is submited' });
                    // this.handleResponse(response);
                    // this.props.setUser();

                    if (!token) token = 'demo:foo';
					// save token
					sessionStorage.setItem('X-AUTH-TOKEN', token);

					// if (typeof callback === "function") {
		   //              console.log('execution callbak...');
		   //              callback(response);
		   //          }

		   			return response;

                 })
                .catch(error => {
                	console.log("ERROR: in authentication request");
                	throw error;
                	// callback(response, errors)
                    // this.setErrors(errors);
                    // this.setState({ isSubmiting: false })
                })                          

    
}