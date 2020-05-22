import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Toolbar,
  Typography,
	Paper
} from '@material-ui/core';
import {FileCopy} from '@material-ui/icons';
import { useApi } from '../providers/Api';

import StepList from '../components/StepList';
import StepInput from '../components/StepInput';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  }
}));

const PlanPage = (props) => {
	const classes = useStyles();
  const { getRequest, postRequest, deleteRequest } = useApi();
  const {planId} = useParams();

  const [plan, setPlan] = useState({});
  const [steps, setSteps] = useState([]);

  const getPlan = async () => {
    setPlan(await getRequest(`/plans/${planId}`));
  };

  const getSteps = async () => {
    setSteps(await getRequest(`/plans/${planId}/steps`));
  };

  const addStep = async step => {
    await postRequest(`/plans/${planId}/steps`, [step]);
    return getSteps();
  }

  const deleteStep = async stepId => {
    await deleteRequest(`/plans/${planId}/steps/${stepId}`);
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
          <Typography className={classes.title} variant='h6' id='tableTitle' component='div'>
            {plan.name}
          </Typography>
          <IconButton {...{to: `/copyPlan/${planId}`}} component={Link}>
            <FileCopy />
          </IconButton>
        </Toolbar>
        <StepList steps={steps} deleteStep={deleteStep}/>
        <StepInput addStep={addStep} />
			</Paper>
		</div>
	);
};

export default PlanPage;
