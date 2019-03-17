import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Layout } from './components/Layout.';
import { Home } from './components/profile/Home';
import { NewProfile } from './components/profile/NewProfile';
import { Movies } from './components/Movies';
import { TvShows } from './components/TvShows';
import { PlanForm } from './components/signup/PlanForm';
import { Register } from './components/signup/Register';
import { WatchingItem } from './components/WatchingItem';
import { Login } from './components/signup/Login';
import Payment from './components/signup/Payment';
import { connect } from 'react-redux';
import { REDIRECT } from './constants/actionTypes';
import { push } from 'connected-react-router';

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = dispatch => ({
  onRedirect: () =>
    dispatch({ type: REDIRECT })
});

export class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Redirect from="/" to="/signup/login" />
        <Route path='/profiles' component={Home} />
        <Route path='/tvshows' component={TvShows} />
        <Route path='/movies' component={Movies} />
        <Route path='/newProfile' component={NewProfile} />
        <Route path='/watchingItem' component={WatchingItem} />
        <Route path='/signup/planform' component={PlanForm} />
        <Route path='/signup/payment' component={Payment} />
        <Route path='/signup/login' component={Login} />
        <Route path='/signup/register' component={Register} />
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
