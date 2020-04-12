/**
 *
 * NewsItem
 *
 */

import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { isEmpty, split } from 'lodash';
import CardActionArea from '@material-ui/core/CardActionArea';

function NewsItem({
  source,
  author,
  title,
  description,
  url,
  urlToImage,
  publishedAt,
  content,
}) {
  const createdDescription = split(content, '[', 1);

  return (
    <Card>
      <CardActionArea href={url}>
        <CardMedia
          style={{ width: '100%', height: '200px' }}
          image={urlToImage}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h3">
            {title}
          </Typography>
          {!isEmpty(description) ? (
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          ) : (
            <Typography variant="body2" color="textSecondary" component="p">
              {createdDescription[0]}
            </Typography>
          )}
          <Typography variant="body2" color="textSecondary" component="p">
            Published on {split(publishedAt, 'T', 1)[0]}
          </Typography>
          <Typography variant="subtitle2" component="h4">
            by {!isEmpty(author) ? author : source.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

NewsItem.propTypes = {
  source: PropTypes.object,
  author: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  urlToImage: PropTypes.string,
  publishedAt: PropTypes.string,
  content: PropTypes.string,
};

export default NewsItem;
