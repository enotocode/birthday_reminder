import React from 'react';
import SignInFormWS from '../SignInFormWithState/index';
import SignUpFormWS from '../SignUpFormWithState/index';
import MyLink from './MyLink';


class Login extends React.Component {
    constructor(props) {
        super(props);        
        this.state = {signin: true};        
    }
    
    setPath(boolean){     
       console.log(boolean)
        this.setState({signin: boolean});
        console.log(this.state)
    }
    
    render() {
        return(
            <div>
                {this.state.signin ?
                    <div >
                        <span className="label is-error">Rejected</span>
                        
                        
                    </div>
                    :
                    <div>
                        
                        <MyLink
                            onClick={()=>this.setPath(true)}
                            text="Create Account"
                        />
                    </div>        
                }
                <SignInFormWS/>
                </div>
                );
    }
};

export default Login