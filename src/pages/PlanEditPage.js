import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	Paper,
	TextField
} from '@material-ui/core';
import {postApiRequest} from '../utils/api-requests';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  }
}));

const PlanEditPage = (props) => {
	const classes = useStyles();
	const [isPrivate, setIsPrivate] = React.useState(false);
	const [planName, setPlanName] = React.useState();

	const addPlan = async e => {
		e.preventDefault()
		const requestBody = {name: planName, private: isPrivate};
		await postApiRequest(`/plans`, requestBody);
		props.history.push('/plans')
	}

	return (
		<div className={classes.root}>
      <Paper className={classes.paper}>
        <form onSubmit={addPlan} noValidate>
          <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs={6}>
              <TextField id="filled-basic" label='Plan Name' onChange={e => setPlanName(e.target.value)} variant="filled"/>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
      				  control={
      				    <Checkbox
      				      checked={isPrivate}
      				      onChange={e => setIsPrivate(e.target.checked)}
      				      name="isPrivate"
      				      color="primary"
      				    />
      				  }
      				  label="Private (plans marked as private will only be visible to you)"
      				/>
            </Grid>
            <Grid item style={{ marginTop: 16 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
			</Paper>
		</div>
	);
};

export default PlanEditPage;
