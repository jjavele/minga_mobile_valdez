import { createReducer } from "@reduxjs/toolkit"
import mangasActions from "../actions/mangas_news"                   //importo las acciones

const { datos_mangas } = mangasActions                              //desestructuro la accion para poder utilizarla

const initialState = {                                              //defino estado inicial
   mangas: null,
  
}

const mangasReducer = createReducer(initialState, 
    (builder) => builder
    .addCase(datos_mangas,                                           //.addCase define la logica necesaria para modificar los estados
        (state, action)=>{
            console.log(action.payload)
            let newState = {
                ...state,
                mangas: action.payload
                
            }
    return newState
}))

export default mangasReducer