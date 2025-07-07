import React from "react";

const PostList = ({ posts, onEdit, onDelete }) => {
  return (
    <div>
      {posts.map(post => (
        <div className="card mb-3" key={post.id}>
          <div className="card-body">
            <h5>{post.title}</h5>
            <h6 className="text-muted">by {post.creator} on {post.createdAt}</h6>
            <p>{post.content}</p>
            <button className="btn btn-warning me-2" onClick={() => onEdit(post)}>Edit</button>
            <button className="btn btn-danger" onClick={() => onDelete(post.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
