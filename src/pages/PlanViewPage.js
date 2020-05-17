import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Toolbar,
	Grid,
	Paper
} from '@material-ui/core';
import { useAuth0 } from "../react-auth0-spa";
import ApiRequests from '../utils/api-requests';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  }
}));

const PlanViewPage = (props) => {
	const classes = useStyles();
  const {id} = useParams();
	const {user} = useAuth0(); 

  const [plan, setPlan] = useState({});

  const getPlan = async () => {
    setPlan(await ApiRequests(`/plans/${id}`));
  }

  useEffect(() => {
    getPlan();
  }, []);

	return (
		<div className={classes.root}>
      <Paper className={classes.paper}>
        <Toolbar>
          {plan.name}
        </Toolbar>
			</Paper>
		</div>
	);
};

export default PlanViewPage;
