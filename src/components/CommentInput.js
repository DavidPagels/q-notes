import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ReactMarkdown from 'react-markdown';

const CommentInput = props => {
  const [comment, setComment] = useState('');
  const [previewing, setPreviewing] = useState(false);

  const addComment = async () => {
    await props.addComment({ comment });
    setComment('');
    setPreviewing(false);
  }

  return (
    <div sx={(theme) => ({
      paddingTop: theme.spacing(2),
      width: '100%'
    })}>
      {previewing ?
        <ReactMarkdown source={comment} escapeHtml={false} /> :
        <TextField
          sx={{
            margin: 0,
            width: '100%',
            [`& fieldset`]: {
              borderRadius: '4px 4px 0 4px',
            }
          }}
          placeholder='Write a Comment'
          value={comment}
          onChange={ev => setComment(ev.target.value)}
          variant='outlined'
          margin='dense'
          multiline
          rowsMax={15}
        />
      }
      <div sx={{ display: 'flex' }}>
        <div sx={{ flexGrow: 1 }} />
        <Button
          sx={{ borderRadius: '0 0 0 4px', float: 'right' }}
          variant='contained'
          onClick={() => setPreviewing(!previewing)}>
          {previewing ? 'Edit' : 'Preview'}
        </Button>
        <Button
          sx={(theme) => ({
            borderRadius: '0 0 4px 0',
            width: theme.spacing(12),
            float: 'right'
          })}
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
