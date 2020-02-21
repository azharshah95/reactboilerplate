import React, { Component, Fragment } from 'react'
import UserContext from '../../context/userContext'
import UserAuth from '../UserAuth'

class NavBar extends Component {
	static contextType = UserContext;
	
	render() {
		return (
			<UserContext.Consumer>
				{
					userContext =>
					<div style={{backgroundColor:'grey'}}>
						<strong>
							NavBar
						</strong>
						<Fragment>
							<UserAuth />
						</Fragment>
					</div>
				}
			</UserContext.Consumer>
		)
	}
}

export default NavBar;