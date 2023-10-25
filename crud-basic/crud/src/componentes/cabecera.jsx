

import imagen1 from'../imagen/logo-libros.png';

export function Cabecera() {
  return (
    <div>
      <header className='heading-container'>
        <div className='heading-container-logo-box'>
          <img src={imagen1} className='heading-container-logo' alt='logo'/>
        </div>
        <div className='heading-container-titulo'>
          <h2 className='heading-container-titulo-text'>El rincon de la lectura</h2>
        </div>
      </header>
    </div>
  );
}

