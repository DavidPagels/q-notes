import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2)
  }
}));

const PaperContainer = (props) => {
	const classes = useStyles();

	return (
    <Container maxWidth='md'>
      <Paper className={classes.paper}>
        {props.children}
      </Paper>
    </Container>
	);
};

export default PaperContainer;
