import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Table } from "react-bootstrap";
import blogService from "../services/blogService";
import { setBlogs } from "../redux/reducers/blogsReducer";
import { Link } from "react-router-dom";
import { setUser } from "../redux/reducers/authenticationReducer";
import Footer from "./Footer";

const Blogs = () => {
    const dispatch = useDispatch();
    const blogs = useSelector(state => state.blogs);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const fetchedBlogs = await blogService.fetchBlogs();
                dispatch(setBlogs(fetchedBlogs));
            } catch (error) {
                console.error("Failed to fetch blogs", error);
            }
        };
        fetchBlogs();
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
            <h4>Current collection of blogs:</h4>
            <Table borderless responsive hover>
                <thead>
                    <tr>
                        <th>
                            Title
                        </th>
                        <th>
                            Username
                        </th>
                        <th>
                            Likes
                        </th>
                    </tr>
                </thead>
                <tbody>
                {blogs
                    .slice()
                    .sort((a, b) => b.likes - a.likes)
                    .map((blog) => (
                        <tr key={blog.id}>
                            <td>
                                <Link to={`/blogs/${blog.id}`} className='custom_link'>
                                    {blog.title}
                                </Link>
                            </td>
                            <td>
                                {blog.userId.username}
                            </td>
                            <td>
                                {blog.likes}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Blogs;
