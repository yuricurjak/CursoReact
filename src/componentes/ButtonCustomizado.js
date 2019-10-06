import React from 'react';

function ButtonCustomizado (props) {
    return (
        <div className="pure-control-group">
            <label> </label>
            <button type={props.type} className={props.className}>{props.button}</button>
        </div>
    );
};

export default ButtonCustomizado;