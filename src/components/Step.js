import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  tableAction: {
    width: theme.spacing(10)
  },
  tableIcon: {
    padding: 0
  }
}));

const Step = props => {
  const { step, deleteStep } = props;
  const classes = useStyles();

	return (
    <TableRow key={step.id}>
      <TableCell component="th" scope="row">{step.action}</TableCell>
      <TableCell className={classes.tableAction}>
        {deleteStep ? 
          <IconButton className={classes.tableIcon} onClick={(ev) => deleteStep(step.id)}>
            <DeleteIcon />
          </IconButton> : 
          ''}
      </TableCell>
    </TableRow>
  );
};

export default Step;
