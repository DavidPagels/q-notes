import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  button: {
    width: theme.spacing(12)
  },
  inputContainer: {
    display: 'flex',
    paddingTop: theme.spacing(2),
    width: '100%'
  },
  stepInput: {
    margin: 0,
    flexGrow: 1
  }
}));

const StepInput = props => {
  const classes = useStyles();
  const [action, setAction] = useState();

  const addStep = async () => {
    const step = {action};
    await props.addStep(step);
    setAction('');
  }

  return (
    <div className={classes.inputContainer}>
        <TextField
          className={classes.stepInput}
          placeholder='Create New Step'
          value={action}
          onChange={ev => setAction(ev.target.value)}
          variant='outlined'
          margin='dense'
        />
        <Button
          className={classes.button}
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
