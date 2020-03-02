import React from 'react'
import "./componentStyles.css";
import {
  Button 
} from 'reactstrap';

const SidebarIcon = ({handleClick, isOpen}) => {
  return <Button onClick={handleClick} className={isOpen ? "sidebarButton" : "sidebarOpenButton"}>
    {isOpen ? "X" : ">"}
  </Button>
}
export default SidebarIcon