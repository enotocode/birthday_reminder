import React from 'react';
import { connect } from 'react-redux'
import { 
    initiateLogout,
} from '../Authentication/actions';  
import UserBarComponent from './UserBarComponent'; 
 
/*
 * Container
 */
const mapStateToProps = state => {
    return  {
        user: state.AuthenticationReducer.user
    };   
};

const mapDispatchToProps = dispatch => {
    return {    
        initiateLogout: () => {
            dispatch(initiateLogout());
        }
    };
};

const UserBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserBarComponent);


export default UserBar;
