import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import * as moment from 'moment';
import ReactMarkdown from 'react-markdown';

const useStyles = makeStyles(theme => ({
  itemContainer: {
    overflowWrap: 'anywhere',
    display: 'table',
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: theme.spacing(2)
  },
  leftColumn: {
    display: 'table-cell',
    height: '100%',
    paddingRight: theme.spacing(2),
    float: 'left'
  },
  rightColumn: {
    width: '100%'
  },
  infoRow: {
    display: 'flex',
    paddingBottom: theme.spacing(2)
  },
  userIcon: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    borderRadius: '25%'
  },
  userName: {
    flexGrow: 1
  },
  dateContainer: {
    textAlign: 'right'
  },
  date: {
    justifyContent: 'flex-end',
    display: 'flex'
  }
}));

const Comment = props => {
  const { comment } = props;
  const classes = useStyles();

	return (
    <ListItem className={classes.itemContainer}>
      <div className={classes.leftColumn}>
        <img alt={comment.created} src={comment.userPicture} className={classes.userIcon}/>
      </div>
      <div className={classes.rightColumn}>
        <div className={classes.infoRow}>
          <Typography className={classes.userName} variant='subtitle1'>
            {comment.userName}
          </Typography>
          <div className={classes.dateContainer}>
            <Typography variant='caption' className={classes.date}>
              {moment(comment.created).format('ll')}
            </Typography>
            <Typography variant='caption' className={classes.date}>
              {moment(comment.created).format('LT')}
            </Typography>
          </div>
        </div>
        <div className={classes.bottomContainer}>
          <ReactMarkdown source={comment.comment} escapeHtml={false}/>
        </div>
      </div>
    </ListItem>
  );
};

export default Comment;
