import React from 'react';
import classNames from 'classnames';
import MyLink from '../components/MyLink';
import Button from '../components/Button';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class UserBarComponent extends React.Component {   

    render() {
        const {user, initiateLogout} = this.props;
        return (
                <div className="is-push-right is-text-right user-bar">
                    <span className="user-name"> Hello, {user ? user.name : 'Anonym'}!</span>
                    {user ?
                        <MyLink 
                            onClick={initiateLogout}
                            text="Logout"
                            ></MyLink>
                    :
                        <Link to="/signin">
                            <Button 
                                myClasses={{'is-small': true}}
                                text='Login'
                                onClick = {false}
                                isDisabled={false}
                                isSubmiting={false}
                                secondary =''
                                icon='icon icon-enter'
                            ></Button>
                            </Link>

                    }
                </div>
                )
    }
}
export default UserBarComponent;