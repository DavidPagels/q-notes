import React from 'react';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();
  const classes = useStyles();
  const { postRequest } = useApi();

	const addPlan = async plan => {
		const requestBody = {name: plan.name, meatId: plan.meatId, private: plan.isPrivate};
		const createdPlan = await postRequest(`/plans`, requestBody);
		history.push(`/editPlan/${createdPlan.id}`);
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
