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
import {Card, CardMedia, CardTitle } from 'material-ui/Card';
import SortIcon from 'material-ui/svg-icons/content/sort'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';


class DataList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fetching: false,
      sort: 0,
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
    var uri = `${this.props.endPoint}?
      limit=${this.props.limit}&
      offset=${this.state.items.length}&
      sort=${this.props.sorts[this.state.sort]}`
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
  
  renderCard(item) {
    return(
      <div key={item.id}>
        <Card expanded={true} className="item-card">         
          <CardMedia overlay={<CardTitle title={item.title} subtitle={item.description} />} expandable={true}>
            <img src={item.profile.cover.url} alt={item.title} />
          </CardMedia>
        </Card>
      </div>
    )
  }

  handleFilterChange(event, value) {
    this.setState({
      sort:value,
      items:[]
    })
    this.loadItems()
  }

  renderFilters() {
    return(
      <Toolbar className="toolbar">
        <ToolbarGroup firstChild={true}>
          <IconMenu iconButtonElement={<IconButton><SortIcon/></IconButton>}
            onChange={this.handleFilterChange.bind(this)}
            value={this.state.sort}
          >
            { this.props.sorts.map((sort, i) => {
              return(
                <MenuItem key={`sort-${i}`}value={i} primaryText={sort} />
              )
            }) }
          </IconMenu>
          <ToolbarTitle text={ "Sorted By " + this.props.sorts[this.state.sort]} />
          
        </ToolbarGroup>
      </Toolbar>
    )
  }

  render() {
    return(
      <div>
        <div className="header">
          <div className="wrapper">
            <img src="/logo_portfolium_blue.svg" alt="Portfolium" className="logo" />
            { this.renderFilters() }
          </div>
        </div>
       <div className="dataListWrapper">
         { this.state.items.map(item => (
                this.renderCard(item)
              )
            )
          }
          { this.state.fetching && 
            <Card>
              <CardMedia>
                <div>
                  <CircularProgress className="spinner" size={125} thickness={10} />
                </div>
              </CardMedia>
            </Card>
          }
        </div>
      </div>
    )
  }
}

export default DataList