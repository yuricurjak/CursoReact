import React, {useEffect, useState} from 'react';
import ImputCustomizado from "./componentes/ImputCustomizado";
import ButtonCustomizado from "./componentes/ButtonCustomizado";
import PubSub from 'pubsub-js';
import axios from "axios";

function FormularioLivro (props){
    const [titulo, setTitulo] = useState('');
    const [preco, setPreco] = useState('');
    const [AutorId, setAutorId] = useState('');

    function setTituloF(evento){
        setTitulo(evento.target.value);
    }

    function setPrecoF(evento){
        setPreco(evento.target.value);
    }

    function setAutorIdF(evento){
        setAutorId(evento.target.value);
    }


    async function enviaForm(event) {
        event.preventDefault();
        try {
            PubSub.publish('limpa-erros',{});
            const resp = await axios.post('http://localhost:3001/livros', {titulo, preco, AutorId});
            console.log('Enviado com sucesso');
            props.setAtualizaLivros(resp);
            setTitulo('');
            setPreco('');
            setAutorId('');
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
                <ImputCustomizado id="titulo" type="text" name="titulo" value={titulo} onChange={setTituloF} label="Título"/>
                <ImputCustomizado id="preco" type="text" name="preco" value={preco} onChange={setPrecoF} label="Preço"/>
                <div className="pure-control-group">
                    <label htmlFor="AutorId">Autor</label>
                    <select value={AutorId} name="autorId" id="autorID" onChange={setAutorIdF}>
                        <option value="">Selecione autor</option>
                        {
                            props.autores.map((autor) =>{
                            return <option value={autor.id}>{autor.nome}</option>
                            })
                        }
                    </select>
                </div>
                    <ButtonCustomizado type="submit" className="pure-button pure-button-primary" button="Gravar"/>
            </form>
        </div>
    );
};

function TabelaLivros(props) {
    return(
        <div>
            <table className="pure-table">
                <thead>
                <tr>
                    <th>Título</th>
                    <th>Preço</th>
                    <th>Autor</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.livros.map((livro) =>{
                        return (
                            <tr key={livro.id}>
                                <td>{livro.titulo}</td>
                                <td>{livro.preco}</td>
                                <td>{livro.autor.nome}</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        </div>
    );
};

export default function LivroBox() {

    const [livros, setLivros] = useState([]);
    const [autores, setAutores] = useState([]);
    const [atualizaLivros, setAtualizaLivros] = useState('');

    useEffect(() =>{
        async function getLivros(){
            const response = await axios.get('http://localhost:3001/livros');
            setLivros(response.data);
        }
        getLivros();
    }, [atualizaLivros]);

    useEffect(() =>{
        async function getAutores(){
            const response = await axios.get('http://localhost:3001/autores');
            setAutores(response.data);
        }
        getAutores();
    }, []);

    return(

        <div>
            <div className="header">
                <h1>Cadastro de Livros</h1>
            </div>
            <div className="content" id="content">
                <FormularioLivro autores={autores} setAtualizaLivros={setAtualizaLivros}/>
                <TabelaLivros livros={livros}/>
            </div>
        </div>
    )
}