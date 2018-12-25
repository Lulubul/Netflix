import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Movies } from './components/Movies';
import { TvShows } from './components/TvShows';
import SignIn from './components/SignIn';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={SignIn} />
        <Route path='/tvshows' component={TvShows} />
        <Route path='/movies' component={Movies} />
      </Layout>
    );
  }
}
