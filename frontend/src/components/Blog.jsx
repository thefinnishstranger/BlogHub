import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import '../blog.css'
import toast from 'react-hot-toast';

const Blog = ({ blog, handleDelete, handleLike, handleUpdate }) => {
  const user = useSelector(state => state.authentication.user);

  const handleLikeClick = () => {
    handleLike();
    toast(`You liked ${blog.author}'s blog!`, {
      position: 'top-right'
    })
  };

  const handleDeleteClick = () => {
    handleDelete();
  };

  const handleUpdateClick = () => {
    handleUpdate()
  }

  return (
    <Card className="mb-4 blog-card shadow-sm">
      <Card.Body>
        <Card.Title className="text-center" style={{ fontSize: '24px' }}>
          {blog.title}
        </Card.Title>
        <Card.Subtitle className="text-center mb-2 text-muted">
          By {blog.author}
        </Card.Subtitle>
        <Card.Text className="text-center" style={{ fontSize: '20px' }}>
          <b>Likes:</b> <i>{blog.likes}</i>
        </Card.Text>
        <Card.Text className="text-center" style={{ fontSize: '20px' }}>
          <b>Content:</b>
        </Card.Text>
        <Card.Text className="text-center">
          <i>{blog.blogContent}</i>
        </Card.Text>
        <div className="d-grid gap-2">
          <Button onClick={handleLikeClick} id="like_button" variant="dark" size="lg">
            Like
          </Button>
        </div>
        {user?.name === blog.author ? (
          <div className="d-grid gap-2 mt-2">
            <Button onClick={handleUpdateClick} id="update_button" variant="dark" size='lg'>
              Update
            </Button>
            <Button onClick={handleDeleteClick} id="delete_button" variant="dark" size='lg'>
              Delete
            </Button>
          </div>
        ) : (
          <></>
        )}
      </Card.Body>
    </Card>
  );
};

export default Blog;
