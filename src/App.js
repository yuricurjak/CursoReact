import React, {useEffect, useState} from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import axios from 'axios';
import ImputCustomizado from "./componentes/ImputCustomizado";
import ButtonCustomizado from "./componentes/ButtonCustomizado";

function App() {
  const [autores, setAutores] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [atualiza, setAtualiza] = useState('');

useEffect(() =>{
  async function getAutores(){
    const response = await axios.get('http://localhost:3001');
    setAutores(response.data);
  }
  getAutores();
}, [atualiza]);

async function enviaForm(event) {
    event.preventDefault();
    const resp = await axios.post('http://localhost:3001', {nome, email, senha});
    console.log(resp);
    console.log('Enviado com sucesso');
    setAtualiza(resp);
}


    function setNomeF(evento){
        setNome(evento.target.value);
    }

    function setEmailF(evento){
        setEmail(evento.target.value);
    }

    function setSenhaF(evento){
        setSenha(evento.target.value);
    }
  return (
      <div id="layout">

        <a href="#menu" id="menuLink" className="menu-link">
          <span></span>
        </a>

        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Company</a>

            <ul className="pure-menu-list">
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livros</a></li>



            </ul>
          </div>
        </div>

        <div id="main">
          <div className="header">
            <h1>Cadastro de Autores</h1>
          </div>
          <div className="content" id="content">
            <div className="pure-form pure-form-aligned">
              <form className="pure-form pure-form-aligned" onSubmit={enviaForm} method="post">
                  <ImputCustomizado id="nome" type="text" name="nome" value={nome} onChange={(evento) => {setNome(evento.target.value)}} label="Nome"/>
                  <ImputCustomizado id="email" type="email" name="email" value={email} onChange={setEmailF} label="Email"/>
                  <ImputCustomizado id="senha" type="password" name="senha" value={senha}  onChange={setSenhaF} label="Senha"/>
                  <ButtonCustomizado type="submit" className="pure-button pure-button-primary" button="Gravar"/>
              </form>

            </div>
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
                  autores.map((autor) =>{
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
          </div>
        </div>

      </div>
  );
}

export default App;
