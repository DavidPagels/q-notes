import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PaperContainer from '../components/PaperContainer';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { useApi } from '../providers/Api';
import { useAuth0 } from '@auth0/auth0-react';

import StepList from '../components/StepList';
import CommentList from '../components/CommentList';
import CommentInput from '../components/CommentInput';

const PlanPage = (props) => {
  const navigate = useNavigate();
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
    const newPlan = { ...plan, name: `${splitName[0]} - copy ${copyNumber + 1}` };
    const createdPlan = await postRequest(`/plans/steps`, newPlan);
    navigate(`/editPlan/${createdPlan.id}`);
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
        <div sx={{ display: 'flex' }}>
          <Typography sx={{ flexGrow: 1 }} variant='h6'>
            {plan.name}
          </Typography>
          {user ?
            <div>
              <IconButton onClick={copyPlan}>
                <FileCopyIcon />
              </IconButton>
              {plan.userId === user.sub ?
                <IconButton {...{ to: `/editPlan/${planId}` }} component={Link}>
                  <EditIcon />
                </IconButton> :
                ''
              }
            </div> :
            ''
          }
        </div>
        <StepList steps={plan.steps || []} />
      </PaperContainer>
      <PaperContainer>
        <Typography sx={{ flexGrow: 1 }} variant='h6'>
          Comments and Results
        </Typography>
        <CommentList comments={comments} />
        <CommentInput addComment={addComment} />
      </PaperContainer>
    </div>
  );
};

export default PlanPage;
