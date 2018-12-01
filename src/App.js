import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import DataList from './components/DataList'

class App extends Component {
  render() {

    const endPoint = 'https://portfolium.com/proxy/entries/expert'
    const limit = 15
    const columns = [
      {'header':'Cover Image', 'dataKey': 'profile.cover.url', 'asImage': true},
      {'header':'Title', 'dataKey': 'title'},
      {'header':'Description', 'dataKey': 'description'}
    ]

    return (
      <MuiThemeProvider>
        <div>
          <img src="/logo_portfolium_blue.svg" alt="Portfolium" style={{marginLeft:"15px", marginRight:"5px"}}/>
          <span style={{fontSize:"28px", fontWeight:300}}>Projects</span>
          <DataList endPoint={endPoint} limit={limit} columns={columns} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
