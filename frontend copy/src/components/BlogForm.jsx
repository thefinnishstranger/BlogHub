import { useDispatch, useSelector } from "react-redux";
import { handleFieldChange } from "../redux/reducers/formSlice";
import { Button } from "react-bootstrap";
import { clearBlogForm } from "../redux/reducers/formSlice";
import { useEffect } from "react";
import { setUser } from "../redux/reducers/authenticationReducer";
import blogService from "../services/blogService";

const BlogForm = ({ createBlog }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.authentication.user);

  const { title, blogContent } = useSelector(state => state.form.blog)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const addBlogHandler = async (event) => {
    event.preventDefault();
    try {
      const newBlog = {
        title,
        author: user?.name || 'Anonymous',
        blogContent
      }
      await createBlog(newBlog)
      dispatch(clearBlogForm())
    } catch (error) {
      console.error('error creating blog', error)
    }
    
  };

  return (
    <div className="formDiv">
      <form onSubmit={addBlogHandler}>
        <h2 className="text-center">Create a new blog</h2>
        <p>
          author:{" "}
          <input
            type="text"
            value={user?.name || ""}
            placeholder="author of the blog"
            disabled
            style={{ border: 'none', color: 'black' }}
          ></input>
        </p>
        <div>
          title:{" "}
          <p>
            <input
            type="text"
            value={title}
            onChange={(e) => dispatch(handleFieldChange({ field: "title", value: e.target.value }))}
            placeholder="title of the blog"
            required
            style={{ width: '50%', height: '40px' }}
          ></input>
          </p>
        </div>
        <p>
          content:{" "}
          <textarea
            type="text"
            value={blogContent}
            onChange={(e) => dispatch(handleFieldChange({ field: "blogContent", value: e.target.value }))}
            placeholder="content of the blog"
            required
            style={{ width: '100%', height: '150px', resize: 'none' }}
          ></textarea>
        </p>
        <div className="d-grid gap-2">
          <Button size="lg" type="submit" variant="dark grey">create</Button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
