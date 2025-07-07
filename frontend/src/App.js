import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogForm from "./components/BlogForm";
import PostList from "./components/PostList";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:8000/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = async (post) => {
    const res = await axios.post("http://localhost:8000/posts", post);
    setPosts([...posts, res.data]);
  };

  const updatePost = async (id, updatedPost) => {
    const res = await axios.put(`http://localhost:8000/posts/${id}`, updatedPost);
    setPosts(posts.map(p => p.id === id ? res.data : p));
    setEditingPost(null);
  };

  const deletePost = async (id) => {
    await axios.delete(`http://localhost:8000/posts/${id}`);
    setPosts(posts.filter(p => p.id !== id));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">My React Blog</h1>
      <BlogForm
        onAddPost={addPost}
        editingPost={editingPost}
        onUpdatePost={updatePost}
      />
      <PostList posts={posts} onEdit={setEditingPost} onDelete={deletePost} />
    </div>
  );
};

export default App;

