import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Toolbar,
  Typography,
	Paper
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  }
}));

const MainPage = (props) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
      <Paper className={classes.paper}>
        <Toolbar className={classes.root}>
          <Typography className={classes.title} variant='h6' id='tableTitle' component='div'>
            Welcome to Q Notes!
          </Typography>
        </Toolbar>
			</Paper>
		</div>
	);
};

export default MainPage;
