import React, {useEffect, useState} from 'react';
import ImputCustomizado from "./componentes/ImputCustomizado";
import ButtonCustomizado from "./componentes/ButtonCustomizado";
import PubSub from 'pubsub-js';
import axios from "axios";


function FormularioAutor (props){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function setNomeF(evento){
        setNome(evento.target.value);
    }

    function setEmailF(evento){
        setEmail(evento.target.value);
    }

    function setSenhaF(evento){
        setSenha(evento.target.value);
    }

    async function enviaForm(event) {
        event.preventDefault();
        try {
            PubSub.publish('limpa-erros',{});
            const resp = await axios.post('http://localhost:3001/autores', {nome, email, senha});
            console.log('Enviado com sucesso');
            props.setAtualiza(resp);
            setNome('');
            setEmail('');
            setSenha('');
        }catch (e) {
            return (
                /*1 opção*///setErro(e.response.data.error)
                /*2 opção*/ PubSub.publish("erro-validacao",e.response.data)
            );
        }


    }

    return(
        <div className="pure-form pure-form-aligned">
            <form className="pure-form pure-form-aligned" onSubmit={enviaForm} method="post">
                <ImputCustomizado id="nome" type="text" name="nome" value={nome} onChange={(evento) => {setNome(evento.target.value)}} label="Nome"/>
                <ImputCustomizado id="email" type="email" name="email" value={email} onChange={setEmailF} label="Email"/>
                <ImputCustomizado id="senha" type="password" name="senha" value={senha}  onChange={setSenhaF} label="Senha"/>
                <ButtonCustomizado type="submit" className="pure-button pure-button-primary" button="Gravar"/>
            </form>
        </div>
    );
};

function TabelaAutores(props) {
    return(
        <div>
            <table className="pure-table">
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>email</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.autores.map((autor) =>{
                        return (
                            <tr key={autor.id}>
                                <td>{autor.nome}</td>
                                <td>{autor.email}</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        </div>
    );
};


export default function BoxAutor(){
    const [autores, setAutores] = useState([]);
    const [atualiza, setAtualiza] = useState('');

    useEffect(() =>{
        async function getAutores(){
            const response = await axios.get('http://localhost:3001/autores');
            setAutores(response.data);
        }
        getAutores();
    }, [atualiza]);

    return(
        <div>
            <div className="header">
                <h1>Cadastro de autores</h1>
            </div>
            <div className="content" id="content">
                <FormularioAutor setAtualiza={setAtualiza}/>
                <TabelaAutores autores={autores}/>
            </div>
        </div>
        )


}