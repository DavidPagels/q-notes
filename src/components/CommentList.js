import React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Comment from './Comment';

const CommentList = props => {
  const { comments } = props;

  return (
    <List sx={{ width: '100%' }}>
      {comments.map(comment => (
        <div key={comment.id}>
          <Comment comment={comment} />
          <Divider />
        </div>
      ))}
    </List>
  );
};

export default CommentList;
