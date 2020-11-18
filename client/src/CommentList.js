import React from "react";

const CommentList = ({ comments = [] }) => {
  const renderedComments = comments.map((comment) => {
    let content;

    switch (comment.status) {
      case "approved":
        content = comment.content;
        break;
      case "pending":
        content = "Comment awaiting moderation";
        break;
      case "rejected":
        content = "Comment rejected";
        break;
    }

    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
