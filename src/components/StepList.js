import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Step from './Step';

const StepList = props => {
  const { steps, deleteStep, editStep } = props;

  return (
    <TableContainer>
      <Table sx={{ width: '100%' }} size='small'>
        <TableBody>
          {steps.map((step) => <Step key={step.id} editStep={editStep} deleteStep={deleteStep} step={step} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StepList;
