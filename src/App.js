import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import DataList from './components/DataList'
import './App.css';

class App extends Component {
  render() {

    const endPoint = 'https://portfolium.com/proxy/entries/expert'
    const limit = 15
    const columns = [
      {'header':'Cover Image', 'dataKey': 'profile.cover.url', 'asImage': true},
      {'header':'Title', 'dataKey': 'title'},
      {'header':'Description', 'dataKey': 'description'}
    ]
    const sortColumns = [
      'recent', 'comments', 'likes', 'views', 'popular'
    ]

    const first = 0

    return (
      <MuiThemeProvider>
        <div id="App">
          <img src="/logo_portfolium_blue.svg" alt="Portfolium" className="logo" />
          <div className="dataListWrapper">
            <DataList endPoint={endPoint} limit={limit} first={first} columns={columns} sorts={sortColumns} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
