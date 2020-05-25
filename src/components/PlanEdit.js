import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    width: '100%',
    paddingTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    width: theme.spacing(12)
  },
  checkbox: {
    height: theme.spacing(7)
  },
  firstButton: {
    marginRight: theme.spacing(2)
  },
  nameInput: {
    width: '100%'
  }
}));

const PlanEdit = props => {
  const classes = useStyles();
  const history = useHistory();
  const { plan = {} } = props;
  const [isPrivate, setIsPrivate] = useState(!!plan.private);
  const [planName, setPlanName] = useState(plan.name);

  const cancelEdit = ev => {
    history.goBack();
  };

  const submitPlan = ev => {
    ev.preventDefault();
    const plan = {name: planName, isPrivate};
    props.onPlanSubmit(plan);
  };

  return (
    <form onSubmit={submitPlan} noValidate>
      <Grid container alignItems='flex-start' spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField 
            className={classes.nameInput}
            defaultValue={plan.name}
            label='Plan Name' 
            onChange={e => setPlanName(e.target.value)} 
            variant='outlined'/>
        </Grid>
        <Grid item xs={12} md={8}>
          <FormControlLabel
            className={classes.checkbox}
    			  control={
    			    <Checkbox
    			      checked={isPrivate}
    			      onChange={e => setIsPrivate(e.target.checked)}
    			      name='isPrivate'
    			      color='primary'
    			    />
    			  }
    			  label='Private (plans marked as private will only be visible to you)'
    			/>
        </Grid>
      </Grid>
      <div className={classes.buttonContainer}>
        <Button className={`${classes.button} ${classes.firstButton}`} onClick={cancelEdit} variant='contained'>Cancel</Button>
        <Button className={classes.button} variant='contained' color='primary' type='submit'>
          { !!props.planId ? 'Save' : 'Submit' }
        </Button>
      </div>
    </form>
  );
}

export default PlanEdit;
