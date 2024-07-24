import { createSlice } from '@reduxjs/toolkit'

const recentBlogs = createSlice({
    name: "recentBlogs",
    initialState: [],
    reducers: {
        setRecentBlogs: (state, action) => action.payload
    }
})

export const { setRecentBlogs } = recentBlogs.actions
export default recentBlogs.reducer