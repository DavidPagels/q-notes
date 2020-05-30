import React, {useEffect, useState} from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PaperContainer from '../components/PaperContainer';
import EditIcon from '@material-ui/icons/Edit';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { useApi } from '../providers/Api';
import { useAuth0 } from '../providers/Auth0';

import StepList from '../components/StepList';
import CommentList from '../components/CommentList';
import CommentInput from '../components/CommentInput';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex'
  },
  title: {
    flexGrow: 1
  }
}));

const PlanPage = (props) => {
	const classes = useStyles();
  const history = useHistory();
  const { getRequest, postRequest } = useApi();
  const { user } = useAuth0();
  const { planId } = useParams();

  const [plan, setPlan] = useState({});
  const [comments, setComments] = useState([]);

  const getPlan = async () => {
    setPlan(await getRequest(`/plans/${planId}`));
  };

  const getComments = async () => {
    if (Number(planId)) {
      setComments(await getRequest(`/plans/${planId}/comments`));
    }
  }

  const copyPlan = async () => {
    const splitName = plan.name.split(' - copy ');
    const copyNumber = Number(splitName.slice(-1)) || 0;
    const newPlan = {...plan, name: `${splitName[0]} - copy ${copyNumber + 1}`};
    const createdPlan = await postRequest(`/plans/steps`, newPlan);
    history.push(`/editPlan/${createdPlan.id}`);
  };

  const addComment = async comment => {
    await postRequest(`/plans/${planId}/comments`, comment);
    getComments();
  }

  useEffect(() => {
    getPlan();
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

	return (
    <div>
      <PaperContainer>
        <div className={classes.toolbar}>
          <Typography className={classes.title} variant='h6'>
            {plan.name}
          </Typography>
          <IconButton onClick={copyPlan}>
            <FileCopyIcon />
          </IconButton>
          {
            user && plan.userId === user.sub ?
            <IconButton {...{to: `/editPlan/${planId}`}} component={Link}>
              <EditIcon />
            </IconButton> :
            ''
          }
        </div>
        <StepList steps={plan.steps || []}/>
      </PaperContainer>
      <PaperContainer>
        <Typography className={classes.title} variant='h6'>
          Comments and Results
        </Typography>
        <CommentList comments={comments} />
        <CommentInput className={classes.commentInput} addComment={addComment} />
      </PaperContainer>
    </div>
	);
};

export default PlanPage;
