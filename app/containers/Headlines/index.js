/**
 *
 * Headlines
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHeadlines from './selectors';
import reducer from './reducer';
import saga from './saga';
import { requestHeadlines } from './actions';
import messages from './messages';
import { isEmpty, map, split, kebabCase } from 'lodash';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';



export function Headlines({ match, onRequestHeadlines, headlines:{data: headlinesData}}) {
  useInjectReducer({ key: 'headlines', reducer });
  useInjectSaga({ key: 'headlines', saga });

  useEffect(() => {
    const { params: { id } } = match;
    onRequestHeadlines({id});
  },[]);
console.log(headlinesData);
  if(isEmpty(headlinesData)) {
    return (
    <>
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
    </>
    );
  }

  function renderTopHeadlines() {
    return map(headlinesData, ({source, author, title, description, url, urlToImage, publishedAt, content}) => {
      return (
      <Link to={{ 
        pathname: `/${source.id}/headlines/${kebabCase(title)}`,
        state: {source, author, title, description, url, urlToImage, publishedAt, content}}}>
        <Card>
          <CardMedia
            style={{ width: '100%', height: '200px', }}
            image={urlToImage}
            title={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h3">
              {title}
            </Typography>
            {!isEmpty(description) && (
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>)}
            <Typography variant="body2" color="textSecondary" component="p">
              Published on {split(publishedAt, 'T', 1)[0]}
            </Typography>
            <Typography variant="p" component="h4">
              by {!isEmpty(author) ? author : source.name }
            </Typography>
          </CardContent>
        </Card>
      </Link>
      )
    });
  }

    return (<Container maxWidth="lg">{ renderTopHeadlines() }</Container>);
}


Headlines.propTypes = {
  match: PropTypes.object,
  onRequestHeadlines: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  headlines: makeSelectHeadlines(),
});

function mapDispatchToProps(dispatch) {
  return {
    onRequestHeadlines: params => dispatch(requestHeadlines(params)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Headlines);
