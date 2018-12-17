// import react components
import React from 'react';

// components
import ListItem from '../../components/ListItem';
import Grid from '@material-ui/core/Grid';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const NewsPage = ({ articles = [] }) =>
  <Grid container spacing={8}>
    {articles.map(article =>
      <Grid key={article.id} item xs={12}>
        <ReactCSSTransitionGroup
          transitionName="anim"
          transitionAppear={true}
          transitionAppearTimeout={5000}
          transitionEnter={false}
          transitionLeave={false}
        >
          <ListItem id={article.id} title={article.title} />
        </ReactCSSTransitionGroup>
      </Grid>,
    )}
  </Grid>;

export default NewsPage;
