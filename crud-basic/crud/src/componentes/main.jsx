
import { useEffect, useState } from 'react';
import '../css/maim.css';


export function Main() {
    const[rows, setRows] = useState([]);//Estado para guardar el array de datos que vienen de la base de datos 
    const [newBook, setNewBook] = useState({ titulo: '', autor: '' });//estado para añadir nuevo elemento
    //ventana emergente para eliminar 
    const [deleteInputValue, setDeleteInputValue] = useState('');
    //Metodos para abrir un modal e insertar el id para borrar 
      const handleDeleteInputChange = (e) => {
        setDeleteInputValue(e.target.value);
      };      
    //función que trae todos los registros de la tabla
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
    //añade un nuevo registro en la tabla
    const handleAddBook = async (e) => {
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook({
            ...newBook,
            [name]: value,
        });
    };
    //función que elimina registros
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
                            <button type='submit'  className="card-back-button">Actualizar</button>
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
                onChange={handleInputChange}
            />               
            <input className='container-form-autor'
                type="text"
                name="autor"
                placeholder="Autor"
                value={newBook.autor}
                onChange={handleInputChange}
            />                   
            <button type='submit'  className="btn btn-white container-form-button">Añadir</button>
            
      
        </form>       
    </div>
    {/** fin del formulario para añadir un nuevo libro */}
</div>
   
</>
  );
}

