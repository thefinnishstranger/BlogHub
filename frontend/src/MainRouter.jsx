import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import App from './App';
import Users from './components/Users';
import User from './components/User';
import Blogs from './components/Blogs';
import SpecificBlog from './components/SpecificBlog';
import Login from './components/Login';
import CreateNewBlog from './components/CreateNewBlog';
import CreateUser from './components/CreateUser';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { logout as logoutAction, setUser } from "./redux/reducers/authenticationReducer";
import blogService from './services/blogService';
import { setUsers } from './redux/reducers/usersSlice';
import "./index.css";

const MainRouter = () => {
    const [expanded, setExpanded] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authentication.user);
    const users = useSelector((state) => state.users);
    const navigate = useNavigate();

    const handleLinkClick = () => {
        setExpanded(false);
    };

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(setUser(user));
            blogService.setToken(user.token);
        }
    }, [dispatch]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await blogService.fetchUsers();
                dispatch(setUsers(users));
            } catch (error) {
                console.error("Failed to fetch users", error);
            }
        };
        fetchUsers();
    }, [dispatch]);

    const handleLogout = (event) => {
        event.preventDefault();
        setExpanded(false);
        window.localStorage.removeItem("loggedBlogappUser");
        dispatch(logoutAction());
        blogService.setToken(null);
        toast('See you later!', {
            duration: 3000,
            position: 'top-right'
        });
        navigate('/');
    };

    const currentUser = users.find(particularUser => particularUser.username === user?.username);

    return (
        <>
            <Navbar
                bg="dark grey"
                variant="dark"
                expand="lg"
                className='custom-navbar'
                expanded={expanded}
            >
                <Navbar.Brand as={Link} to="/" className='navbar-brand' onClick={handleLinkClick}>BlogHub</Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    className='burger'
                    onClick={() => setExpanded(!expanded)}
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/users" onClick={handleLinkClick} className='text-white'>Users</Nav.Link>
                        <Nav.Link as={Link} to="/blogs" onClick={handleLinkClick} className='text-white'>Blogs</Nav.Link>
                        {user === null ? (
                            <Nav.Link as={Link} to="/login" onClick={handleLinkClick} className='text-white'>Login</Nav.Link>
                        ) : (
                            <Nav.Link as={Link} to="/create" onClick={handleLinkClick} className='text-white'>Create a new blog</Nav.Link>
                        )}

                        {user && currentUser && (
                            <Nav.Link as={Link} to={`/users/${currentUser.id}`} onClick={handleLinkClick} className='text-white'>Your blogs</Nav.Link>
                        )}

                        {user && (
                            <Nav.Link as={Link} to="" onClick={handleLogout} className='text-white'>Logout</Nav.Link>
                        )}

                        {user === null && (
                            <Nav.Link as={Link} to='/createuser' onClick={handleLinkClick} className='text-white'>Create User</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<User />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/create" element={<CreateNewBlog />} />
                <Route path="/createuser" element={<CreateUser />} />
                <Route path="/blogs/:id" element={<SpecificBlog />} />
            </Routes>
        </>
    );
};

export default MainRouter;
