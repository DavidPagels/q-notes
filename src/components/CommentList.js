import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Comment from './Comment';

const useStyles = makeStyles(theme => ({
  list: {
    width: '100%'
  }
}));

const CommentList = props => {
  const classes = useStyles();
  const { comments } = props;

	return (
    <List className={classes.list}>
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
