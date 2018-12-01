import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class DataList extends Component {

  componentDidMount() {
    this.fetched = 0
    this.fetching = false
    
    console.log('fetch stuff from : https://portfolium.com/proxy/entries/expert?limit=13&offset=0&sort=recent')
    const limit = 15
    var uri = `https://portfolium.com/proxy/entries/expert?limit=${limit}&offset=${this.fetched}&sort=recent`
    fetch(uri)
      .then(res => res.json())
      .then((projects) => {
        console.log('heres projects:', projects)
      })

  }

  render() {
    return(
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
              <TableRowColumn>?</TableRowColumn>
              <TableRowColumn>Descriptive Title</TableRowColumn>
              <TableRowColumn>Detailed Description</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
    )
  }
}

export default DataList