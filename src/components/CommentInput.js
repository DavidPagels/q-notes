import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  button: {
    borderRadius: '0 0 4px 4px',
    width: theme.spacing(12),
    float: 'right'
  },
  inputContainer: {
    paddingTop: theme.spacing(2),
    width: '100%'
  },
  bottomRow: {
    display: 'flex'
  },
  filler: {
    flexGrow: 1
  },
  commentInput: {
    margin: 0,
    width: '100%',
    [`& fieldset`]: {
      borderRadius: '4px 4px 0 4px',
    }
  }
}));

const CommentInput = props => {
  const classes = useStyles();
  const [comment, setComment] = useState('');

  const addComment = async () => {
    await props.addComment({comment});
    setComment('');
  }

  return (
    <div className={classes.inputContainer}>
        <TextField
          className={classes.commentInput}
          placeholder='Write a Comment'
          value={comment}
          onChange={ev => setComment(ev.target.value)}
          variant='outlined'
          margin='dense'
          multiline
          rowsMax={15}
        />
        <div className={classes.bottomRow}>
          <div className={classes.filler} />
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            onClick={() => addComment()}
          >
            Add
          </Button>
        </div>
    </div>
  );
};

export default CommentInput;
