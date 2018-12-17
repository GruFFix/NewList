import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

// layouts
import ApplicationLayout from 'views/layout/';

// pages
import NewsPage from 'views/pages/NewsList';
import DetailNewPage from 'views/pages/DetailNewPage';

export default () =>
  <Router>
    <Switch>
      <CommonLayout
        exact
        name="News"
        path="/"
        component={NewsPage}
        showHeader
      />

      <CommonLayout
        exact
        name="New detail"
        path="/:id"
        component={DetailNewPage}
        showHeader
      />
    </Switch>
  </Router>;

function CommonLayout({ component: Component, ...props }) {
  return (
    <Route
      {...props}
      render={componentProps =>
        <ApplicationLayout>
          <Component {...componentProps} {...props} />
        </ApplicationLayout>}
    />
  );
}
