import React from 'react';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import PaperContainer from '../components/PaperContainer';
import PlanEdit from '../components/PlanEdit';
import { useApi } from '../providers/Api';

const Title = styled(Typography)(
  ({ theme }) => ({
    paddingBottom: theme.spacing(2)
  })
);

const NewPlanPage = (props) => {
  const navigate = useNavigate();
  const { postRequest } = useApi();

  const addPlan = async plan => {
    const requestBody = { name: plan.name, meatId: plan.meatId, private: plan.isPrivate };
    const createdPlan = await postRequest(`/plans`, requestBody);
    navigate(`/editPlan/${createdPlan.id}`);
  }

  return (
    <PaperContainer>
      <Title variant='h6'>
        Create a New Plan
      </Title>
      <PlanEdit onPlanSubmit={addPlan} />
    </PaperContainer>
  );
};

export default NewPlanPage;
