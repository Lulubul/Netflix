import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router';
import { Layout } from './components/Layout.';
import NewProfile from './components/profile/NewProfile';
import Movies from './components/movies/Movies';
import WatchItemsFounded from './components/movies/WatchItemsFounded';
import TvShows from './components/movies/TvShows';
import PlanForm from './components/signup/PlanForm';
import Register from './components/signup/Register';
import { WatchingItem } from './components/movies/WatchingItem';
import Login from './components/signup/Login';
import Payment from './components/signup/Payment';
import Account from './components/settings/Account';
import Profiles from './components/profile/Profiles';
import { connect } from 'react-redux';
import { REDIRECT } from './constants/actionTypes';
import { store } from './store';
import { push } from 'connected-react-router';

const mapStateToProps = state => {
  return {
    appName: state.common.appName,
    redirectTo: state.common.redirectTo
  }
};

const mapDispatchToProps = dispatch => ({
  onRedirect: () => dispatch({ type: REDIRECT })
});

class App extends Component {
  displayName = App.name

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Redirect from="/" to="/signup/login" exact={true} />
          <Route path='/profiles' component={Profiles} />
          <Route path='/tvshows' component={TvShows} />
          <Route path='/movies' component={Movies} />
          <Route path='/newProfile' component={NewProfile} />
          <Route path='/watchingItem' component={WatchingItem} />
          <Route path='/watchItemsFounded' component={WatchItemsFounded} />
          <Route path='/settings/account' component={Account} />
          <Route path='/signup/planform' component={PlanForm} />
          <Route path='/signup/payment' component={Payment} />
          <Route path='/signup/login' component={Login} />
          <Route path='/signup/register' component={Register} />
        </Switch>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
