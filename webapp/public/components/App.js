import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { AppBar, MenuItem, FlatButton } from 'material-ui'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'

const styles = {
  button: {
    color: '#fff',
  },
}

export default React.createClass({
    handleTitleTapped: function() {
        browserHistory.push('/')
    },

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <AppBar
                        title="Reggie"
                        onTitleTouchTap={this.handleTitleTapped}
                        iconElementRight={
                            <div>
                                <FlatButton
                                    style={styles.button}
                                    containerElement={<Link to="/login" />}
                                    label="Log In"
                                />
                                <FlatButton
                                    style={styles.button}
                                    containerElement={<Link to="/signup" />}
                                    label="Sign Up"
                                />
                            </div>
                        }
                    />
                </MuiThemeProvider>

                {this.props.children}
            </div>
        )
    }
})

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
