
import { useEffect, useState } from 'react';
import '../css/maim.css';


export function Main() {
    const[rows, setRows] = useState([]);//Estado para guardar el array de datos que vienen de la base de datos 

    useEffect(() => {//función que trae todos los registros de la tabla
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:5020/Libros');
                if (response.ok) {
                    const data = await response.json();
                    setRows(data);
                } else {
                    console.log('No se puede obtener la lista del elemento');
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    },[]);
  return (
    <>
    <div className="container-main">
    <div className="row">
        {rows.map((book, index) => (//book=> nombre inventado para cada fila / index=> es un idice para recorrer 
            <div className="col-1-of-3" key={index}>
                <div className="card">
                    <div className="card__side card__side--front">
                        <div className="card__picture card__picture--1">
                            &nbsp;
                        </div>
                        <h4 className="card__heading">
                            <span className="card__heading-span card__heading-span--1">
                                {book.título}
                            </span>
                        </h4>
                        <div className="card__details">
                            <ul>
                                <li>{book.autor}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="card__side card__side--back card__side--back-1">
                        <div className="card__cta">
                            <div className="card__price-box">
                                Seccion Actualizar 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))}{/**cierre del rows para traer los títulos y los autores */}
    </div>
    <div>
        <form>{/**Formulario para añadir un nuevo libro */}
            <label >
              
                <input type="text" name='titulo' placeholder='Título'/>
            </label>
            <label >
                
                <input type="text" name='Autor' placeholder='Autor'/>
            </label>
            <button type='submit'  className="btn btn-white">Añadir</button>
        </form>
    </div>
    
</div>
   
</>
  );
}

