import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PaperContainer from '../components/PaperContainer'
import PlanEdit from '../components/PlanEdit';
import StepList from '../components/StepList';
import StepInput from '../components/StepInput';
import { useApi } from '../providers/Api';
import { useSnackbar } from '../providers/Snackbar';

const useStyles = makeStyles((theme) => ({
  title: {
    paddingBottom: theme.spacing(2)
  },
  stepList: {
    width: '100%'
  },
  stepInput: {
    width: '100%'
  }
}));

const PlanEditPage = (props) => {
	const classes = useStyles();
  const history = useHistory();
  const { planId } = useParams();
  const [ plan, setPlan ] = useState({});
  const [ loading, setLoading ] = useState(true);
  const { showSnackbar } = useSnackbar();
  const { getRequest, postRequest, putRequest, deleteRequest } = useApi();

  const init = async () => {
    await getPlan();
    setLoading(false);
  };

  const getPlan = async () => {
    setPlan(await getRequest(`/plans/${planId}`));
  };

	const editPlan = async plan => {
		const requestBody = {name: plan.name, meatId: plan.meatId, private: plan.isPrivate};
		await putRequest(`/plans/${planId}`, requestBody);
    showSnackbar('Plan Saved');
		history.push(`/plans/${planId}`);
	};

  const addStep = async step => {
    await postRequest(`/plans/${planId}/steps`, [step]);
    return getPlan();
  };

  const deleteStep = async stepId => {
    await deleteRequest(`/plans/${planId}/steps/${stepId}`);
    return getPlan();
  };

  const editStep = async step => {
    await putRequest(`/plans/${planId}/steps/${step.id}`, step);
    return getPlan();
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
	return loading ? '' :
      <div>
        <PaperContainer>
          <Typography className={classes.title} variant='h6'>
            Edit Plan
          </Typography>
          <PlanEdit plan={plan} onPlanSubmit={editPlan} planId={planId} />
        </PaperContainer>
        <PaperContainer>
          <Typography className={classes.title} variant='h6'>
            Modify Plan Steps
          </Typography>
          <StepList 
              className={classes.stepList} 
              editStep={editStep}
              deleteStep={deleteStep} 
              steps={plan.steps || []}/>
          <StepInput className={classes.stepInput} addStep={addStep} />
        </PaperContainer>
      </div>;
};

export default PlanEditPage;
