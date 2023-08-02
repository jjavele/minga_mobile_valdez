import { createReducer } from "@reduxjs/toolkit"
import mangaActions from "../actions/manga" //importo las acciones

const { datos_manga, chapters_manga } = mangaActions //desestructuro la accion para poder utilizarla

const initialState = {   //defino estado inicial
   manga: null,
  chapters: null,
  prev: null,
  next: null,
  currentPage: null,
}

const mangaReducer = createReducer(initialState, 
    (builder) => builder
    .addCase(datos_manga, //.addCase define la logica necesaria para modificar los estados
        (state, action)=>{
            console.log(action.payload)
    let newState = {
        ...state,
        manga: action.payload
        
    }
    return newState
})
    .addCase(chapters_manga, //.addCase define la logica necesaria para modificar los estados
        (state, action)=>{
            console.log(action.payload)
    let newState = {
        ...state,
    
        chapters:action.payload.chapters,
        prev: action.payload.prev,
        next: action.payload.next,
        currentPage:action.payload.currentPage,
    }
    return newState
}))

export default mangaReducer

