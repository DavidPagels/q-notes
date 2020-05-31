import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
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
  },
  meatSelect: {
    width: '100%'
  }
}));

const PlanEdit = props => {
  const classes = useStyles();
  const history = useHistory();
  const { plan = {} } = props;
  const [isPrivate, setIsPrivate] = useState(!!plan.private);
  const [planName, setPlanName] = useState(plan.name);
  const [meatId, setMeatId] = useState(plan.meatId);

  const cancelEdit = ev => {
    history.goBack();
  };

  const submitPlan = ev => {
    ev.preventDefault();
    const plan = {name: planName, meatId, isPrivate};
    props.onPlanSubmit(plan);
  };

  return (
    <form onSubmit={submitPlan} noValidate>
      <Grid container alignItems='flex-start' spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField 
            className={classes.nameInput}
            defaultValue={plan.name}
            label='Plan Name' 
            onChange={e => setPlanName(e.target.value)} 
            variant='outlined'/>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl variant="outlined" className={classes.meatSelect}>
            <InputLabel>Meat</InputLabel>
            <Select value={meatId} onChange={(e) => setMeatId(e.target.value)} label="Meat">
              <MenuItem value={1}>Pork</MenuItem>
              <MenuItem value={2}>Beef</MenuItem>
              <MenuItem value={3}>Chicken</MenuItem>
              <MenuItem value={4}>Turkey</MenuItem>
              <MenuItem value={5}>Other Poultry</MenuItem>
              <MenuItem value={6}>Wild Game</MenuItem>
              <MenuItem value={7}>Seafood</MenuItem>
              <MenuItem value={8}>Other</MenuItem>
              <MenuItem value={9}>Projects/Devices</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
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
