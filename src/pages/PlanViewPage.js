import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Toolbar,
  Typography,
	Paper
} from '@material-ui/core';
import {FileCopy} from '@material-ui/icons';
import {getApiRequest, postApiRequest, deleteApiRequest} from '../utils/api-requests';

import StepList from '../components/StepList';
import StepInput from '../components/StepInput';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  }
}));

const PlanViewPage = (props) => {
	const classes = useStyles();
  const {id} = useParams();

  const [plan, setPlan] = useState({});
  const [steps, setSteps] = useState([]);

  const getPlan = async () => {
    setPlan(await getApiRequest(`/plans/${id}`));
  };

  const getSteps = async () => {
    setSteps(await getApiRequest(`/plans/${id}/steps`));
  };

  const addStep = async step => {
    await postApiRequest(`/plans/${id}/steps`, [step]);
    return getSteps();
  }

  const deleteStep = async stepId => {
    await deleteApiRequest(`/plans/${id}/steps/${stepId}`);
    return getSteps();
  }

  useEffect(() => {
    getPlan();
    getSteps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

	return (
		<div className={classes.root}>
      <Paper className={classes.paper}>
        <Toolbar className={classes.root}>
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            {plan.name}
          </Typography>
          <IconButton href="/newPlan">
            <FileCopy />
          </IconButton>
        </Toolbar>
        <StepList steps={steps} deleteStep={deleteStep}/>
        <StepInput addStep={addStep} />
			</Paper>
		</div>
	);
};

export default PlanViewPage;
