import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, getDoc, deleteDoc, doc, addDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { First } from 'react-bootstrap/esm/PageItem'


// import '../../public/fondo.webp';
const MySwal = withReactContent(Swal)

const Show = () => {

  const [nombrereal, setnombrereal] = useState('')
  const [nombredevillano, setnombredevillano] = useState('')
  const [edad, setedad] = useState('')
  const [genero, setGenero] = useState('No se envio nada')
  const [origen, setOrigen] = useState('No se envio nada')
  const [poder, setpoder] = useState(null)

  const productsCollection = collection(db, "heruesyvillanos")

  const store = async (e) => {

    e.preventDefault()

    await addDoc(productsCollection, { nombrereal: nombrereal, nombredevillano: nombredevillano, edad: edad, genero: genero, origen: origen, poder: poder })
    window.location.href = window.location.href;
    // or
    window.location.replace('');
  }


  //1 - configuramos los hooks
  const [products, setProducts] = useState([])

  //2 - referenciamos a la DB firestore


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
  //7 - devolvemos vista de nuestro componente
  // const [poder1,serpoder1]=useState(true)
  // const [poder2,serpoder2]=useState(true)
  // const [data,setdata]=useState(true)
  // const handleChange=(data)=>{
  //     console.log(data)






  //   const recojer = () => {
  //     let nombres = "";
  //     
  //     let poder2 = document.querySelector('.varcheck2');
  //     let poder3 = document.querySelector('.varcheck3');
  //     let poder4 = document.querySelector('.poder1');
  //     let poder5 = document.querySelector('.varcheck2');
  //     let poder6 = document.querySelector('.varcheck3');
  //     let poder7 = document.querySelector('.poder1');
  //     let poder8 = document.querySelector('.varcheck2');
  //     let poder9 = document.querySelector('.varcheck3');
  //     let poder10 = document.querySelector('.poder1');
  //     let poder11 = document.querySelector('.varcheck2');
  //     let poder12 = document.querySelector('.varcheck3');
  //     let poder13 = document.querySelector('.poder1');
  //     let poder14 = document.querySelector('.varcheck2');
  //     let poder15 = document.querySelector('.varcheck3');
  //     let poder16 = document.querySelector('.poder1');

  //     if (poder1.target. = true) {
  //       nombres = poder1.value;
  //       nombres += `, `;
  //     }
  //     if (poder2.target. = true) {
  //       nombres += poder2.value;
  //       nombres += `, `;
  //     }
  //     if (poder3.target. = true) {
  //       nombres += poder3.value;
  //       nombres += ` `;
  //     }
  //     if (poder4.target. = true) {
  //       nombres = poder4.value;
  //       nombres += `, `;
  //     }
  //     if (poder5.target. = true) {
  //       nombres += poder5.value;
  //       nombres += `, `;
  //     }
  //     if (poder6.target. = true) {
  //       nombres += poder6.value;
  //       nombres += ` `;
  //     }
  //     if (poder7.target. = true) {
  //       nombres = poder7.value;
  //       nombres += `, `;
  //     }
  //     if (poder8.target. = true) {
  //       nombres += poder8.value;
  //       nombres += `, `;
  //     }
  //     if (poder9.target. = true) {
  //       nombres += poder9.value;
  //       nombres += ` `;
  //     }
  //     if (poder10.target. = true) {
  //       nombres = poder10.value;
  //       nombres += `, `;
  //     }
  //     if (poder11.target. = true) {
  //       nombres += poder11.value;
  //       nombres += `, `;
  //     }
  //     if (poder12.target. = true) {
  //       nombres += poder12.value;
  //       nombres += ` `;
  //     }
  //     if (poder13.target. = true) {
  //       nombres = poder13.value;
  //       nombres += `, `;
  //     }
  //     if (poder14.target. = true) {
  //       nombres += poder14.value;
  //       nombres += `, `;
  //     }
  //     if (poder15.target. = true) {
  //       nombres += poder15.value;
  //       nombres += ` `;
  //     }
  //     if (poder16.target. = true) {
  //       nombres += poder16.value;
  //       nombres += ` `;
  //     }

  //     console.log(nombres)
  //   }

  // console.log(this.poder1);


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
              <label className='form-label'><b>Caracteristicas</b></label>
              <br />
              <div class="form-check">
              <input class="poder3" type="checkbox" value="Roca" id="flexCheckChecked" onChange={(e) => setpoder(e.target.value)} />
                <label class="form-check-label" for="flexCheckChecked">
                  Velocidad
                </label>
              </div>
              
              <div class="form-check">
              <input class="poder3" type="checkbox" value="Roca" id="flexCheckChecked" onChange={(e) => setpoder(e.target.value)} />
                <label class="form-check-label" for="flexCheckChecked">
                  Humildad
                </label>
              </div>




              <div class="form-check">
                <input class="poder3" type="checkbox" value="Roca" id="flexCheckChecked" onChange={(e) => setpoder(e.target.value)} />
                <label class="form-check-label" for="flexCheckChecked">
                  Roca
                </label>
              </div>
              <div class="form-check">
                <input class="poder4" type="checkbox" value="Fuerza" id="flexCheckChecked" onChange={(e) => setpoder(e.target.value)} />
                <label class="form-check-label" for="flexCheckChecked">
                  Fuerza
                </label>
              </div>
              <div class="form-check">
                <input class="poder5" type="checkbox" value="Mutante" id="flexCheckChecked" onChange={(e) => setpoder(e.target.value)} />
                <label class="form-check-label" for="flexCheckChecked">
                  Mutante
                </label>
              </div>
              <div class="form-check">
                <input class="poder6" type="checkbox" value="Visión" id="flexCheckChecked" onChange={(e) => setpoder(e.target.value)} />
                <label class="form-check-label" for="flexCheckChecked">
                  Visión
                </label>
              </div>
              <div class="form-check">
                <input class="poder7" type="checkbox" value="Oído" id="flexCheckChecked" onChange={(e) => setpoder(e.target.value)} />
                <label class="form-check-label" for="flexCheckChecked">
                  Oído
                </label>
              </div>
              <div class="form-check">
                <input class="poder8" type="checkbox" value="Invulnerabilidad" id="flexCheckChecked" onChange={(e) => setpoder(e.target.value)} />
                <label class="form-check-label" for="flexCheckChecked">
                  Invulnerabilidad
                </label>
              </div>
              <div class="form-check">
                <input class="poder9" type="checkbox" value="Telepatia" id="flexCheckChecked" onChange={(e) => setpoder(e.target.value)} />
                <label class="form-check-label" for="flexCheckChecked">
                  Telepatia
                </label>
              </div>
              <div class="form-check">
                <input class="poder10" type="checkbox" value="Telequinesis" id="flexCheckChecked" onChange={(e) => setpoder(e.target.value)} />
                <label class="form-check-label" for="flexCheckChecked">
                  Telequinesis
                </label>
              </div>
              <div class="form-check">
                <input class="poder11" type="checkbox" value="Lanza Rayos" id="flexCheckChecked" onChange={(e) => setpoder(e.target.value)} />
                <label class="form-check-label" for="flexCheckChecked">
                  Lanza Rayos
                </label>
              </div>
              <div class="form-check">
                <input class="poder12" type="checkbox" value="Artes Marciales" id="flexCheckChecked" onChange={(e) => setpoder(e.target.value)} />
                <label class="form-check-label" for="flexCheckChecked">
                  Artes Marciales
                </label>
              </div><div class="form-check">
                <input class="poder13" type="checkbox" value="Inteligencia" id="flexCheckChecked" onChange={(e) => setpoder(e.target.value)} />
                <label class="form-check-label" for="flexCheckChecked">
                  Inteligencia
                </label>
              </div>
              <div class="form-check">
                <input class="poder14" type="checkbox" value="Acrobacia" id="flexCheckChecked" onChange={(e) => setpoder(e.target.value)} />
                <label class="form-check-label" for="flexCheckChecked">
                  Acrobacia
                </label>
              </div>
              <div class="form-check">
                <input class="poder15" type="checkbox" value="Armadura" id="flexCheckChecked" onChange={(e) => setpoder(e.target.value)} />
                <label class="form-check-label" for="flexCheckChecked">
                  Armadura
                </label>
              </div>
              <div class="form-check">
                <input class="poder16" type="checkbox" value="Tecnología" id="flexCheckChecked" onChange={(e) => setpoder(e.target.value)} />
                <label class="form-check-label" for="flexCheckChecked">
                  Tecnología
                </label>
              </div>
            </div>

            <button type='submit' className='btn btn-succes'>Enviar</button>
            <input type="reset" className='btn btn-primary' onClick="limpiar()" placeholder='limpiar' />

            {


              function limpiar() {
                window.location.href = window.location.href;
              }
            }
          </form>
        </div>
        <div class="col">
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
    </div>
  )
}

export default Show