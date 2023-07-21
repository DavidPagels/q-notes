import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ReactMarkdown from 'react-markdown';

const Step = props => {
  const { step, deleteStep, editStep } = props;
  const [actionEdit, setActionEdit] = useState(step.action);
  const [editing, setEditing] = useState(false);

  const submitStepEdit = () => {
    setEditing(false);
    editStep({ ...step, action: actionEdit });
  };

  const cancelStepEdit = () => {
    setActionEdit(step.action);
    setEditing(false);
  };

  const getTableActionButtons = () => {
    if (editing) {
      return (
        <div>
          <IconButton sx={{ padding: 0 }} onClick={(ev) => submitStepEdit()}>
            <CheckIcon />
          </IconButton>
          <IconButton sx={{ padding: 0 }} onClick={(ev) => cancelStepEdit()}>
            <CloseIcon />
          </IconButton>
        </div>
      );
    } else {
      return (
        <div>
          {editStep ?
            <IconButton sx={{ padding: 0 }} onClick={(ev) => setEditing(true)}>
              <EditIcon />
            </IconButton> :
            ''}
          {deleteStep ?
            <IconButton sx={{ padding: 0 }} onClick={(ev) => deleteStep(step.id)}>
              <DeleteIcon />
            </IconButton> :
            ''}
        </div>
      );
    }
  }

  return (
    <TableRow key={step.id}>
      <TableCell component="th" scope="row">
        {
          editing ?
            <TextField
              sx={{ width: '100%' }}
              defaultValue={step.action}
              onChange={e => setActionEdit(e.target.value)}
              multiline
              size='small'
              variant='outlined' /> :
            <ReactMarkdown source={step.action} escapeHtml={false} />
        }
      </TableCell>
      <TableCell sx={(theme) => ({ width: theme.spacing(10) })}>
        {getTableActionButtons()}
      </TableCell>
    </TableRow>
  );
};

export default Step;
