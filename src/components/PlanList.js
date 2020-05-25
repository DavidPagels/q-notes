import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip
} from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import { useApi } from '../providers/Api';
import * as qs from 'qs';
import * as moment from 'moment';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650
  },
  tableButton: {
    padding: 0
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
		const results = await getRequest(`/plans?${queryString}`) || {};
    setPlans(results.records || []);
    setTotalHits(results.totalHits || 0);
	}

	useEffect(() => {
		getPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    updatePage(newPage + 1, pageSize);
  };

  const handleChangeRowsPerPage = (event) => {
    updatePage(1, parseInt(event.target.value, 10));
  };

	return (
		<div>
    	<TableContainer>
    	  <Table className={classes.table} size='small'>
    	    <TableHead>
    	      <TableRow>
    	        <TableCell>Name</TableCell>
    	        <TableCell>User</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Updated</TableCell>
    	        <TableCell>Private</TableCell>
              <TableCell> </TableCell>
    	      </TableRow>
    	    </TableHead>
    	    <TableBody>
    	      {plans.map((plan) => (
    	        <TableRow key={plan.id}>
    	          <TableCell>
    	            {plan.name}
    	          </TableCell>
    	          <TableCell>{plan.userName || plan.userId}</TableCell>
                <Tooltip title={moment(plan.created).format('YYYY-MM-DD h:mm a')}>
                  <TableCell>
                    {moment(plan.created).fromNow()}
                  </TableCell>
                </Tooltip>
                <Tooltip title={moment(plan.updated).format('YYYY-MM-DD h:mm a')}>
                  <TableCell>
                    {moment(plan.updated).fromNow()}
                  </TableCell>
                </Tooltip>
    	          <TableCell>{plan.private ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <IconButton className={classes.tableButton} {...{to: `/plans/${plan.id}`}} component={Link}>
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
    </div>
  );
};

export default PlanList;
