import React from 'react';
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class InputLabel extends React.Component {
    render() {
        return(
                <label>
                    {this.props.label}
                    {this.props.required ? <span className="req"> *</span> : ""}
                </label>
                );
    }
};

export default InputLabel