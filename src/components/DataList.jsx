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
      projects: []
    }
  }

  componentDidMount() {
    this.loadItems()
    window.addEventListener('scroll', this.handleScroll.bind(this))
  }

  handleScroll(e) {
    if(window.document.body.offsetHeight - window.scrollY - window.innerHeight < 300 && !this.state.fetching) {
      console.log(window.document.body.offsetHeight, window.scrollY, ' so were loading')
      this.loadItems()
    }
  }

  loadItems() {
    const limit = 15
    var uri = `https://portfolium.com/proxy/entries/expert?limit=${limit}&offset=${this.state.projects.length}&sort=recent`
    this.setState({fetching:true})
    fetch(uri)
      .then(res => res.json())
      .then((projects) => {
        this.setState({projects:this.state.projects.concat(projects), fetching: false})
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
            { this.state.projects.map(project => (
                <TableRow key={project.id}>
                  <TableRowColumn>
                    { project.profile && project.profile.cover && 
                      <img
                        src={project.profile.cover.url}
                        height={75}
                        alt={project.slug}
                      />
                    }
                  </TableRowColumn>
                  <TableRowColumn>{project.title}</TableRowColumn>
                  <TableRowColumn>{project.description}</TableRowColumn>
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