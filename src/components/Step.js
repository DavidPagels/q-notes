import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  editActionInput: {
    width: '100%'
  },
  tableAction: {
    width: theme.spacing(10)
  },
  tableIcon: {
    padding: 0
  }
}));

const Step = props => {
  const { step, deleteStep, editStep } = props;
  const [actionEdit, setActionEdit] = useState(step.action);
  const [editing, setEditing] = useState(false);
  const classes = useStyles();

  const submitStepEdit = () => {
    setEditing(false);
    editStep({...step, action: actionEdit});
  };

  const cancelStepEdit = () => {
    setActionEdit(step.action);
    setEditing(false);
  };

  const getTableActionButtons = () => {
    if (editing) {
      return (
        <div>
          <IconButton className={classes.tableIcon} onClick={(ev) => submitStepEdit()}>
            <CheckIcon />
          </IconButton>
          <IconButton className={classes.tableIcon} onClick={(ev) => cancelStepEdit()}>
            <CloseIcon />
          </IconButton>
        </div>
      );
    } else {
      return (
        <div>
          {editStep ? 
          <IconButton className={classes.tableIcon} onClick={(ev) => setEditing(true)}>
            <EditIcon />
          </IconButton> : 
          ''}
          {deleteStep ? 
          <IconButton className={classes.tableIcon} onClick={(ev) => deleteStep(step.id)}>
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
            className={classes.editActionInput}
            defaultValue={step.action}
            onChange={e => setActionEdit(e.target.value)} 
            multiline
            size='small'
            variant='outlined'/> : 
          step.action
        }
      </TableCell>
      <TableCell className={classes.tableAction}>
        {getTableActionButtons()}
      </TableCell>
    </TableRow>
  );
};

export default Step;
