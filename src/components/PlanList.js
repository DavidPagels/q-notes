import React, {useEffect, useState} from 'react';
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
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import { useAuth0 } from "../react-auth0-spa";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight: {
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
  },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
		const classes = useToolbarStyles();

  return (
    <Toolbar className={classes.root}>
      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        Smoking Plans
      </Typography>
      
      <IconButton href="/addPlan" aria-label="filter list">
        <AddIcon />
      </IconButton>
    </Toolbar>
  );
};

const PlanList = (props) => {
  const {user, loading, getTokenSilently} = useAuth0(); 
	const classes = useStyles();
	const [plans, setPlans] = useState([]);
	const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const getPlans = async () => {
    const token = await getTokenSilently();
    const requestBody = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
		const response = await fetch(`http://localhost:8080/plans`, requestBody).catch(e => console.log(e))
		const thePlans = await response.json();
		setPlans(thePlans);
	}

	useEffect(() => {
		getPlans();
	}, []);

	const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

	return (
		<div className={classes.root}>
      <Paper className={classes.paper}>
			  <EnhancedTableToolbar />
  
    	  <TableContainer component={Paper}>
    	    <Table className={classes.table} aria-label="simple table">
    	      <TableHead>
    	        <TableRow>
    	          <TableCell>Name</TableCell>
    	          <TableCell align="right">User Id</TableCell>
    	          <TableCell align="right">Private</TableCell>
    	        </TableRow>
    	      </TableHead>
    	      <TableBody>
    	        {plans.map((plan) => (
    	          <TableRow key={plan.id}>
    	            <TableCell component="th" scope="row">
    	              {plan.name}
    	            </TableCell>
    	            <TableCell align="right">{plan.userId}</TableCell>
    	            <TableCell align="right">{plan.private ? 'Yes' : 'No'}</TableCell>
    	          </TableRow>
    	        ))}
    	      </TableBody>
    	    </Table>
    	  </TableContainer>
    	  <TablePagination
    	  	  rowsPerPageOptions={[5, 10, 25]}
    	  	  component="div"
    	  	  count={plans.length}
    	  	  rowsPerPage={rowsPerPage}
    	  	  page={page}
    	  	  onChangePage={handleChangePage}
    	  	  onChangeRowsPerPage={handleChangeRowsPerPage}
    	  	/>
      </Paper>
    </div>
  );
};

export default PlanList;
