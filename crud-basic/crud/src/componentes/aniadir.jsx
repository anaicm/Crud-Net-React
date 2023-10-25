

export function BotonAniadir() {
  return (
    <div>
        <form>{/**Formulario para añadir un nuevo libro */}
            <label>
                Título:
                <input type="text" name='titulo'/>
            </label>
            <label>
                Título:
                <input type="text" name='Autor'/>
            </label>
            <button  className="btn btn-white">Añadir</button>
        </form>
    </div>
  );
}

