import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import App from "./App";
import Autor from "./Autor";
import Livro from "./Livro"
import Home from "./Home";

export default function Routes() {
    return (
        <Router >
            <App/>
                <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/autor" component={Autor}/>
                <Route path="/livro" component={Livro}/>
                </Switch>
        </Router>
    )
}