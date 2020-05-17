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
import {
  Add,
  Visibility
} from '@material-ui/icons'
import { useAuth0 } from '../react-auth0-spa';
import ApiRequests from '../utils/api-requests';

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
        <Add />
      </IconButton>
    </Toolbar>
  );
};

const PlanList = (props) => {
  const {user, loading} = useAuth0(); 
	const classes = useStyles();
	const [plans, setPlans] = useState([]);
	const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const getPlans = async () => {
		setPlans(await ApiRequests(`/plans`));
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
                <TableCell> </TableCell>
    	        </TableRow>
    	      </TableHead>
    	      <TableBody>
    	        {plans.map((plan) => (
    	          <TableRow key={plan.id}>
    	            <TableCell component="th" scope="row">
    	              {plan.name}
    	            </TableCell>
    	            <TableCell align="right">{plan.userName || plan.userId}</TableCell>
    	            <TableCell align="right">{plan.private ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    <IconButton href={`/planView/${plan.id}`}>
                      <Visibility />
                    </IconButton>
                  </TableCell>
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
