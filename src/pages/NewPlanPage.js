import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import PaperContainer from '../components/PaperContainer';
import PlanEdit from '../components/PlanEdit';
import { useApi } from '../providers/Api';

const useStyles = makeStyles((theme) => ({
  title: {
    paddingBottom: theme.spacing(2)
  }
}));

const NewPlanPage = (props) => {
  const classes = useStyles();
  const { postRequest } = useApi();

	const addPlan = async plan => {
		const requestBody = {name: plan.name, private: plan.isPrivate};
		await postRequest(`/plans`, requestBody);
		props.history.push('/plans');
	}

	return (
    <PaperContainer>
      <Typography className={classes.title} variant='h6'>
        Create a New Plan
      </Typography>
      <PlanEdit onPlanSubmit={addPlan} />
    </PaperContainer>
	);
};

export default NewPlanPage;
