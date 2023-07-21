import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const PlanEdit = props => {
  const navigate = useNavigate();
  const { plan = {} } = props;
  const [isPrivate, setIsPrivate] = useState(!!plan.private);
  const [planName, setPlanName] = useState(plan.name);
  const [meatId, setMeatId] = useState(plan.meatId);

  const cancelEdit = ev => {
    navigate(-1);
  };

  const submitPlan = ev => {
    ev.preventDefault();
    const plan = { name: planName, meatId, isPrivate };
    props.onPlanSubmit(plan);
  };

  return (
    <form onSubmit={submitPlan} noValidate>
      <Grid container alignItems='flex-start' spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            sx={{ width: '100%' }}
            defaultValue={plan.name}
            label='Plan Name'
            onChange={e => setPlanName(e.target.value)}
            variant='outlined' />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl variant="outlined" sx={{ width: '100%' }}>
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
            sx={(theme) => ({ height: theme.spacing(7) })}
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
      <div sx={(theme) => ({
        width: '100%',
        paddingTop: theme.spacing(4),
        display: 'flex',
        justifyContent: 'flex-end'
      })}>
        <Button sx={(theme) => ({ marginRight: theme.spacing(2), width: theme.spacing(12) })}
          onClick={cancelEdit}
          variant='contained'
        >
          Cancel
        </Button>
        <Button sx={(theme) => ({ width: theme.spacing(12) })} variant='contained' color='primary' type='submit'>
          {!!props.planId ? 'Save' : 'Submit'}
        </Button>
      </div>
    </form>
  );
}

export default PlanEdit;
