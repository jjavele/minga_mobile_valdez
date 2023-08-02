import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import Swal from "sweetalert2";

let headers = ()=> {
    return {
        headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
    }
}         

const datos_comments = createAsyncThunk(
    'datos_comments', async({chapterId, page}) => {
        console.log(chapterId)
        console.log(page)
        try {
            let { data } = await axios.get(`http://localhost:8080/api/comments?chapter_id=${chapterId}&page=${page}`, headers())
            console.log(data)
            console.log(data.comments, data.totalPages, data.prev, data.next)
            return data.comments
        } catch (error) {
            console.log(error)
            return null
        }
    }                                    
)

const post_comment = createAsyncThunk(
    'post_comment', async({ chapter_id: chapterId, user_id: userId, comment: newComment }) => {
        try {
            let post = await axios.post(`http://localhost:8080/api/comments/`, { chapter_id: chapterId, user_id: userId, comment: newComment }, headers())
            Swal.fire({
                icon: 'success',
                title: 'Comment posted!',
            })
            return post
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Error posting, try it again',
            })
            return null
        }
    }
)

const edit_comment = createAsyncThunk(
    'edit_comment', async({commentId, comment: editedComment}) => {
        try {
            await axios.put(`http://localhost:8080/api/comments/${commentId}`, {comment: editedComment }, headers());
            Swal.fire({
                icon: 'success',
                title: 'Comment changed successfully!',
            })
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error editing, try it again',
            })
            return null            
        }
    }
)

const eliminate_comment = createAsyncThunk(
    'eliminate_comment', async({commentId}) => {
        try {
            await axios.delete(`http://localhost:8080/api/comments/${commentId}`, headers());
            Swal.fire({
                icon: 'success',
                title: 'Comment deleted successfully!',
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'You do not have permission to delete this comment',
            });
            return null
        }
    }
)

// el objetivo de la accion es enviar informacion al reductor. 
// AQUI se realiza TODA la logica necesaria para modificar/reducir los estados globales.
const commentsActions = { datos_comments, post_comment, edit_comment, eliminate_comment }
export default commentsActions