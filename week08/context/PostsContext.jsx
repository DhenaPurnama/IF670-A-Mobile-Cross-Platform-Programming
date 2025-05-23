import React, { createContext, useState } from 'react';
import { getPosts } from '../services/axios';

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = () => {
    setLoading(true);
    getPosts()
      .then(response => {
        if (response.status === 200) {
          setPosts(response.data);
        }
      })
      .catch(err => {
        console.error('Error fetching posts:', err);
        setError('Failed to fetch posts. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Function to update a post in the local state
  const updateLocalPost = (postId, updatedPostData) => {
    setPosts(currentPosts => 
      currentPosts.map(post => 
        post.id === postId 
          ? { ...post, ...updatedPostData } 
          : post
      )
    );
  };

  return (
    <PostsContext.Provider 
      value={{ 
        posts, 
        setPosts, 
        loading, 
        setLoading, 
        error, 
        setError, 
        fetchPosts,
        updateLocalPost
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};