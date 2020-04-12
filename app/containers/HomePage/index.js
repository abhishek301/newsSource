/**
 *
 * HomePage
 *
 */

import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { isEmpty, map } from 'lodash';
import { requestNewsSource } from './actions';
import messages from './messages';
import Source from 'components/Source';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export function HomePage({ history, onRequestNewsSource, homePage: { data: newsSourceData } }) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  useEffect(() => {
    onRequestNewsSource();
  }, []);

  if (isEmpty(newsSourceData)) {
    return <CircularProgress />;
  }

  function redirectToHeadline(id)  {
    return history.push(`/${id}/headlines`);
  }

  function renderNewsSourceList() {
    return (
          <Grid container justify="center" spacing={3}>
            {map(newsSourceData, ({ id, name, description, language }) => (
              <Grid xs={12} lg={4} key={id} item>
                <Source
                  id={id}
                  name={name}
                  description={description}
                  language={language} 
                  onNewsSourceClick={redirectToHeadline} 
                />
              </Grid>
            ))}
          </Grid>
    );
  }

  return (
  <Container maxWidth="lg">
    <Typography gutterBottom variant="h3" component="h1" align="center">
      <FormattedMessage {...messages.newsSources} />
    </Typography>
    {renderNewsSourceList()}
  </Container>);
}

HomePage.propTypes = {
  homePage: PropTypes.object,
  history: PropTypes.object,
  onRequestNewsSource: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onRequestNewsSource: () => dispatch(requestNewsSource()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
