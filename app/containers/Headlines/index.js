/**
 *
 * Headlines
 *
 */

import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import messages from './messages';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHeadlines from './selectors';
import reducer from './reducer';
import saga from './saga';
import { requestHeadlines } from './actions';
import { isEmpty, map } from 'lodash';
import Skeleton from '@material-ui/lab/Skeleton';
import Container from '@material-ui/core/Container';
import NewsItem from 'components/NewsItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';



export function Headlines({ match, onRequestHeadlines, headlines:{data: headlinesData}}) {
  useInjectReducer({ key: 'headlines', reducer });
  useInjectSaga({ key: 'headlines', saga });

  useEffect(() => {
    const { params: { id } } = match;
    onRequestHeadlines({id});
  },[]);
  if(isEmpty(headlinesData)) {
    return (
      <Container maxWidth="lg">
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </Container>
    );
  }

  function renderTopHeadlines() {
    return (
      <Grid container justify="center" spacing={3}>
        {
          map(headlinesData, ({
          source,
          author,
          title,
          description,
          url,
          urlToImage,
          publishedAt,
          content}, index) => (
               <Grid xs={12} lg={4} key={index}  spacing={3} item>
                <NewsItem 
                  source={source}
                  author={author}
                  title={title}
                  description={description}
                  url={url}
                  urlToImage={urlToImage} 
                  publishedAt={publishedAt}
                  content={content}
                />
              </Grid>
          )
        )}
      </Grid>
      );
  }

    return (
    <Container maxWidth="lg">
      <Typography gutterBottom variant="h3" component="h1" align="center">
        <FormattedMessage {...messages.topHeadlines} />
      </Typography>
      { renderTopHeadlines() }
    </Container>);
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
