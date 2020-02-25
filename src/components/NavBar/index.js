import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
					<Container>
						<Menu inverted fixed='top' stackable>
							<Link to='/'>
								<Menu.Item header link>
									NavBar
								</Menu.Item>
							</Link>
							<Menu.Menu position='right'>
								<>
									<UserAuth />
								</>
							</Menu.Menu>
						</Menu>
					</Container>
				}
			</UserContext.Consumer>
		)
	}
}

export default NavBar;