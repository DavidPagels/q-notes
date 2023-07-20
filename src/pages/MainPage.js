import React from 'react';
import PaperContainer from '../components/PaperContainer';
import Typography from '@mui/material/Typography';

const MainPage = (props) => {

  return (
    <PaperContainer>
      <Typography variant='h4'>
        Welcome to Q Notes!
      </Typography>
      <Typography variant='subtitle1'>
        A place to take and share notes about barbecueing
      </Typography>
      <br />
      <Typography variant='h5'>Upcoming features: </Typography>
      <ul>
        <li>Ratings on plans</li>
        <li>Control and view HeaterMeter data alongside plans</li>
        <li>Hooking HeaterMeter set points and configurations to plan steps</li>
      </ul>
    </PaperContainer>
  );
};

export default MainPage;
