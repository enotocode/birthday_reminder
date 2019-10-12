import React from 'react';
import classNames from 'classnames';

//    { status.isSubmiting ?
//    <div className = "preloader"><img src="img/Infinity.gif"/></div>                        : ""
//    }
//    );

const Button = ({text, type, isDisabled, isSubmiting, outline, secondary, onClick, right, myClasses, icon}) => {
    //let text =  (text) ? text : '';       
    var myClasses = (myClasses) ? myClasses : {};

            return (
                <button
                    type = {type}
                    onClick = {onClick ? ()=>onClick() : ''}
                    className = {classNames(Object.assign(myClasses, {                            
                            button: true,
                            'loading-button': isSubmiting,
                            disabled: isDisabled,
                            outline: outline,
                            secondary: secondary,
                            right: right
                    }))}
                    disabled = {isDisabled}
                    >
                    {icon ? <span className={icon}></span> : ''}
                    <loader></loader>
                    {text||''}            
                </button> 
                )
            }

    export default Button;