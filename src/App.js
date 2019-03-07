import React, { Component } from 'react';
import Buscador from './componentes/Buscador'
import Resultado from './componentes/Resultado'

import './App.css'

class App extends Component {
  state = {
    termino:'',
    imagenes: [],
    pagina:'',
    cargando: false
  }

  consultarAPI = async () => {

    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=11809863-cd21fd398f842a588c73682a3&q=${termino}&per_page=30&page=${pagina}`

    await fetch(url)
    .then(respuesta => {
      this.setState({
        cargando:true
      });
      return respuesta.json()
    })
    .then(resultado => {
      setTimeout(()=>{
        this.setState({
          cargando: false
        })
      }, 1000)
      
      return this.setState({imagenes:resultado.hits});
    })
    .catch( err => console.log(err))


  }

  datosBusqueda = (termino) => {
    //console.log(termino)

    this.setState({
      termino: termino,
      pagina:1
    }, ()=>{
      this.consultarAPI();
    })
  }


  paginaAnterior = () =>{
    let pagina = this.state.pagina;
    if(pagina === 1) return null

    pagina--;
    this.setState({
      pagina
    }, () =>{
      this.consultarAPI();
      this.scroll();
    })
  }

  paginaSiguiente = () =>{
    let pagina = this.state.pagina;

    pagina++;
    this.setState({
      pagina
    }, () =>{
      this.consultarAPI();
      this.scroll();
    })
    
  }

  scroll = () =>{
    const elemento = document.querySelector('#resultado');

    elemento.scrollIntoView('auto', 'start')
  }
  render() {

    const cargando = this.state.cargando;

    let resultado;
    if(cargando){
      resultado = <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                  </div>
    }else{
      resultado = <Resultado
                  imagenes={this.state.imagenes}
                  paginaAnterior={this.paginaAnterior}
                  paginaSiguiente={this.paginaSiguiente}
                  />
    }
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de imágenes</p>
          <Buscador
          datosBusqueda={this.datosBusqueda}
        />
        </div>

        <div className="row justify-content-center">
          {resultado}
        </div>
        

      </div>
    );
  }
}

export default App;
