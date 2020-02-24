import React, { Component, Fragment } from 'react'
import { Menu, Container } from 'semantic-ui-react'
import UserContext from '../../context/userContext'
import UserAuth from '../UserAuth'

class NavBar extends Component {
	static contextType = UserContext;
	
	render() {
		return (
			<UserContext.Consumer>
				{
					userContext =>
					// <div style={{backgroundColor:'grey'}}>
						<Menu inverted fixed='top'>
							<Container>
								<Menu.Item as='a' header>
									NavBar
								</Menu.Item>
								<Menu.Menu position='right'>
								<Fragment>
									<UserAuth />
								</Fragment>
								</Menu.Menu>
							</Container>
						</Menu>
						
					// </div>
				}
			</UserContext.Consumer>
		)
	}
}

export default NavBar;