import { createUser } from "../redux/reducers/usersSlice"
import { useDispatch, useSelector } from "react-redux"
import blogService from "../services/blogService"
import UserForm from "./UserForm"
import { useNavigate } from "react-router-dom"
import { login, setUser } from "../redux/reducers/authenticationReducer"
import { login as loginAction } from "../redux/reducers/authenticationReducer"
import toast from "react-hot-toast"

const CreateUser = () => {
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const addUser = async (userObject) => {
        try {
            const savedUser = await blogService.createUser(userObject)
            dispatch(createUser(savedUser))
            console.log('Successfully created an account!')

            await dispatch(login({ username: userObject.username, password: userObject.password }))
            navigate('/')
            toast(`Welcome to our world ${savedUser.name}!`, {
                position: 'top-right'
            })
        } catch (error) {
            console.error('Error creating a new user', error);
            toast('Something went wrong, try again!', {
                position: 'top-right'
            })
        }
    } 

    

    return (
        <div>
            <UserForm createNewUser={addUser} />
        </div>
    )
}

export default CreateUser