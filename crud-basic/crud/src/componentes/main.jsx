
import { useEffect, useState } from 'react';


export function Main() {
    //*---------------------------------Estados--------------------------------------------------------------*/
    const[rows, setRows] = useState([]);//Estado para guardar el array de datos que vienen de la base de datos 
    const [newBook, setNewBook] = useState({ titulo: '', autor: '' });//estado para añadir nuevo elemento
    //estados para actualizar los elementos
    const [modalBook, setModalBook] = useState({ id: -1, titulo: '', autor: ''});
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    //----------------------------------------añade un nuevo registro en la tabla
    const handleAddBook = async (e) => {//handle=>Manejar
        e.preventDefault();//para que no submitee el form en la misma página y no recarga la página otra vez
        //cuando añade el registro no recarga la pantalla otra vez
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
                setIsModalOpen(false);
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
    const handleDeleteBook = async (e,idToDelete) => {
        e.preventDefault();

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
    const handleUpdateBook = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5020/Libros', {
            method: 'PUT', // Puedes usar 'PATCH' si solo quieres actualizar ciertos campos
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            id: modalBook.id,
            titulo: modalBook.titulo,
            autor: modalBook.autor,
            }),
        });
    
        if (response.ok) {
            // Actualización exitosa, cierra el modal y actualiza la lista
            fetchData();
            setModalBook({id: -1, titulo: '', autor: ''})
        } else {
            console.log('No se pudo actualizar el libro');
        }
        } catch (error) {
        console.log(error);
        }
    };
  

    const manejarCambioLibro = (e) => {//me va a mirar en que input me esta entrando el cambio si es en el titulo o en autor
        if (e.target.name === 'titulo') {
          setModalBook({ ...modalBook, titulo: e.target.value });
        } else if (e.target.name === 'autor') {
          setModalBook({ ...modalBook, autor: e.target.value });
        }
      };
//para controlar el foco de los input
      useEffect(() => {
        if (modalBook.autor !== '') {
            const inputElement = document.querySelector('.container-form-autor');
            if (inputElement) {
                inputElement.focus();
            }
        }
    }, [modalBook.autor]);

      useEffect(() => {
        if (modalBook.titulo !== '') {
            const inputElement = document.querySelector('.container-form-titulo');
            if (inputElement) {
                inputElement.focus();
            }
        }
    }, [modalBook.titulo]);

//---------------------------------------------------------------------------

      function Modal({ onClose }) { 

        return (
          <div className="modal">
            <div className="modal-content">
                  <h2 className='modal-titulo'>Editar Libro</h2>
                  <div className="modal-elemento">
                  <form onSubmit={(e)=>handleUpdateBook(e)}>
                        <input
                            className="container-form-titulo"
                            type="text"
                            name="titulo"
                            placeholder="Título"
                            value={modalBook.titulo}
                            onChange={(e) => manejarCambioLibro(e)}
                        />
                        <input
                            className="container-form-autor"
                            type="text"
                            name="autor"
                            placeholder="Autor"
                            value={modalBook.autor}
                            onChange={(e) => manejarCambioLibro(e)}
                        />
                        <button className="container-form-button">Actualizar</button>
                    </form>
                      </div>
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
                                setModalBook({ id: book.id ,titulo: book.titulo, autor: book.autor});
                                }}>
                                Actualizar
                            </button>
                            {/** book={book}=>Se pasa el libro que hace falta */}
                            {/** isOpen={isModalOpen !== -1 && book.id === isModalOpen} => si el modal esta open y 
                             * es el id que estoy actualizando, muestramelo
                             */}
                            
                            {modalBook.id === book.id && (
                            <Modal
                                onClose={() => setModalBook({id: -1, titulo: '', autor: ''})}
                            />)}
                            <button type="button" onClick={(e) => handleDeleteBook(e,book.id)}
                                    className=" card-back-button">Eliminar
                            </button>
                        </div>    
                    </div>
                </div>
            </div>
          
        ))}{/**cierre del rows para traer los títulos y los autores */}
    </div>
    {isModalOpen && (
    <div className="modal">
        <div className="modal-content">
            <h2>Añadir Libro</h2>
            <form onSubmit={handleAddBook}>
                <input
                    className="container-form-titulo"
                    type="text"
                    name="titulo"
                    placeholder="Título"
                    value={newBook.titulo}
                    onChange={(e) => manejarNuevoLibro(e)}
                />
                <input
                    className="container-form-autor"
                    type="text"
                    name="autor"
                    placeholder="Autor"
                    value={newBook.autor}
                    onChange={(e) => manejarNuevoLibro(e)}
                />
                <button className="btn btn-white container-form-button">Añadir</button>
            </form>
            <button className="btn btn-white container-form-button" onClick={() => setIsModalOpen(false)}>Cerrar</button>
        </div>
    </div>
)}
<button onClick={() => setIsModalOpen(true)} className="btn btn-white container-form-button">Añadir</button>
</div>
   
</>
  );
}

