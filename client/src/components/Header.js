import React from 'react';
import { Navbar, NavItem, Nav, NavDropdown, MenuItem} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout, logout } from '../actions/auth';

function beginLogout(startLogout, logout) {
    logout();
    startLogout();
}

export const Header = ({ startLogout, logout, firstName, lastName, photoURL, access }) => (
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
                    <NavItem eventKey={5}>
                        Hello {firstName}!
                    </NavItem>
                    <NavItem eventKey={4} onClick={() => beginLogout(startLogout, logout)}>
                        Logout
                    </NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </div>
);

const mapStateToProps = (state) => {
    return {
        firstName: state.auth.firstName,
        lastName: state.auth.lastName,
        photoURL: state.auth.photoURL,
        access: state.auth.access
    };
};

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout()),
    logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header)