import React, { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState("");

  const onHandleChange = (e) => setContent(e.target.value);
  const onHandleSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content,
    });
    setContent("");
  };

  return (
    <div>
      <form onSubmit={onHandleSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            type="text"
            value={content}
            onChange={onHandleChange}
            className="form-control"
          />
        </div>
        <button
          type="submit"
          onClick={onHandleSubmit}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentCreate;
