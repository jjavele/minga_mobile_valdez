import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const headers = () =>{
    let token = localStorage.getItem('token')
    return { headers: { 'Authorization': `Bearer ${token}` } }
}

const get_authors = createAsyncThunk('get_authors', async () => {
    try {
        let res = await axios("http://localhost:8080/api/authors/admin" , headers())
        return {
            authors: res.data.authors
        }
    } catch (error) {
        return {
            authors: []
        }
    }
})

const update_authors = createAsyncThunk('update_authors', async ({ id, data }) => {
    try {
        console.log(id);
        console.log(data);
        let res = await axios.put("http://localhost:8080/api/auth/role/author/" + id, data, headers())
        console.log(res);
        return {
            author: res.data.updateAuthor,
        }
    } catch (error) {
        console.log(error);
        return {
            authors: []
        }
    }
})

const actions = { get_authors, update_authors }

export default actions