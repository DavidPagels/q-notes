import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
} from '@material-ui/icons';
import { useApi } from '../providers/Api';
import * as qs from 'qs';

const useStyles = makeStyles(theme => ({
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
  table: {
    minWidth: 650
  }
}));

const PlanList = (props) => {
	const classes = useStyles();
  const history = useHistory();
  const { getRequest } = useApi();
  const queryParams = qs.parse(history.location.search);
	const [plans, setPlans] = useState([]);
	const [page, setPage] = React.useState(Number(queryParams.page) || 1);
  const [pageSize, setPageSize] = React.useState(Number(queryParams.pageSize) || 10);
  const [totalHits, setTotalHits] = React.useState(0);

	const getPlans = async () => {
    const queryString = qs.stringify({page, pageSize});
		const results = await getRequest(`/plans?${queryString}`);
    setPlans(results.records);
    setTotalHits(results.totalHits);
	}

	useEffect(() => {
		getPlans();
	}, [page, pageSize]);

  const updatePage = (newPage, newPageSize) => {
    history.push({
      pathname: history.location.pathname, 
      search: `?${qs.stringify({page: newPage, pageSize: newPageSize})}`
    });
    setPage(newPage);
    setPageSize(newPageSize);
  };

	const handleChangePage = (event, newPage) => {
    updatePage(newPage, pageSize);
  };

  const handleChangeRowsPerPage = (event) => {
    updatePage(1, parseInt(event.target.value, 10));
  };

	return (
		<div className={classes.root}>
      <Paper className={classes.paper}>
        <Toolbar className={classes.root}>
          <Typography className={classes.title} variant='h6' id='tableTitle' component='div'>
            Smoking Plans
          </Typography>
          
          <IconButton href='/addPlan' aria-label='filter list'>
            <Add />
          </IconButton>
        </Toolbar>
  
    	  <TableContainer component={Paper}>
    	    <Table className={classes.table} aria-label='simple table'>
    	      <TableHead>
    	        <TableRow>
    	          <TableCell>Name</TableCell>
    	          <TableCell align='right'>User Id</TableCell>
    	          <TableCell align='right'>Private</TableCell>
                <TableCell> </TableCell>
    	        </TableRow>
    	      </TableHead>
    	      <TableBody>
    	        {plans.map((plan) => (
    	          <TableRow key={plan.id}>
    	            <TableCell component='th' scope='row'>
    	              {plan.name}
    	            </TableCell>
    	            <TableCell align='right'>{plan.userName || plan.userId}</TableCell>
    	            <TableCell align='right'>{plan.private ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    <IconButton {...{to: `/plans/${plan.id}`}} component={Link}>
                      <Visibility />
                    </IconButton>
                  </TableCell>
    	          </TableRow>
    	        ))}
    	      </TableBody>
    	    </Table>
    	  </TableContainer>
    	  <TablePagination
    	  	  rowsPerPageOptions={[10, 25, 50]}
    	  	  component='div'
    	  	  count={totalHits}
    	  	  rowsPerPage={pageSize}
    	  	  page={page - 1}
    	  	  onChangePage={handleChangePage}
    	  	  onChangeRowsPerPage={handleChangeRowsPerPage}
    	  	/>
      </Paper>
    </div>
  );
};

export default PlanList;
