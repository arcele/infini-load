import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import DataList from './components/DataList'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <img src="/logo_portfolium_blue.svg" style={{marginLeft:"15px", marginRight:"5px"}}/>
          <span style={{fontSize:"28px", fontWeight:300}}>Projects</span>
          <DataList endPoint="https://portfolium.com/proxy/entries/expert" />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
