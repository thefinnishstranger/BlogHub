import { Button } from "react-bootstrap"
import Togglable from "./Togglable"
import BlogForm from "./BlogForm"
import { useDispatch } from "react-redux"
import { useRef } from "react"
import blogService from "../services/blogService";
import { addBlog as addBlogAction } from "../redux/reducers/blogsReducer";
import Footer from "./Footer"
import toast from "react-hot-toast"

const CreateNewBlog = () => {
    const dispatch = useDispatch()

    const addBlog = async (blogObject) => {
        try {
          const savedBlog = await blogService.create(blogObject);
          dispatch(addBlogAction(savedBlog));
          toast(`${savedBlog.title} has been successfully created!`, {
            position: 'top-right'
          })
        } catch (exception) {
          console.error("Can't create blog", exception);
          toast('Something went wrong, try again!', {
            position: 'top-right'
        })
        }
      };

    return (
        <div>
            <BlogForm createBlog={addBlog} />
        </div>
    )
}


export default CreateNewBlog