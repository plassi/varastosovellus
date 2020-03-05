import React from "react"
import {
  NavLink,  
} from 'reactstrap';
import "./componentStyles.css"
import { connect } from 'react-redux';
import SidebarIcon from './SidebarIcon'


//Tähän kuuluvat tiedostot: SidebarContent, SidebarIcon, 
//https://medium.com/@luqman.qureshi/create-animated-sidebar-component-in-react-with-react-transition-group-7956ed575c00
class Sidebar extends React.Component {
  state = {
     isOpen: false
   }
 
   renderSidebar = () => {
     if (!this.state.isOpen) {
       return null
     }
 
     return <div className="sidebar">
       <NavLink href='/' className="sidebar-link">Lokitiedot</NavLink>
       <NavLink href='/' className="sidebar-link">Tee ostoslista</NavLink>
       <NavLink href='/' className="sidebar-link">Ryhmät</NavLink>
       <NavLink href='/' className="sidebar-link">Lisää ryhmä</NavLink>

    </div>
  }

  toggleSidebar = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }))
  }

render() {
  const { isAuthenticated, user } = this.props.auth;
    return <div className="sidebar.close">
      {this.renderSidebar()}
      {isAuthenticated ?
      <div className="sidebar-icon">
     
        <SidebarIcon
          isOpen={this.state.isOpen}
          handleClick={this.toggleSidebar}
        />

      </div>
        :
        <></>
      }
    </div>
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Sidebar);