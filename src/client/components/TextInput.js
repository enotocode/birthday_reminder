import React from 'react';

class TextInput extends React.Component {
    render() {
        return(
                <input
                    required={this.props.required}
                    type={this.props.type}
                    name={this.props.name}
                    value={this.props.value || ""}
                    onChange={this.props.onChange}  
                    className={this.props.className}
                    />
                );
    }
}
;

export default TextInput;
