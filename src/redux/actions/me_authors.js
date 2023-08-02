import { createAction } from "@reduxjs/toolkit"

const datos_author = createAction(
    'datos_author',                                         //nombre de la accion
    (author) => {                                           //funcion que va a enviar datos al reductor 
        //console.log(author)                                 //el objeto debe tener todas las propiedades a guardarse en el estado global
            return {
                payload: author 
            }
        }
    )
// el objetivo de la accion es enviar informacion al reductor. 
// AQUI se realiza TODA la logica necesaria para modificar/reducir los estados globales.
const authorActions = { datos_author }
export default authorActions