import React, { useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [title, setTitle] = useState("");

  const onHandleChange = (e) => setTitle(e.target.value);
  const onHandleSubmit = async (event) => {
    event.preventDefault();
    await axios.post("http://localhost:4000/posts", { title });
    setTitle("");
  };

  return (
    <div>
      <form onSubmit={onHandleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
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

export default PostCreate;
