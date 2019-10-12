import React from 'react';
import { connect } from 'react-redux'
import { 
    fetchUserInfo
} from '../Authentication/actions';  
import SignUpFormLSComponent from './SignUpFormLSComponent'; 
 
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

const SignUpFormWS = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpFormLSComponent);


export default SignUpFormWS;
