import React from 'react';
import { 
  lighten, 
  makeStyles 
} from '@material-ui/core/styles';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  highlight: {
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
  },
  title: {
    flex: '1 1 100%',
  },
  table: {
    minWidth: 650
  }
}));

const StepList = props => {
  const {steps} = props;
  const classes = useStyles();

	return (
    <div>
      <Toolbar className={classes.root}>
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Steps
        </Typography>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            {steps.map((step) => (
              <TableRow key={step.id}>
                <TableCell>{step.action}</TableCell>
                <TableCell>
                  <IconButton onClick={(ev) => props.deleteStep(step.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StepList;
