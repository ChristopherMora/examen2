import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc, deleteDoc, collection, getDocs } from "firebase/firestore"
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { db } from "../firebaseConfig/firebase"
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
const Edit = () => {
  const [nombrereal, setnombrereal] = useState('')
  const [nombredevillano, setnombredevillano] = useState('')
  const [edad, setedad] = useState('')
  const [genero, setGenero] = useState('No se envio nada')
  const [origen, setOrigen] = useState('No se envio nada')
  const [poder, setpoder] = useState(null)


  const navigate = useNavigate()
  const { id } = useParams()

  const update = async (e) => {
    e.preventDefault()
    const product = doc(db, "heruesyvillanos", id)
    const data = { nombrereal: nombrereal, nombredevillano: nombredevillano, edad: edad, genero: genero,origen:origen }
    await updateDoc(product, data)
    navigate('/')
  }

  const getProductById = async (id) => {
    const product = await getDoc(doc(db, "heruesyvillanos", id))
    if (product.exists()) {
      //console.log(product.data())
      setnombrereal(product.data().nombrereal)
      setnombredevillano(product.data().nombredevillano)
      setedad(product.data().edad)
      setedad(product.data().genero)
      setedad(product.data().origen)

    } else {
      console.log('El producto no existe')
    }
  }

  useEffect(() => {
    getProductById(id)
    // eslint-disable-next-line
  }, [])

  //1 - configuramos los hooks
  const [products, setProducts] = useState([])

  //2 - referenciamos a la DB firestore
  const productsCollection = collection(db, "heruesyvillanos")

  //3 - Funcion para mostrar TODOS los docs
  const getProducts = async () => {
    const data = await getDocs(productsCollection)
    //console.log(data.docs)
    setProducts(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
    //console.log(products)
  }
  //4 - Funcion para eliminar un doc
  const deleteProduct = async (id) => {
    const productDoc = doc(db, "heruesyvillanos", id)
    await deleteDoc(productDoc)
    getProducts()
  }
  //5 - Funcion de confirmacion para Sweet Alert 2
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
        //llamamos a la fcion para eliminar   
        deleteProduct(id)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
  //6 - usamos useEffect
  useEffect(() => {
    getProducts()
    // eslint-disable-next-line
  }, [])




  return (

    <div class="container">
      <div class="row">
        <div class="col">
          <h1>Editar Villanos</h1>
          <form onSubmit={update}>
            <div className='mb-3'>
              <label className='form-label'>Nombre real</label>
              <input
                value={nombrereal}
                onChange={(e) => setnombrereal(e.target.value)}
                type="text"
                className='form-control' required
              />
            </div>

            <div className='mb-3'>
              <label className='form-label'>Nombre del villano</label>
              <input
                value={nombredevillano}
                onChange={(e) => setnombredevillano(e.target.value)}
                type="text"
                className='form-control' required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Edad</label>
              <input
                value={edad}
                onChange={(e) => setedad(e.target.value)}
                type="text"
                className='form-control' required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'><b>Genero</b></label>
              <br />
              <label className='form-label'>Hombre</label>
              <input type="radio" name='sexo' value='Hombre' onChange={(e) => setGenero(e.target.value)} required/>
              <br />
              <label className='form-label'>Mujer</label>
              <input type="radio" name='sexo' value='Mujer' onChange={(e) => setGenero(e.target.value)} required/>
              <br />
              <label className='form-label'>No binario</label>
              <input type="radio" name='sexo' value='No binario' onChange={(e) => setGenero(e.target.value)} required/>
            </div>
            <div className='mb-3'>
              <label className='form-label'><b>Origen</b></label>
              <br />
              <label className='form-label'>Natural Humano</label>
              <input type="radio" name='origen' value=' Natural Humano,' onChange={(e) => setOrigen(e.target.value)} required/>
              <br />
              <label className='form-label'>Extraterrestre</label>
              <input type="radio" name='origen' value='Extraterrestre' onChange={(e) => setOrigen(e.target.value)} required/>
              <br />
              <label className='form-label'>Experimento Científico</label>
              <input type="radio" name='origen' value='Experimento Científico' onChange={(e) => setOrigen(e.target.value)} required/>
              <br />
              <label className='form-label'>Mutante</label>
              <input type="radio" name='origen' value='Mutante' onChange={(e) => setOrigen(e.target.value)} required/>
            </div>
            <div className='mb-3'>
              <label className='form-label'><b>Caracteristicas</b></label>
              <br />
              <div class="form-check">
                <input class="form-check-input" name='poder' type="checkbox" value="Volador" id="flexCheckDefault" onChange={(e) => setpoder(e.target.value)} />
                <label class="form-check-label" for="flexCheckDefault">
                  Volador
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" name='poder1' type="checkbox" value="Velocidad" id="flexCheckChecked" onChange={(e) => setpoder(e.target.value)} />
                {console.log(poder)}
                <label class="form-check-label" for="flexCheckChecked">
                  Velocidad
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" onChange={(e) => setpoder(e.target.value)} />
                <label class="form-check-label" for="flexCheckChecked">
                  Humildad
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="Fuerza" id="flexCheckChecked" onChange={(e) => setpoder(e.target.value)} />
                <label class="form-check-label" for="flexCheckChecked">
                  Fuerza
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="Mutante" id="flexCheckChecked" onChange={(e) => setpoder(e.target.value)} />
                <label class="form-check-label" for="flexCheckChecked">
                  Mutante
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="Visión" id="flexCheckChecked" onChange={(e) => setpoder(e.target.value)} />
                <label class="form-check-label" for="flexCheckChecked">
                  Visión
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="Oído" id="flexCheckChecked" onChange={(e) => setpoder(e.target.value)} />
                <label class="form-check-label" for="flexCheckChecked">
                  Oído
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="Invulnerabilidad" id="flexCheckChecked" onChange={(e) => setpoder(e.target.value)} />
                <label class="form-check-label" for="flexCheckChecked">
                  Invulnerabilidad
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="Telepatia" id="flexCheckChecked" onChange={(e) => setpoder(e.target.value)} />
                <label class="form-check-label" for="flexCheckChecked">
                  Telepatia
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="Telequinesis" id="flexCheckChecked" onChange={(e) => setpoder(e.target.value)} />
                <label class="form-check-label" for="flexCheckChecked">
                  Telequinesis
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="Lanza Rayos" id="flexCheckChecked" onChange={(e) => setpoder(e.target.value)} />
                <label class="form-check-label" for="flexCheckChecked">
                  Lanza Rayos
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="Artes Marciales" id="flexCheckChecked" onChange={(e) => setpoder(e.target.value)} />
                <label class="form-check-label" for="flexCheckChecked">
                  Artes Marciales
                </label>
              </div><div class="form-check">
                <input class="form-check-input" type="checkbox" value="Inteligencia" id="flexCheckChecked" onChange={(e) => setpoder(e.target.value)} />
                <label class="form-check-label" for="flexCheckChecked">
                  Inteligencia
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="Acrobacia" id="flexCheckChecked" onChange={(e) => setpoder(e.target.value)} />
                <label class="form-check-label" for="flexCheckChecked">
                  Acrobacia
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="Armadura" id="flexCheckChecked" onChange={(e) => setpoder(e.target.value)} />
                <label class="form-check-label" for="flexCheckChecked">
                  Armadura
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="Tecnología" id="flexCheckChecked" onChange={(e) => setpoder(e.target.value)} />
                <label class="form-check-label" for="flexCheckChecked">
                  Tecnología
                </label>
              </div>
            </div>
            <button type='submit' className='btn btn-primary'>Actualizar</button>
            <Link to={`/`} className="btn btn-warning">Cancelar</Link>
          </form>
        </div>
        <div class="col">
          <table className='table table-dark table-hover'>
            <thead>
              <tr>
                <th>Nombre real</th>
                <th>Nombre de villano</th>
                <th>Edad</th>
                <th>Genero</th>
                <th>Origen</th>
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
    </div>

  )
}

export default Edit