import React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

const PaperContainer = (props) => {

  return (
    <Container maxWidth='md'>
      <Paper sx={(theme) => ({ padding: theme.spacing(2), marginTop: theme.spacing(2) })}>
        {props.children}
      </Paper>
    </Container>
  );
};

export default PaperContainer;
