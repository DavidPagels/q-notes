import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  TextField,
  Typography,
} from '@material-ui/core';
import PaperContainer from '../components/PaperContainer';
import { useApi } from '../providers/Api';
import { useSnackbar } from '../providers/Snackbar';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex'
  },
  title: {
    flexGrow: 1
  },
  subtitle: {
    marginBottom: theme.spacing(2)
  },
  feedbackInput: {
    width: '100%'
  },
  buttonContainer: {
    width: '100%',
    paddingTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    width: theme.spacing(12)
  },
  firstButton: {
    marginRight: theme.spacing(2)
  }
}));

const BugPage = (props) => {
	const classes = useStyles();
  const history = useHistory();
  const { postRequest } = useApi();
  const { showSnackbar } = useSnackbar();

  const [feedback, setFeedback] = useState('');

  const cancelEdit = ev => {
    history.goBack();
  };

  const submitFeedback = async ev => {
    ev.preventDefault();
    await postRequest('/bugs', {feedback});
    showSnackbar('Feedback Received!');
    history.push('/');
  };

	return (
    <PaperContainer>
      <div className={classes.toolbar}>
        <Typography className={classes.title} variant='h6'>
          Bugs and Feature Requests
        </Typography>
      </div>
      <Typography variant='subtitle1' className={classes.subtitle}>
        Please submit any unexpected site behaviors, feature requests, or feedback here and I'll do my best to use it to improve the site!
      </Typography>
      <form onSubmit={submitFeedback} noValidate>
        <TextField
          multiline
          rowsMax={10}
          className={classes.feedbackInput}
          label='Feedback' 
          onChange={e => setFeedback(e.target.value)} 
          variant='outlined'/>
        <div className={classes.buttonContainer}>
          <Button className={`${classes.button} ${classes.firstButton}`} onClick={cancelEdit} variant='contained'>Cancel</Button>
          <Button className={classes.button} variant='contained' color='primary' type='submit'>
            Submit
          </Button>
        </div>
      </form>
    </PaperContainer>
	);
};

export default BugPage;
