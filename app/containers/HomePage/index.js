/**
 *
 * HomePage
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
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { isEmpty, map } from 'lodash';
import { requestNewsSource } from './actions';
import messages from './messages';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';

export function HomePage({ onRequestNewsSource, homePage: { data: newsSourceData } }) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  useEffect(() => {
    onRequestNewsSource();
  }, []);

  if (isEmpty(newsSourceData)) {
    return <CircularProgress />;
  }

  function renderNewsSourceList() {
    return map(newsSourceData, ({ id, name, description, language }) => (
      <Link key={id} to={`/${id}/headlines`} >
        <Card>
          <CardContent>
            <Typography variant="h5" component="h3">
              {name}
            </Typography>
            <Typography component="p">
              {description}
            </Typography>
            <Typography variant="subtitle2" component="p">
              {language}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    ));
  }

  return (<Container maxWidth="lg">{renderNewsSourceList()}</Container>);
}

HomePage.propTypes = {
  homePage: PropTypes.object,
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
