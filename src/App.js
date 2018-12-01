import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        infini-load
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Cover Image</TableHeaderColumn>
              <TableHeaderColumn>Title</TableHeaderColumn>
              <TableHeaderColumn>Description</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableRowColumn>Some Image</TableRowColumn>
              <TableRowColumn>Descriptive Title</TableRowColumn>
              <TableRowColumn>Detailed Description</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </MuiThemeProvider>
    );
  }
}

export default App;
