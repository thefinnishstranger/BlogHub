import { useEffect, useRef } from "react";
import "./App.css";
import "./index.css"
import blogService from "./services/blogService";
import { setUser } from "./redux/reducers/authenticationReducer";
import Footer from "./components/Footer";
import { setBlogs, addBlog as addBlogAction, removeBlog } from "./redux/reducers/blogsReducer";
import { useSelector, useDispatch } from "react-redux"
import HomePage from "./components/HomePage";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.fetchBlogs();
        dispatch(setBlogs(blogs));
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
      <div>
      <HomePage />
    </div>
  );
};

export default App;
