import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  table: {
    width: '100%'
  },
  tableAction: {
    width: theme.spacing(10)
  },
  tableIcon: {
    padding: 0
  }
}));

const StepList = props => {
  const {steps} = props;
  const classes = useStyles();

	return (
    <TableContainer>
      <Table className={classes.table} size='small'>
        <TableBody>
          {steps.map((step) => (
            <TableRow key={step.id}>
              <TableCell component="th" scope="row">{step.action}</TableCell>
              <TableCell className={classes.tableAction}>
                {props.deleteStep ? 
                  <IconButton className={classes.tableIcon} onClick={(ev) => props.deleteStep(step.id)}>
                    <Delete />
                  </IconButton> : 
                  ''}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StepList;
