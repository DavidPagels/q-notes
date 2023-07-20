import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PaperContainer from '../components/PaperContainer';
import { useApi } from '../providers/Api';
import { useSnackbar } from '../providers/Snackbar';

const ButtonContainer = styled('div')(
  ({ theme }) => ({
    width: '100%',
    paddingTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'flex-end'
  })
);

const StyledButton = styled(Button)(
  ({ theme }) => ({
    width: theme.spacing(12)
  })
);

const BugPage = (props) => {
  const navigate = useNavigate();
  const { postRequest } = useApi();
  const { showSnackbar } = useSnackbar();

  const [feedback, setFeedback] = useState('');

  const cancelEdit = ev => {
    navigate(-1);
  };

  const submitFeedback = async ev => {
    ev.preventDefault();
    await postRequest('/bugs', { feedback });
    showSnackbar('Feedback Received!');
    navigate('/');
  };

  return (
    <PaperContainer>
      <div sx={{ display: 'flex' }}>
        <Typography sx={{ flexGrow: 1 }} variant='h6'>
          Bugs and Feature Requests
        </Typography>
      </div>
      <Typography variant='subtitle1' sx={(theme) => ({ marginBottom: theme.spacing(2) })}>
        Please submit any unexpected site behaviors, feature requests, or feedback here and I'll do my best to use it to improve the site!
      </Typography>
      <form onSubmit={submitFeedback} noValidate>
        <TextField
          multiline
          rowsMax={10}
          sx={{ width: '100%' }}
          label='Feedback'
          onChange={e => setFeedback(e.target.value)}
          variant='outlined' />
        <ButtonContainer>
          <StyledButton sx={(theme) => ({ marginRight: theme.spacing(2) })} onClick={cancelEdit} variant='contained'>Cancel</StyledButton>
          <StyledButton variant='contained' color='primary' type='submit'>
            Submit
          </StyledButton>
        </ButtonContainer>
      </form>
    </PaperContainer>
  );
};

export default BugPage;
