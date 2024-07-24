import blogService from "../services/blogService";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../redux/reducers/usersSlice";
import { Link } from 'react-router-dom';
import Footer from "./Footer";
import Header from "./Header";
import { Table } from "react-bootstrap";
import { setUser } from "../redux/reducers/authenticationReducer";

const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);

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

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(setUser(user));
            blogService.setToken(user.token);
        }
    }, [dispatch]);

    return (
        <div className="container mt-4">
            <h4>Current list of users:</h4>
            <Table borderless responsive hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Blogs created</th>
                        <th>Total likes</th>
                    </tr>
                </thead>
                <tbody>
                    {users
                        .slice()
                        .sort((a, b) => b.blogs.length - a.blogs.length)
                        .map((user) => {
                            const totalLikes = user.blogs.reduce((sum, blog) => sum + blog.likes, 0);

                            return (
                                <tr key={user.id}>
                                    <td>
                                        <Link to={`/users/${user.id}`} className='custom_link'>{user.name}</Link>
                                    </td>
                                    <td>
                                        {user.blogs.length}
                                    </td>
                                    <td>
                                        {totalLikes}
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
        </div>
    );
};

export default Users;
