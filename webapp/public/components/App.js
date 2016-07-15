// Needed for tapping in material ui
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { AppBar } from 'material-ui'

/*
import { Nav, Navbar, NavItem } from 'react-bootstrap'
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap'

export default React.createClass({
    render() {
        return (
            <div>
                <Navbar inverse>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <IndexLinkContainer to='/'>
                                <a>Reggie</a>
                            </IndexLinkContainer>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <LinkContainer to='/login'>
                                <NavItem eventKey={1}>Log In</NavItem>
                            </LinkContainer>
                            <LinkContainer to='/signup'>
                                <NavItem eventKey={2}>Sign Up</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                {this.props.children}

            </div>
        )
    }
})
*/

export default React.createClass({
    render() {
        return (
            <MuiThemeProvider>
                <AppBar
                    title="Reggie"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
            </MuiThemeProvider>
        )
    }
})
