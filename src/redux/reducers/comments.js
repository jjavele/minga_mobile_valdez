import { createReducer } from "@reduxjs/toolkit"
import commentsActions from "../actions/comments"                  //importo las acciones

const { datos_comments, post_comment, edit_comment, eliminate_comment } = commentsActions                              //desestructuro la accion para poder utilizarla

const initialState = {                                              //defino estado inicial
   comments: [],
   currentPage: 1,
}

const commentsReducer = createReducer(initialState, 
    (builder) => builder
    .addCase(datos_comments.fulfilled, (state, action)=>{
        console.log(action.payload)
        let newState = {
            ...state,
            comments: action.payload,
            currentPage: action.payload,
        }
        console.log(newState)
        return newState
    })

    .addCase(post_comment.fulfilled, (state, action)=>{
        console.log(action.payload)
        let newState = {
            ...state,
            comments: state.comments.push(action.payload)
        }
        console.log(newState)
        return newState
    })

    .addCase(edit_comment.fulfilled, (state, action)=>{
        console.log(action.payload)
        let newState = {
            ...state,
            comments: state.comments.push(action.payload)
        }
        console.log(newState)
        return newState
    })

    .addCase(eliminate_comment.fulfilled), (state, action) => {
        console.log(action.payload)
        let newState = {
            ...state,
            comments: state.comments.push(action.payload)
        }
        console.log(newState)
        return newState
    }
)

export default commentsReducer