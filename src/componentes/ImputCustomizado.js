import React, {useState} from 'react';
import PubSub from 'pubsub-js';

function ImputCustomizado (props) {
    const [erro, setErro] = useState('');

    PubSub.subscribe("erro-validacao",function(topico, erro){
        setErro(erro.error);
    });
    PubSub.subscribe("limpa-erros",function(topico){
        setErro('');
    });
    return (
        <div className="pure-control-group">
            <label htmlFor={props.id}>{props.label}</label>
            <input {...props}/>
            <span className="erro">{erro}</span>
        </div>
    );
};

export default ImputCustomizado;
