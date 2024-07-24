import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCredentialField, setCredentialField } from '../redux/reducers/userFormReducer';
import { Button } from 'react-bootstrap';

const UserForm = ({ createNewUser }) => {
    const dispatch = useDispatch()

    const { name, username, password } = useSelector(state => state.newUser.credentials)

    const addNewUserHandler = async (event) => {
        event.preventDefault()
        try {
            const newUser = {
                name,
                username,
                password
            }
            await createNewUser(newUser)
            dispatch(clearCredentialField())
        } catch (error) {
            console.error('Error creating a new user', error);
        }
    }

    return (
        <form onSubmit={addNewUserHandler}>
            <div className='text-center'>
                <h2 className='text-center mt-4'>Create a new user!</h2>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => dispatch(setCredentialField({ field: 'name', value: e.target.value }))}
                    placeholder="Name"
                    required
                />
            </div>
            <div className='text-center mt-2'>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => dispatch(setCredentialField({ field: 'username', value: e.target.value }))}
                    placeholder="Username"
                    required
                />
            </div>
            <div className='text-center mt-2'>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => dispatch(setCredentialField({ field: 'password', value: e.target.value }))}
                    placeholder="Password"
                    required
                />
            </div>
            <div className="d-grid gap-2 d-flex justify-content-center">
                <Button type="submit" variant="dark grey" className="login_button">Create User</Button>
            </div>
        </form>
    );
};

export default UserForm;
