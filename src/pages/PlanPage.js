import React, {useEffect, useState} from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Typography,
} from '@material-ui/core';
import PaperContainer from '../components/PaperContainer';
import { Edit, FileCopy } from '@material-ui/icons';
import { useApi } from '../providers/Api';

import StepList from '../components/StepList';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex'
  },
  title: {
    flexGrow: 1
  }
}));

const PlanPage = (props) => {
	const classes = useStyles();
  const history = useHistory();
  const { getRequest, postRequest } = useApi();
  const { planId } = useParams();

  const [plan, setPlan] = useState({});

  const getPlan = async () => {
    setPlan(await getRequest(`/plans/${planId}`));
  };

  const copyPlan = async () => {
    const splitName = plan.name.split(' - copy ')
    const copyNumber = Number(splitName.slice(-1)) || 0;
    const newPlan = {...plan, name: `${splitName[0]} - copy ${copyNumber + 1}`};
    const createdPlan = await postRequest(`/plans/steps`, newPlan);
    history.push(`/editPlan/${createdPlan.id}`)
  }

  useEffect(() => {
    getPlan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

	return (
    <PaperContainer>
      <div className={classes.toolbar}>
        <Typography className={classes.title} variant='h6'>
          {plan.name}
        </Typography>
        <IconButton onClick={copyPlan}>
          <FileCopy />
        </IconButton>
        <IconButton {...{to: `/editPlan/${planId}`}} component={Link}>
          <Edit />
        </IconButton>
      </div>
      <StepList steps={plan.steps || []}/>
    </PaperContainer>
	);
};

export default PlanPage;
