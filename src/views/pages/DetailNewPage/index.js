// import react components
import React from 'react';
import { Link } from 'react-router';

// lib
import { get } from 'lodash';

// vendor components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

//import store & models
import { Articles } from 'models';

// constants
const styles = {
  media: {
    height: 300,
  },
};

const DetailNew = ({ match, classes }) => {
  const { id } = match.params;
  const articleModel = Articles.get(id);

  return (
    <ReactCSSTransitionGroup
      transitionName="detail"
      transitionAppear={true}
      transitionAppearTimeout={5000}
      transitionEnter={false}
      transitionLeave={false}
    >
      <Card>
        <CardMedia
          className={classes.media}
          image={get(
            articleModel,
            'urlToImage',
            'https://via.placeholder.com/500/09f/fff.png',
          )}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {get(articleModel, 'title')}
          </Typography>
          <Typography gutterBottom component="p">
            {get(articleModel, 'description')}
          </Typography>

          <Typography gutterBottom component="p">
            <Button
              target="_blank"
              color="primary"
              href={get(articleModel, 'url')}
            >
              Visit
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </ReactCSSTransitionGroup>
  );
};

export default withStyles(styles)(DetailNew);
