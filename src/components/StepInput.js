import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const StepInput = props => {
  const [action, setAction] = useState();

  const addStep = async () => {
    const step = { action };
    await props.addStep(step);
    setAction('');
  }

  return (
    <div sx={(theme) => ({
      display: 'flex',
      paddingTop: theme.spacing(2),
      width: '100%'
    })} >
      <TextField
        sx={{ margin: 0, flexGrow: 1 }}
        placeholder='Create New Step'
        value={action}
        onChange={ev => setAction(ev.target.value)}
        variant='outlined'
        margin='dense'
      />
      <Button
        sx={(theme) => ({ width: theme.spacing(12) })}
        variant='contained'
        color='primary'
        onClick={() => addStep()}
      >
        Add
      </Button>
    </div>
  );
};

export default StepInput;
