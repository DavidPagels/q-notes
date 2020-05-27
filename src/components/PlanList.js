import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import VisibilityIcon from '@material-ui/icons/Visibility';
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

  const goToPlanPage = (planId) => {
    history.push(`/plans/${planId}`);
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
    	        <TableRow key={plan.id} hover onClick={() => goToPlanPage(plan.id)}>
    	          <TableCell>
    	            {plan.name}
    	          </TableCell>
    	          <TableCell>{plan.userName || plan.userId}</TableCell>
                <Tooltip title={moment.utc(plan.created).format('YYYY-MM-DD h:mm a')}>
                  <TableCell>
                    {moment.utc(plan.created).fromNow()}
                  </TableCell>
                </Tooltip>
                <Tooltip title={moment.utc(plan.updated).format('YYYY-MM-DD h:mm a')}>
                  <TableCell>
                    {moment.utc(plan.updated).fromNow()}
                  </TableCell>
                </Tooltip>
    	          <TableCell>{plan.private ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <IconButton className={classes.tableButton} {...{to: `/plans/${plan.id}`}} component={Link}>
                    <VisibilityIcon />
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
