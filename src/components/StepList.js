import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Step from './Step';

const useStyles = makeStyles(theme => ({
  table: {
    width: '100%'
  }
}));

const StepList = props => {
  const { steps, deleteStep } = props;
  const classes = useStyles();

	return (
    <TableContainer>
      <Table className={classes.table} size='small'>
        <TableBody>
          {steps.map((step) => <Step key={step.id} deleteStep={deleteStep} step={step} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StepList;
