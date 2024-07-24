import { Button } from "react-bootstrap"
import Togglable from "./Togglable"
import BlogForm from "./BlogForm"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import LoginForm from "./LoginForm"
import { setLoginVisible } from "../redux/reducers/formSlice";
import { login as loginAction, logout as logoutAction } from "../redux/reducers/authenticationReducer";
import { setUser, clearUser } from "../redux/reducers/authenticationReducer";
import { useRef } from "react"
import blogService from "../services/blogService";
import { setBlogs, addBlog as addBlogAction, removeBlog } from "../redux/reducers/blogsReducer";
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast'

const Login = () => {
    const user = useSelector((state) => state.authentication.user);
    const error = useSelector((state) => state.authentication.error);
    const loginVisible = useSelector((state) => state.form.visibility.loginVisible);

    const navigate = useNavigate()

    const dispatch = useDispatch()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON);
          dispatch(setUser(user));
          blogService.setToken(user.token);
        }
      }, [dispatch]);
    
      const handleLogin = async (username, password) => {
        try {
            dispatch(loginAction({ username, password }));
        } catch (error) {
            console.error('Login failed', error);
            
        }
    
      };
    
      const loginForm = () => {
    
        return (
          <div>
              <LoginForm handleSubmit={handleLogin} />
          </div>
        );
      };

      useEffect(() => {
        if (user) {
            navigate('/')
            toast(`${user.name}, you have successfully logged in!`, {
                duration: 3000,
                position: 'top-right'
            })
        }
      }, [user, navigate])

    return (
        <div>
            { loginForm() }
        </div>
    )
}

export default Login