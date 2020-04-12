/**
 *
 * Article
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { split } from 'lodash';

function Article({ location }) {
  return (
    <Container maxWidth="lg">
      <img
        src={location.state.urlToImage}
        alt={location.state.title}
        style={{ width: '100%', height: '500px', objectFit: 'cover' }}
      />
      <Typography gutterBottom variant="h3" component="h1">
        {location.state.title}
      </Typography>
      <Typography gutterBottom variant="p" component="h4">
        Published on {split(location.state.publishedAt, 'T', 1)[0]}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        {location.state.content}
      </Typography>
      <Link href={location.state.url}>Learn More</Link>
      <Typography variant="p" component="h4">
        by {location.state.source.name}
      </Typography>
    </Container>
  );
}

Article.propTypes = {
  location: PropTypes.object,
};

export default Article;
