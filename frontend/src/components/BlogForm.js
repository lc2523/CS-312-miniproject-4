import React, { useState, useEffect } from "react";

const BlogForm = ({ onAddPost, editingPost, onUpdatePost }) => {
  const [title, setTitle] = useState("");
  const [creator, setCreator] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setCreator(editingPost.creator);
      setContent(editingPost.content);
    } else {
      setTitle("");
      setCreator("");
      setContent("");
    }
  }, [editingPost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPost) {
      onUpdatePost(editingPost.id, { title, creator, content });
    } else {
      onAddPost({ title, creator, content });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input className="form-control mb-2" placeholder="Creator" value={creator} onChange={(e) => setCreator(e.target.value)} required />
      <input className="form-control mb-2" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea className="form-control mb-2" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
      <button className="btn btn-primary">{editingPost ? "Update" : "Post"}</button>
    </form>
  );
};

export default BlogForm;
