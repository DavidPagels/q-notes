import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useApi } from '../providers/Api';
import * as qs from 'qs';
import * as moment from 'moment';

const PlanList = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getRequest } = useApi();

  const [plans, setPlans] = useState([]);
  const [opts, setOpts] = useState({})
  const [totalHits, setTotalHits] = React.useState(0);

  const getPlans = async () => {

    const results = await getRequest(`/plans${location.search}`) || {};

    setOpts(qs.parse(location.search, { ignoreQueryPrefix: true }));
    setPlans(results.records || []);
    setTotalHits(results.totalHits || 0);
  }

  useEffect(() => {
    getPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const updatePage = options => {
    navigate({
      pathname: location.pathname,
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

      const newOpts = { ...opts, page: 1, sortBy: `${isAsc ? '-' : ''}${columnName}` };
      updatePage(newOpts);
    };
  };

  const handleChangePage = (ev, newPage) => {
    const newOpts = { ...opts, page: newPage + 1 };
    updatePage(newOpts);
  };

  const handleChangeRowsPerPage = ev => {
    const newOpts = { ...opts, page: 1, pageSize: parseInt(ev.target.value, 10) };
    updatePage(newOpts);
  };

  const goToPlanPage = planId => {
    navigate(`/plans/${planId}`);
  };

  return (
    <div>
      <Toolbar>
        <Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
          Smoking Plans
        </Typography>
        <FormControl sx={(theme) => ({
          marginTop: -theme.spacing(2),
          minWidth: theme.spacing(20)
        })}>
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
            <MenuItem value={9}>Projects/Devices</MenuItem>
          </Select>
        </FormControl>

        <IconButton {...{ to: `/newPlan` }} component={Link}>
          <AddIcon />
        </IconButton>
      </Toolbar>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Meat</TableCell>
              <TableCell sortDirection={opts.sortBy && opts.sortBy.endsWith('created') ? (opts.sortBy.startsWith('-') ? 'desc' : 'asc') : false}>
                <TableSortLabel
                  active={opts.sortBy && opts.sortBy.endsWith('created')}
                  direction={opts.sortBy && opts.sortBy.endsWith('created') ? (opts.sortBy.startsWith('-') ? 'desc' : 'asc') : 'asc'}
                  onClick={handleSortChange('created')}>
                  Created
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={opts.sortBy && opts.sortBy.endsWith('updated') ? (opts.sortBy.startsWith('-') ? 'desc' : 'asc') : false}>
                <TableSortLabel
                  active={opts.sortBy && opts.sortBy.endsWith('updated')}
                  direction={opts.sortBy && opts.sortBy.endsWith('updated') ? (opts.sortBy.startsWith('-') ? 'desc' : 'asc') : 'asc'}
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
                <TableCell sx={{ textTransform: 'capitalize' }}>{plan.meatType}</TableCell>
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
                  <IconButton sx={{ padding: 0 }} {...{ to: `/plans/${plan.id}` }} component={Link}>
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
