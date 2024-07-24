import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authenticationReducer from "./reducers/authenticationReducer"
import blogsReducer from "./reducers/blogsReducer"
import formSlice from "./reducers/formSlice"
import usersSlice from "./reducers/usersSlice"
import commentReducer from "./reducers/commentReducer"
import recentBlogsReducer from "./reducers/recentBlogsReducer"
import userFormReducer from "./reducers/userFormReducer"

const rootReducer = combineReducers({
    blogs: blogsReducer,
    recentBlogs: recentBlogsReducer,
    authentication: authenticationReducer,
    form: formSlice,
    users: usersSlice,
    comments: commentReducer,
    newUser: userFormReducer
})


const store = configureStore({
    reducer: rootReducer,
})

export default store