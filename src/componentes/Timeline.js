import React,{Component} from 'react';
import FotoItem from './Foto';

export default class Timeline extends Component{
    
    // declara objeto literal
    constructor(){
        super();
        this.state = {fotos:[]};
        this.login = this.props.login;
    }

    carregaFotos(){
        let urlPerfil;
        if(this.login === undefined){
            urlPerfil = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        } else {
            urlPerfil = `http://localhost:8080/api/public/fotos/${this.login}`;
        }

        fetch(urlPerfil)
        .then(response => response.json())
        .then(fotos => {
            this.setState({fotos: fotos});
        });
    }


    componentDidMount(){
        carregaFotos();
    }
    

    // tem acesso a novas propriedades passadas para componente
    componentWillReceiveProps(nexProps){
        if(nextProps.login !== undefined){
            this.login = nextProps.login;
            this.carregaFotos();
        }
    }

    render(){
        return(
            <div className="fotos container">
            {
                // transforma array de fotos em elementos
                this.state
                .fotos
                .map(foto => <FotoItem key={foto.id} foto={foto}/>)
            }
            </div>
        )
    }
}