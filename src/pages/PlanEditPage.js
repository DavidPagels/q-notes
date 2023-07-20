import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
import PaperContainer from '../components/PaperContainer'
import PlanEdit from '../components/PlanEdit';
import StepList from '../components/StepList';
import StepInput from '../components/StepInput';
import { useApi } from '../providers/Api';
import { useSnackbar } from '../providers/Snackbar';

const Title = styled(Typography)(
	({ theme }) => ({
		paddingBottom: theme.spacing(2)
	})
);

const PlanEditPage = (props) => {
	const navigate = useNavigate();
	const { planId } = useParams();
	const [plan, setPlan] = useState({});
	const [loading, setLoading] = useState(true);
	const { showSnackbar } = useSnackbar();
	const { getRequest, postRequest, putRequest, deleteRequest } = useApi();

	const init = async () => {
		await getPlan();
		setLoading(false);
	};

	const getPlan = async () => {
		setPlan(await getRequest(`/plans/${planId}`));
	};

	const editPlan = async plan => {
		const requestBody = { name: plan.name, meatId: plan.meatId, private: plan.isPrivate };
		await putRequest(`/plans/${planId}`, requestBody);
		showSnackbar('Plan Saved');
		navigate(`/plans/${planId}`);
	};

	const addStep = async step => {
		await postRequest(`/plans/${planId}/steps`, [step]);
		return getPlan();
	};

	const deleteStep = async stepId => {
		await deleteRequest(`/plans/${planId}/steps/${stepId}`);
		return getPlan();
	};

	const editStep = async step => {
		await putRequest(`/plans/${planId}/steps/${step.id}`, step);
		return getPlan();
	};

	useEffect(() => {
		init();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return loading ? '' :
		<div>
			<PaperContainer>
				<Title variant='h6'>
					Edit Plan
				</Title>
				<PlanEdit plan={plan} onPlanSubmit={editPlan} planId={planId} />
			</PaperContainer>
			<PaperContainer>
				<Title variant='h6'>
					Modify Plan Steps
				</Title>
				<StepList
					sx={{ width: '100%' }}
					editStep={editStep}
					deleteStep={deleteStep}
					steps={plan.steps || []} />
				<StepInput sx={{ width: '100%' }} addStep={addStep} />
			</PaperContainer>
		</div>;
};

export default PlanEditPage;
