import { Button } from "react-bootstrap"

const EditBlog = ({ newTitle, setNewTitle, newContent, setNewContent, handleUpdate, setEditing }) => {

    return (
            <div className="text-center">
            <h4>Edit the blog</h4>
            <div>
                <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Title of the blog"
                    required
                    style={{ width: '100%', height: '40px' }}
                />
            </div>
            <div className="mt-3">
                <textarea
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Content of the blog"
                    style={{ resize: 'none', width: '100%', height: '150px' }}
                    required
                />
            </div>
            <div>
                <Button onClick={handleUpdate} variant="dark" size="lg" className="login_button">Update</Button>
            </div>
            <div>
                <Button onClick={() => setEditing(false)} variant="dark" size="lg" className="login_button">Cancel</Button>
            </div>
        </div>
  )
}

export default EditBlog