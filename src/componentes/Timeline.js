import React,{Component} from 'react';
import FotoItem from './Foto';

export default class Timeline extends Component{
    
    // declara objeto literal
    constructor(){
        super();
        this.state = {fotos:[]};
    }

    componentDidMount(){
        // requisição ajax
        fetch('http://localhost:8080/api/public/fotos/rafael')
        .then(response => response.json())
        .then(fotos => {
            this.state({fotos: fotos});
        })
    }
    
    render(){
        return(
            <div className="fotos container">
            {
                // transforma array de fotos em elementos
                this.state
                .fotos
                .map(foto => <FotoItem foto={foto}/>)
            }
            </div>
        )
    }
}