import React, {useState} from "react"
import {
    Collapse,
    Button,
    CardBody, 
    Card
  } from 'reactstrap';
import "./componentStyles.css"

const Sidebar = (props) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);



    return(
        <div>
        <Button 
            color='dark'
            
            onClick={toggle}>Sidebar</Button>
        <Collapse isOpen={isOpen}>
        <div className='sidebar'>            
        <h5 href="">Lokitiedot</h5>
        <h5 href="">Tee ostoslista</h5>
        <h5 href="">Ryhmät</h5>
        <h5 href="">Lisää ryhmä</h5>                    
        </div>
        </Collapse>
        </div>
    )
}

export default Sidebar;