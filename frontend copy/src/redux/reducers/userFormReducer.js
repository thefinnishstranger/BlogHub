import { createSlice } from "@reduxjs/toolkit";

const userFormSlice = createSlice({
    name: 'newUser',
    initialState: {
        credentials: {
            name: '',
            username: '',
            password: ''
        }
    },
    reducers: {
        setCredentialField: (state, action) => {
            state.credentials[action.payload.field] = action.payload.value
        },
        clearCredentialField: (state) => {
            state.credentials.name = '',
            state.credentials.username = '',
            state.credentials.password = ''            
        },
    }
})

export const { setCredentialField, clearCredentialField } = userFormSlice.actions
export default userFormSlice.reducer