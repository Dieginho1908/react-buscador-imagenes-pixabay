import React from 'react';

const Navegacion = (props) => {
    return (
        <div className="row ">
            <button  onClick={props.paginaAnterior} className="btn btn-info mr-1">
                Anterior &larr;
            </button>
            <button onClick={props.paginaSiguiente} className="btn btn-info mr-1">
                Siguiente &rarr;
            </button>
        </div>
    );
};

export default Navegacion;