
import { useEffect, useState } from 'react';
import '../css/maim.css';


export function Main() {
    //*---------------------------------Estados--------------------------------------------------------------*/
    const[rows, setRows] = useState([]);//Estado para guardar el array de datos que vienen de la base de datos 
    const [newBook, setNewBook] = useState({ titulo: '', autor: '' });//estado para añadir nuevo elemento
    //estados para actualizar los elementos
    const [modalBook, setModalBook] = useState({modalID: -1,modalTitulo: '', modalAutor: ''});
    //*---------------------------------Funciones--------------------------------------------------------------*/
    //------------------------------función que trae todos los registros de la tabla
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
        useEffect(() => {
            fetchData();
    },[]);

    useEffect(() => {
     
},[modalBook]);
    //----------------------------------------añade un nuevo registro en la tabla
    const handleAddBook = async (e) => {//handle=>Manejar
        e.preventDefault();
        try {
        
            const response = await fetch('http://localhost:5020/Libros', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBook),
            });

            if (response.ok) {
                // Actualizar la lista de libros después de agregar uno nuevo
                fetchData();
                // Limpiar el formulario
                setNewBook({ titulo: '', autor: '' });
            } else {
                console.log('No se pudo agregar el libro');
            }
        } catch (error) {
            console.log(error);
        }
    };
    const manejarNuevoLibro = (e) => {//me va a mirar si es un libro nuevo
        if (e.target.name === 'titulo') {//mira si en el input tiene un 'titulo'
          setNewBook({ ...newBook, titulo: e.target.value });//target=> evento que te dice quien quiere el evento,
                                                            // en este caso 'name' y me trae el value del input mediante el name
        } else if (e.target.name === 'autor') {//mira si en el input tiene un 'autor'
            setNewBook({ ...newBook, autor: e.target.value });
        }
      };

    //---------------------------------------función que elimina registros
    const handleDeleteBook = async (idToDelete) => {
        try {
            // Realiza la solicitud para eliminar el libro por su ID
            const response = await fetch(`http://localhost:5020/Libros/${idToDelete}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                // Eliminación exitosa, actualiza la lista de libros después de eliminar uno
                fetchData();
            
            } else {
                console.log('No se pudo eliminar el libro');
            }
        } catch (error) {
            console.log(error);
        }
    };
//--------------------------------------------------funcion actualizar 
    const handleUpdateBook = async () => {
        debugger;
        try {
            const response = await fetch('http://localhost:5020/Libros', {
            method: 'PUT', // Puedes usar 'PATCH' si solo quieres actualizar ciertos campos
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            id: modalBook.modalID,
            titulo: modalBook.modalTitulo,
            autor: modalBook.modalAutor,
            }),
        });
    
        if (response.ok) {
            // Actualización exitosa, cierra el modal y actualiza la lista
            fetchData();
        } else {
            console.log('No se pudo actualizar el libro');
        }
        } catch (error) {
        console.log(error);
        }
    };
  

    const manejarCambioLibro = (e) => {//me va a mirar en que input me esta entrando el cambio si es en el titulo o en autor
        if (e.target.name === 'titulo') {
          setModalBook({ ...modalBook, modalTitulo: e.target.value });
        } else if (e.target.name === 'autor') {
          setModalBook({ ...modalBook, modalAutor: e.target.value });
        }
      };

//función para el modal  
    function Modal({ book, isOpen, onClose }) {
      if (!isOpen) {
        return null; // No mostrar el modal si no está abierto
      }
    
      return (
        <div className="modal">
          <div className="modal-content">
                <h2 className='modal-titulo'>Editar Libro</h2>
                <div className="modal-elemento">
                    <input
                        className='modal-elemento-input'
                        type="text"
                        name="titulo"
                        value={modalBook.modalTitulo}
                        onChange={manejarCambioLibro}
                    />
                    </div>
                    <div className="modal-elemento">
                    <input
                        className='modal-elemento-input'
                        type="text"
                        name="autor"
                        value={modalBook.modalAutor}
                        onChange={manejarCambioLibro} 
                    />
                    </div>
                <button className='card-back-button' onClick={handleUpdateBook}>
                        Aceptar
                </button>
                <button onClick={onClose} className='card-back-button'>Cerrar</button>
          </div>
        </div>
      );
    }
   
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
                                {book.titulo}
                            </span>
                        </h4>
                        <div className="card__details">
                            <ul>
                                <li>{book.autor}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="card__side card__side--back card__side--back-1">
                        {/**parte de atras de la carta  */}
                        <div className="card-back">
                            <button className="card-back-button" onClick={() => {
                              debugger;
                                setModalBook({modalID: book.id ,modalTitulo: book.titulo, modalAutor: book.autor});
                                }}>
                                Actualizar
                            </button>
                            {/** book={book}=>Se pasa el libro que hace falta */}
                            {/** isOpen={isModalOpen !== -1 && book.id === isModalOpen} => si el modal esta open y 
                             * es el id que estoy actualizando, muestramelo
                             */}
                            
                            {modalBook.modalID === book.id && (
                            <Modal
                                book={book}
                                isOpen={true}
                                onClose={() => setModalBook({modalID: -1, modalTtitulo: '', modalAutor: ''})}
                            />)}
                            <button type="button" onClick={() => handleDeleteBook(book.id)}
                                    className=" card-back-button">Eliminar
                            </button>
                        </div>    
                    </div>
                </div>
            </div>
          
        ))}{/**cierre del rows para traer los títulos y los autores */}
    </div>
    <div className='container-form'>{/**Formulario para añadir un nuevo libro */}
        <form onSubmit={handleAddBook}>
            <input className='container-form-titulo'
                type="text"
                name="titulo"
                placeholder="Título"
                value={newBook.titulo}
                onChange={(e) => manejarNuevoLibro(e)}
                />               
            <input className='container-form-autor'
                type="text"
                name="autor"
                placeholder="Autor"
                value={newBook.autor}
                onChange={(e) => manejarNuevoLibro(e)}
                />                   
            <button type='submit'  className="btn btn-white container-form-button">Añadir</button>
            
      
        </form>       
    </div>
    {/** fin del formulario para añadir un nuevo libro */}
</div>
   
</>
  );
}

