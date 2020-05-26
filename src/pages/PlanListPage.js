import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import PlanList from '../components/PlanList';
import PaperContainer from '../components/PaperContainer';


const useStyles = makeStyles(theme => ({
	paper: {
    marginTop: theme.spacing(2)
  },
  title: {
    flex: '1 1 100%',
  },
  table: {
    minWidth: 650
  },
  tableButton: {
    padding: 0
  }
}));

const PlanListPage = (props) => {
	const classes = useStyles();

	return (
		<PaperContainer>
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title} variant='h6' id='tableTitle' component='div'>
          Smoking Plans
        </Typography>
        
        <IconButton {...{to: `/newPlan`}} component={Link}>
          <AddIcon />
        </IconButton>
      </Toolbar>
      <PlanList/>
    </PaperContainer>
	);
};

export default PlanListPage;