import React from 'react';

class StatusBar extends React.Component { 

	constructor(props) {
		super(props);
		this.state={};
		this.state.show=(props.message) ? true : false;	
		this.state.message=(props.message) ? props.message : null;	
		this.messageId=(props.messageId) ? messageId : null;	

		this.hideAfter = this.hideAfter.bind(this);
	} 

	// static getDerivedStateFromProps(props, current_state) {
	// 	if (current_state.value !== props.value) {
	// 		return {
	// 			value: props.value,
	// 			computed_prop: heavy_computation(props.value)
	// 		}
	// 	}
	// }

	componentDidUpdate(prevProps) {
		if (this.props.messageId !== prevProps.messageId) {
			this.setState(prevState=>({
				message: this.props.message,
				show: true,
				messageId: this.props.messageId
			}));
			this.hideAfter();
		}
	}

	hideAfter(milisec) {
		console.log("start countdown");
		// default show time 6 second
		if (!milisec) milisec=4000;
		//  this.timerID = setInterval(
		// 	function(){console.log('tick')},
		// 	1000
		// );
		this.timerID = setTimeout(
			function(){
				this.setState(prevState=>({show: false}))
			}.bind(this), milisec);
	}  

	render() {
		console.log("this.state.show: "+this.state.show)
		if (!this.state.show) return null;
		return (
			<div
				className="message error"
				data-component="message"
			>
				<p>Status: {this.state.message}</p>
				{
					this.state.button ? 
					<button onClick={props.onRetry}>Retry</button>
					: ''
				}
			</div>			
		)			   
	}
}

export default StatusBar;