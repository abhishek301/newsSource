/**
 *
 * Source
 *
 */

import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import PropTypes from 'prop-types';

function Source({ id, name, description, language, onNewsSourceClick }) {
  function onCardClick() {
    onNewsSourceClick(id);
  }

  return (
    <Card>
      <CardActionArea onClick={onCardClick}>
        <CardContent>
          <Typography variant="h5" component="h3">
            {name}
          </Typography>
          <Typography component="p">{description}</Typography>
          <Typography variant="subtitle2" component="p">
            {language}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

Source.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  language: PropTypes.string,
  onNewsSourceClick: PropTypes.func,
};

export default Source;
