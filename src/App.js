import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import DataList from './components/DataList'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          infini-load
          <DataList />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
