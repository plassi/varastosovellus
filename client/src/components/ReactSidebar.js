import React from "react";
import Sidebar from "react-sidebar";
import { Button, NavLink } from 'reactstrap';
import { connect } from 'react-redux';

class ReactSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }


    render() {
        const { isAuthenticated, user } = this.props.auth;
        return (
            <div>
                {isAuthenticated ?
                    <Sidebar
                        sidebar={
                            <div>
                        <b>Sidebar content</b>
                        
                            <NavLink href='/' className="sidebar-link">Lokitiedot</NavLink>
                            <NavLink href='/' className="sidebar-link">Tee ostoslista</NavLink>
                            <NavLink href='/' className="sidebar-link">Ryhmät</NavLink>
                            <NavLink href='/' className="sidebar-link">Lisää ryhmä</NavLink>
                            </div>}
                       
                        open={this.state.sidebarOpen}
                        onSetOpen={this.onSetSidebarOpen}
                        styles={{
                            content: {
                                top: '50px',
                            },
                        }}
                        sidebarClassName='sidebar'

                    >      
                        <Button className={this.state.sidebarOpen ? "reactSidebarButton" : "sidebarOpenButton"} onClick={() => this.onSetSidebarOpen(true)}>
                            Menu
                        </Button>
                    </Sidebar >
                    :
                    <></>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(
    mapStateToProps,
    null
)(ReactSidebar);