import React from 'react';
import { styled } from '@mui/system';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import * as moment from 'moment';
import ReactMarkdown from 'react-markdown';

const ItemContainer = styled(ListItem)(
  ({ theme }) => ({
    overflowWrap: 'anywhere',
    display: 'table',
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: theme.spacing(2)
  })
);

const LeftColumn = styled('div')(
  ({ theme }) => ({
    display: 'table-cell',
    height: '100%',
    paddingRight: theme.spacing(2),
    float: 'left'
  })
);

const UserIcon = styled('img')(
  ({ theme }) => ({
    width: theme.spacing(5),
    height: theme.spacing(5),
    borderRadius: '25%'
  })
);

const InfoRow = styled('div')(
  ({ theme }) => ({
    display: 'flex',
    paddingBottom: theme.spacing(2)
  })
);

const Comment = props => {
  const { comment } = props;

  return (
    <ItemContainer>
      <LeftColumn>
        <UserIcon alt={comment.created} src={comment.userPicture} />
      </LeftColumn>
      <div sx={{ width: '100%' }}>
        <InfoRow>
          <Typography sx={{ flexGrow: 1 }} variant='subtitle1'>
            {comment.userName}
          </Typography>
          <div sx={{ textAlign: 'right' }}>
            <Typography variant='caption' sx={{ justifyContent: 'flex-end', display: 'flex' }}>
              {moment(comment.created).format('ll')}
            </Typography>
            <Typography variant='caption' sx={{ justifyContent: 'flex-end', display: 'flex' }}>
              {moment(comment.created).format('LT')}
            </Typography>
          </div>
        </InfoRow>
        <div>
          <ReactMarkdown source={comment.comment} escapeHtml={false} />
        </div>
      </div>
    </ItemContainer>
  );
};

export default Comment;
