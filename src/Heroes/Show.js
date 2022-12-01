import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, getDoc, deleteDoc, doc, addDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'



const MySwal = withReactContent(Swal)

const Show = () => {
  const [nombrereal, setnombrereal] = useState('')
  const [nombredevillano, setnombredevillano] = useState('')
  const [edad, setedad] = useState('')
  const [genero, setGenero] = useState('No se envio nada')
  const [origen, setOrigen] = useState('No se envio nada')
  const [poder, setpoderes] = useState({
    poderes: [],
    res: [],
})


  const productsCollection = collection(db, "heruesyvillanos")
  const store = async (e) => {
    e.preventDefault()
    await addDoc(productsCollection, { nombrereal: nombrereal, nombredevillano: nombredevillano, edad: edad, genero: genero,origen:origen,  poder: poder.poderes})
    window.location.href = window.location.href;
    window.location.replace('');
  }

  const uncheckAll = () => {
    document.querySelectorAll('#formElement input[type=checkbox]').forEach(function (checkElement) {
      checkElement.checked = false;
    })
    document.querySelectorAll('#formElement input[type=radio]').forEach(function (checkElement) {
      checkElement.checked = false;
    })
  }

  const [products, setProducts] = useState([])
  const getProducts = async () => {
    const data = await getDocs(productsCollection)

    setProducts(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

    )

  }

  const deleteProduct = async (id) => {
    const productDoc = doc(db, "heruesyvillanos", id)
    await deleteDoc(productDoc)
    getProducts()
  }
  const confirmDelete = (id) => {
    MySwal.fire({
      title: '¿Elimina el producto?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  useEffect(() => {
    getProducts()

  }, [])

  const handleChange = (e)=>{
    const {value, checked} = e.target
    const {poderes} = poder;
    if(checked){
        setpoderes({poderes: [...poderes, value],res: [...poderes, value]})    
    }else{
        setpoderes({
            poderes: poderes.filter((e)=>e!==value),
            res: poderes.filter((e)=>e!==value),
        })
    }
}

  return (
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>Creación de Super Héroes</h1>
          <form onSubmit={store}>
            <div className='mb-3'>
              <label className='form-label'>Nombre real</label>
              <input
                value={nombrereal}
                onChange={(e) => setnombrereal(e.target.value)}
                type="text"
                className='form-control'
                required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Nombre SuperHeroe</label>
              <input
                value={nombredevillano}
                onChange={(e) => setnombredevillano(e.target.value)}
                type="text"
                className='form-control'
                required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Edad</label>
              <input
                value={edad}
                onChange={(e) => setedad(e.target.value)}
                type="text"
                className='form-control'
                required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Genero</label>
              <br />
              <label className='form-label'>Hombre</label>
              <input type="radio" name='sexo' value='Hombre' id='campo1' onChange={(e) => setGenero(e.target.value)} />
              <br />
              <label className='form-label'>Mujer</label>
              <input type="radio" name='sexo' value='Mujer' id='campo2' onChange={(e) => setGenero(e.target.value)} />
              <br />
              <label className='form-label'>No binario</label>
              <input type="radio" name='sexo' value='No binario' onChange={(e) => setGenero(e.target.value)} />
            </div>
            <div className='mb-3'>
              <label className='form-label'><b>Origen</b></label>
              <br />
              <label className='form-label'>Natural Humano</label>
              <input type="radio" name='origen' value=' Natural Humano,' onChange={(e) => setOrigen(e.target.value)} required />
              <br />
              <label className='form-label'>Extraterrestre</label>
              <input type="radio" name='origen' value='Extraterrestre' onChange={(e) => setOrigen(e.target.value)} required />
              <br />
              <label className='form-label'>Experimento Científico</label>
              <input type="radio" name='origen' value='Experimento Científico' onChange={(e) => setOrigen(e.target.value)} required />
              <br />
              <label className='form-label'>Mutante</label>
              <input type="radio" name='origen' value='Mutante' onChange={(e) => setOrigen(e.target.value)} required />
            </div>


            <div className='mb-3'>
              <label>Características</label>
              <div class="form-check">
              <input type='checkbox' name="habilidades" class="form-check-input" value='Volador' onChange={handleChange} />
                  <label class="form-check-label" for="flexCheckDefault">
                  Volador
                  </label><br/>
                  <input type='checkbox' name="habilidades" class="form-check-input" value='Velocidad' onChange={handleChange} />
                  <label class="form-check-label" for="flexCheckDefault">
                  Velocidad
                  </label><br/>
                  <input type='checkbox' name="habilidades" class="form-check-input" value='Humildad' onChange={handleChange} />
                  <label class="form-check-label" for="flexCheckDefault">
                  Humildad
                  </label><br/>
                  <input type='checkbox' name="habilidades" class="form-check-input" value='Fuerza' onChange={handleChange} />
                  <label class="form-check-label" for="flexCheckDefault">
                  Fuerza
                  </label><br/>
                  <input type='checkbox' name="habilidades" class="form-check-input" value='Mutante' onChange={handleChange} />
                  <label class="form-check-label" for="flexCheckDefault">
                  Mutante
                  </label><br/>
                  <input type='checkbox' name="habilidades" class="form-check-input" value='Vision' onChange={handleChange} />
                  <label class="form-check-label" for="flexCheckDefault">
                  Vision
                  </label><br/>
                  <input type='checkbox' name="habilidades" class="form-check-input" value='Oido' onChange={handleChange} />
                  <label class="form-check-label" for="flexCheckDefault">
                  Oido
                  </label><br/>
                  <input type='checkbox' name="habilidades" class="form-check-input" value='Invulnerabilidad' onChange={handleChange} />
                  <label class="form-check-label" for="flexCheckDefault">
                  Invulnerabilidad
                  </label><br/>
                  <input type='checkbox' name="habilidades" class="form-check-input" value='Telepatia' onChange={handleChange} />
                  <label class="form-check-label" for="flexCheckDefault">
                  Telepatia
                  </label><br/>
                  <input type='checkbox' name="habilidades" class="form-check-input" value='Lanza Rayos' onChange={handleChange} />
                  <label class="form-check-label" for="flexCheckDefault">
                  Lanza Rayos
                  </label><br/>
                  <input type='checkbox' name="habilidades" class="form-check-input" value='Artes Marciales' onChange={handleChange} />
                  <label class="form-check-label" for="flexCheckDefault">
                  Artes Marciales
                  </label><br/>
                  <input type='checkbox' name="habilidades" class="form-check-input" value='Armadura' onChange={handleChange} />
                  <label class="form-check-label" for="flexCheckDefault">
                  Armadura
                  </label><br/>
                  <input type='checkbox' name="habilidades" class="form-check-input" value='Tecnologia' onChange={handleChange} />
                  <label class="form-check-label" for="flexCheckDefault">
                  Tecnologia
                  </label>
              </div>
            </div>
            <button type='submit' className='btn btn-success'>Enviar</button>
            <a href='' type="reset" className='btn btn-primary' >Limpiar</a>
          </form>
        </div>
        <div class="col">
        <br/><br/><br/>
          <table className='table  table-hover'>
            <thead>
              <tr>
                <th>Nombre real</th>
                <th>Nombre de villano</th>
                <th>Edad</th>
                <th>Genero</th>
                <th>Origen</th>
                <th>Poder</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.nombrereal}</td>
                  <td>{product.nombredevillano}</td>
                  <td>{product.edad}</td>
                  <td>{product.genero}</td>
                  <td>{product.origen}</td>
                  <td>{product.poder}</td>
                  <td>

                    <Link to={`/edit/${product.id}`} className="btn btn-light"><i className="fa-solid fa-pencil"></i></Link>
                    <button onClick={() => { confirmDelete(product.id) }} className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <br/>
    </div>

  )
}

export default Show