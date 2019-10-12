import React from 'react';
import { connect } from 'react-redux'
import { 
    fetchUserInfo
} from '../Authentication/actions';  
import SignInFormLSComponent from './SignInFormLSComponent'; 
 
/*
 * Container
 */
const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = dispatch => {
    return {      
        fetchUserInfo: () => {
            dispatch(fetchUserInfo());
        }
    };
};

const SignInFormWS = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInFormLSComponent);


export default SignInFormWS;
