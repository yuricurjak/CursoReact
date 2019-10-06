import React from 'react';

function ImputCustomizado (props) {
    return (
        <div className="pure-control-group">
            <label htmlFor={props.id}>{props.label}</label>
            <input id={props.id} type={props.type} name={props.nome} value={props.value} onChange={props.onChange}/>
        </div>
    );
};

export default ImputCustomizado;
