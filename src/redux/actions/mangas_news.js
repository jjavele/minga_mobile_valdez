import { createAction } from "@reduxjs/toolkit"

const datos_mangas = createAction(
    'datos_mangas',                                         //nombre de la accion
    (mangas) => {                                           //funcion que va a enviar datos al reductor 
        //console.log(mangas)                                 //el objeto debe tener todas las propiedades a guardarse en el estado global
            return {
                payload: mangas 
            }
        }
    )
// el objetivo de la accion es enviar informacion al reductor. 
// AQUI se realiza TODA la logica necesaria para modificar/reducir los estados globales.
const mangasActions = { datos_mangas }
export default mangasActions