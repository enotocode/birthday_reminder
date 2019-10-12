import React from 'react';

const StatusBar = (props) => (
            <div
                className="message error"
                data-component="message"
            >
                <p> Status: {props.message} </p>
                {props.button ? 
                    <button onClick={props.onRetry}>Retry</button>
                    : ''
                    }
            </div>
            );

export default StatusBar;