import { Route, Redirect } from 'react-router-dom'; 
import React, { Component } from 'react';
import { connect } from 'react-redux';


export default function (ComposedComponent) {
  class AuthRequired extends Component {
      
//    componentWillMount() {        
//      if (!this.props.authenticated) {
//        this.props.history.push('/login');
//      }
//    }
//
//    componentWillUpdate(nextProps) {
//      if (!this.props.authenticated) {
//        //this.props.history.push('/login'); 
//     }
//    }
//
//
//    render() {
//      return <ComposedComponent {...this.props} />;
//    }

  render() {
    console.log(this.props.authenticated);
    if (this.props.authenticated) {
        return <ComposedComponent {...this.props} />;
    }  
    return (
        <Redirect to={{
                pathname: '/login',
                state: { from: this.props.location }
        }}/>
    )                   
  }
}
  function mapStateToProps(state) {

    return { authenticated: state.AuthenticationReducer.user };
  }

  return connect(mapStateToProps)(AuthRequired);
}