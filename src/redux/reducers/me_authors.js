import { createReducer } from "@reduxjs/toolkit"
import authorActions from "../actions/me_authors"                   //importo las acciones

const { datos_author } = authorActions                              //desestructuro la accion para poder utilizarla

const initialState = {                                              //defino estado inicial
   author: null,
  
}

const authorReducer = createReducer(initialState, 
    (builder) => builder
    .addCase(datos_author,                                           //.addCase define la logica necesaria para modificar los estados
        (state, action)=>{
            //console.log(action.payload)
            let newState = {
                ...state,
                author: action.payload
                
            }
    return newState
}))

export default authorReducer