import React, { useEffect, useState } from "react";
import { Card, Container, Col, Row, Badge, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import blogService from '../services/blogService';
import { setRecentBlogs } from "../redux/reducers/recentBlogsReducer";
import '../homepage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const recentBlogs = useSelector((state) => state.recentBlogs);
  const user = useSelector((state) => state.authentication.user);
  const [createButton, setCreateButton] = useState('/')
  const [homeButtonText, setHomeButtonText] = useState('')

  const correctButton = () => {
    if (user) {
        setHomeButtonText('Create a New Blog')
        setCreateButton('/create')
    } else {
        setHomeButtonText('Login to create a New Blog')
        setCreateButton('/login')
    }
  }

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const fetchedRecentBlogs = await blogService.fetchMostRecentBlogs();
        dispatch(setRecentBlogs(fetchedRecentBlogs));
      } catch (error) {
        console.error('Could not fetch most recent blogs', error);
      }
    };
    fetchRecentBlogs();
    correctButton()
  }, [dispatch, user]);


  return (
    <div className="home_page">
      <div className="header-section text-center py-5">
        <Container>
          <h1 className="display-4">Welcome to BlogHub</h1>
          <p className="lead">Your go-to platform for free speech and the latest blog posts.</p>
          {user && (
            <h4 className="greeting text-black">Hello, {user.name}! Welcome back!</h4>
          )}
          <Button href={createButton} variant="dark" className="mt-3">{homeButtonText}</Button>
        </Container>
      </div>

      <Container>
        <Row className="mb-4">
          <Col>
            <h2 className="section-subtitle text-center text-black">Latest Blog Posts</h2>
            <hr />
          </Col>
        </Row>
        <Row>
          {recentBlogs && recentBlogs.length > 0 ? (
            recentBlogs.map((blog) => (
              <Col md={6} key={blog.id} className="">
                <Card className="mb-4 blog-card shadow-sm">
                  <Card.Body>
                    <Card.Title className="blog-title">{blog.title}</Card.Title>
                    <Card.Text className="blog-author">By {blog.author}</Card.Text>
                    <Card.Text className="blog-likes">Likes: <Badge bg="secondary">{blog.likes}</Badge></Card.Text>
                    <Card.Text className="blog-content">{blog.content}</Card.Text>
                    <Button href={`/blogs/${blog.id}`} variant="dark">Read More</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col md={12}>
              <p className="no-blogs-message text-center">No recent blogs available.</p>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
