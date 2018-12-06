import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';

class DataList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fetching: false,
      items: []
    }
  }

  componentDidMount() {
    this.loadItems()
    window.addEventListener('scroll', this.handleScroll.bind(this))
  }

  handleScroll(e) {
    if(window.document.body.offsetHeight - window.scrollY - window.innerHeight < 300 && !this.state.fetching) {
      this.loadItems()
    }
  }

  processItems(items) {
    // Return the results minus anything with a matching id to an item in the state
    return items.filter((item) => {
      let matched = false
      this.state.items.forEach((stateItem) => {
        if(stateItem.id === item.id) {
          matched = true
        }
      })
      return !matched
    })
  }

  loadItems() {
    var uri = `${this.props.endPoint}?limit=${this.props.limit}&offset=${this.state.items.length}&sort=recent`
    this.setState({fetching:true})
    fetch(uri)
      .then(res => res.json())
      .then((items) => {
        let newItems = this.state.items.slice().concat(this.processItems(items))
        this.setState({items:newItems, fetching: false})
      })
      .catch((err) => {
        // if our scroll fails, reset fetching status to allow infini-scroll to try again
        this.setState({fetching:false})
      })   
  }

  columnData(project, column) {
    const tokenizedDataKey = column.dataKey.split('.')
    let output = project[column.dataKey]
    if(tokenizedDataKey.length > 1) {
      // support iterating into an object
      output = tokenizedDataKey.reduce((obj, key, i) => {
        return (i===1 ? project[obj][key] : obj[key])
      })
    }
    if(column.asImage) {
      return(<img height={75} src={output} alt={tokenizedDataKey[tokenizedDataKey.length-1]} />)
    }
    return output
  }

  render() {
    return(
        <Table>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              { this.props.columns.map(column => (
                  <TableHeaderColumn key={'header-' + column.dataKey}>{column.header}</TableHeaderColumn>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            { this.state.items.map(item => (
                <TableRow key={item.id}>
                    {this.props.columns.map(column=> {
                      return(
                        <TableRowColumn key={item.id}>{this.columnData(item, column)}</TableRowColumn>
                      )
                    })}
                </TableRow>
              )) 
            }
            { this.state.fetching && 
              <TableRow key='loading'>
                <TableRowColumn>&nbsp;</TableRowColumn>
                <TableRowColumn>
                  <CircularProgress size={50} thickness={5} />
                </TableRowColumn>
              </TableRow>
            }
          </TableBody>
        </Table>
    )
  }
}

export default DataList