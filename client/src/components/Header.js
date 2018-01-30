import React from 'react';
import { Navbar, NavItem, Nav, NavDropdown, MenuItem} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
    <div>
        <Navbar collapseOnSelect fixedTop>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/">
                        Diplomarbeit
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavItem eventKey={1}>
                        <Link to="/dashboard">
                            Dashboard
                        </Link>
                    </NavItem>
                    <NavItem eventKey={2}>
                        <Link to="/diagram">
                            Diagram
                        </Link>
                    </NavItem>
                    <NavItem eventKey={3}>
                        <Link to="/settings">
                            Settings
                        </Link>
                    </NavItem>
                    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1}>Action</MenuItem>
                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.3}>Separated link</MenuItem>
                    </NavDropdown>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={1} onClick={startLogout}>
                        Logout
                    </NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header)