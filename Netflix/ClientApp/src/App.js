import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Movies } from './components/Movies';
import { TvShows } from './components/TvShows';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/tvshows' component={TvShows} />
        <Route path='/movies' component={Movies} />
      </Layout>
    );
  }
}
