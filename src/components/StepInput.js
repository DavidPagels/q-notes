import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  Button,
  Grid,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  inputContainer: {
    padding: theme.spacing(1)
  }

}));

const StepInput = props => {
  const classes = useStyles();
  const [action, setAction] = useState();


  const addStep = async () => {
    const step = {action};
    await props.addStep(step);
    console.log('setting step to empty')
    setAction('');
  }

  return (
    <Grid container className={classes.inputContainer}>
      <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
        <TextField
          placeholder="Input next step"
          value={action}
          onChange={ev => setAction(ev.target.value)}
          fullWidth
        />
      </Grid>
      <Grid xs={2} md={1} item>
        <Button
          fullWidth
          color="secondary"
          variant="outlined"
          onClick={() => addStep()}
        >
          Add
        </Button>
      </Grid>
    </Grid>
  );
};

export default StepInput;
