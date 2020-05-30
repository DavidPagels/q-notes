import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useApi } from '../providers/Api';
import * as qs from 'qs';
import * as moment from 'moment';

const useStyles = makeStyles(theme => ({
  meatSelect: {
    marginTop: -theme.spacing(2),
    minWidth: theme.spacing(20)
  },
  meatType: {
    textTransform: 'capitalize'
  },
  table: {
    minWidth: 650
  },
  tableButton: {
    padding: 0
  },
  title: {
    flex: '1 1 100%',
  }
}));

const PlanList = (props) => {
	const classes = useStyles();
  const history = useHistory();
  const { getRequest } = useApi();
  
	const [plans, setPlans] = useState([]);
	const [opts, setOpts] = useState({})
  const [totalHits, setTotalHits] = React.useState(0);

	const getPlans = async () => {

		const results = await getRequest(`/plans${history.location.search}`) || {};

    setOpts(qs.parse(history.location.search, { ignoreQueryPrefix: true }));
    setPlans(results.records || []);
    setTotalHits(results.totalHits || 0);
	}

	useEffect(() => {
		getPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [history.location]);

  const updatePage = options => {
    history.push({
      pathname: history.location.pathname, 
      search: `?${qs.stringify(options)}`
    });
  };

  const handleMeatIdChange = (ev) => {
    const meatId = ev.target.value;
    const { meatId: oldMeatId, ...newOpts } = opts;
    if (meatId) {
      newOpts.meatId = meatId;
    }
    newOpts.page = 1;
    updatePage(newOpts);
  }

  const handleSortChange = columnName => {
    return () => {
      const isAsc = opts.sortBy && opts.sortBy.endsWith(columnName) && !opts.sortBy.startsWith('-')

      const newOpts = {...opts, page: 1, sortBy: `${isAsc ? '-' : ''}${columnName}`};
      updatePage(newOpts);
    };
  };

	const handleChangePage = (ev, newPage) => {
    const newOpts = {...opts, page: newPage + 1};
    updatePage(newOpts);
  };

  const handleChangeRowsPerPage = ev => {
    const newOpts = {...opts, page: 1, pageSize: parseInt(ev.target.value, 10)};
    updatePage(newOpts);
  };

  const goToPlanPage = planId => {
    history.push(`/plans/${planId}`);
  };

	return (
		<div>
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title} variant='h6' id='tableTitle' component='div'>
          Smoking Plans
        </Typography>
        <FormControl className={classes.meatSelect}>
          <InputLabel>Meat Category</InputLabel>
          <Select value={Number(opts.meatId) || 0} onChange={handleMeatIdChange} label="Meat">
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={1}>Pork</MenuItem>
            <MenuItem value={2}>Beef</MenuItem>
            <MenuItem value={3}>Chicken</MenuItem>
            <MenuItem value={4}>Turkey</MenuItem>
            <MenuItem value={5}>Other Poultry</MenuItem>
            <MenuItem value={6}>Wild Game</MenuItem>
            <MenuItem value={7}>Seafood</MenuItem>
            <MenuItem value={8}>Other</MenuItem>
          </Select>
        </FormControl>
        
        <IconButton {...{to: `/newPlan`}} component={Link}>
          <AddIcon />
        </IconButton>
      </Toolbar>
      
    	<TableContainer>
    	  <Table className={classes.table} size='small'>
    	    <TableHead>
    	      <TableRow>
    	        <TableCell>Name</TableCell>
    	        <TableCell>User</TableCell>
              <TableCell>Meat</TableCell>
              <TableCell  sortDirection={opts.sortBy && opts.sortBy.endsWith('created') ? (opts.sortBy.startsWith('-') ? 'desc' : 'asc' ): false}>
                <TableSortLabel
                  active={opts.sortBy && opts.sortBy.endsWith('created')}
                  direction={opts.sortBy && opts.sortBy.endsWith('created') ? (opts.sortBy.startsWith('-') ? 'desc' : 'asc' ): 'asc'}
                  onClick={handleSortChange('created')}>
                  Created
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={opts.sortBy && opts.sortBy.endsWith('updated') ? (opts.sortBy.startsWith('-') ? 'desc' : 'asc' ): false}>
                <TableSortLabel
                  active={opts.sortBy && opts.sortBy.endsWith('updated')}
                  direction={opts.sortBy && opts.sortBy.endsWith('updated') ? (opts.sortBy.startsWith('-') ? 'desc' : 'asc' ): 'asc'}
                  onClick={handleSortChange('updated')}>
                  Updated
                </TableSortLabel>
              </TableCell>
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
                <TableCell className={classes.meatType}>{plan.meatType}</TableCell>
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
    		  rowsPerPage={Number(opts.pageSize) || 10}
    		  page={(Number(opts.page) || 1) - 1}
    		  onChangePage={handleChangePage}
    		  onChangeRowsPerPage={handleChangeRowsPerPage}
    		/>
    </div>
  );
};

export default PlanList;
