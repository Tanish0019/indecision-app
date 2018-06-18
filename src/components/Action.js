import React from 'react';

//We don't have access to 'this' in these stateless components
const Action = (props) => (
    <div>
        <button 
            className="big-button"
            onClick={props.handlePick}
            disabled={!props.hasOptions}
        >
        What should I do?
        </button>
    </div>        
);


export default Action;
