import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Movies } from './components/Movies';
import { TvShows } from './components/TvShows';
import { PlanForm } from './components/signup/PlanForm';
import { Register } from './components/signup/Register';
import Login from './components/signup/Login';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/tvshows' component={TvShows} />
        <Route path='/movies' component={Movies} />
        <Route path='/signup/planform' component={PlanForm} />
        <Route path='/signup/login' component={Login} />
        <Route path='/signup/register' component={Register} />
      </Layout>
    );
  }
}
