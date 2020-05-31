import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ReactMarkdown from 'react-markdown';

const useStyles = makeStyles(theme => ({
  previewButton: {
    borderRadius: '0 0 0 4px',
    float: 'right'
  },
  addButton: {
    borderRadius: '0 0 4px 0',
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
  const [previewing, setPreviewing] = useState(false);

  const addComment = async () => {
    await props.addComment({comment});
    setComment('');
    setPreviewing(false);
  }

  return (
    <div className={classes.inputContainer}>
      {previewing ?
        <ReactMarkdown source={comment} escapeHtml={false}/> :
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
      }
      <div className={classes.bottomRow}>
        <div className={classes.filler} />
        <Button
          className={classes.previewButton}
          variant='contained'
          onClick={() => setPreviewing(!previewing)}>
          {previewing ? 'Edit' : 'Preview'}
        </Button>
        <Button
          className={classes.addButton}
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
