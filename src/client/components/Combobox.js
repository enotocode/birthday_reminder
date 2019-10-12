import React from 'react';

class Combobox extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {};
    //     this.state.value = null;
    // }

    // componentWillReceiveProps(nextProps) {
    //     // Initialization state whem the form is showed
    //     this.state.value = nextProps.value;
    // }

    render() {
        // get name by id
        // var name = '';
        // for (var i in this.props.options) {
        //     console.log(this.props.value);
        //     if (this.props.options[i].id==this.props.value) {                 
        //         name = this.props.options[i].name;
        //     }
        // }
        // console.log(name);
        return(
                <select                    
                    value={this.props.value}
                    onChange={(event)=>this.props.onChange(this.props.name, event.target.value)}
                >
                    {(this.props) ? this.props.options.map(option => ( 
                        <option 
                            key={option.id} 
                            value={option.id} 
                        >{option.name}</option>)
                                            ) : ''}
                </select>
                );
    }
}
;

export default Combobox;
