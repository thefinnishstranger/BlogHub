import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setUsers: (state, action) => {
            return action.payload
        },
        createUser: (state, action) => {
            state.push(action.payload)
        }
    }
})


export const { setUsers, createUser } = usersSlice.actions
export default usersSlice.reducer