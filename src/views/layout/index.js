import React, { Component } from 'react';
import style from './style.scss';

import { observer } from 'mobx-react';
import { withRouter } from "react-router-dom";
import DocumentTitle from 'react-document-title'
import moment from 'moment';

//import store & models
import { Articles } from 'models';

// components
import Navigation from '../components/Navigation';
import Spinner from '../components/Spinner';

// vendor components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

// store
import UIStore from '../../stores/ui';

//constants
import { COUNTRY_TABS, CATEGORY_TABS } from '../../constants';

@observer
class AppLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      isLoading: true,
      title: this.getPageTitle(),
    };
  }

  componentDidMount() {
    this.fetchNewsList().then(response => {
      const { articles } = response;

      this.setState({
        articles,
        isLoading: false,
      });
    }).catch(() => {
      this.setState({
        isLoading: false,
      })
    }
  );
  }

  componentWillUnmount() {
    if (this.fetchNewsPromise) this.fetchNewsPromise.cancel();
  }

  fetchNewsList = () => {
    const { activeCountryKey, activeCategoryKey } = UIStore;

    const fetchParams = {
      category: CATEGORY_TABS[activeCategoryKey],
      country: COUNTRY_TABS[activeCountryKey],
    };

    return (this.fetchNewsPromise = Articles.fetch(fetchParams));
  };

  handleGetList = () => {
    const { history } = this.props;
    const title = this.getPageTitle();

    history.push('/');

    this.setState({
      isLoading: true,
      title,
    });

    this.fetchNewsList().then(res => {
      const { articles } = res;

      this.setState({
        articles,
        isLoading: false,
      });
    });
  };

  handleChangeCountry = value => {
    UIStore.setState({
      activeCountryKey: value,
    });
  };

  handleChangeCategory = value => {
    UIStore.setState({
      activeCategoryKey: value,
    });
  };

  getPageTitle = () => {
    const { activeCountryKey, activeCategoryKey } = UIStore;

    let title = `News from ${COUNTRY_TABS[activeCountryKey].toUpperCase()}`;

    if (CATEGORY_TABS[activeCategoryKey] || CATEGORY_TABS[activeCategoryKey] === null) {
      title = `${title} and ${CATEGORY_TABS[
        activeCategoryKey
      ].toUpperCase()} category`;
    }


    return title;
  };

  render() {
    const { activeCountryKey, activeCategoryKey } = UIStore;
    const { children } = this.props;
    const { title, articles, isLoading } = this.state;

    return (
    <DocumentTitle title={moment().format('ddd, DD/MM/YYYY')}>
      <div className={style.root}>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <div className={style.pageTitle}>
              <Typography variant="h4" component="h1">
                {title}
              </Typography>
            </div>

            <Divider />
          </Grid>

          <Grid item sm={12} md={2}>
            <Navigation
              activeItemKey={activeCountryKey}
              items={COUNTRY_TABS}
              onChangeTab={this.handleChangeCountry}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={8}>
            {isLoading
              ? <Spinner />
              : <children.type {...children.props} articles={articles} />}
          </Grid>

          <Grid item sm={12} md={2}>
            <Grid container spacing={8}>
              <Grid item xs={12}>
                <Navigation
                  activeItemKey={activeCategoryKey}
                  items={CATEGORY_TABS}
                  onChangeTab={this.handleChangeCategory}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  onClick={this.handleGetList}
                  disabled={isLoading}
                  variant="contained"
                  size="large"
                  color="primary"
                >
                  GET LIST
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </DocumentTitle>
    );
  }
}

export default withRouter(AppLayout);
